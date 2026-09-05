const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const styles = fs.readFileSync(path.join(root, "assets/css/styles.css"), "utf8");

// These selectors are the styling contract for the dialog rendered by lead-capture.js.
// The current template does not yet expose all of these hooks; keeping the contract
// explicit makes the CSS work intentionally red until the dialog states are completed.
const selector = (name) => new RegExp(`${name.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}\\s*\\{`);

test("lead capture has dedicated dialog, backdrop, form and field rules", () => {
  for (const name of [
    ".rr-lead-capture-dialog",
    ".rr-lead-capture-dialog::backdrop",
    ".rr-lead-capture-form",
    ".rr-lead-capture-field",
  ]) {
    assert.match(styles, selector(name), `${name} should have a dedicated CSS rule`);
  }
});

test("lead capture styles cover toast, pending, error and honeypot states", () => {
  for (const name of [
    ".rr-lead-capture-toast",
    ".rr-lead-capture-notice",
    ".rr-lead-capture-form.is-pending",
    ".rr-lead-capture-form.has-error",
    ".rr-lead-capture-honeypot",
    ".rr-lead-capture-close",
    ".rr-lead-capture-phone-row",
    ".rr-lead-capture-spinner",
  ]) {
    assert.match(styles, selector(name), `${name} should have a state/style rule`);
  }
});

test("mobile lead capture stays compact while retaining a safe scroll fallback", () => {
  assert.match(styles, /@media\s*\(max-width:\s*600px\)[\s\S]*?\.rr-lead-capture-form[^{]*\{[\s\S]*?grid-template-columns:\s*repeat\(2,/);
  assert.match(styles, /\.rr-lead-capture-field-group--full[^{]*\{[\s\S]*?grid-column:\s*1\s*\/\s*-1/);
  assert.match(styles, /@media\s*\(max-height:\s*700px\)[\s\S]*?\.rr-lead-capture-form/);
  assert.match(styles, /\.rr-lead-capture-form\s*>\s*a[^{]*\{[\s\S]*?font-size:\s*(?:0\.7[0-9]|0\.8)rem/);
});

test("lead capture dialog is flexible, bounded and internally scrollable", () => {
  assert.match(styles, /\.rr-lead-capture-dialog[^{]*\{[\s\S]*?width:\s*min\(/);
  assert.match(styles, /\.rr-lead-capture-dialog[^{]*\{[\s\S]*?max-width:\s*[^;]+;/);
  assert.match(styles, /\.rr-lead-capture-dialog[^{]*\{[\s\S]*?max-height:\s*[^;]+;/);
  assert.match(styles, /\.rr-lead-capture-form[^{]*\{[\s\S]*?overflow(?:-y)?:\s*(?:auto|scroll)/);
});

test("lead capture has visible keyboard focus and a 320px mobile scroll contract", () => {
  assert.match(styles, /\.rr-lead-capture-dialog[^}]*:focus-visible|\.rr-lead-capture-dialog\s+:focus-visible/);
  assert.match(styles, /@media\s*\(max-width:\s*320px\)[\s\S]*?\.rr-lead-capture-dialog/);
  assert.match(styles, /@media\s*\(max-width:\s*320px\)[\s\S]*?overflow(?:-y)?:\s*(?:auto|scroll)/);
  assert.match(styles, /@media\s*\(max-width:\s*320px\)[\s\S]*?padding(?:-inline)?:\s*[^;]*env\(safe-area-inset-(?:left|right)\)/);
  assert.match(styles, /@media\s*\(max-width:\s*320px\)[\s\S]*?\.rr-lead-capture-form[\s\S]*?max-height:\s*[^;]+;/);
  assert.match(styles, /\.rr-lead-capture-form[\s\S]*?overflow-y:\s*(?:auto|scroll)/);
  assert.match(styles, /\.rr-lead-capture-form\s*>\s*button[\s\S]*?min-height:\s*(?:4[4-9]|[5-9]\d)px/);
  assert.match(styles, /\.rr-lead-capture-form\s+input[^}]*\bmax-width:\s*100%/);
});

test("lead capture respects reduced motion", () => {
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.rr-lead-capture/);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?transition:\s*none/);
});

test("dialog states use contrast tokens and non-colour status cues", () => {
  assert.match(styles, /\.rr-lead-capture-dialog[^{]*\{[\s\S]*?background:\s*var\(--neutral\)/);
  assert.match(styles, /\.rr-lead-capture-dialog[^{]*\{[\s\S]*?color:\s*var\(--primary\)/);
  assert.match(styles, /\.rr-lead-capture-form\s*>\s*button[^{]*\{[\s\S]*?background:\s*var\(--tertiary\)[\s\S]*?color:\s*var\(--on-tertiary\)/);
  assert.match(styles, /\.rr-lead-capture-form\.is-pending[^{]*\{[\s\S]*?(?:cursor:\s*progress|opacity:\s*0\.[0-9]+)/);
  assert.match(styles, /\.rr-lead-capture-form\.has-error[^{]*\{[\s\S]*?(?:border|box-shadow|outline):/);
  assert.match(styles, /\.rr-lead-capture-error[^{]*\{[\s\S]*?font-weight:\s*[67-9]00/);
});

test("dialog remains usable in forced-colors mode", () => {
  assert.match(styles, /@media\s*\(forced-colors:\s*active\)[\s\S]*?\.rr-lead-capture-dialog/);
  assert.match(styles, /@media\s*\(forced-colors:\s*active\)[\s\S]*?forced-color-adjust:\s*auto/);
});

test("all site-owned scroll regions inherit the shared scrollbar treatment", () => {
  assert.match(styles, /html\s*\{[\s\S]*?scrollbar-color:\s*var\(--tertiary\)\s+transparent/);
  assert.match(styles, /\*::-webkit-scrollbar-thumb\s*\{/);
  assert.match(styles, /@media\s*\(forced-colors:\s*active\)[\s\S]*?scrollbar-color:\s*auto/);
});
