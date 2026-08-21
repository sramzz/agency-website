const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const route = "proposals/titanium-gym-9c42e7";
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const html = read(`${route}/index.html`);
const styles = read(`${route}/styles.css`);

test("Titanium proposal files and client assets stay inside the tokenized route", () => {
  [
    `${route}/index.html`,
    `${route}/styles.css`,
    `${route}/script.js`,
    `${route}/assets/titanium-gym-floor.jpg`,
    `${route}/assets/titanium-hero-01.jpg`,
    `${route}/assets/final-visual-target.png`,
  ].forEach((file) => assert.equal(exists(file), true, `${file} should exist`));

  const localReferences = [...html.matchAll(/(?:href|src)="(\/[^"#?]+)(?:[#?][^"]*)?"/g)]
    .map((match) => match[1])
    .filter((reference) => reference.startsWith(`/${route}/`));
  localReferences.forEach((reference) => {
    assert.equal(exists(reference.slice(1)), true, `${reference} should resolve`);
  });
});

test("proposal uses strong privacy directives and no analytics", () => {
  assert.match(html, /name="robots" content="noindex,nofollow,noarchive,nosnippet,noimageindex"/);
  assert.match(html, /name="googlebot" content="noindex,nofollow,noarchive,nosnippet,noimageindex"/);
  assert.match(html, /name="bingbot" content="noindex,nofollow,noarchive,nosnippet,noimageindex"/);
  assert.match(html, /name="referrer" content="no-referrer"/);
  assert.doesNotMatch(html, /googletagmanager|google-analytics|gtag\s*\(|dataLayer|plausible|segment\.com/i);
  assert.match(read("robots.txt"), /Disallow:\s*\/proposals\//);
  assert.doesNotMatch(read("sitemap.xml"), /titanium-gym-9c42e7|\/proposals\//);
});

test("selected narrative and requested sections are present in order", () => {
  const phrases = [
    "Get found <span>wherever</span> members search and ask.",
    "Channel &amp; platform coverage",
    "Who we are",
    "Our services address two business levers",
    "Titanium’s communicated online identity",
    "Where discovery breaks down",
    "One Titanium growth system",
    "Scope, timeline &amp; responsibilities",
    "Investment options",
    "In-person discussion",
  ];
  let cursor = -1;
  phrases.forEach((phrase) => {
    const next = html.indexOf(phrase);
    assert.ok(next > cursor, `${phrase} should appear in the requested order`);
    cursor = next;
  });
});

test("coverage, audit placeholders and business levers are complete", () => {
  ["Google", "Bing", "Google Maps", "Bing Maps", "Apple Maps", "ChatGPT", "Perplexity", "Copilot", "Instagram", "TikTok"]
    .forEach((platform) => assert.ok(html.includes(platform), `${platform} should be present`));
  ["SEO + GEO", "SEM + GEM", "Social ads", "Marketing strategy", "AI process automation"]
    .forEach((service) => assert.ok(html.toLowerCase().includes(service.toLowerCase()), `${service} should be present`));
  assert.ok((html.match(/To verify/gi) || []).length >= 10);
  assert.match(html, /Audit evidence · to add/);
  assert.doesNotMatch(html, /guaranteed|first-page guarantee|#1 ranking/i);
});

test("Australia plan pricing is copied accurately with discussion CTAs", () => {
  ["AUD 1,080", "AUD 1,680", "AUD 2,980", "AUD 350", "AUD 300 each", "AUD 250 each"]
    .forEach((price) => assert.ok(html.includes(price), `${price} should be present`));
  assert.equal((html.match(/Discuss in person/g) || []).length, 3);
  assert.doesNotMatch(html, /book (?:a )?call|schedule (?:a )?meeting|calendly/i);
});

test("proposal is responsive, accessible and motion-safe", () => {
  assert.match(html, /<html lang="en">/);
  assert.match(html, /class="skip-link"/);
  assert.match(html, /contenteditable="true"/);
  assert.match(html, /<noscript>/);
  assert.match(styles, /@media \(max-width: 820px\)/);
  assert.match(styles, /@media \(max-width: 600px\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(styles, /overflow-x:\s*hidden/);
});
