const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const serviceLead = require("../assets/js/service-lead.js");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const pages = [
  { file: "index.html", market: "Not specified", whatsapp: "61439499441", directContacts: 4 },
  { file: "locations/australia/index.html", market: "Australia", whatsapp: "61439499441", directContacts: 7 },
  { file: "locations/netherlands/index.html", market: "Netherlands", whatsapp: "31613390178", directContacts: 3 },
  { file: "locations/latam/index.html", market: "LATAM", whatsapp: "61439499441", directContacts: 3 },
];

const services = [
  "ChatGPT &amp; GEO",
  "Google SEO",
  "Google Ads",
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
    assert.match(html, /class="[^"]*service-selector-submit[^"]*" type="submit">Get started<\/button>/);
    assert.doesNotMatch(html, /service-selector-submit[^>]*disabled/);
    assert.match(html, new RegExp(`data-market="${page.market}"`));
    assert.match(html, new RegExp(`data-whatsapp="${page.whatsapp}"`));
    assert.equal((html.match(/name="services"/g) || []).length, services.length);
    services.forEach((service) => assert.match(html, new RegExp(`value="${service}"`)));
    const form = html.match(/<form class="service-selector"[\s\S]*?<\/form>/)?.[0] || "";
    const serviceOrder = [...form.matchAll(/value="([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(serviceOrder, services, `${page.file} should preserve the approved service order`);
    assert.equal((html.match(/data-service-selector-trigger/g) || []).length, 0);
    assert.equal((html.match(/data-whatsapp-contact/g) || []).length, page.directContacts);
    assert.match(html, /<script src="\/assets\/js\/service-lead\.js\?v=20260903-optional-services"><\/script>/);
    assert.match(html, /<script src="\/assets\/js\/script\.js\?v=20260903-optional-services"><\/script>/);

    const directContacts = [...html.matchAll(/<a\b[^>]*href="https:\/\/wa\.me\/31613390178"[^>]*data-whatsapp-contact[^>]*target="_blank"[^>]*rel="noreferrer"[^>]*>/g)];
    assert.equal(directContacts.length, page.directContacts, `${page.file} should expose direct WhatsApp CTAs`);
  }
});

test("the shared selector keeps commercial CTAs direct and uses the non-blocking lead-message helper", () => {
  const script = read("assets/js/script.js");
  assert.doesNotMatch(script, /document\.createElement\("dialog"\)/);
  assert.doesNotMatch(script, /serviceDialog\.showModal\(\)/);
  assert.doesNotMatch(script, /data-service-selector-trigger/);
  assert.match(script, /directWhatsappLinks/);
  assert.match(script, /resolveWhatsAppNumber\(location\)/);
  assert.doesNotMatch(script, /serviceSubmit\.disabled|if \(!selectedServices\.length\)/);
  assert.match(script, /detectApproximateLocation\(\)/);
  assert.match(script, /buildWhatsAppUrl\(selectedServices, approximateLocation\)/);
  assert.doesNotMatch(script, /navigator\.geolocation/);
  assert.doesNotMatch(script, /Market:/);
  assert.match(script, /window\.open\(whatsappUrl, "_blank", "noopener,noreferrer"\)/);
});

