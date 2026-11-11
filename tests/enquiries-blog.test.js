const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const route = '/blog/website-visits-few-enquiries/';
const page = () => read(route.slice(1) + 'index.html');
const article = html => html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)[1];
const plain = html => html.replace(/<\/(?:p|h2|h3|li|td|th|tr|figcaption)>/g, ' ').replace(/<[^>]+>/g, '').replaceAll('&amp;', '&').replaceAll('&quot;', '"').replace(/\s+/g, ' ').trim();
const strip = text => text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replaceAll('**', '').replaceAll('`', '');

test('enquiries publication preserves the approved manuscript, sources and structured content', () => {
  const html = page(), body = article(html);
  const source = read('docs/editorial/blog-visits-few-enquiries-australia/03-articulo-visits-few-enquiries-australia.md');
  for (const raw of source.trim().split(/\r?\n/).slice(1)) {
    const line = raw.trim();
    if (!line || /^\|[-| ]+\|$/.test(line)) continue;
    const parts = line.startsWith('|') ? line.slice(1, -1).split('|').map(s => s.trim()) : [line.replace(/^(?:#{2,3} |- |\d+\. )/, '')];
    for (const part of parts) assert.ok(plain(body).includes(strip(part)), `Missing approved content: ${part.slice(0, 80)}`);
  }
  for (const [, url] of source.matchAll(/\]\((https:\/\/[^)]+)\)/g)) assert.ok(body.includes(`href="${url}"`), url);
  assert.equal((body.match(/<section class="article-section/g) || []).length, 8);
  assert.equal((body.match(/<table>/g) || []).length, 2);
  assert.equal((body.match(/<figure\b/g) || []).length, 2);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`), id);
});

test('approved light reading and garden palette ship with real publication metadata and no draft controls', () => {
  const html = page();
  assert.match(html, /blog-enquiries-article theme-light/);
  assert.equal((html.match(/<link rel="stylesheet"/g) || []).length, 2);
  assert.doesNotMatch(html, /noindex|Local draft|preview-switch|href="preview\.css|src="media\//);
  assert.ok(html.includes(`rel="canonical" href="https://rankingrebels.com${route}"`));
  assert.match(html, /<time datetime="2026-10-26">26 October 2026<\/time>/);
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(data.datePublished, '2026-10-26');
  assert.equal(data.dateModified, '2026-11-11');
  assert.equal(data.inLanguage, 'en-AU');
  assert.equal(data.author, undefined);
  assert.equal(data.publisher.name, 'Ranking Rebels');
  const css = html.match(/<style data-enquiries-reading>([\s\S]*?)<\/style>/)[1];
  assert.match(css, /--reading-bg: #f7f6f2/);
  assert.match(css, /blog-enquiries-article \.blog-reading-surface/);
  assert.doesNotMatch(css, /preview-switch|theme-dark|blog-enquiries-preview/);
  for (const name of ['website-enquiries-illustration-v3-1280.webp', 'website-enquiries-illustration-v3-768.webp', 'enquiry-checks.svg', 'enquiry-checks-mobile.svg']) {
    const file = 'assets/images/blog/' + name;
    assert.ok(html.includes(file)); assert.ok(fs.existsSync(path.join(root, file)));
    if (fs.existsSync(path.join(root, 'scripts/public-files.json'))) assert.ok(JSON.parse(read('scripts/public-files.json')).includes(file));
  }
});

test('the seven-article library includes the useful reciprocal connections without draft links', () => {
  const previous = ['what-is-seo', 'ai-agents-vs-workflow-automation', 'local-seo-google-maps-visibility', 'is-seo-still-relevant-ai-search'];
  for (const slug of previous) {
    const html = read(`blog/${slug}/index.html`);
    assert.ok(article(html).includes(`href="https://rankingrebels.com${route}"`), slug);
    const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(data.dateModified, slug === 'ai-agents-vs-workflow-automation' ? '2026-11-04' : '2026-11-11');
  }
  for (const slug of previous.slice(0, 2)) assert.ok(article(page()).includes(`href="https://rankingrebels.com/blog/${slug}/"`));
  const hub = read('blog/index.html');
  const urls = [...hub.matchAll(/<a class="blog-story" href="([^"]+)"/g)].map(m => m[1]);
  assert.equal(urls.length, 11); assert.equal(new Set(urls).size, 11); assert.equal(urls[0], '/blog/measure-digital-marketing-results/');
  assert.equal(JSON.parse(hub.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]).hasPart.length, 11);
  assert.ok(read('sitemap.xml').includes(`<loc>https://rankingrebels.com${route}</loc><lastmod>2026-11-11</lastmod>`));
  for (const text of [hub, read('sitemap.xml'), page()]) assert.doesNotMatch(text, /facebook-instagram-advertising/);
});
