const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const schemas = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));

const offices = [
  {
    file: "locations/latin-america/medellin/index.html",
    route: "/locations/latin-america/medellin/",
    city: "Medellín",
    country: "Colombia",
    whatsapp: "61439499441",
  },
  {
    file: "locations/europe/amsterdam/index.html",
    route: "/locations/europe/amsterdam/",
    city: "Amsterdam",
    country: "Netherlands",
    whatsapp: "31613390178",
  },
];

test("new office landings have complete local SEO and conversion contracts", () => {
  for (const office of offices) {
    const html = read(office.file);
    const structured = schemas(html);
    const service = structured.find((entry) => entry["@type"] === "Service");
    const faq = structured.find((entry) => entry["@type"] === "FAQPage");

    assert.match(html, /<html lang="en">/);
    assert.match(html, new RegExp(`rel="canonical" href="https://rankingrebels\\.com${office.route}"`));
    assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1);
    assert.equal(service.areaServed.name, office.city);
    assert.equal(service.areaServed.containedInPlace.name, office.country);
    assert.equal(service.url, `https://rankingrebels.com${office.route}`);
    assert.equal(faq.mainEntity.length, 4);
    assert.equal((html.match(/<details(?:\s|>)/g) || []).length, 4);
    assert.match(html, new RegExp(`https://wa\\.me/${office.whatsapp}`));
    assert.doesNotMatch(html, /streetAddress|postalCode|guaranteed first-page|guaranteed rankings/i);
  }
});

test("selector configuration links every office and exposes accessible interaction states", () => {
  const script = read("script.js");
  const styles = read("styles.css");

  for (const route of [...offices.map((office) => office.route), "/locations/australia/melbourne/"]) {
    assert.ok(script.includes(route));
  }

  assert.match(script, /currentPath === office\.href/);
  assert.match(script, /setAttribute\("aria-current", "page"\)/);
  assert.match(script, /setAttribute\("aria-expanded", "false"\)/);
  assert.match(script, /event\.key === "ArrowDown"/);
  assert.match(script, /event\.key === "Escape"/);
  assert.match(script, /mobileNav\.append\(mobileLocations\)/);
  assert.match(styles, /\.location-panel\[hidden\]/);
  assert.match(styles, /\.mobile-location-group/);
  assert.match(styles, /\.location-option\.is-active/);
  assert.match(styles, /@media \(max-width: 980px\)[\s\S]*?\.editorial-site \.header-actions \{[\s\S]*?display: inline-flex/);
  assert.match(styles, /\.editorial-site \.header-actions > \.header-cta,[\s\S]*?\.language-switcher \{[\s\S]*?display: none/);
});

test("location hubs and sitemap expose current office URLs", () => {
  const hub = read("locations/index.html");
  const europe = read("locations/europe/index.html");
  const sitemap = read("sitemap.xml");

  for (const office of offices) {
    assert.ok(hub.includes(`href="${office.route}"`));
    assert.ok(sitemap.includes(`<loc>https://rankingrebels.com${office.route}</loc>`));
  }
  assert.ok(europe.includes('href="/locations/europe/amsterdam/"'));
  assert.doesNotMatch(sitemap, /\/locations\/europe\/netherlands\//);
});
