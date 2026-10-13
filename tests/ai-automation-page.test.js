const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const pagePath = path.join(root, "solutions", "ai-automation", "index.html");

function readPage() {
  return fs.readFileSync(pagePath, "utf8");
}

test("AI automation page exposes the approved SEO and conversion contract", () => {
  const html = readPage();

  assert.match(html, /<body class="editorial-site ai-automation-page"/);
  assert.match(html, /<title>AI Automation for Service Businesses \| Ranking Rebels<\/title>/);
  assert.match(
    html,
    /<meta name="description" content="AI automation services for service businesses\. We map workflows, connect existing tools and keep human approval where judgement matters\." \/>/,
  );
  assert.match(html, /<link rel="canonical" href="https:\/\/rankingrebels\.com\/solutions\/ai-automation\/" \/>/);
  assert.match(html, /<meta property="og:title" content="AI Automation for Service Businesses \| Ranking Rebels" \/>/);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image" \/>/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /<h1[^>]*>AI automation for service businesses that saves time and wins more work\.<\/h1>/i);
  assert.ok((html.match(/>Start a conversation<\/a>/g) || []).length >= 2);
});

test("AI automation page keeps the method and follows the approved narrative order", () => {
  const html = readPage();
  const sectionIds = [
    "automation-value",
    "automation-method",
    "automation-examples",
    "automation-control",
    "automation-faq",
    "automation-contact",
  ];
  let previousIndex = -1;

  for (const id of sectionIds) {
    const index = html.indexOf(`id="${id}"`);
    assert.ok(index > previousIndex, `${id} should appear in the approved order`);
    previousIndex = index;
  }

  for (const methodStep of [
    "Find the bottleneck",
    "Map the work",
    "Write the playbook",
    "Connect predictable steps",
    "Add AI deliberately",
  ]) {
    assert.ok(html.includes(methodStep), `${methodStep} should remain in the method`);
  }

  assert.equal((html.match(/data-media-slot=/g) || []).length, 1);
  assert.doesNotMatch(html, /Adding AI to a leaky process only moves the leak/);
  assert.match(html, /href="\/journey\/"/);
  assert.match(html, /href="\/solutions\/"/);
});

test("visible FAQ content matches FAQPage structured data", () => {
  const html = readPage();
  const script = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, "page should expose JSON-LD");
  const graph = JSON.parse(script)["@graph"];
  const faq = graph.find((entry) => entry["@type"] === "FAQPage");
  assert.ok(faq, "page should expose FAQPage structured data");

  const expectedFaqs = [
    [
      "What is AI automation for a service business?",
      "It connects repeatable work across the tools your team already uses. Rules handle predictable steps, AI helps with language or classification, and people keep control of important decisions.",
    ],
    [
      "Where should we start?",
      "Start with one repeated task, delayed handoff or missed follow-up. We map how it works now, including the exceptions, before deciding whether automation is useful.",
    ],
    [
      "Can automation work with our existing tools?",
      "Often, yes. We first check the systems, data and permissions involved. The workflow is then designed around what can connect reliably without forcing an unnecessary replacement.",
    ],
    [
      "Will AI replace our team?",
      "The goal is to remove repetitive handling, not judgement or relationships. Your team stays responsible for approvals, unusual cases and the conversations where context matters.",
    ],
    [
      "How much does AI automation cost?",
      "Cost depends on the number of systems, the quality of the data, the exceptions and the level of ongoing support. We scope the workflow before recommending a build.",
    ],
    [
      "What should stay under human control?",
      "Sensitive decisions, unusual cases and high-impact actions should have a clear human review point. We define those handoffs when we write the playbook.",
    ],
  ];

  assert.equal(faq.mainEntity.length, expectedFaqs.length);
  for (const [question, answer] of expectedFaqs) {
    assert.ok(html.includes(question), `${question} should be visible`);
    assert.ok(html.includes(answer), `${question} answer should be visible`);
    const schemaQuestion = faq.mainEntity.find((entry) => entry.name === question);
    assert.equal(schemaQuestion?.acceptedAnswer?.text, answer);
  }
});

test("AI automation visual behavior is page-scoped and motion-safe", () => {
  const styles = fs.readFileSync(path.join(root, "assets", "css", "styles.css"), "utf8");

  assert.match(styles, /\.ai-automation-page \.automation-workflow\s*\{/);
  assert.match(styles, /\.ai-automation-page \.automation-value-grid\s*\{/);
  assert.match(styles, /@media \(hover: hover\) and \(pointer: fine\)[\s\S]*?\.ai-automation-page/);
  assert.match(styles, /\.ai-automation-page \.button:active\s*\{[^}]*transform:\s*scale\(0\.97\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.ai-automation-page/);
});

test("AI automation hero explains a customer conversation with human approval", () => {
  const html = readPage();
  assert.match(html, /data-automation-conversation data-phase="sent"/);
  assert.match(html, /Hi, can I book a service for Friday\?/);
  assert.match(html, /What time on Friday suits you\?/);
  assert.match(html, /Prepared|Reply prepared/);
  assert.match(html, /Approved by your team/);
  assert.doesNotMatch(html, /data-conversation-toggle|automation-conversation-controls|conversation-play-icon|conversation-pause-icon/);
  assert.doesNotMatch(html, /automation-conversation-footer|data-conversation-summary|data-conversation-replay|An illustrative enquiry workflow/);
  assert.match(html, /src="\/assets\/js\/automation-conversation\.js/);
  assert.doesNotMatch(html, /workflow-connector|workflow-node/);
});

test("human handoff rail is centered and final CTA reuses the case-study component", () => {
  const html = readPage();
  const styles = fs.readFileSync(path.join(root, "assets", "css", "styles.css"), "utf8");

  assert.doesNotMatch(html, /Bring us the task that keeps stealing time or losing momentum/);
  assert.match(html, /id="automation-contact" class="section banner next-case-banner automation-contact"/);
  assert.match(html, /data-next-case-card/);
  assert.match(html, /src="\/assets\/js\/next-case-card\.js/);
  assert.match(styles, /\.ai-automation-page \.automation-control-rail > div:not\(:last-child\)::after\s*\{[^}]*left:\s*29(?:\.5)?px/);
  assert.doesNotMatch(styles, /\.automation-control-rail::before\s*\{/);
});
