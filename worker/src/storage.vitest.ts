import { applyD1Migrations } from "cloudflare:test";
import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { storeLeadAndEnqueue, type QueueBinding } from "./storage";

type MigrationEnv = typeof env & {
  TEST_MIGRATIONS: Parameters<typeof applyD1Migrations>[1];
};

const migrationEnv = env as MigrationEnv;

const lead = (submissionId: string) => ({
  submissionId,
  firstName: "Ada",
  lastName: "Lovelace",
  companyName: "Analytical Engines",
  businessWebsite: "https://analytical.example/",
  email: "ada@example.com",
  phone: "+61412345678",
  sourcePath: "/locations/australia/",
  ctaLabel: "Request an Australian search audit",
  market: "Australia" as const,
  services: ["Google SEO"],
  noticeVersion: "2026-09-03",
  turnstileToken: "discarded",
  website: ""
});

beforeAll(async () => {
  await applyD1Migrations(migrationEnv.DB, migrationEnv.TEST_MIGRATIONS);
});

describe("storeLeadAndEnqueue", () => {
  it("uses insert-or-ignore so concurrent duplicates enqueue exactly once", async () => {
    const submissionId = "00000000-0000-4000-8000-000000000101";
    const queue: QueueBinding = { send: vi.fn(async () => undefined) };
    const createdAt = "2026-09-03T00:00:00.000Z";

    const results = await Promise.all([
      storeLeadAndEnqueue(env.DB, queue, lead(submissionId), { createdAt }),
      storeLeadAndEnqueue(env.DB, queue, lead(submissionId), { createdAt })
    ]);

    expect(results.filter(Boolean)).toHaveLength(1);
    expect(queue.send).toHaveBeenCalledTimes(1);
    expect(queue.send).toHaveBeenCalledWith({ submissionId });
    const row = await env.DB.prepare(
      "SELECT submission_id, business_website, services_json, created_at, expires_at, notification_status FROM leads WHERE submission_id = ?"
    ).bind(submissionId).first<Record<string, string>>();
    expect(row).toEqual({
      submission_id: submissionId,
      business_website: "https://analytical.example/",
      services_json: '["Google SEO"]',
      created_at: createdAt,
      expires_at: "2027-09-03T00:00:00.000Z",
      notification_status: "pending"
    });
  });

  it("keeps pending when queue delivery fails and throws a non-PII typed error for D1 failure", async () => {
    const submissionId = "00000000-0000-4000-8000-000000000102";
    const queue: QueueBinding = { send: vi.fn(async () => { throw new Error("queue offline"); }) };
    const logger = { error: vi.fn() };

    await expect(storeLeadAndEnqueue(env.DB, queue, lead(submissionId), {
      createdAt: "2026-09-03T00:00:00.000Z",
      logger
    })).resolves.toBe(true);
    expect(logger.error).toHaveBeenCalledWith("lead_enqueue_failed", { submissionId, code: "QUEUE_SEND_FAILED" });
    await expect(env.DB.prepare("SELECT notification_status FROM leads WHERE submission_id = ?").bind(submissionId).first()).resolves.toEqual({ notification_status: "pending" });

    const db = { prepare: () => { throw new Error(`D1 failed for ${submissionId}`); } } as unknown as D1Database;
    await expect(storeLeadAndEnqueue(db, queue, lead(submissionId))).rejects.toMatchObject({ code: "D1_WRITE_FAILED" });
    try {
      await storeLeadAndEnqueue(db, queue, lead(submissionId));
    } catch (error) {
      expect(JSON.stringify(error)).not.toContain(submissionId);
    }
  });
});
