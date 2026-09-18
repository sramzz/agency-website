const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const route = "proposals/titanium-gym-9c42e7";
const wellnessRoute = `${route}/wellness-recommendation`;
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const html = read(`${route}/index.html`);
const styles = read(`${route}/styles.css`);
const script = read(`${route}/script.js`);

test("Titanium proposal files and client assets retain their private route and shared image structure", () => {
  [
    `${route}/index.html`,
    `${route}/styles.css`,
    `${route}/script.js`,
    `assets/images/proposals/titanium-gym-9c42e7/titanium-gym-floor.jpg`,
    `assets/images/proposals/titanium-gym-9c42e7/titanium-hero-01.jpg`,
    `assets/images/platforms/logo-chatgpt.svg`,
    `assets/images/platforms/logo-google.svg`,
    `assets/images/platforms/logo-google-maps.svg`,
    `assets/images/case-studies/petrogrease-logo.webp`,
    `assets/images/case-studies/terraformados-antioquia-logo.png`,
    `assets/images/case-studies/tejas-trading-logo.webp`,
    `docs/qa/proposals/titanium-gym/final-visual-target.png`,
    `assets/images/proposals/titanium-gym-9c42e7/google-titanium-gym.jpeg`,
    `assets/images/proposals/titanium-gym-9c42e7/google-titanium-gym-search.jpeg`,
    `assets/images/proposals/titanium-gym-9c42e7/perplexity-gym-airport-west.jpeg`,
    `assets/images/proposals/titanium-gym-9c42e7/perplexity-gym-airport-west-comparison.png`,
    `assets/images/proposals/titanium-gym-9c42e7/chatgpt-gym-airport-west.png`,
    `assets/images/proposals/titanium-gym-9c42e7/copilot-gym-airport-west.png`,
    `assets/images/proposals/titanium-gym-9c42e7/bing-gym-airport-west.jpeg`,
    `assets/images/proposals/titanium-gym-9c42e7/meta-ad-library-titanium-gym.png`,
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
    "Our solutions address two business levers",
    "Titanium's desired online brand Identity",
    "Where discovery breaks down",
    "One Titanium growth system",
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

test("growth system flows directly into renumbered investment and discussion sections", () => {
  assert.match(html, /<section class="growth-system[\s\S]*?<span class="section-number">07<\/span>/);
  assert.match(html, /<section class="investment[\s\S]*?<span class="section-number">08<\/span>/);
  assert.match(html, /<section class="discussion[\s\S]*?<span class="section-number">09<\/span>/);
  assert.equal((html.match(/Depends on measurement/g) || []).length, 3);
  assert.doesNotMatch(html, /Measurement &amp; insights|Performance insights drive decisions, content and budget/);
  assert.doesNotMatch(html, /working-scope|scope-grid|Scope, timeline &amp; responsibilities|Editable engagement details|data-edit-key|data-reset-edits|contenteditable/);
  assert.doesNotMatch(styles, /\.measurement|\.working-scope|\.scope-grid|\.editable|\.text-button/);
  assert.doesNotMatch(script, /localStorage|data-edit-key|data-reset-edits|proposalId/);
});

test("coverage, discovery evidence and business levers are complete", () => {
  ["Google", "Bing", "Google Maps", "Bing Maps", "Apple Maps", "ChatGPT", "Perplexity", "Copilot", "Instagram", "TikTok"]
    .forEach((platform) => assert.ok(html.includes(platform), `${platform} should be present`));
  ["SEO + GEO", "SEM + GEM", "Social ads", "Marketing strategy", "AI process automation"]
    .forEach((service) => assert.ok(html.toLowerCase().includes(service.toLowerCase()), `${service} should be present`));
  assert.ok((html.match(/To verify/gi) || []).length >= 10);
  assert.match(html, /A public discovery snapshot across high-intent search, AI answers and paid media/);
  assert.match(html, /assets\/images\/platforms\/logo-chatgpt\.svg/);
  assert.match(read("assets/images/platforms/logo-chatgpt.svg"), /viewBox="140 220 280 280"/);
  assert.doesNotMatch(html, /guaranteed|first-page guarantee|#1 ranking/i);
});

test("section 06 uses supplied evidence and cautious findings", () => {
  const diagnosis = html.match(/<section class="diagnosis[\s\S]*?<\/section>/);
  assert.ok(diagnosis, "diagnosis section should exist");
  assert.equal((diagnosis[0].match(/data-evidence-src=/g) || []).length, 8);
  [
    "Search visibility",
    "Invisible in the basic discovery journey.",
    "Google",
    "Perplexity",
    "ChatGPT",
    "Copilot",
    "Bing",
    "No clearly attributable Titanium Gym ads were identified in the supplied public review.",
    "Account access is required to confirm spend, campaign status, targeting and conversion tracking.",
    "Strong offer.",
    "Under-expressed brand.",
    "Since 6 July",
  ].forEach((phrase) => assert.ok(diagnosis[0].includes(phrase), `${phrase} should be present`));
  assert.doesNotMatch(diagnosis[0], /Search \+ maps|evidence-placeholder|Audit evidence · to add|Working hypotheses/i);
  assert.doesNotMatch(diagnosis[0], /Titanium (?:is not|isn't) currently (?:advertising|spending)|zero ad spend/i);
});

test("evidence opens in an accessible same-page gallery", () => {
  assert.match(html, /<dialog class="evidence-lightbox"[^>]*aria-labelledby="evidence-lightbox-title"/);
  assert.match(html, /data-evidence-previous/);
  assert.match(html, /data-evidence-next/);
  assert.match(html, /data-evidence-close/);
  assert.match(script, /dialog\.showModal/);
  assert.match(script, /event\.key === "ArrowLeft"/);
  assert.match(script, /event\.key === "ArrowRight"/);
  assert.match(script, /event\.key === "Escape"/);
  assert.match(script, /dialog\.addEventListener\("close"/);
  assert.match(styles, /\.evidence-lightbox::backdrop/);
});

test("Colombian market proof uses named clients and verified headline metrics", () => {
  const proof = html.match(/<div class="proof-panel"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/);
  assert.ok(proof, "Colombian proof panel should exist");
  assert.equal((proof[0].match(/class="client-proof-row"/g) || []).length, 3);
  for (const expected of [
    "Petrogrease · SEO + SEM",
    "24.8k paid clicks · 4.65k organic clicks",
    "Terraformados Antioquia · SEO + SEM",
    "7.58k paid · 3.83k organic clicks · position 7",
    "Tejas Trading · SEO + Analytics",
    "56k active users · 55k new users",
    "/case-studies/#petrogrease",
    "/case-studies/#terraformados-antioquia",
    "/case-studies/#tejas-trading",
  ]) assert.ok(proof[0].includes(expected), `${expected} should be present`);
  assert.doesNotMatch(proof[0], /proof-slot|Client proof — to add/);
});

test("Titanium online identity merges private access and adds recovery", () => {
  assert.match(html, /<strong>Private, 24\/7<\/strong>/);
  assert.match(html, /Melbourne’s 24\/7 private, members-only strength gym and recovery destination\./);
  assert.match(html, /<strong>Recovery Centre<\/strong>/);
  assert.match(html, /Sunlighten mPulse saunas, compression boots, contrast suites and hyperbaric chambers\./);
  assert.doesNotMatch(html, /<strong>24\/7 access<\/strong>/i);
  const identity = html.match(/<div class="perception">([\s\S]*?)<\/div>\s*<\/div>\s*<p class="perception-summary">/);
  assert.ok(identity, "identity perception block should exist");
  assert.equal((identity[1].match(/<article>/g) || []).length, 4);
});

test("Australia plan pricing is copied accurately for an in-person presentation", () => {
  assert.match(html, /Start with foundations\. Grow into an AI optimized gym\./);
  assert.match(html, /Final recommendations follow the audit\./);
  ["AUD 1,080", "AUD 1,680", "AUD 2,980", "AUD 350", "AUD 300 each", "AUD 250 each"]
    .forEach((price) => assert.ok(html.includes(price), `${price} should be present`));
  assert.equal((html.match(/Discuss in person/g) || []).length, 0);
  assert.equal((html.match(/class="price-card(?: featured)?"/g) || []).length, 3);
  assert.equal((html.match(/class="plan-ads"/g) || []).length, 3);
  assert.doesNotMatch(html, /class="button button-(?:primary|outline)"/);
  ["Everything in Search Foundation", "Everything in Local Authority", "SEM, social ads and creative direction"]
    .forEach((scope) => assert.ok(html.includes(scope), `${scope} should be preserved`));
  assert.match(styles, /\.price-card\.featured \{ border-color: var\(--border\); background: var\(--surface-card\); \}/);
  assert.doesNotMatch(html, /book (?:a )?call|schedule (?:a )?meeting|calendly/i);
});

test("proposal is responsive, accessible and motion-safe", () => {
  assert.match(html, /<html lang="en">/);
  assert.match(html, /class="skip-link"/);
  assert.doesNotMatch(html, /contenteditable/);
  assert.match(html, /<noscript>/);
  assert.match(styles, /@media \(max-width: 820px\)/);
  assert.match(styles, /@media \(max-width: 600px\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /\.hero h1 span \{[^}]*white-space:\s*nowrap/);
  assert.match(styles, /\.hero h1 span \{[^}]*width:\s*max-content/);
  assert.match(styles, /font-size:\s*clamp\(64px,\s*6\.4vw,\s*96px\)/);
  assert.doesNotMatch(styles, /overflow-x:\s*hidden/);
});

test("wellness recommendation is a private standalone child page", () => {
  assert.equal(exists(`${wellnessRoute}/index.html`), true);
  assert.equal(exists(`${wellnessRoute}/styles.css`), true);

  const wellnessHtml = read(`${wellnessRoute}/index.html`);
  assert.match(wellnessHtml, /<html lang="en">/);
  assert.match(wellnessHtml, /name="robots" content="noindex,nofollow,noarchive,nosnippet,noimageindex"/);
  assert.match(wellnessHtml, /name="googlebot" content="noindex,nofollow,noarchive,nosnippet,noimageindex"/);
  assert.match(wellnessHtml, /name="bingbot" content="noindex,nofollow,noarchive,nosnippet,noimageindex"/);
  assert.match(wellnessHtml, /name="referrer" content="no-referrer"/);
  assert.match(wellnessHtml, /rel="canonical" href="https:\/\/rankingrebels\.com\/proposals\/titanium-gym-9c42e7\/wellness-recommendation\/"/);
  assert.doesNotMatch(wellnessHtml, /googletagmanager|google-analytics|gtag\s*\(|dataLayer|plausible|segment\.com/i);
  assert.doesNotMatch(read("sitemap.xml"), /wellness-recommendation|\/proposals\//);
});

test("wellness recommendation preserves the approved decision and technical guidance", () => {
  const wellnessHtml = read(`${wellnessRoute}/index.html`);
  const expected = [
    "titanium-gym.com/wellness/",
    "titanium-wellness.com",
    "titanium-gym.com/wellness/infrared-sauna/",
    "titanium-gym.com/wellness/ice-bath/",
    "titanium-gym.com/wellness/red-light-therapy/",
    "titanium-gym.com/wellness/compression-recovery/",
    "titanium-gym.com/wellness/pricing/",
    "titanium-gym.com/wellness/book/",
    "Recovery &amp; Wellness Airport West | Titanium Gym",
    "Premium Recovery and Wellness in Airport West",
    "301 redirect",
    "same Airport West location",
    "overlapping audience",
    "one business and one location",
    "reviews and brand trust",
    "internal links",
    "little additional benefit",
  ];
  expected.forEach((phrase) => assert.ok(wellnessHtml.includes(phrase), `${phrase} should be present`));

  assert.match(wellnessHtml, /<table class="decision-table"/);
  assert.equal((wellnessHtml.match(/<th scope="row"/g) || []).length, 3);
  assert.equal((wellnessHtml.match(/<section\b/g) || []).length, 3);
  const recommendedRow = wellnessHtml.indexOf('<tr class="recommended-row">');
  const newDomainRow = wellnessHtml.indexOf('<th scope="row"><span>New domain</span>');
  const subdomainRow = wellnessHtml.indexOf('<th scope="row"><span>Subdomain</span>');
  assert.ok(recommendedRow < newDomainRow && recommendedRow < subdomainRow, "recommended option should be the first table row");
  ["New domain", "Subdomain", "Subdirectory"].forEach((option) => {
    assert.ok(wellnessHtml.includes(option), `${option} should be compared`);
  });
  ["Demand capture", "Customer journey", "Brand architecture", "Operating model"]
    .forEach((criterion) => assert.ok(wellnessHtml.includes(criterion), `${criterion} should be assessed`));
  assert.match(wellnessHtml, /aria-labelledby="comparison-title"/);
  assert.match(wellnessHtml, /href="\.\.\/"/);
  assert.match(wellnessHtml, /class="skip-link"/);
  assert.doesNotMatch(wellnessHtml, /one content system|separate browsing journey|weakens the direct Titanium connection/i);
});

test("wellness recommendation is responsive, print-ready and motion-safe", () => {
  const wellnessStyles = read(`${wellnessRoute}/styles.css`);
  assert.match(wellnessStyles, /:focus-visible/);
  assert.match(wellnessStyles, /@media \(max-width: 900px\)/);
  assert.match(wellnessStyles, /@media \(max-width: 620px\)/);
  assert.match(wellnessStyles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(wellnessStyles, /@media print/);
  assert.doesNotMatch(wellnessStyles, /overflow-x:\s*hidden/);
});
