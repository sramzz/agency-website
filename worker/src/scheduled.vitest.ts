import { applyD1Migrations } from "cloudflare:test";
import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { runDailyLeadCleanup, runDailyLeadMaintenance } from "./scheduled";

type ScheduledTestEnv = typeof env & {
  TEST_MIGRATIONS: Parameters<typeof applyD1Migrations>[1];
};

const migrationEnv = env as ScheduledTestEnv;

beforeAll(async () => {
  await applyD1Migrations(migrationEnv.DB, migrationEnv.TEST_MIGRATIONS);
});

const insertLead = async (submissionId: string, expiresAt: string) => {
  await env.DB.prepare(
    `INSERT INTO leads (
      submission_id, first_name, last_name, company_name, email, phone,
      source_path, cta_label, market, services_json, notice_version,
      created_at, expires_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    submissionId,
    "Test",
    "Lead",
    "Test Company",
    `${submissionId}@example.com`,
    "+61412345678",
    "/locations/australia/",
    "Request an Australian search audit",
    "Australia",
    '["Google SEO"]',
    "2026-09-03",
    "2026-09-03T00:00:00.000Z",
    expiresAt
  ).run();
};

describe("runDailyLeadCleanup", () => {
  it("deletes expired leads, keeps current leads, and returns non-PII metrics", async () => {
    const nowIso = "2026-09-03T12:00:00.000Z";
    const expiredId = "00000000-0000-4000-8000-000000000501";
    const currentId = "00000000-0000-4000-8000-000000000502";
    await insertLead(expiredId, "2026-09-03T11:59:59.000Z");
    await insertLead(currentId, "2026-09-03T12:00:01.000Z");

    const metrics = await runDailyLeadCleanup(env.DB, nowIso);

    expect(metrics).toEqual({
      event: "daily_lead_cleanup",
      expiredLeadsDeleted: 1,
      executedAt: nowIso,
    });
    expect(Object.keys(metrics)).not.toEqual(
      expect.arrayContaining(["firstName", "lastName", "companyName", "email", "phone", "services"])
    );
    const remaining = await env.DB.prepare(
      "SELECT submission_id FROM leads WHERE submission_id IN (?, ?) ORDER BY submission_id"
    ).bind(expiredId, currentId).all<{ submission_id: string }>();
    expect(remaining.results.map(({ submission_id }) => submission_id)).toEqual([currentId]);
    await env.DB.prepare("UPDATE leads SET notification_status = 'sent' WHERE submission_id = ?")
      .bind(currentId).run();
  });

  it("re-enqueues only stale pending or failed submissions with submission IDs", async () => {
    const nowIso = "2026-09-03T12:00:00.000Z";
    const pendingId = "00000000-0000-4000-8000-000000000503";
    const failedId = "00000000-0000-4000-8000-000000000504";
    const sentId = "00000000-0000-4000-8000-000000000505";
    const sendingId = "00000000-0000-4000-8000-000000000506";
    const future = "2026-09-10T00:00:00.000Z";
    await insertLead(pendingId, future);
    await insertLead(failedId, future);
    await insertLead(sentId, future);
    await insertLead(sendingId, future);
    await env.DB.prepare("UPDATE leads SET notification_status = 'failed', notification_updated_at = ? WHERE submission_id = ?")
      .bind("2026-09-02T00:00:00.000Z", failedId).run();
    await env.DB.prepare("UPDATE leads SET notification_status = 'sent', notification_updated_at = ? WHERE submission_id = ?")
      .bind("2026-09-01T00:00:00.000Z", sentId).run();
    await env.DB.prepare("UPDATE leads SET notification_status = 'sending', notification_updated_at = ? WHERE submission_id = ?")
      .bind("2026-09-03T11:59:59.000Z", sendingId).run();
    const queue = { send: vi.fn().mockResolvedValue(undefined) };

    const metrics = await runDailyLeadMaintenance({ DB: env.DB, LEAD_EMAIL_QUEUE: queue }, nowIso, 10);

    expect(queue.send).toHaveBeenCalledTimes(2);
    expect(queue.send).toHaveBeenNthCalledWith(1, { submissionId: pendingId });
    expect(queue.send).toHaveBeenNthCalledWith(2, { submissionId: failedId });
    expect(metrics.notificationsRequeued).toBe(2);
    expect(Object.keys(metrics)).not.toEqual(expect.arrayContaining(["email", "phone", "companyName", "services"]));
  });
});
