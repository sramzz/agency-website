import { describe, expect, it } from "vitest";

import { verifyTurnstile } from "./turnstile";

const token = "0.turnstile-response-token";
const submissionId = "550e8400-e29b-41d4-a716-446655440000";
const hostname = "rankingrebels.com";
const secret = "0x-test-secret";

const siteverifyResponse = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });

describe("verifyTurnstile", () => {
  it("accepts a successful Siteverify response and sends the expected form contract", async () => {
    let request: { url: string; init?: RequestInit } | undefined;
    const fetchImpl: typeof fetch = async (input, init) => {
      request = { url: String(input), init };
      return siteverifyResponse({ success: true, action: "lead_capture", hostname });
    };

    await expect(verifyTurnstile({ token, secret, submissionId, hostname, fetchImpl })).resolves.toBe(true);
    expect(request?.url).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify");
    expect(request?.init?.method).toBe("POST");
    expect(request?.init?.headers).toMatchObject({ "content-type": "application/x-www-form-urlencoded" });
    const body = new URLSearchParams(String(request?.init?.body));
    expect(body.get("secret")).toBe(secret);
    expect(body.get("response")).toBe(token);
    expect(body.get("idempotency_key")).toBe(submissionId);
    expect(body.has("remoteip")).toBe(false);
  });

  it("rejects success:false responses", async () => {
    const fetchImpl: typeof fetch = async () => siteverifyResponse({ success: false, "error-codes": ["invalid-input-response"] });
    await expect(verifyTurnstile({ token, secret, submissionId, hostname, fetchImpl })).resolves.toBe(false);
  });

  it("fails closed when Siteverify times out or aborts", async () => {
    const fetchImpl: typeof fetch = async (_input, init) =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
      });
    await expect(verifyTurnstile({ token, secret, submissionId, hostname, fetchImpl, timeoutMs: 5 })).resolves.toBe(false);
  });

  it("fails closed for invalid JSON", async () => {
    const fetchImpl: typeof fetch = async () => new Response("not-json", { status: 200 });
    await expect(verifyTurnstile({ token, secret, submissionId, hostname, fetchImpl })).resolves.toBe(false);
  });

  it("requires the lead_capture action", async () => {
    const fetchImpl: typeof fetch = async () => siteverifyResponse({ success: true, action: "login", hostname });
    await expect(verifyTurnstile({ token, secret, submissionId, hostname, fetchImpl })).resolves.toBe(false);
  });

  it("requires a hostname in the configured allow-list", async () => {
    const fetchImpl: typeof fetch = async () => siteverifyResponse({ success: true, action: "lead_capture", hostname: "evil.example" });
    await expect(verifyTurnstile({ token, secret, submissionId, hostname, fetchImpl, allowedHostnames: ["rankingrebels.com", "www.rankingrebels.com"] })).resolves.toBe(false);
  });
});
