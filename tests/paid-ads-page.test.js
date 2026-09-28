const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "solutions", "paid-ads", "index.html"), "utf8");
const styles = fs.readFileSync(path.join(root, "assets", "css", "styles.css"), "utf8");

test("paid ads page exposes the SEO and conversion contract", () => {
  assert.match(html, /<body class="editorial-site paid-ads-page"/);
  assert.match(html, /<title>Paid Ads Agency for Search &amp; Social \| Ranking Rebels<\/title>/);
  assert.match(html, /<meta name="description" content="Paid ads management across Google,[^>]+tracking\." \/>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/rankingrebels\.com\/solutions\/paid-ads\/" \/>/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /Put paid media where buying decisions happen\./);
  assert.ok((html.match(/>Plan my paid media mix<\/a>/g) || []).length >= 3);
});

test("paid ads hero names every supported advertising platform", () => {
  assert.match(html, /class="pa-control-board"[^>]+data-media-slot="paid-media-command-centre"/);
  for (const platform of ["TikTok", "ChatGPT", "Facebook", "Instagram", "Pinterest", "Google", "YouTube", "LinkedIn"]) {
    assert.ok(html.includes(`>${platform}</span>`), `${platform} should appear in the hero`);
  }
  for (const asset of ["logo-facebook.svg", "logo-pinterest.svg", "logo-youtube.svg", "logo-linkedin.svg"]) {
    assert.ok(fs.existsSync(path.join(root, "assets", "images", "platforms", asset)), `${asset} should exist`);
  }
});

test("paid ads follows proof, process, pricing, FAQ and CTA order", () => {
  const ids = ["paid-results", "paid-process", "paid-pricing", "paid-faq", "paid-contact"];
  let previousIndex = -1;
  for (const id of ids) {
    const index = html.indexOf(`id="${id}"`);
    assert.ok(index > previousIndex, `${id} should appear in narrative order`);
    previousIndex = index;
  }
  assert.match(html, /href="\/case-studies\/#petrogrease"/);
  assert.match(html, /24\.8k/);
  assert.match(html, /13\.32%/);
  assert.match(html, /Past results do not guarantee future performance\./);
});

test("paid ads pricing preserves transparent campaign rules", () => {
  for (const price of ["AUD 350", "AUD 300 each", "AUD 250 each"]) assert.ok(html.includes(price));
  assert.equal((html.match(/Direct advertising spend excluded/g) || []).length, 3);
  assert.match(html, /A campaign is one platform, objective, market and audience structure\./);
});

test("visible paid ads FAQ matches FAQPage structured data", () => {
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

test("paid ads visuals are scoped, responsive and motion safe", () => {
  assert.match(styles, /\.paid-ads-page \.pa-control-board\s*\{/);
  assert.match(styles, /\.paid-ads-page \.pa-results-grid\s*\{/);
  assert.match(styles, /\.paid-ads-page \.pa-control-core strong\s*\{[\s\S]*?white-space: nowrap;/);
  assert.match(styles, /@media \(max-width: 700px\)[\s\S]*?\.paid-ads-page \.pa-platform-grid/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.paid-ads-page \.pa-control-board::after/);
  assert.match(html, /src="\/assets\/js\/paid-ads\.js/);
  assert.match(html, /src="\/assets\/js\/next-case-card\.js/);
});
