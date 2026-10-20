const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const route = '/blog/local-seo-google-maps-visibility/';
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const page = () => read(`${route.slice(1)}index.html`);
const decode = text => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const normalize = text => decode(text).replace(/\s+/g, ' ').trim();

test('local SEO publication has honest dates, indexable metadata and an editorial social image', () => {
  const html = page();
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.ok(html.includes(`<link rel="canonical" href="https://rankingrebels.com${route}" />`));
  assert.match(html, /<title>Local SEO: Improve Google Maps Visibility \| Ranking Rebels<\/title>/);
  assert.match(html, /<time datetime="2026-10-19">19 October 2026<\/time>/);
  assert.doesNotMatch(html, /noindex|Local preview|Editorial preview|Not published|fonts.googleapis.com/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /property="og:image" content="https:\/\/rankingrebels.com\/assets\/images\/blog\/local-seo-discovery-illustration-1280.webp"/);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema['@type'], 'BlogPosting');
  assert.equal(schema.datePublished, '2026-10-19');
  assert.equal(schema.dateModified, '2026-10-21');
  assert.equal(schema.inLanguage, 'en-AU');
  assert.equal(schema.url, `https://rankingrebels.com${route}`);
  assert.equal(schema.author, undefined, 'do not invent a human author');
});

test('publication preserves the reviewed manuscript, policy evidence and semantic lists', () => {
  const html = page();
  const source = read('docs/editorial/blog-local-seo-australia/03-articulo-local-seo-australia.md');
  const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)[1];
  const text = normalize(article.replace(/<\/(?:p|h2|h3|li|td|th|tr|figure|figcaption)>/g, ' ').replace(/<[^>]+>/g, ''));
  for (const line of source.split(/\r?\n/).filter(line => line.trim() && !/^(#|\||- )/.test(line))) {
    const prose = normalize(line.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replaceAll('**', ''));
    assert.ok(text.includes(prose), `missing reviewed paragraph: ${prose.slice(0, 70)}`);
  }
  for (const [, url] of source.matchAll(/\]\((https:\/\/[^)]+)\)/g)) assert.ok(html.includes(`href="${url}"`), `missing source ${url}`);
  assert.equal((article.match(/<section class="article-section/g) || []).length, 11);
  assert.equal((article.match(/<table>/g) || []).length, 3);
  assert.match(article, /<ul>\s*<li>A <strong>storefront business<\/strong>/);
  assert.doesNotMatch(article, /<p>- |\*\*storefront/);
  assert.match(article, /This example is hypothetical, not a Ranking Rebels client result/);
  assert.match(article, /six months/);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`), `missing navigation anchor ${id}`);
});

test('article has two purposeful visuals with responsive assets and reserved geometry', () => {
  const article = page().match(/<article\b[^>]*>([\s\S]*?)<\/article>/)[1];
  assert.equal((article.match(/<figure\b/g) || []).length, 2);
  for (const name of ['local-seo-discovery-illustration-1280.webp', 'local-seo-discovery-illustration-768.webp', 'local-seo-enquiry-journey.svg', 'local-seo-enquiry-journey-mobile.svg']) {
    assert.ok(article.includes(name));
    assert.ok(fs.existsSync(path.join(root, 'assets/images/blog', name)), `missing image ${name}`);
  }
  assert.match(article, /<source media="\(max-width: 600px\)" width="540" height="970"/);
  const diagram = read('assets/images/blog/local-seo-enquiry-journey.svg');
  assert.match(diagram, /viewBox="0 0 1000 440"/);
  assert.match(diagram, /Each stage needs evidence of its own/);
  assert.match(diagram, /<title id="title">/);
  assert.match(diagram, /<desc id="desc">/);
});

test('published articles remain discoverable and public build includes the local SEO assets', () => {
  const hub = read('blog/index.html');
  const stories = [...hub.matchAll(/<a class="blog-story" href="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(stories, ['/blog/ai-agents-vs-workflow-automation/', '/blog/what-is-seo/', route, '/blog/is-seo-still-relevant-ai-search/']);
  const schema = JSON.parse(hub.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema.hasPart.length, 4);
  assert.ok(read('sitemap.xml').includes(`<loc>https://rankingrebels.com${route}</loc>`));
  const manifest = path.join(root, 'scripts/public-files.json');
  if (fs.existsSync(manifest)) {
    const files = JSON.parse(fs.readFileSync(manifest, 'utf8'));
    for (const name of [route.slice(1) + 'index.html', 'assets/images/blog/local-seo-discovery-illustration-1280.webp', 'assets/images/blog/local-seo-discovery-illustration-768.webp', 'assets/images/blog/local-seo-enquiry-journey.svg', 'assets/images/blog/local-seo-enquiry-journey-mobile.svg']) assert.ok(files.includes(name), `missing deployment file ${name}`);
  }
});
