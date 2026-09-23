const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "solutions", "index.html"), "utf8");
const styles = fs.readFileSync(path.join(root, "assets", "css", "styles.css"), "utf8");

test("solutions page exposes its SEO and conversion contract", () => {
  assert.match(html, /<title>SEO, Paid Ads &amp; AI Automation Solutions \| Ranking Rebels<\/title>/);
  assert.match(html, /<meta name="description" content="Grow through SEO and AI search visibility, paid media, and practical AI automation\. Explore the connected growth solutions from Ranking Rebels\." \/>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/rankingrebels\.com\/solutions\/" \/>/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/Hi%20Ranking%20Rebels%2C%20I%27d%20like%20help%20choosing%20the%20right%20growth%20solution%20for%20my%20business\./g) || []).length, 2);
  assert.match(html, />Talk about your growth<\/a>/);
  assert.match(html, />Talk to Ranking Rebels<\/a>/);
});

test("solutions page presents three routes in narrative order", () => {
  const markers = ['id="solutions"', 'class="section solutions-system"', 'class="section solutions-evidence"', 'class="section final-cta solutions-final-cta"'];
  let previousIndex = -1;
  for (const marker of markers) {
    const index = html.indexOf(marker);
    assert.ok(index > previousIndex, `${marker} should appear in narrative order`);
    previousIndex = index;
  }

  for (const [number, name, route] of [
    ["01", "Organic Discovery", "/solutions/organic-discovery/"],
    ["02", "Paid Ads", "/solutions/paid-ads/"],
    ["03", "AI Automation", "/solutions/ai-automation/"],
  ]) {
    assert.match(html, new RegExp(`${number}[\\s\\S]*?<h3>${name}<\\/h3>[\\s\\S]*?href="${route.replaceAll("/", "\\/")}"`));
  }
});

test("solutions page keeps evidence qualified and traceable", () => {
  for (const metric of ["+113.2%", "24.8k", "56k"]) assert.ok(html.includes(metric));
  assert.match(html, /Google Business Profile · March–July 2026 compared with the same period in 2025\./);
  assert.match(html, /Google Ads · February 2025–August 2026\./);
  assert.match(html, /Figures come from separate client accounts/);
  assert.match(html, /href="\/case-studies\/">See selected client results<\/a>/);
});

test("solutions layout includes responsive and reduced-motion treatment", () => {
  assert.match(styles, /\.solutions-ledger-row\s*\{[\s\S]*?grid-template-columns:/);
  assert.match(styles, /\.solutions-system-flow\s*\{[\s\S]*?grid-template-columns:\s*repeat\(3,/);
  assert.match(styles, /@media \(max-width: 700px\)[\s\S]*?\.solutions-system-flow,[\s\S]*?\.solutions-proof-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr;/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.solutions-ledger-detail a span/);
});

test("solutions visual lift stays lightweight and page-scoped", () => {
  assert.match(html, /class="solutions-hero-signal"/);
  assert.equal((html.match(/class="solutions-ledger-media"/g) || []).length, 3);
  assert.equal((html.match(/class="solutions-system-visual"/g) || []).length, 3);
  assert.equal((html.match(/class="solution-route-link"/g) || []).length, 3);
  assert.match(styles, /\.solutions-index \.solutions-hero\s*\{[\s\S]*?display:\s*grid;/);
  assert.match(styles, /@media \(hover: hover\) and \(pointer: fine\)[\s\S]*?\.solutions-index \.solution-route-link:hover/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.solutions-index \.solution-route-link::after/);

  for (const asset of [
    "assets/images/home/organic-discovery-search.webp",
    "assets/images/home/paid-ads-platforms.webp",
    "assets/images/home/ai-automation-workflow.webp",
    "assets/images/solutions/automation-workflow.svg",
  ]) {
    const absolute = path.join(root, asset);
    assert.ok(fs.existsSync(absolute), `${asset} should exist`);
    assert.ok(fs.statSync(absolute).size < 75000, `${asset} should remain below 75KB`);
    assert.ok(html.includes(`/${asset}`), `${asset} should be referenced by Solutions`);
  }
});
