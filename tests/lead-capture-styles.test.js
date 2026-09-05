const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const styles = fs.readFileSync(path.join(root, "assets/css/styles.css"), "utf8");
const countryFlags = fs.readFileSync(path.join(root, "assets/vendor/country-flags.css"), "utf8");
const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");

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
  assert.match(styles, /\.rr-lead-capture-form[^{]*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)/);
  assert.match(styles, /\.rr-lead-capture-field-group--full[^{]*\{[\s\S]*?grid-column:\s*1\s*\/\s*-1/);
  assert.match(styles, /@media\s*\(max-height:\s*700px\)[\s\S]*?\.rr-lead-capture-form/);
  assert.match(styles, /\.rr-lead-capture-form\s*>\s*a[^{]*\{[\s\S]*?font-size:\s*(?:0\.7[0-9]|0\.8)rem/);
});

test("desktop lead capture follows the spacious single-column reference composition", () => {
  assert.match(styles, /@media\s*\(min-width:\s*601px\)[\s\S]*?\.rr-lead-capture-dialog\s*\{[\s\S]*?width:\s*min\(760px,\s*calc\(100vw\s*-\s*48px\)\)/);
  assert.match(styles, /@media\s*\(min-width:\s*601px\)[\s\S]*?\.rr-lead-capture-form\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)[\s\S]*?gap:\s*14px[\s\S]*?padding:\s*42px\s*46px/);
  assert.match(styles, /@media\s*\(min-width:\s*601px\)[\s\S]*?\.rr-lead-capture-form\s+h2\s*\{[\s\S]*?font-size:\s*2\.4rem[\s\S]*?white-space:\s*nowrap/);
  assert.match(styles, /@media\s*\(min-width:\s*601px\)[\s\S]*?\.rr-lead-capture-form\s+input:not\(\.rr-lead-capture-honeypot\)[\s\S]*?min-height:\s*58px/);
  assert.match(styles, /@media\s*\(min-width:\s*601px\)[\s\S]*?\.rr-lead-capture-phone-row\s*\{[\s\S]*?min-height:\s*58px/);
  assert.match(styles, /@media\s*\(min-width:\s*601px\)[\s\S]*?\.rr-lead-capture-form\s*>\s*button\[type="submit"\]\s*\{[\s\S]*?min-height:\s*56px/);
});

test("homepage cache key exposes the current graphical country-picker styles", () => {
  assert.match(homepage, /\/assets\/css\/styles\.css\?v=20260905-phone-focus/);
});

test("the phone control keeps the country choice visually compact", () => {
  assert.match(styles, /^@import\s+url\(["']\.\.\/vendor\/country-flags\.css["']\);/);
  assert.match(countryFlags, /\.flag\\:AU\s*\{/);
  assert.match(countryFlags, /background-image:\s*url\(["']data:image\/svg\+xml/);
  assert.match(styles, /\.rr-lead-capture-phone-row[^{]*\{[\s\S]*?grid-template-columns:\s*4[4-9]px\s+auto\s+minmax\(0,\s*1fr\)/);
  assert.match(styles, /\.rr-lead-capture-country-picker[^{]*\{[\s\S]*?position:\s*relative/);
  assert.match(styles, /\.rr-lead-capture-country-trigger[^{]*\{[\s\S]*?background:\s*transparent[\s\S]*?cursor:\s*pointer/);
  assert.match(styles, /\.rr-lead-capture-country-value[^{]*\{[\s\S]*?display:\s*none/);
  assert.match(styles, /\.rr-lead-capture-field--sr[^{]*\{[\s\S]*?clip-path:\s*inset\(50%\)/);
});

test("the phone row owns one focus ring without outlining the number input", () => {
  assert.match(styles, /\.rr-lead-capture-phone-row:focus-within\s*\{[\s\S]*?outline:\s*3px\s+solid\s+var\(--tertiary\)/);
  assert.match(styles, /\.rr-lead-capture-form\s+\.rr-lead-capture-country-trigger:focus-visible,\s*\.rr-lead-capture-form\s+\.rr-lead-capture-phone-row\s+input:focus-visible\s*\{[\s\S]*?outline:\s*0/);
});

test("the authored country popup uses real flags and an easy-to-scan three-column list", () => {
  assert.match(styles, /\.rr-lead-capture-country-menu[^{]*\{[\s\S]*?position:\s*fixed[\s\S]*?max-height:[\s\S]*?overflow:\s*hidden/);
  assert.match(styles, /\.rr-lead-capture-country-options[^{]*\{[\s\S]*?overflow-y:\s*auto/);
  assert.match(styles, /\.rr-lead-capture-country-option[^{]*\{[\s\S]*?grid-template-columns:\s*auto\s+minmax\(0,\s*1fr\)\s+auto/);
  assert.match(styles, /\.rr-lead-capture-country-option-flag[^{]*\{[\s\S]*?--CountryFlagIcon-height:/);
  assert.match(styles, /\.rr-lead-capture-country-option:hover[\s\S]*\.rr-lead-capture-country-option:focus-visible/);
  assert.match(styles, /\.rr-lead-capture-country-option\[aria-current="true"\]/);
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
