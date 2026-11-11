const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const route = '/blog/google-ads-for-service-businesses/';
const body = html => html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)[1];
const schema = html => JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);

test('the Google Ads guide preserves the reviewed scope, distinctions and publication identity', () => {
  const html = read(route.slice(1) + 'index.html'), article = body(html), data = schema(html);
  assert.match(html, /blog-ads-article theme-light/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((article.match(/<h2\b/g) || []).length, 10);
  assert.equal((article.match(/<table>/g) || []).length, 4);
  assert.equal((article.match(/<figure\b/g) || []).length, 2);
  assert.doesNotMatch(html, /noindex|Local draft|preview-switch|href="preview\.css|src="media\//);
  assert(html.includes(`rel="canonical" href="https://rankingrebels.com${route}"`));
  assert.equal(data.datePublished, '2026-11-05'); assert.equal(data.dateModified, '2026-11-11');
  assert.equal(data.inLanguage, 'en-AU'); assert.equal(data.author, undefined);
  assert.equal(data.publisher.name, 'Ranking Rebels');
  for (const text of ['This example is hypothetical', 'entirely hypothetical', 'excluding GST', 'not a complete company-wide customer acquisition cost', 'a custom goal', 'If a denominator is zero', 'paid and organic search guidance']) assert(article.includes(text));
  for (const value of ['AUD 10', 'AUD 50', 'AUD 125', 'AUD 500', 'AUD 700']) assert(article.includes(value));
  for (const key of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:image']) assert(html.includes(key));
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert(html.includes(`id="${id}"`));
});

test('the worksheet remains educational, complete and downloadable without observed business values', () => {
  const html = read(route.slice(1) + 'worksheet/index.html');
  assert(html.includes('content="noindex, follow"'));
  assert(html.includes(`rel="canonical" href="https://rankingrebels.com${route}worksheet/"`));
  assert(html.includes(`href="${route}#article"`));
  assert.doesNotMatch(html, /draft|available locally|has not been published|href="preview|href="recursos|<form\b|<input\b|<textarea\b/i);
  assert.equal((body(html).match(/<table>/g) || []).length, 5);
  const tables = [...body(html).matchAll(/<tbody>([\s\S]*?)<\/tbody>/g)];
  assert.equal((tables[0][1].match(/<td><\/td>/g) || []).length, 13);
  const costRows = [...tables[3][1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)];
  assert.equal(costRows.length, 11); for (const row of costRows) assert(row[1].endsWith('<td></td>'));
  const download = route + 'resources/search-to-enquiry-worksheet.md';
  assert(html.includes(`href="${download}" download`));
  const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, download))).digest('hex');
  assert.equal(hash, '6e06b107389ab7f0075c753a02be08d75d5343f9ccbd748c99eefdce644b15fd');
  assert(!read('sitemap.xml').includes(route + 'worksheet/'));
  for (const name of ['google-search-enquiry-illustration-1280.webp', 'google-search-enquiry-illustration-768.webp', 'search-to-enquiry.svg', 'search-to-enquiry-mobile.svg']) assert(fs.existsSync(path.join(root, 'assets/images/blog', name)));
});

test('Google Ads connects the relevant guides in both directions without exposing drafts', () => {
  const article = body(read(route.slice(1) + 'index.html'));
  for (const [slug, date] of [['what-is-seo', '2026-10-20'], ['website-visits-few-enquiries', '2026-10-26']]) {
    const previous = read(`blog/${slug}/index.html`);
    assert(article.includes(`href="https://rankingrebels.com/blog/${slug}/"`));
    assert(body(previous).includes(`href="https://rankingrebels.com${route}"`));
    assert.equal(schema(previous).datePublished, date); assert.equal(schema(previous).dateModified, '2026-11-11');
  }
  const hub = read('blog/index.html'), routes = [...hub.matchAll(/class="blog-story" href="([^"]+)"/g)].map(m => m[1]);
  assert.equal(routes.length, 11); assert.equal(new Set(routes).size, 11); assert.equal(routes[0], '/blog/measure-digital-marketing-results/');
  assert.equal(schema(hub).hasPart.length, 11);
  assert.equal((hub.match(/<span class="blog-story-read">Read the article<\/span>/g) || []).length, 11);
  assert.doesNotMatch(hub, /↗/);
  assert(read('sitemap.xml').includes(`<loc>https://rankingrebels.com${route}</loc><lastmod>2026-11-11</lastmod>`));
  for (const text of [article, hub, read('sitemap.xml')]) assert.doesNotMatch(text, /facebook-instagram-advertising|what-is-crm|how-tiktok-ads-works|update-or-delete-old-blog-posts|business-apps-stopped-syncing|customer-reviews-testimonials-website|seo-or-google-ads-budget/);
});
