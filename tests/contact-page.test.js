const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/\r\n?/g, "\n");

test("contact page exposes the approved simple conversion structure", () => {
  const html = read("contact/index.html");
  assert.match(html, /<body class="editorial-site contact-page" data-market="Not specified">/);
  assert.match(html, /<p class="eyebrow">Contact<\/p>/);
  assert.match(html, /<h1[^>]*>How can we <span>help you\?<\/span><\/h1>/);
  assert.match(html, /<form[^>]*id="contact-form"[^>]*novalidate[^>]*class="rr-lead-capture-form contact-form"/);
  assert.match(html, /<section[^>]*class="contact-offices"[^>]*aria-labelledby="contact-offices-title"/);
  assert.match(html, /<h2 id="contact-offices-title">Our offices<\/h2>/);
  assert.ok(html.indexOf('id="contact-form"') < html.indexOf('id="contact-offices-title"'));
  assert.doesNotMatch(html, /<details>|testimonial|frequently asked/i);
});

test("contact form reuses the complete lead contract with visible labels", () => {
  const html = read("contact/index.html");
  for (const [name, label] of [
    ["firstName", "First Name"], ["lastName", "Last Name"], ["companyName", "Company Name"],
    ["email", "Email"], ["phone", "Phone number"],
  ]) {
    assert.match(html, new RegExp(`<label[^>]*for="contact-[^"]+"[^>]*>${label}<\\/label>`));
    assert.match(html, new RegExp(`<input[^>]*name="${name}"`));
  }
  assert.equal((html.match(/\brequired\b/g) || []).length, 1, "only the phone input should be required");
  assert.match(html, /name="phoneCountry"[^>]*type="hidden"[^>]*value="AU"/);
  assert.match(html, /name="website"[^>]*hidden/);
  assert.match(html, /data-turnstile[^>]*aria-label="Security verification"/);
  assert.match(html, /id="contact-form-status"[^>]*aria-live="polite"/);
  assert.match(html, /href="\/privacy\/">Privacy Policy<\/a>/);
  assert.match(html, /data-submit-label>Submit<\/span>/);
});

test("contact page publishes both confirmed offices and map actions", () => {
  const html = read("contact/index.html");
  assert.equal((html.match(/class="contact-office"/g) || []).length, 2);
  assert.equal((html.match(/<iframe\b/g) || []).length, 2);
  assert.match(html, /Binnenveer 13, 1381 BT Weesp, Netherlands/);
  assert.match(html, /href="tel:\+31613390178"[^>]*>\+31 6 1339 0178<\/a>/);
  assert.match(html, /23 Birmingham Street, Spotswood VIC 3015, Australia/);
  assert.doesNotMatch(html, /href="tel:\+61439499441"/);
  assert.doesNotMatch(html, />\+61 439 499 441<\/a>/);
  assert.equal((html.match(/>Chat on WhatsApp<\/a>/g) || []).length, 2);
  assert.equal((html.match(/href="#contact-form">Leave your details<\/a>/g) || []).length, 2);
  assert.equal((html.match(/href="mailto:info@rankingrebels\.com"/g) || []).length >= 2, true);
  assert.match(html, /href="https:\/\/share\.google\/MSDcnxLyRWiI6PMC1"[^>]*>Get directions<\/a>/);
  assert.match(html, /href="https:\/\/share\.google\/s7RPzcuil67HCeZrN"[^>]*>Get directions<\/a>/);
  for (const iframe of html.match(/<iframe\b[^>]*>/g) || []) {
    assert.match(iframe, /title="[^"]+"/);
    assert.match(iframe, /loading="lazy"/);
    assert.match(iframe, /referrerpolicy="strict-origin-when-cross-origin"/);
  }
});

test("contact metadata and structured data describe the two offices", () => {
  const html = read("contact/index.html");
  assert.match(html, /<title>Contact Ranking Rebels \| Australia &amp; Netherlands<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/rankingrebels\.com\/contact\/"/);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const page = schemas.find((schema) => schema["@type"] === "ContactPage");
  assert.ok(page);
  assert.equal(page.mainEntity.location.length, 2);
  assert.equal(page.mainEntity.location[0].telephone, "+31613390178");
  assert.equal("telephone" in page.mainEntity.location[1], false);
});

test("contact page styling remains scoped, responsive and motion safe", () => {
  const styles = read("assets/css/styles.css");
  assert.match(styles, /\.contact-page \.contact-hero\s*\{/);
  assert.match(styles, /\.contact-page \.contact-form-shell\s*\{[\s\S]*?background:\s*transparent/);
  assert.match(styles, /\.contact-page \.contact-form input:not\(\.rr-lead-capture-honeypot\)[\s\S]*?background:\s*#f5f6f7/);
  assert.match(styles, /\.contact-page \.contact-form\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(styles, /\.contact-page \.contact-map\s*\{[\s\S]*?aspect-ratio:/);
  assert.match(styles, /@media \(max-width:\s*700px\)[\s\S]*?\.contact-page \.contact-form\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)/);
  assert.match(styles, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.contact-page/);
});

test("contact runtime initializes the inline form with the existing lead pipeline", () => {
  const runtime = read("assets/js/contact-page.js");
  assert.match(runtime, /RankingRebelsLeadCapture/);
  assert.match(runtime, /initInline\(form,/);
  assert.match(runtime, /sourcePath:\s*"\/contact\/"/);
  assert.match(runtime, /ctaLabel:\s*"Submit"/);
  assert.match(runtime, /services:\s*\[\]/);
  assert.match(runtime, /market:\s*"Not specified"/);
  assert.doesNotMatch(runtime, /context\.market\s*=/);
  assert.match(runtime, /detectApproximateLocation/);
  assert.match(runtime, /buildWhatsAppUrl/);
});
