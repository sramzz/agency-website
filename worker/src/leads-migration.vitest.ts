import { applyD1Migrations } from "cloudflare:test";
import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import { deleteExpiredLeads } from "./storage";

type MigrationEnv = typeof env & {
  TEST_MIGRATIONS: Parameters<typeof applyD1Migrations>[1];
};

const migrationEnv = env as MigrationEnv;

beforeAll(async () => {
  await applyD1Migrations(migrationEnv.DB, migrationEnv.TEST_MIGRATIONS);
});

describe("leads migration", () => {
  it("has created the leads table in the isolated local D1 database", async () => {
    const result = await env.DB
      .prepare("SELECT COUNT(*) AS count FROM leads")
      .first<{ count: number }>();

    expect(result?.count).toBe(0);
  });

  it("rejects a duplicate submission_id", async () => {
    const lead = [
      "00000000-0000-4000-8000-000000000001",
      "Ada",
      "Lovelace",
      "Analytical Engines",
      "ada@example.com",
      "+61412345678",
      "/locations/australia/",
      "Request an Australian search audit",
      "Australia",
      '["Google SEO"]',
      "2026-09-03",
      "2026-09-03T00:00:00.000Z",
      "2027-09-03T00:00:00.000Z"
    ];

    const insert = env.DB
      .prepare(
        `INSERT INTO leads (
          submission_id, first_name, last_name, company_name, email, phone,
          source_path, cta_label, market, services_json, notice_version,
          created_at, expires_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(...lead);

    await insert.run();
    await expect(insert.run()).rejects.toThrow();
  });

  it("uses the expiration index for expiration lookups", async () => {
    const index = await env.DB
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'leads_expires_at_idx'"
      )
      .first<{ name: string }>();
    const plan = await env.DB
      .prepare("EXPLAIN QUERY PLAN SELECT submission_id FROM leads WHERE expires_at < ?")
      .bind("2027-01-01T00:00:00.000Z")
      .all<{ detail: string }>();

    expect(index?.name).toBe("leads_expires_at_idx");
    expect(plan.results.some(({ detail }) => detail.includes("leads_expires_at_idx"))).toBe(true);
  });

  it("keeps sensitive transport fields out of the leads schema", async () => {
    const columns = await env.DB
      .prepare("PRAGMA table_info(leads)")
      .all<{ name: string }>();
    const names = columns.results.map(({ name }) => name);

    expect(names).toContain("notified_at");
    expect(names).not.toEqual(
      expect.arrayContaining(["ip", "ip_address", "user_agent", "turnstile_token", "website"])
    );
  });

  it("deletes only leads expired at the supplied time", async () => {
    const nowIso = "2026-09-03T12:00:00.000Z";
    const insert = env.DB.prepare(
      `INSERT INTO leads (
        submission_id, first_name, last_name, company_name, email, phone,
        source_path, cta_label, market, services_json, notice_version,
        created_at, expires_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    await insert.bind(
      "00000000-0000-4000-8000-000000000002",
      "Expired",
      "Lead",
      "Expired Co",
      "expired@example.com",
      "+61412345679",
      "/locations/australia/",
      "Request an Australian search audit",
      "Australia",
      '["Google SEO"]',
      "2026-09-03",
      "2026-08-01T00:00:00.000Z",
      "2026-09-03T11:59:59.000Z"
    ).run();
    await insert.bind(
      "00000000-0000-4000-8000-000000000003",
      "Current",
      "Lead",
      "Current Co",
      "current@example.com",
      "+61412345680",
      "/locations/australia/",
      "Request an Australian search audit",
      "Australia",
      '["Google SEO"]',
      "2026-09-03",
      "2026-08-01T00:00:00.000Z",
      "2026-09-03T12:00:01.000Z"
    ).run();

    await expect(deleteExpiredLeads(env.DB, nowIso)).resolves.toBe(1);

    const remaining = await env.DB
      .prepare("SELECT submission_id FROM leads ORDER BY submission_id")
      .all<{ submission_id: string }>();
    expect(remaining.results.map(({ submission_id }) => submission_id)).toEqual([
      "00000000-0000-4000-8000-000000000001",
      "00000000-0000-4000-8000-000000000003"
    ]);
  });
});
