const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const styles = fs.readFileSync(path.join(root, "assets", "css", "styles.css"), "utf8");

test("the animated lighthouse lens fades into the lantern without a rectangular mobile edge", () => {
  const scopedLensRule = styles.match(
    /\.about-hero-lighthouse \.hero-lighthouse \.lighthouse-optic\s*\{([^}]*)\}/,
  );

  assert.ok(scopedLensRule, "expected a hero-scoped lighthouse optic rule");
  assert.match(scopedLensRule[1], /-webkit-mask-image:\s*radial-gradient\(/);
  assert.match(scopedLensRule[1], /mask-image:\s*radial-gradient\(/);
});
