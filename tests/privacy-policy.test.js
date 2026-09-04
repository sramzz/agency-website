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

test("every public footer links to Privacy Policy", () => {
  for (const file of publicFiles.filter((candidate) => candidate !== privacyFile)) {
    const html = read(file);
    assert.match(html, /<a[^>]+href="\/privacy\/"[^>]*>\s*Privacy Policy\s*<\/a>/i,
      `${file} should include a Privacy Policy footer link`);
  }
});
