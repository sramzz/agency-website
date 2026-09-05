const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const html = fs.readFileSync(path.resolve(__dirname, "../assets/whatsapp-redirect.html"), "utf8");

test("the WhatsApp holding page is private, opener-free, and visibly loading", () => {
  assert.match(html, /<meta\s+name="robots"\s+content="noindex, nofollow"/i);
  assert.match(html, /Opening WhatsApp/i);
  assert.match(html, /class="spinner"/i);
  assert.match(html, /window\.opener\s*=\s*null/);
  assert.doesNotMatch(html, /firstName|lastName|companyName|email|phone|submissionId/i);
});
