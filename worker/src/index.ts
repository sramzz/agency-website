import { readJsonBody } from "./request-body";
import { validateRequestEnvelope } from "./security";
import { hasLeadSubmission, LeadStorageError, storeLeadAndEnqueue, type QueueBinding, type StorageLogger } from "./storage";
import { verifyTurnstile } from "./turnstile";
import { validateHoneypot, validateLeadPayload } from "./validation";
import { processLeadMessage, type LeadEmailBinding } from "./queue";
import { handleScheduled, type LeadQueueProducer } from "./scheduled";

const json = (body: unknown, status: number): Response => new Response(JSON.stringify(body), {
  status,
  headers: { "content-type": "application/json; charset=UTF-8", "cache-control": "no-store" }
});

type ConfigurableStringBinding =
  | "LEAD_ALLOWED_HOSTNAMES"
  | "LEAD_NOTICE_VERSION"
  | "LEAD_EMAIL_FROM"
  | "LEAD_EMAIL_TO"
  | "LEAD_REQUEUE_AFTER_SECONDS";

type HandlerEnv = Omit<Partial<Env>, "EMAIL" | "LEAD_EMAIL_QUEUE" | ConfigurableStringBinding> &
  Partial<Record<ConfigurableStringBinding, string>> & {
  EMAIL?: LeadEmailBinding | SendEmail;
  LEAD_EMAIL_QUEUE?: QueueBinding | Queue;
  logger?: StorageLogger;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_FETCH?: typeof fetch;
};

const worker = {
  async fetch(request: Request, env: HandlerEnv): Promise<Response> {
    const envelopeError = validateRequestEnvelope(
      request,
      (env.LEAD_ALLOWED_HOSTNAMES || "").split(",").map((hostname) => hostname.trim()).filter(Boolean)
    );
    if (envelopeError) return json({ ok: false, error: "error" in envelopeError ? envelopeError.error : "not_found" }, envelopeError.status);
    if (!env.DB) return json({ ok: false, error: "storage_unavailable" }, 500);

    const body = await readJsonBody(request);
    if (!body.ok) {
      return json({ ok: false, error: body.error }, body.error === "payload_too_large" ? 413 : 400);
    }
    if (!body.value || typeof body.value !== "object" || Array.isArray(body.value)) {
      return json({ ok: false, error: "validation_failed" }, 400);
    }
    const payload = body.value as Record<string, unknown>;
    if (validateHoneypot(payload.website).length > 0) return json({ ok: false, error: "honeypot_rejected" }, 422);
    const validation = validateLeadPayload(payload, { noticeVersion: env.LEAD_NOTICE_VERSION });
    if (!validation.ok) return json({ ok: false, error: "validation_failed" }, 400);
    try {
      if (await hasLeadSubmission(env.DB, validation.value.submissionId)) {
        return json({ ok: true, submissionId: validation.value.submissionId, duplicate: true }, 200);
      }
    } catch (_error) {
      env.logger?.error("lead_storage_failed", { submissionId: validation.value.submissionId, code: "D1_READ_FAILED" });
      return json({ ok: false, error: "storage_unavailable" }, 500);
    }

    if (!env.LEAD_EMAIL_QUEUE) return json({ ok: false, error: "storage_unavailable" }, 500);
    const allowedHostnames = (env.LEAD_ALLOWED_HOSTNAMES || "").split(",").map((hostname) => hostname.trim()).filter(Boolean);
    const verified = await verifyTurnstile({
      token: validation.value.turnstileToken,
      secret: env.TURNSTILE_SECRET_KEY || "",
      submissionId: validation.value.submissionId,
      hostname: new URL(request.url).hostname,
      allowedHostnames,
      fetchImpl: env.TURNSTILE_FETCH
    });
    if (!verified) return json({ ok: false, error: "turnstile_rejected" }, 422);
    try {
      const stored = await storeLeadAndEnqueue(env.DB, env.LEAD_EMAIL_QUEUE, validation.value, { logger: env.logger });
      return json({ ok: true, submissionId: validation.value.submissionId, duplicate: !stored }, 200);
    } catch (error) {
      if (error instanceof LeadStorageError) {
        env.logger?.error("lead_storage_failed", { submissionId: validation.value.submissionId, code: error.code });
        return json({ ok: false, error: "storage_unavailable" }, 500);
      }
      throw error;
    }

  },
  async queue(batch: MessageBatch<unknown>, env: HandlerEnv): Promise<void> {
    if (!env.DB || !env.EMAIL) return;
    await Promise.all(batch.messages.map((message) => processLeadMessage(message, {
      DB: env.DB!,
      EMAIL: env.EMAIL!,
      logger: env.logger,
      LEAD_EMAIL_FROM: env.LEAD_EMAIL_FROM,
      LEAD_EMAIL_TO: env.LEAD_EMAIL_TO
    })));
  },
  async scheduled(controller: ScheduledController, env: HandlerEnv, _ctx: ExecutionContext): Promise<void> {
    if (!env.DB || !env.LEAD_EMAIL_QUEUE) return;
    await handleScheduled(controller, {
      DB: env.DB,
      LEAD_EMAIL_QUEUE: env.LEAD_EMAIL_QUEUE as LeadQueueProducer,
      LEAD_REQUEUE_AFTER_SECONDS: env.LEAD_REQUEUE_AFTER_SECONDS
    });
  }
};

export default worker;
