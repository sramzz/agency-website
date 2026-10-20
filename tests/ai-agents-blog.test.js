const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const route = '/blog/ai-agents-vs-workflow-automation/';
const page = () => read(route.slice(1) + 'index.html');
const article = html => html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)[1];
const plain = html => html.replace(/<\/(?:p|h2|h3|li|td|th|tr|figcaption)>/g, ' ').replace(/<[^>]+>/g, '').replaceAll('&amp;', '&').replaceAll('&quot;', '"').replace(/\s+/g, ' ').trim();
const strip = text => text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replaceAll('**', '');

test('agents publication preserves all reviewed content, evidence and semantic lists', () => {
  const html = page(), body = article(html);
  const source = read('docs/editorial/blog-ai-agents-workflows-australia/03-articulo-ai-agents-workflows-australia.md');
  for (const raw of source.trim().split(/\r?\n/).slice(1)) {
    const line = raw.trim();
    if (!line || /^\|[-| ]+\|$/.test(line)) continue;
    const parts = line.startsWith('|') ? line.slice(1, -1).split('|').map(s => s.trim()) : [line.replace(/^(?:#{2,3} |- |\d+\. )/, '')];
    for (const part of parts) assert.ok(plain(body).includes(strip(part)), `Missing reviewed content: ${part.slice(0, 80)}`);
  }
  for (const [, url] of source.matchAll(/\]\((https:\/\/[^)]+)\)/g)) assert.ok(body.includes(`href="${url}"`), url);
  assert.equal((body.match(/<section class="article-section/g) || []).length, 9);
  assert.equal((body.match(/<table>/g) || []).length, 2);
  assert.equal((body.match(/<li>/g) || []).length, 10);
  assert.match(body, /illustrative design, not a Ranking Rebels client case study/);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`), id);
});

test('agents page has indexable publication metadata, real dates and responsive visual assets', () => {
  const html = page();
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /<title>AI Agents vs Workflow Automation \| Ranking Rebels<\/title>/);
  assert.ok(html.includes(`rel="canonical" href="https://rankingrebels.com${route}"`));
  assert.doesNotMatch(html, /noindex|Local preview|Not published|href="preview.css|src="media\//);
  assert.match(html, /<time datetime="2026-10-21">21 October 2026<\/time>/);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema.datePublished, '2026-10-21');
  assert.equal(schema.dateModified, '2026-10-21');
  assert.equal(schema.inLanguage, 'en-AU');
  assert.equal(schema.author, undefined);
  assert.equal(schema.publisher.name, 'Ranking Rebels');
  assert.equal(schema.url, 'https://rankingrebels.com' + route);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.equal((article(html).match(/<figure\b/g) || []).length, 2);
  const names = ['ai-agents-workflow-illustration-1280.webp', 'ai-agents-workflow-illustration-768.webp', 'ai-agents-workflow-comparison.svg', 'ai-agents-workflow-comparison-mobile.svg'];
  for (const name of names) {
    const file = `assets/images/blog/${name}`;
    assert.ok(html.includes(file));
    assert.ok(fs.existsSync(path.join(root, file)));
    if (fs.existsSync(path.join(root, 'scripts/public-files.json'))) assert.ok(JSON.parse(read('scripts/public-files.json')).includes(file));
  }
  assert.match(html, /<source media="\(max-width: 600px\)" srcset="[^\"]+" width="540" height="1250"/);
});

test('new article is discoverable and preserves the contextual links with older articles', () => {
  const searchRoutes = ['/blog/is-seo-still-relevant-ai-search/', '/blog/local-seo-google-maps-visibility/'];
  for (const other of searchRoutes) {
    assert.ok(article(page()).includes(`href="https://rankingrebels.com${other}"`));
    assert.ok(article(read(other.slice(1) + 'index.html')).includes(`href="https://rankingrebels.com${route}"`));
  }
  const hub = read('blog/index.html');
  assert.equal((hub.match(/<a class="blog-story"/g) || []).length, 4);
  assert.ok(hub.includes(`href="${route}"`));
  const schema = JSON.parse(hub.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema.hasPart.length, 4);
  assert.equal(schema.hasPart[0].url, 'https://rankingrebels.com' + route);
  assert.ok(read('sitemap.xml').includes(`<loc>https://rankingrebels.com${route}</loc><lastmod>2026-10-21</lastmod>`));
});
