(function (root, factory) {
  const serviceLead = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = serviceLead;
  }

  if (root) {
    root.RankingRebelsLead = serviceLead;
  }
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const AUSTRALIA_WHATSAPP = "61439499441";
  const NETHERLANDS_WHATSAPP = "31613390178";
  const EUROPEAN_COUNTRY_CODES = new Set([
    "AD", "AL", "AT", "AX", "BA", "BE", "BG", "BY", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI",
    "FO", "FR", "GB", "GG", "GI", "GR", "HR", "HU", "IE", "IM", "IS", "IT", "JE", "LI", "LT", "LU",
    "LV", "MC", "MD", "ME", "MK", "MT", "NL", "NO", "PL", "PT", "RO", "RS", "SE", "SI", "SJ", "SK",
    "SM", "UA", "VA",
  ]);
  const UNRELIABLE_LOCATION_VALUES = /^(?:unknown|undefined|null|not specified|n\/a|none)$/i;

  const cleanLocationValue = (value) => {
    if (typeof value !== "string") return "";
    const cleaned = value.trim();
    return cleaned && !UNRELIABLE_LOCATION_VALUES.test(cleaned) ? cleaned : "";
  };

  const countryNameFromCode = (countryCode) => {
    const code = cleanLocationValue(countryCode).toUpperCase();
    if (!/^[A-Z]{2}$/.test(code)) return "";

    try {
      return new Intl.DisplayNames(["en"], { type: "region" }).of(code) || "";
    } catch (_error) {
      return "";
    }
  };

  const normalizeLocation = (location) => {
    if (!location || typeof location !== "object") return null;

    const countryCode = cleanLocationValue(location.countryCode).toUpperCase();
    const country = cleanLocationValue(location.country) || countryNameFromCode(countryCode);
    const city = cleanLocationValue(location.city);

    if (!country) return null;
    return { city, country, countryCode };
  };

  const formatLocation = (location) => {
    const normalized = normalizeLocation(location);
    if (!normalized) return "";
    return normalized.city ? `${normalized.city}, ${normalized.country}` : normalized.country;
  };

  const buildWhatsAppMessage = (selectedServices, location) => {
    const services = Array.isArray(selectedServices)
      ? selectedServices.filter((service) => typeof service === "string" && service.trim()).map((service) => service.trim())
      : [];
    const lines = ["Hi Ranking Rebels, I’d like to improve my business’s online visibility and reach more customers."];

    if (services.length) {
      lines.push("", "I’m interested in:", ...services.map((service) => `• ${service}`));
    }

    const formattedLocation = formatLocation(location);

    if (formattedLocation) {
      lines.push("", `Location: ${formattedLocation}`);
    }

    lines.push("", "Could you recommend the best approach for my business?");
    return lines.join("\n");
  };

  const resolveWhatsAppNumber = (location) => {
    const countryCode = normalizeLocation(location)?.countryCode;
    if (!countryCode) return NETHERLANDS_WHATSAPP;
    return EUROPEAN_COUNTRY_CODES.has(countryCode) ? NETHERLANDS_WHATSAPP : AUSTRALIA_WHATSAPP;
  };

  const buildWhatsAppUrl = (selectedServices, location) => {
    const phone = resolveWhatsAppNumber(location);
    const message = buildWhatsAppMessage(selectedServices, location);
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const parseCloudflareTrace = (trace) => {
    if (typeof trace !== "string") return null;
    const fields = new Map(
      trace
        .split(/\r?\n/)
        .map((line) => line.split("="))
        .filter((parts) => parts.length === 2)
        .map(([key, value]) => [key.trim(), value.trim()]),
    );
    const countryCode = cleanLocationValue(fields.get("loc") || "").toUpperCase();
    return normalizeLocation({ countryCode });
  };

  const detectApproximateLocation = async ({ fetchImpl, timeoutMs = 1800 } = {}) => {
    const request = fetchImpl || (typeof fetch === "function" ? fetch.bind(globalThis) : null);
    if (!request) return null;

    const controller = typeof AbortController === "function" ? new AbortController() : null;
    const timeout = setTimeout(() => controller?.abort(), timeoutMs);

    try {
      const response = await request("/cdn-cgi/trace", {
        cache: "no-store",
        credentials: "same-origin",
        headers: { Accept: "text/plain" },
        signal: controller?.signal,
      });
      if (!response?.ok) return null;
      return parseCloudflareTrace(await response.text());
    } catch (_error) {
      return null;
    } finally {
      clearTimeout(timeout);
    }
  };

  return Object.freeze({
    AUSTRALIA_WHATSAPP,
    NETHERLANDS_WHATSAPP,
    buildWhatsAppMessage,
    buildWhatsAppUrl,
    detectApproximateLocation,
    formatLocation,
    normalizeLocation,
    parseCloudflareTrace,
    resolveWhatsAppNumber,
  });
});
