import { applyD1Migrations } from "cloudflare:test";
import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it, vi } from "vitest";
import worker from "./index.ts";

type MigrationEnv = typeof env & { TEST_MIGRATIONS: Parameters<typeof applyD1Migrations>[1] };
const migrationEnv = env as MigrationEnv;

beforeAll(async () => {
  await applyD1Migrations(migrationEnv.DB, migrationEnv.TEST_MIGRATIONS);
  await env.DB.prepare(`INSERT OR IGNORE INTO leads (
    submission_id, first_name, last_name, company_name, email, phone,
    source_path, cta_label, market, services_json, notice_version, created_at, expires_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind("00000000-0000-4000-8000-000000000201", "Ada", "Lovelace", "Analytical Engines", "ada@example.com", "+61412345678", "/locations/australia/", "Request an audit", "Australia", '["Google SEO"]', "2026-09-03", "2026-09-03T00:00:00.000Z", "2027-09-03T00:00:00.000Z")
    .run();
});
describe("lead worker endpoint", () => {
  const postLead = (submissionId: string) => new Request("https://rankingrebels.com/api/leads", {
    method: "POST",
    headers: { origin: "https://rankingrebels.com", "content-type": "application/json" },
    body: JSON.stringify({ submissionId, firstName: "Ada", lastName: "Lovelace", companyName: "Analytical Engines", email: "ada@example.com", phone: "+61412345678", sourcePath: "/locations/australia/", ctaLabel: "Request an audit", market: "Australia", services: ["Google SEO"], noticeVersion: "2026-09-03", turnstileToken: "token", website: "" })
  });

  const envelopeEnv = { DB: env.DB, LEAD_ALLOWED_HOSTNAMES: "rankingrebels.com" };

  it("maps a missing storage binding to the public 500 contract", async () => {
    const response = await worker.fetch(postLead("00000000-0000-4000-8000-000000000299"), {
      LEAD_ALLOWED_HOSTNAMES: "rankingrebels.com",
    });

    expect(response.status).toBe(500);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ ok: false, error: "storage_unavailable" });
  });

  it("maps invalid and oversized JSON bodies without leaking details", async () => {
    const invalid = await worker.fetch(new Request("https://rankingrebels.com/api/leads", {
      method: "POST", headers: { origin: "https://rankingrebels.com", "content-type": "application/json" }, body: "not-json"
    }), envelopeEnv);
    expect(invalid.status).toBe(400);
    expect(await invalid.json()).toEqual({ ok: false, error: "invalid_json" });

    const exact = JSON.stringify({}) + " ".repeat(8192 - JSON.stringify({}).length);
    const exactResponse = await worker.fetch(new Request("https://rankingrebels.com/api/leads", {
      method: "POST", headers: { origin: "https://rankingrebels.com", "content-type": "application/json" }, body: exact
    }), envelopeEnv);
    expect(exact.length).toBe(8192);
    expect(exactResponse.status).not.toBe(413);

    const oversized = await worker.fetch(new Request("https://rankingrebels.com/api/leads", {
      method: "POST", headers: { origin: "https://rankingrebels.com", "content-type": "application/json" }, body: "{}".padEnd(8193, " ")
    }), envelopeEnv);
    expect(oversized.status).toBe(413);
    expect(await oversized.json()).toEqual({ ok: false, error: "payload_too_large" });

    const falseLength = await worker.fetch(new Request("https://rankingrebels.com/api/leads", {
      method: "POST", headers: { origin: "https://rankingrebels.com", "content-type": "application/json", "content-length": "8193" }, body: "{}"
    }), envelopeEnv);
    expect(falseLength.status).toBe(413);

    const stream = new ReadableStream({ start(controller) { controller.enqueue(new Uint8Array(8193)); controller.close(); } });
    const streamResponse = await worker.fetch(new Request("https://rankingrebels.com/api/leads", {
      method: "POST", headers: { origin: "https://rankingrebels.com", "content-type": "application/json" }, body: stream, duplex: "half"
    } as RequestInit), envelopeEnv);
    expect(streamResponse.status).toBe(413);
  });

  it("rejects a filled honeypot before D1, Siteverify, or Queue", async () => {
    const queue = { send: vi.fn() };
    const siteverify = vi.spyOn(globalThis, "fetch");
    const db = { prepare: vi.fn(() => { throw new Error("D1 must not be queried"); }) } as unknown as D1Database;
    for (const website of ["https://spam.example", " ", "  bot  "]) {
      const payload = JSON.stringify({ submissionId: "00000000-0000-4000-8000-000000000206", firstName: "Ada", lastName: "Lovelace", companyName: "Analytical Engines", email: "ada@example.com", phone: "+61412345678", sourcePath: "/locations/australia/", ctaLabel: "Request an audit", market: "Australia", services: ["Google SEO"], noticeVersion: "2026-09-03", turnstileToken: "token", website });
      const response = await worker.fetch(new Request("https://rankingrebels.com/api/leads", { method: "POST", headers: { origin: "https://rankingrebels.com", "content-type": "application/json" }, body: payload }), { DB: db, LEAD_EMAIL_QUEUE: queue, LEAD_ALLOWED_HOSTNAMES: "rankingrebels.com", LEAD_NOTICE_VERSION: "2026-09-03", TURNSTILE_SECRET_KEY: "secret" });
      expect(response.status).toBe(422);
      expect(response.headers.get("cache-control")).toBe("no-store");
      expect(await response.json()).toEqual({ ok: false, error: "honeypot_rejected" });
    }
    expect(db.prepare).not.toHaveBeenCalled();
    expect(siteverify).not.toHaveBeenCalled();
    expect(queue.send).not.toHaveBeenCalled();
    siteverify.mockRestore();
  });

  it("accepts root and www origins and rejects cross-origin, HTTP, or missing Origin early", async () => {
    const queue = { send: vi.fn() };
    const db = { prepare: vi.fn(() => { throw new Error("body/D1 must not be reached"); }) } as unknown as D1Database;
    const siteverify = vi.spyOn(globalThis, "fetch");
    const body = JSON.stringify({ submissionId: "00000000-0000-4000-8000-000000000201", firstName: "Ada", lastName: "Lovelace", companyName: "Analytical Engines", email: "ada@example.com", phone: "+61412345678", sourcePath: "/locations/australia/", ctaLabel: "Request an audit", market: "Australia", services: ["Google SEO"], noticeVersion: "2026-09-03", turnstileToken: "token", website: "" });
    for (const origin of ["https://rankingrebels.com", "https://www.rankingrebels.com"]) {
      const response = await worker.fetch(new Request(`${origin}/api/leads`, { method: "POST", headers: { origin, "content-type": "application/json" }, body }), { DB: env.DB, LEAD_EMAIL_QUEUE: queue, LEAD_ALLOWED_HOSTNAMES: "rankingrebels.com,www.rankingrebels.com", LEAD_NOTICE_VERSION: "2026-09-03" });
      expect(response.status).toBe(200);
    }
    for (const request of [
      new Request("https://rankingrebels.com/api/leads", { method: "POST", headers: { origin: "https://evil.example", "content-type": "application/json" }, body }),
      new Request("http://rankingrebels.com/api/leads", { method: "POST", headers: { origin: "http://rankingrebels.com", "content-type": "application/json" }, body }),
      new Request("https://rankingrebels.com/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body })
    ]) {
      const response = await worker.fetch(request, { DB: db, LEAD_EMAIL_QUEUE: queue, LEAD_ALLOWED_HOSTNAMES: "rankingrebels.com,www.rankingrebels.com", LEAD_NOTICE_VERSION: "2026-09-03" });
      expect(response.status).toBe(403);
      expect(response.headers.get("cache-control")).toBe("no-store");
      expect(await response.json()).toEqual({ ok: false, error: "origin_rejected" });
    }
    expect(db.prepare).not.toHaveBeenCalled();
    expect(siteverify).not.toHaveBeenCalled();
    siteverify.mockRestore();
  });

  it("enforces the endpoint envelope and allows query strings", async () => {
    const notFound = await worker.fetch(new Request("https://rankingrebels.com/wrong"), {});
    expect(notFound.status).toBe(404);
    expect(notFound.headers.get("cache-control")).toBe("no-store");
    expect(await notFound.json()).toEqual({ ok: false, error: "not_found" });

    const duplicate = await worker.fetch(new Request("https://rankingrebels.com/api/leads?source=cta", {
      method: "POST",
      headers: { origin: "https://rankingrebels.com", "content-type": "application/json" },
      body: JSON.stringify({ submissionId: "00000000-0000-4000-8000-000000000201", firstName: "Ada", lastName: "Lovelace", companyName: "Analytical Engines", email: "ada@example.com", phone: "+61412345678", sourcePath: "/locations/australia/", ctaLabel: "Request an audit", market: "Australia", services: ["Google SEO"], noticeVersion: "2026-09-03", turnstileToken: "token", website: "" })
    }), { DB: env.DB, LEAD_EMAIL_QUEUE: { send: vi.fn() }, LEAD_ALLOWED_HOSTNAMES: "rankingrebels.com", LEAD_NOTICE_VERSION: "2026-09-03" });
    expect(duplicate.status).toBe(200);

    const method = await worker.fetch(new Request("https://rankingrebels.com/api/leads", { method: "GET", headers: { origin: "https://rankingrebels.com", "content-type": "application/json" } }), envelopeEnv);
    expect(method.status).toBe(405);
    expect(method.headers.get("cache-control")).toBe("no-store");
    expect(await method.json()).toEqual({ ok: false, error: "method_not_allowed" });

    const contentType = await worker.fetch(new Request("https://rankingrebels.com/api/leads", { method: "POST", headers: { origin: "https://rankingrebels.com", "content-type": "text/plain" }, body: "{}" }), envelopeEnv);
    expect(contentType.status).toBe(400);
    expect(contentType.headers.get("cache-control")).toBe("no-store");
    expect(await contentType.json()).toEqual({ ok: false, error: "validation_failed" });
  });

  it("returns an idempotent duplicate before Siteverify or Queue", async () => {
    const queue = { send: vi.fn() };
    const siteverify = vi.spyOn(globalThis, "fetch");
    const submissionId = "00000000-0000-4000-8000-000000000201";
    const response = await worker.fetch(new Request("https://rankingrebels.com/api/leads", {
      method: "POST",
      headers: { origin: "https://rankingrebels.com", "content-type": "application/json" },
      body: JSON.stringify({ submissionId, firstName: "Ada", lastName: "Lovelace", companyName: "Analytical Engines", email: "ada@example.com", phone: "+61412345678", sourcePath: "/locations/australia/", ctaLabel: "Request an audit", market: "Australia", services: ["Google SEO"], noticeVersion: "2026-09-03", turnstileToken: "token", website: "" })
    }), {
      DB: env.DB,
      LEAD_EMAIL_QUEUE: queue,
      LEAD_ALLOWED_HOSTNAMES: "rankingrebels.com,www.rankingrebels.com",
      LEAD_NOTICE_VERSION: "2026-09-03"
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ ok: true, submissionId, duplicate: true });
    expect(siteverify).not.toHaveBeenCalled();
    expect(queue.send).not.toHaveBeenCalled();
    siteverify.mockRestore();
  });

  it("verifies and stores a new lead, then enqueues it once", async () => {
    const queue = { send: vi.fn(async () => undefined) };
    const siteverify = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true, action: "lead_capture", hostname: "rankingrebels.com" }), { status: 200 })
    );
    const submissionId = "00000000-0000-4000-8000-000000000204";
    const response = await worker.fetch(postLead(submissionId), {
      DB: env.DB, LEAD_EMAIL_QUEUE: queue, LEAD_ALLOWED_HOSTNAMES: "rankingrebels.com", LEAD_NOTICE_VERSION: "2026-09-03",
      TURNSTILE_SECRET_KEY: "secret"
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ ok: true, submissionId, duplicate: false });
    expect(siteverify).toHaveBeenCalledTimes(1);
    expect(queue.send).toHaveBeenCalledTimes(1);
    expect(queue.send).toHaveBeenCalledWith({ submissionId });
    siteverify.mockRestore();
  });

  it("reports a concurrent INSERT OR IGNORE loss as a duplicate", async () => {
    const queue = { send: vi.fn(async () => undefined) };
    const siteverify = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true, action: "lead_capture", hostname: "rankingrebels.com" }), { status: 200 })
    );
    let prepareCalls = 0;
    const db = {
      prepare: () => {
        prepareCalls += 1;
        return {
          bind: () => ({
            first: async () => (prepareCalls === 1 ? null : undefined),
            run: async () => ({ meta: { changes: 0 } })
          })
        };
      }
    } as unknown as D1Database;
    const submissionId = "00000000-0000-4000-8000-000000000207";
    const response = await worker.fetch(postLead(submissionId), {
      DB: db,
      LEAD_EMAIL_QUEUE: queue,
      LEAD_ALLOWED_HOSTNAMES: "rankingrebels.com",
      LEAD_NOTICE_VERSION: "2026-09-03",
      TURNSTILE_SECRET_KEY: "secret"
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, submissionId, duplicate: true });
    expect(queue.send).not.toHaveBeenCalled();
    siteverify.mockRestore();
  });

  it("connects Queue batches to the lead processor", async () => {
    const message = { body: { submissionId: "malformed" }, ack: vi.fn(), retry: vi.fn() };
    const email = { send: vi.fn() };

    await worker.queue({ messages: [message] } as unknown as MessageBatch<unknown>, {
      DB: env.DB,
      EMAIL: email
    });

    expect(message.ack).toHaveBeenCalledTimes(1);
    expect(email.send).not.toHaveBeenCalled();
  });

  it("rejects a failed Turnstile verification with 422", async () => {
    const queue = { send: vi.fn() };
    const siteverify = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: false }), { status: 200 })
    );
    const submissionId = "00000000-0000-4000-8000-000000000205";
    const response = await worker.fetch(postLead(submissionId), {
      DB: env.DB, LEAD_EMAIL_QUEUE: queue, LEAD_ALLOWED_HOSTNAMES: "rankingrebels.com", LEAD_NOTICE_VERSION: "2026-09-03", TURNSTILE_SECRET_KEY: "secret"
    });

    expect(response.status).toBe(422);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ ok: false, error: "turnstile_rejected" });
    expect(queue.send).not.toHaveBeenCalled();
    siteverify.mockRestore();
  });

  it("returns a safe 500 when the duplicate lookup fails", async () => {
    const queue = { send: vi.fn() };
    const logger = { error: vi.fn() };
    const submissionId = "00000000-0000-4000-8000-000000000202";
    const db = { prepare: () => { throw new Error(`internal PII ${submissionId}`); } } as unknown as D1Database;
    const response = await worker.fetch(postLead(submissionId), {
      DB: db, LEAD_EMAIL_QUEUE: queue, LEAD_ALLOWED_HOSTNAMES: "rankingrebels.com", LEAD_NOTICE_VERSION: "2026-09-03", TURNSTILE_SECRET_KEY: "secret", TURNSTILE_FETCH: async () => new Response(JSON.stringify({ success: true, action: "lead_capture", hostname: "rankingrebels.com" })), logger
    });

    expect(response.status).toBe(500);
    expect(response.headers.get("cache-control")).toBe("no-store");
    const responseBody = await response.json();
    expect(responseBody).toEqual({ ok: false, error: "storage_unavailable" });
    expect(queue.send).not.toHaveBeenCalled();
    expect(JSON.stringify(responseBody)).not.toContain(submissionId);
    expect(logger.error).toHaveBeenCalledWith("lead_storage_failed", { submissionId, code: "D1_READ_FAILED" });
  });

  it("returns a safe 500 when the insert fails", async () => {
    const queue = { send: vi.fn() };
    const logger = { error: vi.fn() };
    const submissionId = "00000000-0000-4000-8000-000000000203";
    let calls = 0;
    const db = {
      prepare: () => ({
        bind: () => ({
          first: async () => (calls++ === 0 ? null : undefined),
          run: async () => { throw new Error(`internal PII ${submissionId}`); }
        })
      })
    } as unknown as D1Database;
    const response = await worker.fetch(postLead(submissionId), {
      DB: db, LEAD_EMAIL_QUEUE: queue, LEAD_ALLOWED_HOSTNAMES: "rankingrebels.com", LEAD_NOTICE_VERSION: "2026-09-03", TURNSTILE_SECRET_KEY: "secret", TURNSTILE_FETCH: async () => new Response(JSON.stringify({ success: true, action: "lead_capture", hostname: "rankingrebels.com" })), logger
    });

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ ok: false, error: "storage_unavailable" });
    expect(queue.send).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith("lead_storage_failed", { submissionId, code: "D1_WRITE_FAILED" });
  });
});
