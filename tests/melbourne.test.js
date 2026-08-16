const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const pagePath = path.join(root, "locations", "australia", "melbourne", "index.html");
const scriptPath = path.join(root, "locations", "australia", "melbourne", "melbourne.js");
const stylesPath = path.join(root, "styles.css");
const html = fs.readFileSync(pagePath, "utf8");
const pageScript = fs.readFileSync(scriptPath, "utf8");
const styles = fs.readFileSync(stylesPath, "utf8");

const count = (pattern, source = html) => [...source.matchAll(pattern)].length;

test("Melbourne page has complete SEO metadata and structured data", () => {
  assert.equal(count(/<title>/g), 1);
  assert.equal(count(/<meta name="description"/g), 1);
  assert.equal(count(/<link rel="canonical"/g), 1);
  assert.match(html, /<title>Melbourne SEO, Local Search &amp; GEO \| Ranking Rebels<\/title>/);
  assert.match(html, /href="https:\/\/rankingrebels\.com\/locations\/australia\/melbourne\/"/);

  const structuredData = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const service = structuredData.find((entry) => entry["@type"] === "Service");
  const faq = structuredData.find((entry) => entry["@type"] === "FAQPage");
  assert.equal(service.areaServed.name, "Melbourne");
  assert.equal(faq.mainEntity.length, 10);
});

test("Melbourne page follows the requested commercial architecture", () => {
  assert.equal(count(/<h1(?:\s|>)/g), 1);
  assert.match(html, /<h1 id="melbourne-title">Turn Melbourne <span>search demand<\/span> into customers\.<\/h1>/);

  [
    "top",
    "results",
    "discovery-system-title",
    "optimise-title",
    "case-study-title",
    "rebels-title",
    "process-title",
    "market-title",
    "solutions-title",
    "engagement-title",
    "faq",
    "audit"
  ].forEach((id) => assert.match(html, new RegExp(`id="${id}"`)));

  assert.equal(count(/<details(?:\s|>)/g), 10);
  assert.equal(count(/<details open>/g), 1);
});

test("all performance claims use the verified Australian case-study data", () => {
  ["+62.7%", "+113.2%", "+22.4%", "+85.3%", "2,458", "1,198", "971", "289"].forEach((metric) => {
    assert.ok(html.includes(metric), `Expected verified metric ${metric}`);
  });
  assert.match(html, /Australian service business case study/i);
  assert.match(html, /March–July 2026, compared with March–July 2025/);
  assert.match(html, /Source: Google Business Profile Performance screenshots/);
  assert.doesNotMatch(html, /Melbourne (?:client|business) case study/i);
  assert.doesNotMatch(html, /placeholder|fake testimonial|guaranteed first-page/i);
});

test("primary conversion actions and audit form are consistent and accessible", () => {
  [
    "melbourne_header_audit_click",
    "melbourne_hero_audit_click",
    "melbourne_results_click",
    "melbourne_case_study_click",
    "melbourne_pricing_audit_click",
    "melbourne_final_audit_click"
  ].forEach((eventName) => assert.match(html, new RegExp(`data-event="${eventName}"`)));

  assert.ok(count(/href="#audit"/g) >= 4);
  assert.match(html, /href="#audit-form"[^>]+data-event="melbourne_final_audit_click"/);
  assert.match(html, /<form id="audit-form"/);
  assert.equal(count(/<label for="audit-/g), 5);
  assert.equal(count(/<input[^>]+required/g), 4);
  assert.match(html, /<button[^>]+type="submit">Request my audit<\/button>/);
  assert.match(html, /aria-live="polite"/);
  assert.doesNotMatch(html, />\s*Submit\s*</i);
});

test("analytics cover conversion, scroll depth, form state and FAQ engagement", () => {
  [
    "melbourne_scroll_depth",
    "melbourne_faq_open",
    "audit_form_start",
    "audit_form_submit",
    "audit_form_success",
    "audit_form_error"
  ].forEach((eventName) => assert.match(pageScript, new RegExp(`"${eventName}"`)));
  assert.match(pageScript, /\[25, 50, 75, 90\]/);
  assert.match(pageScript, /window\.dataLayer/);
  assert.match(pageScript, /https:\/\/wa\.me\/61439499441/);
});

test("local links and page assets resolve in the static site", () => {
  const references = [...html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[#?][^"]*)?"/g)].map((match) => match[1]);
  const missing = [];

  references.forEach((reference) => {
    if (reference === "/") return;
    const relative = reference.replace(/^\//, "");
    const target = reference.endsWith("/") ? path.join(root, relative, "index.html") : path.join(root, relative);
    if (!fs.existsSync(target)) missing.push(reference);
  });

  assert.deepEqual([...new Set(missing)], []);
});

test("Melbourne visuals remain scoped, responsive and motion-safe", () => {
  assert.match(html, /<body class="editorial-site">/);
  assert.match(html, /<div class="melbourne-page">/);
  assert.match(styles, /\/\* Melbourne commercial landing page \*\//);
  assert.match(styles, /\.melbourne-page \.system-map/);
  assert.match(styles, /\.melbourne-page \.market-network/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /@media \(max-width: 700px\)/);
});