test("the mobile selector uses separate two-column cards while desktop keeps three columns", () => {
  const styles = read("assets/css/styles.css");
  assert.match(styles, /\.service-options\s*\{[\s\S]*?grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(styles, /@media \(max-width: 800px\)[\s\S]*?\.service-options\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(styles, /@media \(max-width: 800px\)[\s\S]*?\.service-option\s*\{[\s\S]*?border:\s*1px solid #e3e4e7[\s\S]*?border-radius:\s*8px/);
});

test("the mobile hover treatment cannot leave a red line after touch deselection", () => {
  const styles = read("assets/css/styles.css");
  const script = read("assets/js/script.js");
  assert.match(styles, /@media \(hover: hover\) and \(pointer: fine\) \{\s*\.service-option:hover/);
  assert.doesNotMatch(styles, /@media \(max-width: 800px\)[\s\S]*?\.service-option:hover/);
  assert.match(script, /servicePointerType === "touch"/);
  assert.match(script, /requestAnimationFrame\(\(\) => event\.target\.blur\(\)\)/);
});

test("the WhatsApp message preserves one or multiple selected service names", () => {
  const oneService = serviceLead.buildWhatsAppMessage(["ChatGPT & GEO"], { city: "Melbourne", country: "Australia", countryCode: "AU" });
  assert.equal(
    oneService,
    "Hi Ranking Rebels, I’d like to improve my business’s online visibility and reach more customers.\n\nI’m interested in:\n• ChatGPT & GEO\n\nLocation: Melbourne, Australia\n\nCould you recommend the best approach for my business?",
  );

  const severalServices = serviceLead.buildWhatsAppMessage(["Google SEO", "AI WhatsApp Support", "AI Automation"], {
    country: "Netherlands",
    countryCode: "NL",
  });
  assert.match(severalServices, /I’m interested in:\n• Google SEO\n• AI WhatsApp Support\n• AI Automation/);
  assert.match(severalServices, /Location: Netherlands/);
});

test("the WhatsApp message supports a general enquiry with no selected services", () => {
  const generalEnquiry = serviceLead.buildWhatsAppMessage([], {
    city: "Brisbane",
    country: "Australia",
    countryCode: "AU",
  });

  assert.equal(
    generalEnquiry,
    "Hi Ranking Rebels, I’d like to improve my business’s online visibility and reach more customers.\n\nLocation: Brisbane, Australia\n\nCould you recommend the best approach for my business?",
  );
  assert.doesNotMatch(generalEnquiry, /I’m interested in:|^• /m);
});

test("location formatting supports city plus country, country only, and a complete omission", () => {
  assert.equal(serviceLead.formatLocation({ city: "Melbourne", country: "Australia", countryCode: "AU" }), "Melbourne, Australia");
  assert.equal(serviceLead.formatLocation({ countryCode: "AU" }), "Australia");
  assert.equal(serviceLead.formatLocation({ city: "Unknown", country: "Not specified" }), "");

  const unavailable = serviceLead.buildWhatsAppMessage(["TikTok Ads"], null);
  assert.doesNotMatch(unavailable, /Location:|Market:|Not specified|Unknown|undefined/);
});

test("Cloudflare country detection is approximate, permission-free, and safely handles errors and timeouts", async () => {
  const detected = await serviceLead.detectApproximateLocation({
    fetchImpl: async () => ({ ok: true, text: async () => "ip=192.0.2.1\nloc=AU\ncolo=MEL\n" }),
    timeoutMs: 50,
  });
  assert.deepEqual(detected, { city: "", country: "Australia", countryCode: "AU" });

  const failed = await serviceLead.detectApproximateLocation({
    fetchImpl: async () => {
      throw new Error("network unavailable");
    },
    timeoutMs: 50,
  });
  assert.equal(failed, null);

  const timedOut = await serviceLead.detectApproximateLocation({
    fetchImpl: (_url, { signal }) =>
      new Promise((_resolve, reject) => {
        signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true });
      }),
    timeoutMs: 5,
  });
  assert.equal(timedOut, null);
});

test("WhatsApp routing uses the regional numbers and defaults to Netherlands without location", () => {
  assert.equal(serviceLead.resolveWhatsAppNumber({ countryCode: "AU" }), "61439499441");
  assert.equal(serviceLead.resolveWhatsAppNumber({ countryCode: "CO" }), "61439499441");
  assert.equal(serviceLead.resolveWhatsAppNumber({ countryCode: "NL" }), "31613390178");
  assert.equal(serviceLead.resolveWhatsAppNumber({ countryCode: "DE" }), "31613390178");
  assert.equal(serviceLead.resolveWhatsAppNumber(null), "31613390178");
});

test("the encoded wa.me URL is editable in both mobile WhatsApp and WhatsApp Web", () => {
  const url = serviceLead.buildWhatsAppUrl(["ChatGPT & GEO", "Google SEO"], {
    city: "Bogotá",
    country: "Colombia",
    countryCode: "CO",
  });
  const parsed = new URL(url);
  assert.equal(parsed.protocol, "https:");
  assert.equal(parsed.hostname, "wa.me");
  assert.equal(parsed.pathname, "/61439499441");
  assert.equal(
    parsed.searchParams.get("text"),
    "Hi Ranking Rebels, I’d like to improve my business’s online visibility and reach more customers.\n\nI’m interested in:\n• ChatGPT & GEO\n• Google SEO\n\nLocation: Bogotá, Colombia\n\nCould you recommend the best approach for my business?",
  );
  assert.doesNotMatch(url, /[’•\n ]/);
});

test("the approved brush is a project-owned transparent PNG", () => {
  const asset = path.join(root, "assets/images/home/service-selector-brush.png");
  assert.equal(fs.existsSync(asset), true);
  const bytes = fs.readFileSync(asset);
  assert.equal(bytes.subarray(1, 4).toString("ascii"), "PNG");
  assert.equal(bytes.readUInt8(25), 6, "PNG should use RGBA color mode");
});
