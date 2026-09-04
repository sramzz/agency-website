const UUID_V4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ROOT_RELATIVE_SOURCE_PATH_PATTERN = /^\/(?!\/)[^?#]*$/;

export function isUuidV4(value: string): boolean {
  return UUID_V4_PATTERN.test(value);
}

export interface LeadPayload {
  submissionId: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  sourcePath: string;
  ctaLabel: string;
  market: string;
  services: string[];
  noticeVersion: string;
  turnstileToken: string;
  website: string;
}

export const ALLOWED_MARKETS = ["Australia", "Netherlands", "LATAM", "Not specified"] as const;
export const ALLOWED_SERVICES = [
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
] as const;

export type LeadValidationError = {
  field: string;
  code: "required" | "type" | "too_long" | "invalid_format" | "not_allowed" | "honeypot_rejected";
};

export type LeadValidationResult =
  | { ok: true; value: LeadPayload }
  | { ok: false; errors: LeadValidationError[] };

export interface LeadValidationOptions {
  noticeVersion?: string;
}

export function validateHoneypot(value: unknown): LeadValidationError[] {
  return value === "" ? [] : [{ field: "website", code: "honeypot_rejected" }];
}

const FIELD_LIMITS: Record<string, number> = {
  firstName: 80,
  lastName: 80,
  companyName: 120,
  email: 254,
  ctaLabel: 120,
  sourcePath: 512
};

export function validateLeadPayload(input: unknown, options: LeadValidationOptions = {}): LeadValidationResult {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, errors: [{ field: "payload", code: "type" }] };
  }

  const payload = input as Record<string, unknown>;
  const errors: LeadValidationError[] = [];
  errors.push(...validateHoneypot(payload.website));
  const requiredStrings = [
    "submissionId",
    "firstName",
    "lastName",
    "companyName",
    "email",
    "phone",
    "sourcePath",
    "ctaLabel",
    "market",
    "noticeVersion",
    "turnstileToken"
  ];

  for (const field of requiredStrings) {
    const value = payload[field];
    if (typeof value !== "string") {
      errors.push({ field, code: "type" });
    } else if (value.trim().length === 0) {
      errors.push({ field, code: "required" });
    } else {
      payload[field] = value.trim();
    }
  }

  if (typeof payload.submissionId === "string" && payload.submissionId.length > 0 && !isUuidV4(payload.submissionId)) {
    errors.push({ field: "submissionId", code: "invalid_format" });
  }

  if (
    options.noticeVersion !== undefined &&
    typeof payload.noticeVersion === "string" &&
    payload.noticeVersion.trim().length > 0 &&
    payload.noticeVersion !== options.noticeVersion.trim()
  ) {
    errors.push({ field: "noticeVersion", code: "not_allowed" });
  }

  if (typeof payload.email === "string" && payload.email.trim().length > 0) {
    const normalizedEmail = payload.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      errors.push({ field: "email", code: "invalid_format" });
    }
  }

  const market = typeof payload.market === "string" ? payload.market.trim() : undefined;
  if (market && !ALLOWED_MARKETS.includes(market as (typeof ALLOWED_MARKETS)[number])) {
    errors.push({ field: "market", code: "not_allowed" });
  }

  if (typeof payload.sourcePath === "string" && payload.sourcePath.trim().length > 0) {
    const sourcePath = payload.sourcePath.trim();
    payload.sourcePath = sourcePath;
    if (!ROOT_RELATIVE_SOURCE_PATH_PATTERN.test(sourcePath)) {
      errors.push({ field: "sourcePath", code: "invalid_format" });
    }
  }

  let normalizedPhone: string | undefined;
  if (typeof payload.phone === "string" && payload.phone.trim().length > 0) {
    const phone = payload.phone.trim();
    if (/^[+0-9\s().-]+$/.test(phone) && phone.indexOf("+") === 0 && phone.lastIndexOf("+") === 0) {
      normalizedPhone = phone.replace(/[\s().-]/g, "");
    }
    if (!normalizedPhone || !/^\+[0-9]{8,15}$/.test(normalizedPhone)) {
      errors.push({ field: "phone", code: "invalid_format" });
    }
  }

  for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
    if (typeof payload[field] === "string" && (payload[field] as string).trim().length > limit) {
      errors.push({ field, code: "too_long" });
    }
  }

  let normalizedServices: string[] = [];
  if (!Array.isArray(payload.services)) {
    errors.push({ field: "services", code: "type" });
  } else {
    const seenServices = new Set<string>();
    payload.services.forEach((service, index) => {
      if (typeof service !== "string") {
        errors.push({ field: `services[${index}]`, code: "type" });
      } else if (service.trim().length === 0) {
        errors.push({ field: `services[${index}]`, code: "required" });
      } else if (service.trim().length > 80) {
        errors.push({ field: `services[${index}]`, code: "too_long" });
      } else if (!ALLOWED_SERVICES.includes(service.trim() as (typeof ALLOWED_SERVICES)[number])) {
        errors.push({ field: `services[${index}]`, code: "not_allowed" });
      } else if (!seenServices.has(service.trim())) {
        seenServices.add(service.trim());
        normalizedServices.push(service.trim());
      }
    });
  }

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      ...payload,
      email: (payload.email as string).trim().toLowerCase(),
      phone: normalizedPhone as string,
      market,
      services: normalizedServices
    } as LeadPayload
  };
}
