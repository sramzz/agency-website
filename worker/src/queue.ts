import { buildLeadEmail, type LeadEmail } from "./email";

type LeadStatus = "pending" | "sending" | "sent" | "failed";

type StoredLeadRow = {
  submission_id: string;
  first_name: string;
  last_name: string;
  company_name: string;
  email: string;
  phone: string;
  source_path: string;
  cta_label: string;
  market: "Australia" | "Netherlands" | "LATAM" | "Not specified";
  services_json: string;
  notice_version: string;
  created_at: string;
  expires_at: string;
  notification_status: LeadStatus;
};

export type LeadQueueMessage = {
  body: unknown;
  ack: () => void;
  retry: () => void;
};

export type LeadEmailBinding = {
  send: (message: LeadEmail) => Promise<unknown> | unknown;
};

export type LeadQueueLogger = {
  error: (event: string, details: { submissionId: string; code: string }) => void;
};

export type LeadQueueEnv = {
  DB: D1Database;
  EMAIL: LeadEmailBinding;
  logger?: LeadQueueLogger;
  LEAD_EMAIL_FROM?: string;
  LEAD_EMAIL_TO?: string;
};

const DEFAULT_FROM = "leads@forms.rankingrebels.com";
const DEFAULT_TO = "rankingrebelsmarketingagency@gmail.com";

const parseSubmissionId = (body: unknown): string | null => {
  let value = body;
  if (typeof value === "string") {
    try {
      value = JSON.parse(value) as unknown;
    } catch (_error) {
      return null;
    }
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const keys = Object.keys(value);
  if (keys.length !== 1 || keys[0] !== "submissionId") return null;
  const submissionId = (value as { submissionId?: unknown }).submissionId;
  return typeof submissionId === "string" && submissionId.length > 0 ? submissionId : null;
};

const toStoredLead = (row: StoredLeadRow) => ({
  submissionId: row.submission_id,
  firstName: row.first_name,
  lastName: row.last_name,
  companyName: row.company_name,
  email: row.email,
  phone: row.phone,
  sourcePath: row.source_path,
  ctaLabel: row.cta_label,
  market: row.market,
  services: JSON.parse(row.services_json) as string[],
  noticeVersion: row.notice_version,
  createdAt: row.created_at,
  expiresAt: row.expires_at,
});

const retryProcessingFailure = (message: LeadQueueMessage, logger: LeadQueueLogger | undefined, submissionId: string) => {
  logger?.error("lead_notification_processing_failed", {
    submissionId,
    code: "D1_PROCESSING_FAILED",
  });
  message.retry();
};

export async function processLeadMessage(message: LeadQueueMessage, env: LeadQueueEnv): Promise<void> {
  const submissionId = parseSubmissionId(message.body);
  if (!submissionId) {
    message.ack();
    return;
  }

  let row: StoredLeadRow | null;
  try {
    row = await env.DB
      .prepare("SELECT * FROM leads WHERE submission_id = ?")
      .bind(submissionId)
      .first<StoredLeadRow>();
  } catch (_error) {
    retryProcessingFailure(message, env.logger, submissionId);
    return;
  }

  if (!row || row.notification_status === "sent") {
    message.ack();
    return;
  }

  let claimed: D1Result<unknown>;
  try {
    claimed = await env.DB
      .prepare(
        `UPDATE leads
         SET notification_status = 'sending',
             notification_attempts = notification_attempts + 1,
             notification_updated_at = ?
         WHERE submission_id = ?
           AND notification_status IN ('pending', 'failed')`
      )
      .bind(new Date().toISOString(), submissionId)
      .run();
  } catch (_error) {
    retryProcessingFailure(message, env.logger, submissionId);
    return;
  }

  if (claimed.meta.changes !== 1) {
    message.ack();
    return;
  }

  const email = buildLeadEmail(toStoredLead(row), {
    from: env.LEAD_EMAIL_FROM || DEFAULT_FROM,
    to: env.LEAD_EMAIL_TO || DEFAULT_TO,
  });
  try {
    await env.EMAIL.send(email);
  } catch (_error) {
    try {
      await env.DB
        .prepare(
          `UPDATE leads
           SET notification_status = 'failed',
               notification_updated_at = ?
           WHERE submission_id = ?
             AND notification_status = 'sending'`
        )
        .bind(new Date().toISOString(), submissionId)
        .run();
    } catch (_updateError) {
      retryProcessingFailure(message, env.logger, submissionId);
      return;
    }
    env.logger?.error("lead_notification_failed", {
      submissionId,
      code: "EMAIL_SEND_FAILED",
    });
    message.retry();
    return;
  }

  const notifiedAt = new Date().toISOString();
  try {
    await env.DB
      .prepare(
        `UPDATE leads
         SET notification_status = 'sent',
             notified_at = ?,
             notification_updated_at = ?
         WHERE submission_id = ?
           AND notification_status = 'sending'`
      )
      .bind(notifiedAt, notifiedAt, submissionId)
      .run();
  } catch (_error) {
    retryProcessingFailure(message, env.logger, submissionId);
    return;
  }
  message.ack();
}
