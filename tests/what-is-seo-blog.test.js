const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const route = '/blog/what-is-seo/';
const html = () => read('blog/what-is-seo/index.html');
const article = page => page.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)[1];
const plain = s => s.replace(/<\/(?:p|h2|h3|li|td|th|tr|figcaption)>/g,' ').replace(/<[^>]+>/g,'').replaceAll('&amp;','&').replaceAll('&quot;','"').replace(/\s+/g,' ').trim();

test('SEO foundations publication preserves the manuscript, source URLs and semantic structure', () => {
  const page = html(), body = article(page);
  const source = read('docs/editorial/blog-what-is-seo-australia/03-articulo-what-is-seo-australia.md');
  for (const line of source.split(/\r?\n/).filter(s => s.trim() && !/^(#|\|)/.test(s))) {
    const expected = line.replace(/^\d+\. /,'').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replaceAll('**','');
    assert.ok(plain(body).includes(expected), `Missing reviewed content: ${expected.slice(0,80)}`);
  }
  for (const [,url] of source.matchAll(/\]\((https:\/\/[^)]+)\)/g)) assert.ok(body.includes(`href="${url}"`),url);
  assert.equal((body.match(/<section class="article-section/g)||[]).length,10);
  assert.equal((body.match(/<table>/g)||[]).length,3);
  assert.equal((body.match(/<ol>/g)||[]).length,2);
  assert.equal((body.match(/<figure\b/g)||[]).length,2);
  assert.match(body,/hypothetical example, not a Ranking Rebels client result/);
  for (const [,id] of page.matchAll(/href="#([^"]+)"/g)) assert.ok(page.includes(`id="${id}"`),id);
});

test('SEO foundations has truthful publication metadata and deployable responsive images', () => {
  const page = html();
  assert.equal((page.match(/<h1\b/g)||[]).length,1);
  assert.match(page,/<title>What Is SEO\? How It Works \| Ranking Rebels<\/title>/);
  assert.ok(page.includes(`rel="canonical" href="https://rankingrebels.com${route}"`));
  assert.doesNotMatch(page,/noindex|Local preview|Not published|fonts.googleapis.com/);
  const schema = JSON.parse(page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema.datePublished,'2026-10-20');
  assert.equal(schema.dateModified,'2026-10-20');
  assert.equal(schema.inLanguage,'en-AU');
  assert.equal(schema.author,undefined);
  assert.equal(schema.publisher.name,'Ranking Rebels');
  assert.match(page,/name="twitter:card" content="summary_large_image"/);
  for(const suffix of ['landscaping-illustration-1280.webp','landscaping-illustration-768.webp','search-needs.svg','search-needs-mobile.svg']) {
    const file=`assets/images/blog/what-is-seo-${suffix}`;
    assert.ok(page.includes(file));
    assert.ok(fs.existsSync(path.join(root,file)));
    if(fs.existsSync(path.join(root,'scripts/public-files.json'))) assert.ok(JSON.parse(read('scripts/public-files.json')).includes(file));
  }
  assert.match(page,/<source media="\(max-width: 600px\)" width="540" height="1010"/);
  assert.match(read('assets/images/blog/what-is-seo-search-needs.svg'),/<title id="title">/);
});

test('the three search guides preserve their contextual links in both directions', () => {
  const routes = [route,'/blog/local-seo-google-maps-visibility/','/blog/is-seo-still-relevant-ai-search/'];
  for(const from of routes) {
    const body = article(read(`${from.slice(1)}index.html`));
    for(const to of routes.filter(r=>r!==from)) assert.ok(body.includes(`href="https://rankingrebels.com${to}"`),`${from} → ${to}`);
  }
  assert.doesNotMatch(article(html()), /href="https:\/\/rankingrebels.com\/blog\/ai-agents-vs-workflow-automation\//, 'omit unrelated links from the foundations guide');
});
