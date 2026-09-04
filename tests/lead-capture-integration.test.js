const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const pages = [
  { file: "index.html", market: "Not specified", ctas: 4 },
  { file: "solutions/index.html", market: "Not specified", ctas: 1 },
  { file: "solutions/organic-discovery/index.html", market: "Not specified", ctas: 2 },
  { file: "solutions/paid-ads/index.html", market: "Not specified", ctas: 4 },
  { file: "solutions/ai-automation/index.html", market: "Not specified", ctas: 2 },
  { file: "locations/index.html", market: "Not specified", ctas: 1 },
  { file: "locations/australia/index.html", market: "Australia", ctas: 7 },
  { file: "locations/netherlands/index.html", market: "Netherlands", ctas: 3 },
  { file: "locations/latam/index.html", market: "LATAM", ctas: 3 },
  { file: "case-studies/index.html", market: "Not specified", ctas: 3 },
  { file: "about/index.html", market: "Not specified", ctas: 2 },
  { file: "journey/index.html", market: "Not specified", ctas: 3 },
];

test("exactly 35 public commercial links opt in to shared lead capture", () => {
  let total = 0;
  for (const page of pages) {
    const html = read(page.file);
    const count = (html.match(/<a\b[^>]*\bdata-lead-capture\b[^>]*>/g) || []).length;
    assert.equal(count, page.ctas, `${page.file} commercial CTA count`);
    total += count;
  }
  assert.equal(total, 35);
});

test("each participating page declares market and loads lead capture before shared runtime", () => {
  for (const page of pages) {
    const html = read(page.file);
    assert.match(html, new RegExp(`<body\\b[^>]*data-market="${page.market}"`), `${page.file} market`);
    const leadIndex = html.indexOf('src="/assets/js/lead-capture.js');
    const runtimeIndex = html.indexOf('src="/assets/js/script.js');
    assert.ok(leadIndex >= 0, `${page.file} loads lead capture`);
    assert.ok(runtimeIndex > leadIndex, `${page.file} loads lead capture before script.js`);
  }
});

test("generic footer WhatsApp links remain direct and excluded", () => {
  for (const page of pages) {
    const footer = read(page.file).match(/<footer\b[\s\S]*?<\/footer>/)?.[0] || "";
    const whatsapp = footer.match(/<a\b[^>]*href="https:\/\/wa\.me\/[^"]*"[^>]*>WhatsApp<\/a>/)?.[0] || "";
    assert.ok(whatsapp, `${page.file} keeps a footer WhatsApp link`);
    assert.doesNotMatch(whatsapp, /data-lead-capture/);
  }
});

test("404 and private proposals do not load or opt in to lead capture", () => {
  for (const file of [
    "404.html",
    "proposals/titanium-gym-9c42e7/index.html",
    "proposals/whatsapp-booking/index.html",
    "proposals/whatsapp-booking/es/index.html",
    "proposals/winpress/index.html",
    "proposals/winpress/es/index.html",
  ]) {
    const html = read(file);
    assert.doesNotMatch(html, /lead-capture\.js|data-lead-capture/);
  }
});

test("service selector delegates its preserved WhatsApp context to lead capture", () => {
  const script = read("assets/js/script.js");
  assert.match(script, /RankingRebelsLeadCapture/);
  assert.match(script, /leadCapture\.open\(\{[\s\S]*whatsappUrl[\s\S]*ctaLabel[\s\S]*market[\s\S]*services[\s\S]*sourcePath[\s\S]*document[\s\S]*window/);
});
