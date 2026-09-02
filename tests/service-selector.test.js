const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const pages = [
  { file: "index.html", market: "Not specified", whatsapp: "61439499441", triggers: 4 },
  { file: "locations/australia/index.html", market: "Australia", whatsapp: "61439499441", triggers: 7 },
  { file: "locations/netherlands/index.html", market: "Netherlands", whatsapp: "31613390178", triggers: 3 },
  { file: "locations/latam/index.html", market: "LATAM", whatsapp: "61439499441", triggers: 3 },
];

const services = [
  "ChatGPT &amp; GEO",
  "Google SEO",
  "Instagram Ads",
  "Facebook Ads",
  "TikTok Ads",
  "AI Sales Agent",
  "AI WhatsApp Support",
  "AI Automation",
  "Other",
];

test("the four market pages expose the complete service selector contract", () => {
  for (const page of pages) {
    const html = read(page.file);
    assert.equal((html.match(/class="service-selector"/g) || []).length, 1, `${page.file} needs one selector`);
    assert.match(html, /id="service-selector"/);
    assert.match(html, /How can we [\s\S]*?help you get found[\s\S]*?\?/);
    assert.match(html, /class="[^"]*service-selector-submit[^"]*" type="submit" disabled>Get started<\/button>/);
    assert.match(html, new RegExp(`data-market="${page.market}"`));
    assert.match(html, new RegExp(`data-whatsapp="${page.whatsapp}"`));
    assert.equal((html.match(/name="services"/g) || []).length, services.length);
    services.forEach((service) => assert.match(html, new RegExp(`value="${service}"`)));
    assert.equal((html.match(/data-service-selector-trigger/g) || []).length, page.triggers);

    const remainingWhatsAppLinks = [...html.matchAll(/<a\b[^>]*href="https:\/\/wa\.me\/[^\"]+"[^>]*>([^<]+)<\/a>/g)];
    assert.equal(remainingWhatsAppLinks.length, 1, `${page.file} should keep only its footer WhatsApp utility link direct`);
    assert.equal(remainingWhatsAppLinks[0][1], "WhatsApp");
  }
});

test("the shared selector behavior opens an accessible dialog and builds the approved WhatsApp opener", () => {
  const script = read("assets/js/script.js");
  assert.match(script, /document\.createElement\("dialog"\)/);
  assert.match(script, /serviceDialog\.showModal\(\)/);
  assert.match(script, /serviceDialog\.addEventListener\("close", restoreInlineSelector\)/);
  assert.match(script, /event\.key === "Escape" && serviceDialog\.open/);
  assert.match(script, /lastServiceTrigger\?\.focus\(\)/);
  assert.match(script, /serviceSubmit\.disabled = !hasSelection/);
  assert.match(script, /Hi Ranking Rebels, I’d like to explore how you can help my business get found\./);
  assert.match(script, /I’m interested in:/);
  assert.match(script, /Market: \$\{market\}/);
  assert.match(script, /Could you tell me what the best next step is\?/);
  assert.match(script, /encodeURIComponent\(message\)/);
  assert.match(script, /window\.open\(whatsappUrl, "_blank", "noopener,noreferrer"\)/);
});

test("the approved brush is a project-owned transparent PNG", () => {
  const asset = path.join(root, "assets/images/home/service-selector-brush.png");
  assert.equal(fs.existsSync(asset), true);
  const bytes = fs.readFileSync(asset);
  assert.equal(bytes.subarray(1, 4).toString("ascii"), "PNG");
  assert.equal(bytes.readUInt8(25), 6, "PNG should use RGBA color mode");
});
