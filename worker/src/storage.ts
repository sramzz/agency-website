import type { LeadPayload } from "./validation";

export type QueueBinding = {
  send: (message: { submissionId: string }) => Promise<unknown> | unknown;
};

export type StorageLogger = {
  error: (event: string, details: { submissionId: string; code: string }) => void;
};

export type StoreLeadOptions = {
  createdAt?: string;
  logger?: StorageLogger;
};

export class LeadStorageError extends Error {
  readonly code = "D1_WRITE_FAILED";

  constructor() {
    super("Lead storage failed");
    this.name = "LeadStorageError";
  }
}

const expiresAtFor = (createdAt: string): string => {
  const expiresAt = new Date(createdAt);
  expiresAt.setUTCDate(expiresAt.getUTCDate() + 365);
  return expiresAt.toISOString();
};

export async function storeLeadAndEnqueue(
  db: D1Database,
  queue: QueueBinding,
  lead: LeadPayload,
  options: StoreLeadOptions = {}
): Promise<boolean> {
  const createdAt = options.createdAt || new Date().toISOString();
  const expiresAt = expiresAtFor(createdAt);
  let result: D1Result<unknown>;

  try {
    result = await db
      .prepare(
        `INSERT OR IGNORE INTO leads (
          submission_id, first_name, last_name, company_name, business_website, email, phone,
          source_path, cta_label, market, services_json, notice_version,
          created_at, expires_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        lead.submissionId,
        lead.firstName,
        lead.lastName,
        lead.companyName,
        lead.businessWebsite,
        lead.email,
        lead.phone,
        lead.sourcePath,
        lead.ctaLabel,
        lead.market,
        JSON.stringify(lead.services),
        lead.noticeVersion,
        createdAt,
        expiresAt
      )
      .run();
  } catch (_error) {
    throw new LeadStorageError();
  }

  if (result.meta.changes !== 1) return false;

  try {
    await queue.send({ submissionId: lead.submissionId });
  } catch (_error) {
    options.logger?.error("lead_enqueue_failed", {
      submissionId: lead.submissionId,
      code: "QUEUE_SEND_FAILED"
    });
  }

  return true;
}

export async function hasLeadSubmission(db: D1Database, submissionId: string): Promise<boolean> {
  const row = await db
    .prepare("SELECT submission_id FROM leads WHERE submission_id = ?")
    .bind(submissionId)
    .first<{ submission_id: string }>();
  return row !== null;
}

export async function deleteExpiredLeads(db: D1Database, nowIso: string): Promise<number> {
  const result = await db
    .prepare("DELETE FROM leads WHERE expires_at <= ?")
    .bind(nowIso)
    .run();

  return result.meta.changes;
}
