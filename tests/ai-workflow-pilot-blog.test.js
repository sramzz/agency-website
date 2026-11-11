const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const route = '/blog/how-to-build-ai-workflow/';
const body = html => html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)[1];
const schema = html => JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);

test('the approved workflow guide publishes its complete sections, illustration and truthful metadata', () => {
  const html = read(route.slice(1) + 'index.html'), article = body(html), data = schema(html);
  assert.match(html, /blog-workflow-pilot-article theme-light/);
  assert.match(html, /--reading-bg: #f7f6f2/);
  assert.doesNotMatch(html, /noindex|Local draft|preview-switch|href="preview\.css|src="media\//);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((article.match(/<h2\b/g) || []).length, 9);
  assert.equal((article.match(/<table>/g) || []).length, 3);
  assert.equal((article.match(/<figure\b/g) || []).length, 1);
  assert.match(article, /width="1280" height="720"/);
  assert(html.includes(`rel="canonical" href="https://rankingrebels.com${route}"`));
  assert.equal(data.datePublished, '2026-11-04'); assert.equal(data.dateModified, '2026-11-04');
  assert.equal(data.url, 'https://rankingrebels.com' + route); assert.equal(data.inLanguage, 'en-AU');
  assert.equal(data.author, undefined); assert.equal(data.publisher.name, 'Ranking Rebels');
  for (const key of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:image']) assert(html.includes(key));
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert(html.includes(`id="${id}"`));
  assert.match(article, /A unique identifier alone does not guarantee correct behaviour across systems/);
  assert.match(article, /Stopping the workflow does not automatically undo its previous effects/);
  assert(html.includes(`href="${route}pilot-kit/"`));
});

test('the public kit retains its twelve unrun cases, blank observations and exact educational downloads', () => {
  const kit = read(route.slice(1) + 'pilot-kit/index.html');
  assert.match(kit, /content="noindex, follow"/);
  assert(kit.includes(`rel="canonical" href="https://rankingrebels.com${route}pilot-kit/"`));
  assert.equal((kit.match(/class="kit-case"/g) || []).length, 12);
  assert.equal((kit.match(/<td><code>not_run<\/code><\/td>/g) || []).length, 12);
  assert.doesNotMatch(kit, /Local [Dd]raft|href="preview|href="recursos|<form\b|<input\b|<textarea\b/);
  assert(kit.includes(`href="${route}#article"`));
  const expected = {
    '07-pilot-kit.md': 'a5c6be5ef0eeb815db50570c34dfcc80c4678d6b363972226199d097bd92037e',
    '08-synthetic-development-cases.csv': 'c7ae8e184f937acf823f7f81238554ef73955106bcd87965d71731a60506c293',
    '09-development-results-template.csv': '8065416da3b4dfccc6864f4578c22306e8dc1d597569271a801b59137a838e67',
  };
  for (const [name, hash] of Object.entries(expected)) {
    const file = route.slice(1) + 'resources/' + name;
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex'), hash);
    assert(kit.includes(`href="/${file}" download`));
    if (fs.existsSync(path.join(root, 'scripts/public-files.json'))) assert(JSON.parse(read('scripts/public-files.json')).includes(file));
  }
  const rows = read(route.slice(1) + 'resources/09-development-results-template.csv').trim().split(/\r?\n/).slice(1);
  assert.equal(rows.length, 12);
  for (const row of rows) { const values = row.split(','); assert.equal(values[3], 'not_run'); assert(values.every((v, i) => i === 0 || i === 3 || v === '')); }
});

test('the new article connects four prior guides while preserving their publication dates', () => {
  const article = body(read(route.slice(1) + 'index.html'));
  for (const slug of ['ai-agents-vs-workflow-automation', 'which-business-processes-to-automate-first', 'custom-software-benefits']) assert(article.includes(`href="https://rankingrebels.com/blog/${slug}/"`));
  for (const [slug, date] of [['ai-agents-vs-workflow-automation', '2026-10-21'], ['website-visits-few-enquiries', '2026-10-26'], ['which-business-processes-to-automate-first', '2026-10-30'], ['custom-software-benefits', '2026-11-02']]) {
    const html = read(`blog/${slug}/index.html`);
    assert(body(html).includes(`href="https://rankingrebels.com${route}"`));
    assert.equal(schema(html).datePublished, date); assert.equal(schema(html).dateModified, slug === 'website-visits-few-enquiries' ? '2026-11-11' : '2026-11-04');
  }
  const hub = read('blog/index.html'), sitemap = read('sitemap.xml');
  const routes = [...hub.matchAll(/class="blog-story" href="([^"]+)"/g)].map(m => m[1]);
  assert.equal(routes.length, 11); assert.equal(new Set(routes).size, 11); assert.equal(routes[0], '/blog/measure-digital-marketing-results/');
  assert.equal(schema(hub).hasPart.length, 11);
  assert.equal((hub.match(/<span class="blog-story-read">Read the article<\/span>/g) || []).length, 11); assert.doesNotMatch(hub, /↗/);
  assert(sitemap.includes(`<loc>https://rankingrebels.com${route}</loc><lastmod>2026-11-04</lastmod>`));
  assert(!sitemap.includes(route + 'pilot-kit/'));
  for (const text of [article, hub, sitemap]) assert.doesNotMatch(text, /facebook-instagram-advertising|what-is-crm|how-tiktok-ads-works|update-or-delete-old-blog-posts|business-apps-stopped-syncing/);
});
