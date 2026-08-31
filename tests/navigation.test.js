const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const indexFiles = (directory = root) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git") return [];
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return indexFiles(absolutePath);
    return entry.name === "index.html" ? [absolutePath] : [];
  });

const publicFiles = () => indexFiles().filter((file) => !file.includes(`${path.sep}proposals${path.sep}`));

test("global navigation has one shared source of truth", () => {
  const script = read("script.js");
  const expected = [
    ["Local SEO + GEO Strategy", "/seo-agency/"],
    ["Ads SEM + GEM Management", "/google-ads-management/"],
    ["AI Process Automation", "/#ai-automation"],
    ["Journey", "/journey/"],
    ["Success Cases", "/case-studies/"],
    ["About us", "/about/"],
  ];

  for (const [label, href] of expected) {
    assert.ok(script.includes(`label: "${label}"`), `${label} should be configured once`);
    assert.ok(script.includes(`href: "${href}"`), `${label} should use ${href}`);
  }

  assert.match(script, /desktopNav\.replaceChildren/);
  assert.match(script, /mobileNav\.replaceChildren/);
  assert.match(script, /headerCta\.textContent = "Hire us!"/);
});

test("all public pages expose clean mounts and preserve page-specific CTA destinations", () => {
  const pages = publicFiles();
  assert.equal(pages.length, 30);

  for (const file of pages) {
    const relative = path.relative(root, file);
    const html = fs.readFileSync(file, "utf8");
    assert.equal((html.match(/class="desktop-nav"/g) || []).length, 1, `${relative} should have one desktop mount`);
    assert.equal((html.match(/id="mobile-nav"/g) || []).length, 1, `${relative} should have one mobile mount`);
    assert.match(html, /<button class="menu-toggle"[^>]*aria-label="Open navigation"/, `${relative} should name the mobile menu control`);
    assert.match(html, /<nav class="desktop-nav"[^>]*><\/nav>/, `${relative} desktop mount should remain generated`);
    assert.match(html, /<nav id="mobile-nav" class="mobile-nav"[^>]*><\/nav>/, `${relative} mobile mount should remain generated`);
    assert.equal((html.match(/src="(?:\/|\.\.\/)script\.js"/g) || []).length, 1, `${relative} should load shared navigation once`);
    assert.match(html, /<a class="header-cta"[^>]*href="[^"]+"[^>]*>Hire us!<\/a>/, `${relative} should preserve a working Hire us destination`);
  }

  assert.match(read("locations/australia/melbourne/index.html"), /<a class="header-cta" href="#audit"[^>]*>Hire us!<\/a>/);
  assert.match(read("locations/europe/netherlands/index.html"), /<a class="header-cta" href="\/locations\/europe\/amsterdam\/"[^>]*>Hire us!<\/a>/);
  assert.match(read("locations/europe/amsterdam/index.html"), /<a class="header-cta" href="https:\/\/wa\.me\/31613390178"[^>]*>Hire us!<\/a>/);
  assert.match(read("locations/latin-america/medellin/index.html"), /<a class="header-cta" href="https:\/\/wa\.me\/61439499441"[^>]*>Hire us!<\/a>/);
});

test("desktop and mobile dropdown contracts are accessible and mutually exclusive", () => {
  const script = read("script.js");
  const styles = read("styles.css");

  for (const contract of ["aria-expanded", "aria-controls", "aria-haspopup", "aria-current", "ArrowDown", "Escape"]) {
    assert.ok(script.includes(contract), `navigation should implement ${contract}`);
  }
  assert.match(script, /openSolutionsPanel[\s\S]*?closeLocationPanel\(\)/);
  assert.match(script, /openLocationPanel[\s\S]*?closeSolutionsPanel\(\)[\s\S]*?closeMobileMenu\(\)/);
  assert.match(script, /mobileSolutionsTrigger\.addEventListener\("click"/);
  assert.match(script, /mobileNav\.querySelectorAll\("a"\)/);
  assert.match(styles, /\.solutions-panel\[hidden\]/);
  assert.match(styles, /\.mobile-solutions-panel\[hidden\]/);
  assert.match(styles, /\.mobile-hire-cta/);
  assert.match(styles, /@media \(max-width: 980px\)/);
});

test("Journey and About are complete indexable public routes", () => {
  const sitemap = read("sitemap.xml");
  const routes = [
    { file: "journey/index.html", route: "/journey/", type: "WebPage", heading: "Clarity first. Execution next. Evidence always." },
    { file: "about/index.html", route: "/about/", type: "AboutPage", heading: "Visibility should lead somewhere useful." },
  ];

  for (const page of routes) {
    const html = read(page.file);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    assert.match(html, new RegExp(`rel="canonical" href="https://rankingrebels\\.com${page.route}"`));
    assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1);
    assert.ok(html.includes(page.heading));
    assert.ok(schemas.some((schema) => schema["@type"] === page.type));
    assert.ok(sitemap.includes(`<loc>https://rankingrebels.com${page.route}</loc>`));
  }

  const journey = read("journey/index.html");
  for (const stage of ["Discover", "Prioritise the strategy", "Build and launch", "Measure and improve"]) assert.ok(journey.includes(stage));
  assert.match(journey, /href="\/onboarding\/"/);

  const about = read("about/index.html");
  for (const city of ["Medellín", "Amsterdam", "Melbourne"]) assert.ok(about.includes(city));
  for (const route of ["/local-seo/", "/technical-seo/", "/seo-content/", "/google-business-profile/"]) assert.ok(about.includes(`href="${route}"`));
  assert.doesNotMatch(about, /streetAddress|postalCode|guaranteed rankings/i);
});

test("private proposals do not adopt the shared navigation", () => {
  const proposals = indexFiles().filter((file) => file.includes(`${path.sep}proposals${path.sep}`));
  assert.equal(proposals.length, 5);
  for (const file of proposals) {
    const html = fs.readFileSync(file, "utf8");
    assert.doesNotMatch(html, /src="\/script\.js"/);
    assert.doesNotMatch(html, /class="solutions-switcher"/);
  }
});
