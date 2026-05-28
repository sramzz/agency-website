const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const routes = [
  "/",
  "/onboarding/",
  "/case-studies/",
  "/contact/",
  "/seo-agency/",
  "/local-seo/",
  "/technical-seo/",
  "/seo-content/",
  "/google-business-profile/",
  "/google-ads-management/",
  "/locations/",
  "/locations/australia/",
  "/locations/australia/melbourne/",
  "/locations/australia/sydney/",
  "/locations/australia/brisbane/",
  "/locations/australia/gold-coast/",
  "/locations/europe/",
  "/locations/europe/netherlands/",
  "/locations/europe/london/",
  "/locations/europe/madrid/",
  "/locations/europe/barcelona/",
  "/locations/europe/milan/",
  "/locations/europe/munich/",
  "/locations/europe/zurich/",
  "/es/",
  "/es/onboarding/",
];

const routeToFile = (route) => {
  if (route === "/") return "index.html";
  return `${route.replace(/^\/|\/$/g, "")}/index.html`;
};

const htmlFiles = () =>
  routes.map(routeToFile).filter((file) => file.endsWith(".html"));

const normalize = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

test("all planned static routes exist as clean index pages", () => {
  for (const route of routes) {
    assert.equal(exists(routeToFile(route)), true, `${route} should exist`);
  }
});

test("all pages use root-domain SEO metadata without /agencia", () => {
  for (const route of routes) {
    const file = routeToFile(route);
    const html = read(file);
    assert.equal((html.match(/<title>/g) || []).length, 1, `${file} should have one title`);
    assert.equal((html.match(/name="description"/g) || []).length, 1, `${file} should have one description`);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${file} should have one canonical`);
    assert.match(html, new RegExp(`href="https://rankingrebels\\.com${route === "/" ? "/" : route}"`), `${file} canonical should match route`);
    assert.doesNotMatch(html, /\/agencia\b|PLACEHOLDER Brand|PLACEHOLDER Marca/);
  }
});

test("home page has Organization schema and visible proof placeholders", () => {
  const html = read("index.html");
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) =>
    JSON.parse(match[1])
  );
  const organization = scripts.find((schema) => schema["@type"] === "Organization");
  assert.ok(organization, "Organization schema should exist");
  assert.equal(organization.name, "Ranking Rebels");
  assert.equal(organization.url, "https://rankingrebels.com/");
  assert.equal(organization.email, "info@rankingrebels.com");
  assert.match(normalize(html), /Proof placeholders until verified client results are ready/i);
});

test("FAQ schema only appears on pages with visible FAQ details", () => {
  for (const file of htmlFiles()) {
    const html = read(file);
    const hasFaqSchema = /"@type"\s*:\s*"FAQPage"/.test(html);
    const hasVisibleFaq = /<section[^>]+class="[^"]*faq/.test(html) && /<details>/.test(html);
    assert.equal(hasFaqSchema, hasVisibleFaq, `${file} FAQ schema should match visible FAQ`);
  }
});

test("crawlable navigation and hub links expose core SEO routes", () => {
  const home = read("index.html");
  for (const href of [
    "/seo-agency/",
    "/local-seo/",
    "/google-ads-management/",
    "/locations/",
    "/case-studies/",
    "/contact/",
  ]) {
    assert.match(home, new RegExp(`href="${href}"`), `home should link to ${href}`);
  }

  assert.match(read("locations/index.html"), /href="\/locations\/australia\/"/);
  assert.match(read("locations/index.html"), /href="\/locations\/europe\/"/);
  assert.match(read("locations/australia/index.html"), /href="\/locations\/australia\/melbourne\/"/);
  assert.match(read("locations/europe/index.html"), /href="\/locations\/europe\/netherlands\/"/);
});

test("all local links resolve to existing clean routes or valid anchors", () => {
  const fileByRoute = new Map(routes.map((route) => [route, routeToFile(route)]));

  for (const file of htmlFiles()) {
    const html = read(file);
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);

    for (const href of hrefs) {
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      if (/\.(css|js|png|jpg|jpeg|webp|svg|ico|xml|txt)$/i.test(href)) continue;

      if (href.startsWith("#")) {
        assert.equal(ids.has(href.slice(1)), true, `${file} has missing anchor ${href}`);
        continue;
      }

      const [route, anchor] = href.split("#");
      const linkedFile = fileByRoute.get(route);
      assert.ok(linkedFile, `${file} has unknown local route ${href}`);
      assert.equal(exists(linkedFile), true, `${file} links to missing ${linkedFile}`);

      if (anchor) {
        assert.match(read(linkedFile), new RegExp(`\\sid="${anchor}"`), `${file} links to missing ${href}`);
      }
    }
  }
});

test("onboarding includes Google Ads access, budget, analytics, and conversion tracking", () => {
  const english = normalize(read("onboarding/index.html"));
  const spanish = normalize(read("es/onboarding/index.html"));

  for (const expected of ["Google Ads access", "Analytics", "conversion tracking", "ad spend"]) {
    assert.match(english, new RegExp(expected, "i"));
  }

  for (const expected of ["acceso a Google Ads", "Analytics", "conversiones", "presupuesto publicitario"]) {
    assert.match(spanish, new RegExp(expected, "i"));
  }
});

test("robots and sitemap expose the full rankingrebels.com URL set", () => {
  assert.equal(exists("robots.txt"), true);
  assert.equal(exists("sitemap.xml"), true);

  const robots = read("robots.txt");
  const sitemap = read("sitemap.xml");
  assert.match(robots, /Sitemap: https:\/\/rankingrebels\.com\/sitemap\.xml/);

  for (const route of routes) {
    assert.match(sitemap, new RegExp(`<loc>https://rankingrebels\\.com${route === "/" ? "/" : route}</loc>`));
  }
});

test("Ranking Rebels placeholder contact details are consistent", () => {
  for (const file of htmlFiles()) {
    const html = read(file);
    assert.match(html, /Ranking Rebels/);
    assert.match(html, /info@rankingrebels\.com/);
    assert.match(html, /https:\/\/wa\.me\/61000000000/);
    assert.match(html, /\+61 000 000 000/);
    assert.doesNotMatch(html, /hello@yourbrand\.com|hola@tumarca\.com|fake testimonial|guaranteed rankings/i);
  }
});
