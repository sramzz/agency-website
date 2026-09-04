import { describe, expect, it } from "vitest";
import { validateRequestEnvelope } from "./security";

const allowed = ["rankingrebels.com", "www.rankingrebels.com"];
const request = (url: string, init: RequestInit = {}) => new Request(url, {
  method: "POST",
  headers: { origin: new URL(url).origin, "content-type": "application/json", ...(init.headers || {}) },
  ...init,
});

describe("validateRequestEnvelope", () => {
  it("accepts the exact endpoint with an optional query", () => {
    expect(validateRequestEnvelope(request("https://rankingrebels.com/api/leads"), allowed)).toBeNull();
    expect(validateRequestEnvelope(request("https://www.rankingrebels.com/api/leads?source=cta"), allowed)).toBeNull();
  });

  it("rejects paths that only match the outer wildcard", () => {
    expect(validateRequestEnvelope(request("https://rankingrebels.com/api/leads/extra"), allowed)).toEqual({ status: 404 });
    expect(validateRequestEnvelope(request("https://rankingrebels.com/api/leads-evil"), allowed)).toEqual({ status: 404 });
  });

  it("rejects methods other than POST", () => {
    expect(validateRequestEnvelope(request("https://rankingrebels.com/api/leads", { method: "GET" }), allowed)).toEqual({ status: 405, error: "method_not_allowed" });
  });

  it("requires a JSON content type", () => {
    expect(validateRequestEnvelope(request("https://rankingrebels.com/api/leads", { headers: { origin: "https://rankingrebels.com", "content-type": "text/plain" } }), allowed)).toEqual({ status: 400, error: "validation_failed" });
  });

  it("requires HTTPS, an allowed request host, and an exact same-origin Origin", () => {
    expect(validateRequestEnvelope(request("http://rankingrebels.com/api/leads"), allowed)).toEqual({ status: 403, error: "origin_rejected" });
    expect(validateRequestEnvelope(request("https://evil.example/api/leads"), allowed)).toEqual({ status: 403, error: "origin_rejected" });
    expect(validateRequestEnvelope(request("https://rankingrebels.com/api/leads", { headers: { origin: "https://www.rankingrebels.com", "content-type": "application/json" } }), allowed)).toEqual({ status: 403, error: "origin_rejected" });
    expect(validateRequestEnvelope(request("https://rankingrebels.com/api/leads", { headers: { "content-type": "application/json" } }), allowed)).toEqual({ status: 403, error: "origin_rejected" });
  });
});
