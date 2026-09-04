import { describe, expect, it } from "vitest";
import { isUuidV4, validateHoneypot, validateLeadPayload } from "./validation";

describe("isUuidV4", () => {
  it("accepts a valid UUID v4", () => {
    expect(isUuidV4("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
    expect(isUuidV4("550E8400-E29B-41D4-A716-446655440000")).toBe(true);
  });

  it("rejects other UUID versions, variants, and malformed values", () => {
    expect(isUuidV4("550e8400-e29b-11d4-a716-446655440000")).toBe(false);
    expect(isUuidV4("550e8400-e29b-41d4-0716-446655440000")).toBe(false);
    expect(isUuidV4("550e8400e29b41d4a716446655440000")).toBe(false);
    expect(isUuidV4("550e8400-e29b-41d4-a716-44665544000")).toBe(false);
  });
});

const validLead = () => ({
  submissionId: "550e8400-e29b-41d4-a716-446655440000",
  firstName: "Ada",
  lastName: "Lovelace",
  companyName: "Analytical Engines",
  email: "ada@example.com",
  phone: "+61412345678",
  sourcePath: "/locations/australia/",
  ctaLabel: "Request an Australian search audit",
  market: "Australia",
  services: ["Google SEO"],
  noticeVersion: "2026-09-03",
  turnstileToken: "token",
  website: ""
});

describe("validateLeadPayload", () => {
  it("accepts the structural contract without applying special normalization", () => {
    expect(validateLeadPayload(validLead())).toMatchObject({ ok: true });
  });

  it("rejects missing, blank, and incorrectly typed fields without returning PII", () => {
    const result = validateLeadPayload({
      ...validLead(),
      firstName: "  ",
      companyName: 42,
      services: "Google SEO"
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors).toEqual(
      expect.arrayContaining([
        { field: "firstName", code: "required" },
        { field: "companyName", code: "type" },
        { field: "services", code: "type" }
      ])
    );
    expect(JSON.stringify(result)).not.toContain("42");
    expect(JSON.stringify(result)).not.toContain("Google SEO");
  });

  it("rejects arrays and null as payloads", () => {
    expect(validateLeadPayload([]).ok).toBe(false);
    expect(validateLeadPayload(null).ok).toBe(false);
  });

  it("enforces the exact inclusive field and service limits", () => {
    const atMinimum = {
      ...validLead(),
      firstName: "a",
      lastName: "b",
      companyName: "c",
      email: `${"a".repeat(64)}@${"b".repeat(185)}.com`,
      ctaLabel: "d".repeat(120),
      sourcePath: `/${"e".repeat(511)}`,
      services: ["Google SEO"]
    };
    expect(validateLeadPayload(atMinimum).ok).toBe(true);

    const tooLong = validateLeadPayload({
      ...atMinimum,
      firstName: "a".repeat(81),
      lastName: "b".repeat(81),
      companyName: "c".repeat(121),
      email: "a".repeat(255),
      ctaLabel: "d".repeat(121),
      sourcePath: "e".repeat(513),
      services: ["f".repeat(81)]
    });
    expect(tooLong.ok).toBe(false);
    if (tooLong.ok) return;
    expect(tooLong.errors.map(({ field }) => field)).toEqual(
      expect.arrayContaining([
        "firstName",
        "lastName",
        "companyName",
        "email",
        "ctaLabel",
        "sourcePath",
        "services[0]"
      ])
    );
  });

  it("normalizes email whitespace and casing in the valid result", () => {
    const result = validateLeadPayload({ ...validLead(), email: "  ADA@EXAMPLE.COM  " });

    expect(result).toMatchObject({ ok: true, value: { email: "ada@example.com" } });
  });

  it("rejects malformed email addresses", () => {
    const result = validateLeadPayload({ ...validLead(), email: "not-an-email" });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors).toContainEqual({ field: "email", code: "invalid_format" });
  });

  it("accepts only the configured notice version", () => {
    const config = { noticeVersion: "2026-09-03" };

    expect(validateLeadPayload({ ...validLead(), noticeVersion: config.noticeVersion }, config).ok).toBe(true);

    const result = validateLeadPayload({ ...validLead(), noticeVersion: "2025-01-01" }, config);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors).toContainEqual({ field: "noticeVersion", code: "not_allowed" });
  });

  it("accepts an empty honeypot and rejects content or whitespace", () => {
    expect(validateHoneypot("")).toEqual([]);
    expect(validateLeadPayload({ ...validLead(), website: "" }).ok).toBe(true);

    for (const website of ["https://spam.example", " ", "  bot  "]) {
      expect(validateHoneypot(website)).toContainEqual({ field: "website", code: "honeypot_rejected" });
      const result = validateLeadPayload({ ...validLead(), website });
      expect(result.ok, website).toBe(false);
      if (!result.ok) expect(result.errors).toContainEqual({ field: "website", code: "honeypot_rejected" });
    }
  });

  it("requires a UUID v4 submission id and trims every stored string", () => {
    const result = validateLeadPayload({
      ...validLead(),
      submissionId: "  550e8400-e29b-41d4-a716-446655440000  ",
      firstName: " Ada ", lastName: " Lovelace ", companyName: " Analytical Engines ",
      email: " ADA@EXAMPLE.COM ", phone: " +61 412 345 678 ",
      sourcePath: " /locations/australia/ ", ctaLabel: " Audit ",
      market: " Australia ", noticeVersion: " 2026-09-03 ", turnstileToken: " token ", website: ""
    }, { noticeVersion: " 2026-09-03 " });
    expect(result).toMatchObject({ ok: true, value: {
      submissionId: "550e8400-e29b-41d4-a716-446655440000", firstName: "Ada", lastName: "Lovelace",
      companyName: "Analytical Engines", sourcePath: "/locations/australia/", ctaLabel: "Audit",
      market: "Australia", noticeVersion: "2026-09-03", turnstileToken: "token", website: ""
    } });

    for (const submissionId of ["not-a-uuid", "550e8400-e29b-11d4-a716-446655440000"]) {
      const invalid = validateLeadPayload({ ...validLead(), submissionId });
      expect(invalid.ok).toBe(false);
      if (!invalid.ok) expect(invalid.errors).toContainEqual({ field: "submissionId", code: "invalid_format" });
    }
  });

  it("accepts an email at the 254-character limit and rejects longer values", () => {
    const local = "a".repeat(64);
    const domain = "b".repeat(185);
    const atLimit = `${local}@${domain}.com`;
    expect(atLimit.length).toBe(254);
    expect(validateLeadPayload({ ...validLead(), email: atLimit }).ok).toBe(true);
    expect(validateLeadPayload({ ...validLead(), email: `${atLimit}x` }).ok).toBe(false);
  });

  it("normalizes human phone punctuation to an international digit string", () => {
    const result = validateLeadPayload({
      ...validLead(),
      phone: "+61 (412) 345-678"
    });

    expect(result).toMatchObject({ ok: true, value: { phone: "+61412345678" } });
    expect(validateLeadPayload({ ...validLead(), phone: "+61.412.345.678" })).toMatchObject({
      ok: true,
      value: { phone: "+61412345678" }
    });
  });

  it("requires an international prefix and 8–15 digits", () => {
    const invalidPhones = [
      "0412345678",
      "61 412 345 678",
      "++61412345678",
      "+61412345A78",
      "+6141234",
      "+6141234567890123"
    ];

    for (const phone of invalidPhones) {
      const result = validateLeadPayload({ ...validLead(), phone });
      expect(result.ok, phone).toBe(false);
      if (!result.ok) expect(result.errors).toContainEqual({ field: "phone", code: "invalid_format" });
    }
  });

  it("accepts the supported markets and rejects unknown markets", () => {
    for (const market of ["Australia", "Netherlands", "LATAM", "Not specified"]) {
      expect(validateLeadPayload({ ...validLead(), market }).ok, market).toBe(true);
    }

    const result = validateLeadPayload({ ...validLead(), market: "Canada" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors).toContainEqual({ field: "market", code: "not_allowed" });
  });

  it("accepts only the ten supported services and deduplicates in order", () => {
    const services = [
      "ChatGPT & GEO",
      "Google SEO",
      "Google Ads",
      "Instagram Ads",
      "Facebook Ads",
      "TikTok Ads",
      "AI Sales Agent",
      "AI WhatsApp Support",
      "AI Automation",
      "Other"
    ];
    const result = validateLeadPayload({
      ...validLead(),
      services: [services[0], services[1], services[0], ...services.slice(2)]
    });

    expect(result).toMatchObject({ ok: true, value: { services } });

    const unknown = validateLeadPayload({ ...validLead(), services: ["Unknown Service"] });
    expect(unknown.ok).toBe(false);
    if (!unknown.ok) expect(unknown.errors).toContainEqual({ field: "services[0]", code: "not_allowed" });
  });

  it("accepts root-relative source paths, including the exact length limit", () => {
    expect(validateLeadPayload({ ...validLead(), sourcePath: "/locations/australia/" }).ok).toBe(true);
    expect(validateLeadPayload({ ...validLead(), sourcePath: `/${"a".repeat(511)}` }).ok).toBe(true);
  });

  it("rejects absolute URLs, query strings, fragments, and non-root paths", () => {
    for (const sourcePath of [
      "https://rankingrebels.com/locations/australia/",
      "//rankingrebels.com/locations/australia/",
      "/locations/australia/?utm_source=test",
      "/locations/australia/#contact",
      "locations/australia/"
    ]) {
      const result = validateLeadPayload({ ...validLead(), sourcePath });
      expect(result.ok, sourcePath).toBe(false);
      if (!result.ok) expect(result.errors).toContainEqual({ field: "sourcePath", code: "invalid_format" });
    }

    const tooLong = validateLeadPayload({ ...validLead(), sourcePath: `/${"a".repeat(512)}` });
    expect(tooLong.ok).toBe(false);
    if (!tooLong.ok) expect(tooLong.errors).toContainEqual({ field: "sourcePath", code: "too_long" });
  });
});
