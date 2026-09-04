import { applyD1Migrations } from "cloudflare:test";
import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { processLeadMessage, type LeadQueueEnv } from "./queue";

type TestEnv = typeof env & { TEST_MIGRATIONS: Parameters<typeof applyD1Migrations>[1] };
const migrationEnv = env as TestEnv;
beforeAll(async () => { await applyD1Migrations(migrationEnv.DB, migrationEnv.TEST_MIGRATIONS); });

const insertLead = async (id: string, status: "pending" | "sent" = "pending") => {
  await env.DB.prepare(`INSERT INTO leads (
    submission_id, first_name, last_name, company_name, email, phone, source_path, cta_label,
    market, services_json, notice_version, created_at, expires_at, notification_status,
    notification_attempts, notification_updated_at, notified_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, "Ada", "Lovelace", "Analytical Engines", "ada@example.com", "+61412345678",
      "/locations/australia/", "Request an Australian search audit", "Australia", '["Google SEO"]',
      "2026-09-03", "2026-09-03T00:00:00.000Z", "2027-09-03T00:00:00.000Z", status,
      status === "sent" ? 1 : 0, status === "sent" ? "2026-09-03T00:01:00.000Z" : null,
      status === "sent" ? "2026-09-03T00:01:00.000Z" : null).run();
};
const messageFor = (id: string) => ({ body: { submissionId: id }, ack: vi.fn(), retry: vi.fn() });
const run = (message: ReturnType<typeof messageFor>, email = { send: vi.fn() }, logger?: { error: ReturnType<typeof vi.fn> }) =>
  processLeadMessage(message, { DB: env.DB, EMAIL: email, logger } as unknown as LeadQueueEnv);

describe("processLeadMessage", () => {
  it("acks once and never sends when submission does not exist", async () => {
    const message = messageFor("00000000-0000-4000-8000-000000000601"); const email = { send: vi.fn() };
    await run(message, email); expect(message.ack).toHaveBeenCalledTimes(1); expect(email.send).not.toHaveBeenCalled();
  });
  it("acks once and never sends when lead is already sent", async () => {
    const id = "00000000-0000-4000-8000-000000000602"; await insertLead(id, "sent");
    const message = messageFor(id); const email = { send: vi.fn() }; await run(message, email);
    expect(message.ack).toHaveBeenCalledTimes(1); expect(email.send).not.toHaveBeenCalled();
  });
  it("marks pending lead sent after successful email and acks once", async () => {
    const id = "00000000-0000-4000-8000-000000000603"; await insertLead(id); const message = messageFor(id);
    const email = { send: vi.fn().mockResolvedValue(undefined) }; await run(message, email);
    const row = await env.DB.prepare("SELECT notification_status, notified_at, notification_updated_at FROM leads WHERE submission_id = ?").bind(id).first<{ notification_status: string; notified_at: string | null; notification_updated_at: string | null }>();
    expect(email.send).toHaveBeenCalledTimes(1); expect(row?.notification_status).toBe("sent");
    expect(row?.notified_at).not.toBeNull(); expect(row?.notification_updated_at).not.toBeNull(); expect(message.ack).toHaveBeenCalledTimes(1);
  });
  it("marks email failure failed, retries once, and does not ack", async () => {
    const id = "00000000-0000-4000-8000-000000000604"; await insertLead(id); const message = messageFor(id);
    await run(message, { send: vi.fn().mockRejectedValue(new Error("temporary outage")) });
    const row = await env.DB.prepare("SELECT notification_status, notification_updated_at FROM leads WHERE submission_id = ?").bind(id).first<{ notification_status: string; notification_updated_at: string | null }>();
    expect(row?.notification_status).toBe("failed"); expect(row?.notification_updated_at).not.toBeNull();
    expect(message.retry).toHaveBeenCalledTimes(1); expect(message.ack).not.toHaveBeenCalled();
  });
  it("logs only safe fields for email failure", async () => {
    const id = "00000000-0000-4000-8000-000000000605"; await insertLead(id); const message = messageFor(id); const logger = { error: vi.fn() };
    await run(message, { send: vi.fn().mockRejectedValue(new Error("PII must not log")) }, logger);
    expect(logger.error).toHaveBeenCalledWith("lead_notification_failed", { submissionId: id, code: "EMAIL_SEND_FAILED" });
    const output = JSON.stringify(logger.error.mock.calls[0]);
    for (const value of ["Ada", "ada@example.com", "Analytical Engines", "+61412345678", "Google SEO"]) expect(output).not.toContain(value);
  });
  it("retries and logs safe controlled error when D1 lookup fails", async () => {
    const id = "00000000-0000-4000-8000-000000000606"; const message = messageFor(id); const logger = { error: vi.fn() };
    const db = { prepare: () => { throw new Error(`internal PII for ${id}`); } } as unknown as D1Database; const email = { send: vi.fn() };
    await expect(processLeadMessage(message, { DB: db, EMAIL: email, logger } as LeadQueueEnv)).resolves.toBeUndefined();
    expect(message.ack).not.toHaveBeenCalled(); expect(message.retry).toHaveBeenCalledTimes(1); expect(email.send).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith("lead_notification_processing_failed", { submissionId: id, code: "D1_PROCESSING_FAILED" });
    expect(JSON.stringify(logger.error.mock.calls[0])).not.toContain("internal PII");
  });
});
