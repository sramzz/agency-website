const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const route = '/blog/custom-software-benefits/';
const body = html => html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)[1];
const schema = html => JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);

test('custom software publishes complete approved content with a full-proportion V2 illustration', () => {
  const html = read(route.slice(1) + 'index.html'), article = body(html), data = schema(html);
  assert.match(html, /blog-custom-software-article theme-light/);
  assert.match(html, /--reading-bg: #f7f6f2/);
  assert.doesNotMatch(html, /<meta name="robots" content="noindex|Local draft|preview-switch|href="preview\.css|src="media\//);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((article.match(/<h2\b/g) || []).length, 10);
  assert.equal((article.match(/<h3\b/g) || []).length, 5);
  assert.equal((article.match(/<table>/g) || []).length, 2);
  assert.equal((article.match(/<figure\b/g) || []).length, 1);
  assert.match(article, /width="1280" height="853"/);
  assert(html.includes(`rel="canonical" href="https://rankingrebels.com${route}"`));
  assert.equal(data.datePublished, '2026-11-02'); assert.equal(data.dateModified, '2026-11-04');
  assert.equal(data.url, 'https://rankingrebels.com' + route); assert.equal(data.inLanguage, 'en-AU');
  assert.equal(data.author, undefined); assert.equal(data.publisher.name, 'Ranking Rebels');
  for (const meta of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:image']) assert(html.includes(meta));
  for (const name of ['custom-software-illustration-v2-1280.webp', 'custom-software-illustration-v2-768.webp']) {
    assert(article.includes('/assets/images/blog/' + name)); assert(fs.existsSync(path.join(root, 'assets/images/blog', name)));
    if (fs.existsSync(path.join(root, 'scripts/public-files.json'))) assert(JSON.parse(read('scripts/public-files.json')).includes('assets/images/blog/' + name));
  }
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert(html.includes(`id="${id}"`));
  for (const phrase of ['The example remains hypothetical', 'It does not have to replace everything', 'IP created by a contractor', 'no meaningful universal price', 'prototype from a supported production service']) assert(article.includes(phrase));
});

test('custom software connects the relevant guides without publishing later drafts or changing original dates', () => {
  const article = body(read(route.slice(1) + 'index.html'));
  for (const [slug, originalDate] of [['ai-agents-vs-workflow-automation', '2026-10-21'], ['which-business-processes-to-automate-first', '2026-10-30']]) {
    const previous = read(`blog/${slug}/index.html`);
    assert(article.includes(`href="https://rankingrebels.com/blog/${slug}/"`)); assert(body(previous).includes(`href="https://rankingrebels.com${route}"`));
    assert.equal(schema(previous).datePublished, originalDate); assert.equal(schema(previous).dateModified, '2026-11-04');
  }
  const hub = read('blog/index.html'), sitemap = read('sitemap.xml');
  const routes = [...hub.matchAll(/class="blog-story" href="([^"]+)"/g)].map(m => m[1]);
  assert.equal(routes.length, 11); assert.equal(new Set(routes).size, 11); assert.equal(routes[0], '/blog/measure-digital-marketing-results/'); assert.equal(schema(hub).hasPart.length, 11);
  assert.equal((hub.match(/<span class="blog-story-read">Read the article<\/span>/g) || []).length, 11); assert.doesNotMatch(hub, /↗/);
  assert(sitemap.includes(`<loc>https://rankingrebels.com${route}</loc><lastmod>2026-11-04</lastmod>`));
  for (const text of [article, hub, sitemap]) assert.doesNotMatch(text, /facebook-instagram-advertising/);
});
