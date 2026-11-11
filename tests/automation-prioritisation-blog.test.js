const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const route = '/blog/which-business-processes-to-automate-first/';
const body = html => html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)[1];
const schema = html => JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);

test('automation priorities publishes a complete indexable article with the approved reading and image', () => {
  const html = read(route.slice(1) + 'index.html'), article = body(html), data = schema(html);
  assert.match(html, /blog-automation-article theme-light/);
  assert.match(html, /--reading-bg: #f7f6f2/);
  assert.doesNotMatch(html, /noindex|Local draft|preview-switch|href="preview\.css|src="media\//);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((article.match(/<h2\b/g) || []).length, 8);
  assert.equal((article.match(/<h3\b/g) || []).length, 5);
  assert.equal((article.match(/<table>/g) || []).length, 3);
  assert.equal((article.match(/<figure\b/g) || []).length, 1);
  assert(html.includes(`rel="canonical" href="https://rankingrebels.com${route}"`));
  assert.equal(data.url, 'https://rankingrebels.com' + route);
  assert.equal(data.datePublished, '2026-10-30');
  assert.equal(data.dateModified, '2026-11-04');
  assert.equal(data.inLanguage, 'en-AU');
  assert.equal(data.publisher.name, 'Ranking Rebels');
  assert.equal(data.author, undefined);
  for (const meta of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:image']) assert(html.includes(meta));
  for (const width of [1280, 768]) {
    const name = `assets/images/blog/automation-prioritisation-illustration-v2-${width}.webp`;
    assert(html.includes(name)); assert(fs.existsSync(path.join(root, name)));
    if (fs.existsSync(path.join(root, 'scripts/public-files.json'))) assert(JSON.parse(read('scripts/public-files.json')).includes(name));
  }
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert(html.includes(`id="${id}"`));
  for (const phrase of ['Every number below is hypothetical', '720 − 320 = 400', 'Neither figure is a cash saving or ROI calculation', 'Count each unique enquiry once']) assert(article.includes(phrase));
  assert.equal(120 * 6 - (96 * 1 + 24 * 6 + 80), 400);
});

test('the seventh article is discoverable, reciprocally linked and isolated from unpublished destinations', () => {
  const html = read(route.slice(1) + 'index.html'), agents = read('blog/ai-agents-vs-workflow-automation/index.html');
  assert(body(html).includes('href="https://rankingrebels.com/blog/ai-agents-vs-workflow-automation/"'));
  assert(body(agents).includes(`href="https://rankingrebels.com${route}"`));
  assert.equal(schema(agents).datePublished, '2026-10-21');
  assert.equal(schema(agents).dateModified, '2026-11-04');
  const hub = read('blog/index.html'), sitemap = read('sitemap.xml');
  const routes = [...hub.matchAll(/class="blog-story" href="([^"]+)"/g)].map(m => m[1]);
  assert.equal(routes.length, 11); assert.equal(new Set(routes).size, 11); assert.equal(routes[0], '/blog/measure-digital-marketing-results/');
  assert.equal(schema(hub).hasPart.length, 11);
  assert.equal((hub.match(/<span class="blog-story-read">Read the article<\/span>/g) || []).length, 11);
  assert.doesNotMatch(hub, /↗/);
  assert(sitemap.includes(`<loc>https://rankingrebels.com${route}</loc><lastmod>2026-11-04</lastmod>`));
  for (const text of [html, agents, hub, sitemap]) assert.doesNotMatch(text, /facebook-instagram-advertising/);
});
