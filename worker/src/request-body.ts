export const MAX_LEAD_BODY_BYTES = 8 * 1024;

export type JsonBodyResult =
  | { ok: true; value: unknown }
  | { ok: false; error: "invalid_json" | "payload_too_large" };

export async function readJsonBody(
  request: Request,
  maxBytes = MAX_LEAD_BODY_BYTES,
): Promise<JsonBodyResult> {
  const declared = request.headers.get("content-length");
  if (declared !== null) {
    const parsed = Number(declared);
    if (Number.isFinite(parsed) && parsed > maxBytes) {
      await request.body?.cancel().catch(() => undefined);
      return { ok: false, error: "payload_too_large" };
    }
  }

  if (!request.body) return { ok: false, error: "invalid_json" };

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytesRead = 0;
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytesRead += value.byteLength;
      if (bytesRead > maxBytes) {
        await reader.cancel().catch(() => undefined);
        return { ok: false, error: "payload_too_large" };
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } catch (_error) {
    return { ok: false, error: "invalid_json" };
  } finally {
    reader.releaseLock();
  }

  try {
    return { ok: true, value: JSON.parse(text) as unknown };
  } catch (_error) {
    return { ok: false, error: "invalid_json" };
  }
}
