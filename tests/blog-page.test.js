const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const route = '/blog/is-seo-still-relevant-ai-search/';
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

test('published article has indexable metadata and no preview-only claims', () => {
  const html = read(`${route.slice(1)}index.html`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.ok(html.includes(`<link rel="canonical" href="https://rankingrebels.com${route}" />`));
  assert.doesNotMatch(html, /noindex|Local preview|Editorial preview|Not published|fonts.googleapis.com/);
  assert.match(html, /<time datetime="2026-10-16">16 October 2026<\/time>/);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema['@type'], 'BlogPosting');
  assert.equal(schema.url, `https://rankingrebels.com${route}`);
  assert.equal(schema.inLanguage, 'en-AU');
  assert.equal(schema.datePublished, '2026-10-16');
  assert.equal(schema.dateModified, '2026-10-21');
  assert.equal(schema.publisher.name, 'Ranking Rebels');
  assert.equal(schema.author, undefined, 'do not invent a human author');
});

test('article keeps its complete evidence and accessible section navigation', () => {
  const html = read(`${route.slice(1)}index.html`);
  assert.equal((html.match(/<section class="article-section/g) || []).length, 9);
  assert.equal((html.match(/<table>/g) || []).length, 3);
  for (const detail of ['900 US adults', '68,879', '8%', '15%', '1%', 'hypothetical example, not a client result']) assert.ok(html.includes(detail), detail);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`), `missing anchor ${id}`);
  for (const name of ['privacy', 'cookies', 'legal']) assert.ok(html.includes(`href="/${name}/"`));
  assert.match(html, /A Melbourne example: choosing an office cleaner/);
  assert.doesNotMatch(html, /Brisbane/);
  for (const asset of ['seo-ai-discovery-illustration-1280.webp', 'seo-ai-discovery-illustration-768.webp', 'seo-ai-melbourne-journey.svg', 'seo-ai-melbourne-journey-mobile.svg']) {
    assert.ok(html.includes(`/assets/images/blog/${asset}`), `missing article image ${asset}`);
    assert.ok(fs.existsSync(path.join(root, 'assets/images/blog', asset)), `missing image file ${asset}`);
  }
  const script = read('assets/js/blog.js');
  assert.match(script, /heading\.focus/);
  assert.match(script, /prefers-reduced-motion/);
});

test('blog is discoverable from its hub, shared navigation and sitemap', () => {
  const hub = read('blog/index.html');
  assert.ok(hub.includes(`href="${route}"`));
  assert.match(hub, /rel="canonical" href="https:\/\/rankingrebels.com\/blog\/"/);
  assert.doesNotMatch(hub, /noindex/);
  assert.ok(read('assets/js/script.js').includes('href: "/blog/"'));
  for (const url of ['/blog/', route]) assert.ok(read('sitemap.xml').includes(`<loc>https://rankingrebels.com${url}</loc>`));
});
