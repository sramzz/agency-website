export type StoredLead = {
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

export type LeadEmailConfig = {
  from: string;
  to: string;
};

export type LeadEmail = LeadEmailConfig & {
  subject: string;
  text: string;
  html: string;
};

const escapeHtml = (value: string): string => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const textRows = (lead: StoredLead): Array<[string, string]> => [
  ["Submission ID", lead.submissionId],
  ["First name", lead.firstName],
  ["Last name", lead.lastName],
  ["Company", lead.companyName],
  ["Email", lead.email],
  ["Phone", lead.phone],
  ["Source path", lead.sourcePath],
  ["CTA", lead.ctaLabel],
  ["Market", lead.market],
  ["Services", lead.services.join(", ")],
  ["Notice version", lead.noticeVersion],
  ["Created at", lead.createdAt],
  ["Expires at", lead.expiresAt],
];

export const buildLeadEmail = (lead: StoredLead, config: LeadEmailConfig): LeadEmail => {
  const rows = textRows(lead);
  const text = [
    "New website lead",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");
  const htmlRows = rows
    .map(([label, value]) => `<tr><th scope="row">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`)
    .join("");
  const html = [
    "<h1>New website lead</h1>",
    "<table>",
    `<tbody>${htmlRows}</tbody>`,
    "</table>",
  ].join("");

  return {
    from: config.from,
    to: config.to,
    subject: `New website lead — ${lead.companyName}`,
    text,
    html,
  };
};
