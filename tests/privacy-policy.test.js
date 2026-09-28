const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const publicRoutes = [
  "/", "/solutions/", "/solutions/organic-discovery/", "/solutions/paid-ads/",
  "/solutions/ai-automation/", "/locations/", "/locations/australia/",
  "/locations/netherlands/", "/locations/latam/", "/case-studies/",
  "/about/", "/journey/", "/contact/", "/privacy/", "/cookies/", "/legal/",
];
const routeFile = (route) => route === "/" ? "index.html" : `${route.slice(1)}index.html`;
const ignoredDirectories = new Set([".git", ".kilo", "node_modules", ".wrangler", "coverage", "dist", "build"]);
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  if (ignoredDirectories.has(entry.name) || entry.name === "proposals") return [];
  const absolute = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(absolute) : [absolute];
});

test("legal pages are public, indexable and linked from every public footer", () => {
  const actual = walk(root)
    .filter((file) => path.basename(file) === "index.html")
    .map((file) => path.relative(root, file).replaceAll(path.sep, "/"))
    .sort();
  assert.deepEqual(actual, publicRoutes.map(routeFile).sort());
  const sitemap = read("sitemap.xml");
  for (const route of ["/privacy/", "/cookies/", "/legal/"]) {
    const html = read(routeFile(route));
    assert.match(html, new RegExp(`<link rel="canonical" href="https://rankingrebels.com${route}"`));
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
    assert.ok(sitemap.includes(`https://rankingrebels.com${route}`));
  }
  for (const route of publicRoutes) {
    const html = read(routeFile(route));
    for (const legalRoute of ["/privacy/", "/cookies/", "/legal/"]) {
      assert.match(html, new RegExp(`href="${legalRoute}"`), `${route} must link to ${legalRoute}`);
    }
  }
});

test("policy identifies the LLC and describes enquiry data and practical retention", () => {
  const html = read("privacy/index.html");
  assert.match(html, /Ranking Rebels LLC[\s\S]*Wyoming/);
  assert.match(html, /30 N Gould St Ste R, Sheridan, WY 82801/);
  assert.match(html, /representative in the European Union is Santiago Ramirez Castaño/);
  assert.match(html, /info@rankingrebels\.com/);
  assert.match(html, /optional business website/);
  assert.match(html, /phone, email or WhatsApp/);
  assert.match(html, /People responding to an enquiry may work from the Netherlands, Australia or Colombia/);
  assert.match(html, /Cloudflare D1[\s\S]*365 days/);
  assert.match(html, /Gmail notifications[\s\S]*delete or de-identify/);
  assert.doesNotMatch(html, /Gmail notification emails are deleted no later than 12 months/i);
  assert.match(html, /Google Analytics/);
  assert.match(html, /30 calendar days/);
  assert.match(html, /Office of the Australian Information Commissioner/);
});

test("cookie page distinguishes analytics, form storage and conditional security cookies", () => {
  const html = read("cookies/index.html");
  for (const item of ["_ga", "rr.lead.receipt.v1", "rr.lead.session.v1", "Cloudflare Turnstile", "__cf_bm"]) {
    assert.ok(html.includes(item), `Cookie page must explain ${item}`);
  }
  assert.match(html, /currently loads when you open this website/);
  assert.match(html, /do not currently provide an on-site Analytics choice/);
});

test("form notice and Worker agree on the new policy version", () => {
  const script = read("assets/js/lead-capture.js");
  assert.match(script, /DEFAULT_NOTICE_VERSION = "2026-09-28"/);
  assert.match(script, /Ranking Rebels LLC uses your details to respond/);
  assert.match(script, /href="\/cookies\/"/);
  assert.match(read("worker/wrangler.jsonc"), /"LEAD_NOTICE_VERSION"\s*:\s*"2026-09-28"/);
});
