const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const { calculateReadingProgress } = require(path.join(root, "scroll-progress.js"));

const htmlFiles = (directory = root) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git") return [];
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(absolutePath);
    return entry.name === "index.html" ? [absolutePath] : [];
  });

test("progress calculation is proportional and safely clamped", () => {
  assert.equal(calculateReadingProgress(0, 2000, 1000), 0);
  assert.equal(calculateReadingProgress(500, 2000, 1000), 0.5);
  assert.equal(calculateReadingProgress(1000, 2000, 1000), 1);
  assert.equal(calculateReadingProgress(1500, 2000, 1000), 1);
  assert.equal(calculateReadingProgress(-100, 2000, 1000), 0);
  assert.equal(calculateReadingProgress(0, 800, 1000), 0);
});

test("every website page loads the shared progress assets exactly once", () => {
  const pages = htmlFiles();
  assert.equal(pages.length, 33);

  for (const absolutePath of pages) {
    const relativePath = path.relative(root, absolutePath);
    const html = fs.readFileSync(absolutePath, "utf8");
    assert.equal((html.match(/href="\/scroll-progress\.css"/g) || []).length, 1, `${relativePath} should load progress CSS once`);
    assert.equal((html.match(/src="\/scroll-progress\.js"/g) || []).length, 1, `${relativePath} should load progress JS once`);
  }
});

test("progress assets use the shared red treatment and safe browser behavior", () => {
  const script = read("scroll-progress.js");
  const styles = read("scroll-progress.css");

  assert.match(script, /requestAnimationFrame/);
  assert.match(script, /ResizeObserver/);
  assert.match(script, /\.site-header, \.proposal-topbar, \.topbar/);
  assert.match(script, /setAttribute\("aria-hidden", "true"\)/);
  assert.match(styles, /height: 3px/);
  assert.match(styles, /background: #ff304f/);
  assert.match(styles, /pointer-events: none/);
  assert.match(styles, /transform-origin: left center/);
  assert.match(styles, /@media print/);
});
