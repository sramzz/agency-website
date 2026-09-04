import { describe, expect, it } from "vitest";

import { buildLeadEmail } from "./email";

type StoredLead = {
  submissionId: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  sourcePath: string;
  ctaLabel: string;
  market: "Australia" | "Netherlands" | "LATAM" | "Not specified";
  services: string[];
  noticeVersion: string;
  createdAt: string;
  expiresAt: string;
};

const lead: StoredLead = {
  submissionId: "123e4567-e89b-42d3-a456-426614174000",
  firstName: "Ada <script>",
  lastName: "O'Connor & Co",
  companyName: 'A "Useful" Company <AU>',
  email: "ada@example.com",
  phone: "+61400111222",
  sourcePath: "/locations/australia/",
  ctaLabel: "Request an Australian search audit",
  market: "Australia",
  services: ["Google SEO", "AI WhatsApp Support"],
  noticeVersion: "2026-09-03",
  createdAt: "2026-09-03T00:00:00.000Z",
  expiresAt: "2027-09-03T00:00:00.000Z",
};

const config = {
  from: "leads@forms.rankingrebels.com",
  to: "rankingrebelsmarketingagency@gmail.com",
};

const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

describe("buildLeadEmail", () => {
  it("builds a configurable website-lead subject and envelope", () => {
    const message = buildLeadEmail(lead, config);

    expect(message.from).toBe(config.from);
    expect(message.to).toBe(config.to);
    expect(message.subject).toMatch(/website lead/i);
    expect(message.subject).toContain(lead.companyName);
  });

  it("includes every stored lead field in text and HTML bodies", () => {
    const message = buildLeadEmail(lead, config);
    const expectedValues = [
      lead.submissionId,
      lead.firstName,
      lead.lastName,
      lead.companyName,
      lead.email,
      lead.phone,
      lead.sourcePath,
      lead.ctaLabel,
      lead.market,
      ...lead.services,
      lead.noticeVersion,
      lead.createdAt,
      lead.expiresAt,
    ];

    for (const value of expectedValues) expect(message.text).toContain(value);
    for (const value of expectedValues) expect(message.html).toContain(escapeHtml(value));
  });

  it("escapes untrusted lead values in HTML and excludes request/security metadata", () => {
    const message = buildLeadEmail(lead, config);

    expect(message.html).toContain("&lt;script&gt;");
    expect(message.html).toContain("O&#39;Connor &amp; Co");
    expect(message.html).not.toContain("<script>");

    const serialized = `${message.subject}\n${message.text}\n${message.html}`.toLowerCase();
    for (const forbidden of ["ip address", "user-agent", "remoteip", "turnstile", "honeypot"]) {
      expect(serialized).not.toContain(forbidden);
    }
  });
});
