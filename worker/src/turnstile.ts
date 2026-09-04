const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const DEFAULT_TIMEOUT_MS = 3_000;
const DEFAULT_ALLOWED_HOSTNAMES = ["rankingrebels.com", "www.rankingrebels.com"];

export interface TurnstileVerificationOptions {
  token: string;
  secret: string;
  submissionId: string;
  hostname?: string;
  allowedHostnames?: readonly string[];
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

interface SiteverifyResponse {
  success?: unknown;
  action?: unknown;
  hostname?: unknown;
}

/** Verify a Turnstile token without exposing provider errors to callers. */
export async function verifyTurnstile(options: TurnstileVerificationOptions): Promise<boolean> {
  const {
    token,
    secret,
    submissionId,
    hostname,
    allowedHostnames = DEFAULT_ALLOWED_HOSTNAMES,
    fetchImpl = fetch,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = options;
  if (!token || !secret || !submissionId || !fetchImpl) return false;
  const allowed = new Set(allowedHostnames);
  if (hostname && !allowed.has(hostname)) return false;

  const body = new URLSearchParams({ secret, response: token, idempotency_key: submissionId });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), Math.max(1, timeoutMs));
  try {
    const response = await fetchImpl(SITEVERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      signal: controller.signal,
    });
    if (!response.ok) return false;
    const result = (await response.json()) as SiteverifyResponse;
    return result.success === true && result.action === "lead_capture" && typeof result.hostname === "string" && allowed.has(result.hostname) && (!hostname || result.hostname === hostname);
  } catch (_error) {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export { DEFAULT_ALLOWED_HOSTNAMES, DEFAULT_TIMEOUT_MS, SITEVERIFY_URL };
