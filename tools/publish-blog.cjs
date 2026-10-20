const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const editorial = path.join(root, 'docs/editorial/blog-seo-ai-australia');
require(path.join(editorial, 'render-preview.cjs'));
const route = '/blog/is-seo-still-relevant-ai-search/';
const canonical = `https://rankingrebels.com${route}`;
const date = '<time datetime="2026-10-16">16 October 2026</time>';
const description = 'See how SEO helps customers find your business as Google and ChatGPT change search, with a Melbourne example and practical steps for your website.';
const readingMinutes = Math.ceil(fs.readFileSync(path.join(editorial, '04-blog-seo-ai-australia.md'), 'utf8').replace(/\]\([^)]+\)/g, ']').split(/\s+/).length / 220);
const title = 'Is SEO Still Relevant in the Age of ChatGPT and AI Search?';
let html = fs.readFileSync(path.join(editorial, 'preview.html'), 'utf8');
html = html.replace('  <meta name="robots" content="noindex, nofollow" />\n', '')
  .replace(/  <link rel="preconnect"[^\n]+\n/g, '')
  .replace(/  <link href="https:\/\/fonts.googleapis.com[^\n]+\n/g, '')
  .replace('  <link rel="stylesheet" href="/assets/css/scroll-progress.css" />\n', '')
  .replace('href="preview.css"', 'href="/assets/css/blog.css?v=20261020-seo-fundamentals"')
  .replace('src="preview.js"', 'src="/assets/js/blog.js?v=20261019-melbourne"')
  .replace('<span aria-current="page">Journal</span>', '<a href="/blog/">Blog</a><span aria-hidden="true">/</span><span aria-current="page">SEO &amp; AI search</span>')
  .replace(/<span class="blog-version"><i aria-hidden="true"><\/i>Local preview · V\d+<\/span>/, `<span class="blog-version">${date}</span>`)
  .replace('Editorial preview · Not published', 'Ranking Rebels · Australia')
  .replace('THE RANKING REBELS JOURNAL', 'THE RANKING REBELS BLOG')
  .replace('<span>Editorial preview</span>', '')
  .replace('<a href="/contact/">Contact</a><span>Ranking Rebels · Australia</span>', '<a href="/contact/">Contact</a><a href="/privacy/">Privacy Policy</a><a href="/cookies/">Cookies &amp; Storage</a><a href="/legal/">Legal Information</a><span>Ranking Rebels · Australia</span>')
  .replace('  <meta name="theme-color"', `  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:locale" content="en_AU" />
  <meta name="twitter:card" content="summary" />
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: title,
    description, url: canonical, mainEntityOfPage: canonical, inLanguage: 'en-AU',
    datePublished: '2026-10-16', dateModified: '2026-10-21',
    publisher: { '@type': 'Organization', name: 'Ranking Rebels', url: 'https://rankingrebels.com/' }
  })}</script>
  <script src="/assets/js/google-analytics.js?v=20260920" defer></script>
  <meta name="theme-color"`);
const folder = path.join(root, route);
fs.mkdirSync(folder, { recursive: true });
fs.writeFileSync(path.join(folder, 'index.html'), html);

const articleStart = html.indexOf('    <section class="blog-cover"');
const articleEnd = html.indexOf('  </main>');
const hubBody = `    <section class="blog-cover blog-hub" aria-labelledby="blog-title">
      <div class="blog-cover-top"><nav aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Blog</span></nav></div>
      <div class="blog-kicker"><span>The Ranking Rebels blog</span><span>Search, explained.</span></div>
      <h1 id="blog-title">Make sense<br />of <span>being found.</span></h1>
      <div class="blog-cover-bottom"><p>Practical reading on SEO and AI search for businesses that want to connect discovery with useful enquiries.</p></div>
      <div class="blog-cover-rule"><span>THE LATEST</span><span>SEO &amp; AI SEARCH</span></div>
    </section>
    <section class="blog-list" aria-label="Latest articles"><a class="blog-story" href="${route}"><div class="blog-story-label"><span>01 / SEO &amp; AI search</span><span>${date} · ${readingMinutes} min read</span></div><h2>${title}</h2><p>How SEO still helps people find your business, what AI search changes, and what to improve next. Follow a Melbourne office-cleaning example.</p><span class="blog-story-read">Read the article <span aria-hidden="true">↗</span></span></a></section>
`;
let hub = html.slice(0, articleStart) + hubBody + html.slice(articleEnd);
hub = hub.replace(/<title>[^<]+<\/title>/, '<title>SEO &amp; AI Search Blog | Ranking Rebels</title>')
  .replace(/<meta name="description"[^>]+>/, '<meta name="description" content="Practical guides to SEO, AI search and useful enquiries for Australian service businesses. Read the Ranking Rebels blog." />')
  .replaceAll(canonical, 'https://rankingrebels.com/blog/')
  .replace('content="article"', 'content="website"')
  .replace(`<meta property="og:title" content="${title}" />`, '<meta property="og:title" content="SEO &amp; AI Search Blog | Ranking Rebels" />')
  .replace(`<meta property="og:description" content="${description}" />`, '<meta property="og:description" content="Practical reading on SEO and AI search for Australian service businesses." />')
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'SEO & AI Search Blog', url: 'https://rankingrebels.com/blog/', inLanguage: 'en-AU', hasPart: { '@type': 'BlogPosting', headline: title, url: canonical } })}</script>`);
fs.writeFileSync(path.join(root, 'blog/index.html'), hub);

const fontFaces = ['Inter', 'JetBrains Mono', 'Oswald'].map((family, index) => {
  const files = ['inter-core-400-700.woff2', 'jetbrains-mono-core-400-700.woff2', 'oswald-core-500-700.woff2'];
  return `@font-face { font-family: '${family}'; font-style: normal; font-weight: ${index === 2 ? '500 700' : '400 700'}; font-display: swap; src: url('/assets/fonts/${files[index]}') format('woff2'); }`;
}).join('\n');
const progressPath = path.join(root, 'assets/css/scroll-progress.css');
const progressCSS = fs.existsSync(progressPath) ? fs.readFileSync(progressPath, 'utf8') : '';
const css = fontFaces + '\n' + progressCSS + '\n' + fs.readFileSync(path.join(editorial, 'preview.css'), 'utf8') + `
.blog-list { max-width: var(--max-width); margin: 0 auto; padding-block: 45px 100px; }
.blog-story { display: block; padding: 36px 0; border-bottom: 1px solid var(--blog-rule); }
.blog-story-label { display: flex; justify-content: space-between; gap: 20px; color: var(--secondary); font: 10px/1.7 'JetBrains Mono', monospace; }
.blog-story-label > span:first-child { color: var(--tertiary); }
.blog-story h2 { max-width: 850px; margin: 28px 0 20px; font: 500 clamp(30px, 4vw, 48px)/1.2 'Oswald', sans-serif; color: var(--neutral); }
.blog-story p { max-width: 690px; color: var(--blog-copy); font-size: 16px; line-height: 1.8; }
.blog-story-read { display: inline-block; margin-top: 15px; color: var(--neutral); font-size: 13px; }
.blog-story-read > span { margin-left: 20px; color: var(--tertiary); }
.blog-story:hover h2 { color: var(--tertiary); }
.blog-preview .blog-cover-top nav { flex-wrap: wrap; }
@media (max-width: 1300px) { .blog-list { margin-inline: var(--page-gutter); } }
@media (max-width: 760px) { .blog-list { padding-block: 10px 60px; } .blog-story-label { flex-direction: column; gap: 6px; } .blog-cover-top { align-items: flex-start; } .blog-version { white-space: nowrap; } }
`;
fs.writeFileSync(path.join(root, 'assets/css/blog.css'), css);
fs.copyFileSync(path.join(editorial, 'preview.js'), path.join(root, 'assets/js/blog.js'));
require('./publish-local-seo-blog.cjs')({ root, html, title, date, readingMinutes });
require('./publish-what-is-seo-blog.cjs')({ root, html });
require('./publish-ai-agents-blog.cjs')({ root });
console.log('Generated public blog hub, complete articles and shared assets.');
