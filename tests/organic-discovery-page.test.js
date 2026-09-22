const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "solutions", "organic-discovery", "index.html"), "utf8");
const styles = fs.readFileSync(path.join(root, "assets", "css", "styles.css"), "utf8");

test("organic discovery page exposes the SEO and conversion contract", () => {
  assert.match(html, /<body class="editorial-site organic-discovery-page"/);
  assert.match(html, /<title>SEO &amp; GEO Agency for Organic Discovery \| Ranking Rebels<\/title>/);
  assert.match(html, /<meta name="description" content="SEO and GEO services[^>]+calls, bookings and sales\." \/>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/rankingrebels\.com\/solutions\/organic-discovery\/" \/>/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /Turn search intent into your next customer\./);
  assert.ok((html.match(/>Audit my search visibility<\/a>/g) || []).length >= 2);
});

test("organic discovery page follows the intent-to-outcome narrative", () => {
  const ids = ["how-search-works", "discovery-journey", "organic-method", "organic-proof", "organic-faq", "organic-contact"];
  let previousIndex = -1;

  for (const id of ids) {
    const index = html.indexOf(`id="${id}"`);
    assert.ok(index > previousIndex, `${id} should appear in narrative order`);
    previousIndex = index;
  }

  for (const outcome of ["Website visit", "WhatsApp chat", "Phone call", "Sale", "Appointment", "Qualified lead"]) {
    assert.ok(html.includes(outcome), `${outcome} should be visible`);
  }

  assert.equal((html.match(/data-media-slot=/g) || []).length, 2);
  assert.doesNotMatch(html, /future filmed sequence or product animation/i);
  assert.match(html, /class="od-discovery-map"[^>]+aria-label="Customer journey from intent to outcome"/);
  assert.match(styles, /\.organic-discovery-page \.od-discovery-map\s*\{[\s\S]*?min-height: 340px;/);
});

test("organic discovery uses the shared animated platform ribbon", () => {
  assert.match(html, /class="platform-ribbon od-platform-ribbon"/);
  assert.match(html, /src="\/assets\/js\/platform-ribbon\.js/);
  assert.equal((html.match(/class="platform-ribbon-group"/g) || []).length, 1);

  for (const platform of ["Google", "Bing", "Google Maps", "Apple Maps", "ChatGPT", "Perplexity", "Copilot"]) {
    assert.match(html, new RegExp(`<span>${platform}<\\/span>`));
  }

  assert.doesNotMatch(html, /<span>Bing Maps<\/span>/);

  assert.match(styles, /:is\([^)]*\.organic-discovery-page[^)]*\) \.platform-ribbon\.is-moving \.platform-ribbon-track/);
  assert.match(styles, /\.platform-ribbon:hover \.platform-ribbon-track \{ animation-play-state: paused; \}/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.platform-ribbon\.is-moving \.platform-ribbon-track \{ animation: none; \}/);
});

test("organic discovery contact actions use consistent decorative icons", () => {
  assert.equal((html.match(/class="od-action-icon/g) || []).length, 6);
  assert.equal((html.match(/od-action-icon-whatsapp/g) || []).length, 2);
  assert.match(styles, /\.organic-discovery-page \.od-action-icon\s*\{[\s\S]*?width: 20px;[\s\S]*?height: 20px;/);

  for (const action of ["Message", "Call", "Book", "Website visit", "WhatsApp chat", "Phone call"]) {
    assert.ok(html.includes(action), `${action} should be visible beside an icon`);
  }
});

test("organic discovery final CTA uses the shared card on the dark-red brand field", () => {
  assert.match(styles, /\.editorial-site\.organic-discovery-page main > \.od-final-cta\s*\{[\s\S]*?background-color: var\(--surface\);/);
  assert.match(styles, /\.editorial-site\.organic-discovery-page main > \.od-final-cta\s*\{[\s\S]*?border-color: var\(--border\);/);
  assert.match(styles, /\.organic-discovery-page \.od-final-cta h2,[\s\S]*?color: var\(--neutral\);/);
  assert.match(styles, /\.organic-discovery-page \.od-final-cta \.eyebrow\s*\{[\s\S]*?color: var\(--highlight\);/);
  assert.match(html, /class="next-case-card"[^>]+aria-label="Start a conversation about your business"/);
  assert.match(html, /<span class="next-case-label" data-next-case-protected>NEXT CHAPTER<\/span>/);
  assert.match(html, /src="\/assets\/images\/case-studies\/store-lucide\.svg"/);
  assert.match(html, /<span class="next-case-subtitle" data-next-case-protected>The next case starts here\.<\/span>/);
  assert.doesNotMatch(html, /od-discovery-card|od-card-action|od-card-note|search-visibility\.svg/);
  assert.match(html, /src="\/assets\/js\/next-case-card\.js/);
  assert.doesNotMatch(html, /class="od-final-action"/);
});

test("organic discovery proof section keeps its high-contrast editorial palette", () => {
  assert.match(styles, /\.editorial-site\.organic-discovery-page main > \.od-proof-section\s*\{[\s\S]*?background-color: #f2f1ec;[\s\S]*?color: #0a0b0e;/);
  assert.match(styles, /\.organic-discovery-page \.od-proof-heading \.button-secondary\s*\{[\s\S]*?background: #0a0b0e;[\s\S]*?color: #fff;/);
});

test("visible organic discovery FAQ matches FAQPage structured data", () => {
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(json, "JSON-LD should be present");
  const graph = JSON.parse(json)["@graph"];
  const faq = graph.find((entry) => entry["@type"] === "FAQPage");
  assert.equal(faq.mainEntity.length, 5);

  for (const entry of faq.mainEntity) {
    assert.ok(html.includes(entry.name), `${entry.name} should be visible`);
    assert.ok(html.includes(entry.acceptedAnswer.text), `${entry.name} answer should match visible copy`);
  }
});

test("organic discovery visuals are page-scoped, responsive and motion-safe", () => {
  assert.match(styles, /\.organic-discovery-page \.od-discovery-map\s*\{/);
  assert.match(styles, /\.organic-discovery-page \.od-engine-grid\s*\{/);
  assert.match(styles, /@media \(max-width: 700px\)[\s\S]*?\.organic-discovery-page \.od-discovery-map/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.organic-discovery-page/);
});
