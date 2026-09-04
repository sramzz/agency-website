const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

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
  "/privacy/",
];

const routeFile = (route) => route === "/" ? "index.html" : `${route.slice(1)}index.html`;
const publicFiles = publicRoutes.map(routeFile);
const proposalFiles = [
  "proposals/titanium-gym-9c42e7/index.html",
  "proposals/whatsapp-booking/index.html",
  "proposals/whatsapp-booking/es/index.html",
  "proposals/winpress/index.html",
  "proposals/winpress/es/index.html",
];

test("public source files are valid UTF-8", () => {
  const decoder = new TextDecoder("utf-8", { fatal: true });
  const files = [...publicFiles, "404.html", "assets/css/styles.css", "assets/js/script.js"];
  for (const file of files) {
    assert.doesNotThrow(() => decoder.decode(fs.readFileSync(path.join(root, file))), `${file} should be valid UTF-8`);
  }
});

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  if ([".git", "node_modules", ".wrangler", "coverage", "dist", "build"].includes(entry.name)) return [];
  const absolute = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(absolute) : [absolute];
});

const localTarget = (url) => {
  const clean = url.split(/[?#]/)[0];
  if (!clean || !clean.startsWith("/")) return null;
  if (clean === "/") return "index.html";
  if (clean.endsWith("/")) return `${clean.slice(1)}index.html`;
  return clean.slice(1);
};

const schemas = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .map((match) => JSON.parse(match[1]));

test("the public route and sitemap inventories are exact", () => {
  for (const file of publicFiles) assert.equal(exists(file), true, `${file} should exist`);

  const actualPublicIndexFiles = walk(root)
    .filter((file) => file.endsWith(`${path.sep}index.html`))
    .filter((file) => !file.includes(`${path.sep}proposals${path.sep}`))
    .map((file) => path.relative(root, file).replaceAll(path.sep, "/"))
    .sort();
  assert.deepEqual(actualPublicIndexFiles, [...publicFiles].sort());

  const sitemapUrls = [...read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(sitemapUrls, publicRoutes.map((route) => `https://rankingrebels.com${route}`));
  assert.doesNotMatch(read("sitemap.xml"), /proposals|assets|404|contact|onboarding|\/es\//);
});

test("every public route has complete indexable metadata and shared navigation", () => {
  for (const route of publicRoutes) {
    const file = routeFile(route);
    const html = read(file);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${file} needs one H1`);
    assert.match(html, new RegExp(`rel="canonical" href="https://rankingrebels\\.com${route.replaceAll("/", "\\/")}"`));
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.doesNotMatch(html, /name="robots" content="noindex/i);
    assert.equal((html.match(/class="desktop-nav"/g) || []).length, 1, `${file} needs one desktop navigation mount`);
    assert.equal((html.match(/id="mobile-nav"/g) || []).length, 1, `${file} needs one mobile navigation mount`);
    assert.equal((html.match(/href="\/assets\/css\/styles\.css/g) || []).length, 1, `${file} needs shared CSS`);
    assert.equal((html.match(/src="\/assets\/js\/script\.js/g) || []).length, 1, `${file} needs shared navigation JS`);
    for (const schema of schemas(html)) {
      if (schema["@type"] !== "FAQPage") continue;
      for (const item of schema.mainEntity) {
        assert.ok(html.includes(item.name), `${file}: FAQ schema question should be visible`);
        assert.ok(html.includes(item.acceptedAnswer.text), `${file}: FAQ schema answer should match visible copy`);
      }
    }
  }
});

test("the solutions picker is indexable, reachable and fully linked", () => {
  const picker = read("solutions/index.html");
  assert.match(picker, /<p class="eyebrow">Solutions<\/p>/);
  assert.match(picker, /<h1>Choose how you want to grow\.<\/h1>/);
  assert.equal((picker.match(/class="solution-picker-card"/g) || []).length, 3);

  for (const [route, name] of [
    ["/solutions/organic-discovery/", "Organic Discovery"],
    ["/solutions/paid-ads/", "Paid Ads"],
    ["/solutions/ai-automation/", "AI Automation"],
  ]) {
    assert.match(picker, new RegExp(`<a class="solution-picker-card" href="${route.replaceAll("/", "\\/")}">[\\s\\S]*?${name}`));
  }

  const pickerSchema = schemas(picker).find((schema) => schema.mainEntity?.["@type"] === "ItemList");
  assert.ok(pickerSchema, "Solutions should include WebPage/ItemList structured data");
  assert.equal(pickerSchema.mainEntity.itemListElement.length, 3);

  const sharedScript = read("assets/js/script.js");
  assert.match(sharedScript, /Explore all solutions/);
  assert.equal((sharedScript.match(/href: "\/solutions\/"/g) || []).length, 2, "desktop and mobile navigation should link the picker");
  assert.match(read("index.html"), /<h2 id="solutions-title"><a href="\/solutions\/">Organic discovery, paid ads and automation built around revenue\.<\/a><\/h2>/);
});

test("navigation exposes exactly three solutions and three markets", () => {
  const script = read("assets/js/script.js");
  for (const expected of [
    'label: "Organic Discovery"', 'href: "/solutions/organic-discovery/"',
    'label: "Paid Ads"', 'href: "/solutions/paid-ads/"',
    'label: "AI Automation"', 'href: "/solutions/ai-automation/"',
    'name: "Australia"', 'href: "/locations/australia/"',
    'name: "Netherlands"', 'href: "/locations/netherlands/"',
    'name: "LATAM"', 'href: "/locations/latam/"',
  ]) assert.ok(script.includes(expected), `${expected} should be configured`);

  assert.equal((script.match(/const solutionLinks = \[/g) || []).length, 1);
  assert.equal((script.match(/const marketLocations = \[/g) || []).length, 1);
  for (const contract of ["aria-expanded", "aria-controls", "aria-haspopup", "aria-current", "ArrowDown", "Escape"]) {
    assert.ok(script.includes(contract), `navigation should retain ${contract}`);
  }
  assert.match(script, /Explore all solutions/);
  assert.match(script, /Choose a market/);
  assert.doesNotMatch(script, /officeLocations|data-office|Medellín|Amsterdam|Melbourne/);
});

test("public links and assets resolve without retired routes", () => {
  const retired = /\/(?:services|contact|onboarding|es|seo-agency|local-seo|technical-seo|seo-content|google-business-profile|google-ads-management|locations\/europe|locations\/latin-america|locations\/australia\/(?:melbourne|sydney|brisbane|gold-coast))(?:\/|["#?])/;

  for (const file of [...publicFiles, "404.html"]) {
    const html = read(file);
    assert.doesNotMatch(html, retired, `${file} should not link a retired route`);
    const urls = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
    for (const url of urls) {
      const target = localTarget(url);
      if (target) assert.equal(exists(target), true, `${file}: ${url} should resolve`);
    }
  }
});

test("production images are organized, SEO-named and have appropriate alt contracts", () => {
  const imageExtensions = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i;
  const imageFiles = walk(root).filter((file) => imageExtensions.test(file));
  for (const absolute of imageFiles) {
    const relative = path.relative(root, absolute);
    assert.ok(relative.startsWith(`assets${path.sep}images${path.sep}`) || relative.startsWith(`docs${path.sep}qa${path.sep}`), `${relative} should be under assets/images or docs/qa`);
    if (!relative.startsWith(`assets${path.sep}images${path.sep}`)) continue;
    assert.match(path.basename(relative), /^[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z0-9]+$/, `${relative} needs a descriptive lowercase hyphenated filename`);
  }

  for (const file of [...publicFiles, ...proposalFiles]) {
    const html = read(file);
    for (const match of html.matchAll(/<img\b[^>]*>/g)) {
      const tag = match[0];
      const src = tag.match(/src="([^"]+)"/)?.[1];
      if (/data-evidence-image/.test(tag)) {
        assert.match(read("proposals/titanium-gym-9c42e7/script.js"), /image\.alt = thumbnail\?\.alt/);
        continue;
      }
      assert.ok(src?.startsWith("/assets/images/"), `${file}: production image should use /assets/images/`);
      const alt = tag.match(/\balt="([^"]*)"/);
      assert.ok(alt, `${file}: image needs alt text`);
      if (alt[1] === "") assert.match(tag, /aria-hidden="true"/, `${file}: decorative image should be hidden`);
      else assert.doesNotMatch(alt[1], /^(?:image|photo|picture) of\b|\.(?:png|jpe?g|webp|svg)$/i, `${file}: alt text should be natural`);
    }
  }

  const hashes = new Map();
  for (const absolute of imageFiles.filter((file) => file.includes(`${path.sep}assets${path.sep}images${path.sep}`))) {
    const hash = crypto.createHash("sha256").update(fs.readFileSync(absolute)).digest("hex");
    assert.equal(hashes.has(hash), false, `${path.relative(root, absolute)} duplicates ${hashes.get(hash)}`);
    hashes.set(hash, path.relative(root, absolute));
  }
});

test("retired URL equivalents have the exact Cloudflare redirects", () => {
  const expected = [
    "/seo-agency/ /solutions/organic-discovery/ 301",
    "/local-seo/ /solutions/organic-discovery/ 301",
    "/technical-seo/ /solutions/organic-discovery/ 301",
    "/seo-content/ /solutions/organic-discovery/ 301",
    "/google-business-profile/ /solutions/organic-discovery/ 301",
    "/google-ads-management/ /solutions/paid-ads/ 301",
    "/locations/australia/melbourne/ /locations/australia/ 301",
    "/locations/australia/sydney/ /locations/australia/ 301",
    "/locations/australia/brisbane/ /locations/australia/ 301",
    "/locations/australia/gold-coast/ /locations/australia/ 301",
    "/locations/europe/ /locations/ 301",
    "/locations/europe/amsterdam/ /locations/netherlands/ 301",
    "/locations/europe/netherlands/ /locations/netherlands/ 301",
    "/locations/latin-america/medellin/ /locations/latam/ 301",
    "/contact/ / 301",
  ];
  assert.deepEqual(read("_redirects").trim().split(/\r?\n/), expected);
});

test("retired content is absent and the normal 404 is noindex", () => {
  for (const removed of ["contact", "onboarding", "es", "local-seo", "technical-seo", "seo-content", "google-business-profile", "locations/europe", "locations/latin-america"]) {
    assert.equal(exists(removed), false, `${removed} should be removed`);
  }
  const notFound = read("404.html");
  assert.match(notFound, /name="robots" content="noindex, follow"/);
  assert.equal((notFound.match(/<h1(?:\s|>)/g) || []).length, 1);
});

test("proposals stay unlisted, functional and private-by-directive", () => {
  const sitemap = read("sitemap.xml");
  const robots = read("robots.txt");
  assert.match(robots, /Disallow: \/proposals\//);
  assert.match(robots, /Disallow: \/assets\/images\/proposals\//);

  for (const file of proposalFiles) {
    const html = read(file);
    assert.match(html, /name="robots" content="noindex,nofollow,noarchive,nosnippet(?:,noimageindex)?"/);
    assert.doesNotMatch(sitemap, new RegExp(path.dirname(file).replaceAll("/", "\\/")));
    for (const url of [...html.matchAll(/(?:href|src|data-evidence-src)="([^"]+)"/g)].map((match) => match[1])) {
      const target = localTarget(url);
      if (target) assert.equal(exists(target), true, `${file}: ${url} should resolve`);
    }
  }

  const publicCopy = [...publicFiles, "404.html", "assets/js/script.js"].map(read).join("\n");
  assert.doesNotMatch(publicCopy, /\/proposals\//);
});

test("offering terminology is Solutions while semantic service phrases remain valid", () => {
  const publicText = [...publicFiles, "404.html", "assets/js/script.js"].map(read).join("\n");
  assert.doesNotMatch(publicText, /\/services\//i);
  assert.doesNotMatch(publicText.replace(/"@type"\s*:\s*"Service"/g, ""), />\s*Services\s*</i);
  assert.match(publicText, /service businesses/i, "semantic service-business wording should remain");
  assert.match(publicText, /"@type"\s*:\s*"Service"/, "Schema.org Service types should remain");
});
