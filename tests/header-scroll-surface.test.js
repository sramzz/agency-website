const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const styles = fs.readFileSync(path.join(root, "assets", "css", "styles.css"), "utf8");
const script = fs.readFileSync(path.join(root, "assets", "js", "script.js"), "utf8");
const publicHeaderPages = [
  "404.html",
  "index.html",
  "about/index.html",
  "case-studies/index.html",
  "contact/index.html",
  "journey/index.html",
  "locations/index.html",
  "locations/australia/index.html",
  "locations/latam/index.html",
  "locations/netherlands/index.html",
  "privacy/index.html",
  "solutions/index.html",
  "solutions/ai-automation/index.html",
  "solutions/organic-discovery/index.html",
  "solutions/paid-ads/index.html",
];

test("every public header page loads the same current shared assets", () => {
  for (const file of publicHeaderPages) {
    const html = fs.readFileSync(path.join(root, file), "utf8");
    assert.match(html, /\/assets\/css\/styles\.css\?v=20260926-header-surface-global/, `${file} should load the current shared styles`);
    assert.match(html, /\/assets\/js\/script\.js\?v=20260926-header-surface-global/, `${file} should load the current shared script`);
  }
});

test("the header surface fades independently from its contents", () => {
  assert.match(styles, /\.editorial-site\s*\{[\s\S]*?--site-header-height:\s*58px/);
  assert.match(styles, /\.site-header::before\s*\{[\s\S]*?opacity:\s*0;[\s\S]*?transition:\s*opacity 420ms linear/);
  assert.match(styles, /\.site-header\.is-scrolled::before\s*\{\s*opacity:\s*1;/);
  assert.doesNotMatch(styles, /\.site-header\.is-scrolled\s*\{[\s\S]*?opacity:/);
  assert.match(styles, /\.editorial-site \.site-header\s*\{[\s\S]*?min-height:\s*var\(--site-header-height\)[\s\S]*?margin-bottom:\s*calc\(-1 \* var\(--site-header-height\)\)/);
  assert.match(styles, /\.editorial-site main > :first-child\s*\{[\s\S]*?border-top:\s*var\(--site-header-height\) solid transparent;[\s\S]*?background-clip:\s*border-box/);
  assert.match(styles, /\.editorial-site \.site-header:not\(\.is-scrolled\) ~ \.reading-progress\s*\{[\s\S]*?opacity:\s*0/);
  assert.match(styles, /\.editorial-site \.reading-progress\s*\{[\s\S]*?transition:\s*opacity 420ms linear/);
});

test("the shared header enables its surface only after leaving the top", () => {
  assert.match(script, /const shouldShowSurface = window\.scrollY > 0;/);
  assert.match(script, /siteHeader\.classList\.toggle\("is-scrolled", shouldShowSurface\)/);
  assert.match(script, /window\.addEventListener\("scroll", syncHeaderSurface, \{ passive: true \}\)/);
});
