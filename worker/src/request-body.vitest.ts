import { describe, expect, it } from "vitest";
import { readJsonBody } from "./request-body";

const MAX_BYTES = 8 * 1024;

function jsonWithByteLength(length: number): string {
  const shell = '{"value":""}';
  return `{"value":"${"a".repeat(length - shell.length)}"}`;
}

function streamedRequest(body: string, contentLength?: string): Request {
  const bytes = new TextEncoder().encode(body);
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (let offset = 0; offset < bytes.length; offset += 257) {
        controller.enqueue(bytes.slice(offset, offset + 257));
      }
      controller.close();
    },
  });
  const headers = new Headers({ "content-type": "application/json" });
  if (contentLength !== undefined) headers.set("content-length", contentLength);
  return new Request("https://rankingrebels.com/api/leads", { method: "POST", headers, body: stream, duplex: "half" } as RequestInit);
}

describe("readJsonBody", () => {
  it("accepts a JSON body at exactly 8 KiB", async () => {
    const result = await readJsonBody(streamedRequest(jsonWithByteLength(MAX_BYTES)));
    expect(result.ok).toBe(true);
  });

  it("rejects 8 KiB plus one byte and cancels incremental reading", async () => {
    const result = await readJsonBody(streamedRequest(jsonWithByteLength(MAX_BYTES + 1)));
    expect(result).toEqual({ ok: false, error: "payload_too_large" });
  });

  it("does not trust a falsely small Content-Length", async () => {
    const result = await readJsonBody(streamedRequest(jsonWithByteLength(MAX_BYTES + 1), "1"));
    expect(result).toEqual({ ok: false, error: "payload_too_large" });
  });

  it("rejects an oversized declared length before parsing", async () => {
    const result = await readJsonBody(streamedRequest("{}", String(MAX_BYTES + 1)));
    expect(result).toEqual({ ok: false, error: "payload_too_large" });
  });

  it("maps malformed JSON without exposing parser details", async () => {
    const result = await readJsonBody(streamedRequest("{not-json"));
    expect(result).toEqual({ ok: false, error: "invalid_json" });
  });
});
