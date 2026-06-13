const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const normalize = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const pages = {
  en: "proposals/whatsapp-booking/index.html",
  es: "proposals/whatsapp-booking/es/index.html",
};

test("private booking landing files exist", () => {
  for (const file of [
    pages.en,
    pages.es,
    "proposals/whatsapp-booking/styles.css",
    "proposals/whatsapp-booking/script.js",
  ]) {
    assert.equal(exists(file), true, `${file} should exist`);
  }
});

test("both pages declare language and strong noindex directives", () => {
  const english = read(pages.en);
  const spanish = read(pages.es);

  assert.match(english, /<html lang="en">/);
  assert.match(spanish, /<html lang="es">/);

  for (const [language, html] of Object.entries({ english, spanish })) {
    assert.equal((html.match(/<title>/g) || []).length, 1, `${language} needs one title`);
    assert.match(html, /name="robots" content="noindex,nofollow,noarchive,nosnippet"/);
    assert.match(html, /name="googlebot" content="noindex,nofollow,noarchive,nosnippet"/);
    assert.doesNotMatch(html, /googletagmanager|google-analytics|gtag\s*\(/i);
  }

  const sitemap = read("sitemap.xml");
  assert.doesNotMatch(sitemap, /whatsapp-booking/);
  assert.doesNotMatch(read("robots.txt"), /Disallow:\s*\/proposals\/whatsapp-booking/);
});

test("language pages cross-link and load shared assets", () => {
  const english = read(pages.en);
  const spanish = read(pages.es);

  assert.match(english, /href="\/proposals\/whatsapp-booking\/es\/"/);
  assert.match(spanish, /href="\/proposals\/whatsapp-booking\/"/);

  for (const html of [english, spanish]) {
    assert.match(html, /href="\/proposals\/whatsapp-booking\/styles\.css"/);
    assert.match(html, /src="\/proposals\/whatsapp-booking\/script\.js" defer/);
  }
});

test("localized WhatsApp demo CTAs use the dummy number and message", () => {
  const english = read(pages.en);
  const spanish = read(pages.es);

  assert.match(english, /https:\/\/wa\.me\/61000000000\?text=Hi%20Ranking%20Rebels/);
  assert.match(spanish, /https:\/\/wa\.me\/61000000000\?text=Hola%20Ranking%20Rebels/);
  assert.match(english, /\+61 000 000 000/);
  assert.match(spanish, /\+61 000 000 000/);
});

test("both pages contain the complete booking flow and accessible interactions", () => {
  const expected = {
    en: ["WhatsApp", "availability", "Google Calendar", "2 days before", "1 day before", "2 hours before", "Coming soon"],
    es: ["WhatsApp", "disponibilidad", "Google Calendar", "2 d&iacute;as antes", "1 d&iacute;a antes", "2 horas antes", "Pr&oacute;ximamente"],
  };

  for (const [language, file] of Object.entries(pages)) {
    const html = read(file);
    for (const phrase of expected[language]) {
      assert.match(html, new RegExp(phrase, "i"), `${file} should include ${phrase}`);
    }
    assert.match(html, /role="tablist"/);
    assert.match(html, /role="tab"/);
    assert.match(html, /role="tabpanel"/);
    assert.match(html, /<details>/);
    assert.match(html, /Ranking Rebels/);
  }
});

test("sales copy avoids pricing, analytics, testimonials, and unverified claims", () => {
  for (const file of Object.values(pages)) {
    const copy = normalize(read(file));
    assert.doesNotMatch(copy, /\$|\u20ac|per month|por mes|pricing|precio|testimonial|testimonio|guaranteed|garantizado/i);
  }
});

