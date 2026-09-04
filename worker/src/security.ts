export type RequestEnvelopeError =
  | { status: 404 }
  | { status: 400; error: "validation_failed" }
  | { status: 403; error: "origin_rejected" }
  | { status: 405; error: "method_not_allowed" };

export function validateRequestEnvelope(
  request: Request,
  allowedHostnames: readonly string[],
): RequestEnvelopeError | null {
  const url = new URL(request.url);

  if (url.pathname !== "/api/leads") return { status: 404 };
  if (request.method !== "POST") return { status: 405, error: "method_not_allowed" };

  if (
    url.protocol !== "https:" ||
    !allowedHostnames.includes(url.hostname) ||
    request.headers.get("origin") !== url.origin
  ) {
    return { status: 403, error: "origin_rejected" };
  }

  const mediaType = (request.headers.get("content-type") || "").split(";", 1)[0].trim().toLowerCase();
  if (mediaType !== "application/json") return { status: 400, error: "validation_failed" };

  return null;
}
