const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const privacyRoute = "/privacy/";
const privacyFile = "privacy/index.html";
const publicRoutes = [
  "/",
  "/solutions/",
  "/solutions/organic-discovery/",
  "/solutions/paid-ads/",
  "/solutions/ai-automation/",
  "/locations/",
  "/locations/australia/",
  "/locations/netherlands/",
  "/locations/latam/",
  "/case-studies/",
  "/about/",
  "/journey/",
  privacyRoute,
];

const routeFile = (route) => route === "/" ? "index.html" : `${route.slice(1)}index.html`;
const publicFiles = publicRoutes.map(routeFile);
const ignoredDirectories = new Set([".git", "node_modules", ".wrangler", "coverage", "dist", "build"]);

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  if (ignoredDirectories.has(entry.name) || entry.name === "proposals") return [];
  const absolute = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(absolute) : [absolute];
});

test("the public route inventory includes Privacy Policy", () => {
  const actualIndexFiles = walk(root)
    .filter((file) => file.endsWith(`${path.sep}index.html`) || path.basename(file) === "index.html")
    .map((file) => path.relative(root, file).replaceAll(path.sep, "/"))
    .sort();
  assert.deepEqual(actualIndexFiles, publicFiles.slice().sort(),
    "the public route inventory should include exactly the documented routes");
  assert.match(read("sitemap.xml"), /<loc>https:\/\/rankingrebels\.com\/privacy\/<\/loc>/,
    "the Privacy Policy route should be represented in the public sitemap inventory");
});

test("Privacy Policy has indexable metadata and one canonical H1", () => {
  const html = read(privacyFile);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, "Privacy Policy needs one H1");
  assert.match(html, /<h1[^>]*>\s*Privacy Policy\s*<\/h1>/i);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.match(html, /rel="canonical" href="https:\/\/rankingrebels\.com\/privacy\/"/);
});

test("Privacy Policy identifies Santiago Ramirez in Australia as the information controller", () => {
  const html = read(privacyFile);
  assert.match(html, /Santiago Ramirez/i,
    "Privacy Policy should identify Santiago Ramirez as the person responsible for handling information");
  assert.match(html, /Australia/i,
    "Privacy Policy should identify Australia as the controller's location");
});

test("Privacy Policy publishes the controller's exact public address", () => {
  const html = read(privacyFile);
  assert.match(html, /23 Birmingham Street, Spotswood 3015, Australia/,
    "Privacy Policy should publish the exact public postal or business address");
});

test("Privacy Policy shows exact privacy contact channels in the responsible section", () => {
  const html = read(privacyFile);
  const responsibleSection = html.match(/<section class="section">[\s\S]*?<p class="eyebrow">Who is responsible<\/p>[\s\S]*?<\/section>/i)?.[0];
  assert.ok(responsibleSection, "Privacy Policy should include a visible Who is responsible section");
  assert.match(responsibleSection, /<a[^>]+href="mailto:info@rankingrebels\.com"[^>]*>\s*info@rankingrebels\.com\s*<\/a>/i,
    "Responsible section should show the exact privacy email as a mailto link");
  assert.match(responsibleSection, /<a[^>]+href="tel:\+61439499441"[^>]*>\s*\+61 439 499 441\s*<\/a>/i,
    "Responsible section should show the exact privacy phone as a tel link");
});

test("Privacy Policy states the lead purpose and limited legitimate interests", () => {
  const html = read(privacyFile);
  const purposeSection = html.match(/<section class="section">\s*<div class="section-heading"><p class="eyebrow">Why we use it<\/p>[\s\S]*?<\/section>/i)?.[0];
  assert.ok(purposeSection, "Privacy Policy should include a visible Why we use it section");
  assert.match(purposeSection, /steps? you request before (?:a )?contract|before (?:a )?contract[^<]*steps? you request|prepare or provide the requested services/i,
    "The purpose should include requested steps before contracting or providing services");
  assert.match(purposeSection, /legitimate interests?[\s\S]*(?:security|abuse)[\s\S]*(?:duplicates?|delivery)/i,
    "Legitimate interests should be limited to security, abuse, duplicates and delivery");
  assert.match(purposeSection, /(?:do not|does not|never)\s+(?:subscribe|sign)\s+you\s+to\s+newsletters?[\s\S]*(?:general|unrelated)\s+marketing/i,
    "The policy should explicitly exclude newsletters and general or unrelated marketing");
});

test("Privacy Policy sets a strict 12-month retention limit for D1 and Gmail notifications", () => {
  const html = read(privacyFile);
  const retentionSection = html.match(/<section class="section">\s*<div class="section-heading"><p class="eyebrow">Retention<\/p>[\s\S]*?<\/section>/i)?.[0];
  assert.ok(retentionSection, "Privacy Policy should include a visible Retention section");
  assert.match(retentionSection, /D1[\s\S]*(?:365\s+days|12\s+months)[\s\S]*(?:delete|delet(?:e|ed|ion))/i,
    "Retention should state that D1 lead records are deleted at 365 days/12 months");
  assert.match(retentionSection, /(?:Gmail|email|notification)[\s\S]*(?:delete|delet(?:e|ed|ion))[\s\S]*(?:12\s+months|365\s+days)/i,
    "Retention should state that notification emails are deleted no later than 12 months");
  assert.doesNotMatch(retentionSection, /15\s+months/i,
    "Retention must not allow notification emails to be kept for 15 months");
});

test("Privacy Policy explains international transfers and the limits of D1 EU jurisdiction", () => {
  const html = read(privacyFile);
  const transferSection = html.match(/<section class="section">\s*<div class="section-heading"><p class="eyebrow">Where information goes<\/p>[\s\S]*?<\/section>/i)?.[0];
  assert.ok(transferSection, "Privacy Policy should include a visible international processing section");
  assert.match(transferSection, /Cloudflare[\s\S]*?(?:Google|Gmail)|(?:Google|Gmail)[\s\S]*?Cloudflare/i,
    "The transfer explanation should identify Cloudflare and Google/Gmail");
  assert.match(transferSection, /D1[\s\S]*?(?:EU|European Union)[\s\S]*?(?:run|store|storage|located)/i,
    "The policy should explain that D1's EU jurisdiction limits where the database runs and stores data");
  assert.match(transferSection, /(?:does not|doesn't)[\s\S]*?(?:Workers|request|security check|technical metadata|email delivery|other services)/i,
    "The policy should state that D1 EU jurisdiction does not confine other services or processing");
  assert.match(transferSection, /(?:outside|other than)[\s\S]*?(?:Australia|your country|country where you live)/i,
    "The policy should disclose that providers may process information outside Australia or the user's country");
  assert.match(transferSection, /(?:adequacy|standard contractual clauses|SCCs)/i,
    "The policy should identify applicable legal safeguards such as adequacy decisions or SCCs");
});

test("every public footer links to Privacy Policy", () => {
  for (const file of publicFiles.filter((candidate) => candidate !== privacyFile)) {
    const html = read(file);
    assert.match(html, /<a[^>]+href="\/privacy\/"[^>]*>\s*Privacy Policy\s*<\/a>/i,
      `${file} should include a Privacy Policy footer link`);
  }
});
