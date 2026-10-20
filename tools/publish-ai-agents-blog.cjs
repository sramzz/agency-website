const fs = require('node:fs');
const path = require('node:path');

// Publish the reviewed draft through its existing renderer and the shared blog shell.
module.exports = ({ root }) => {
  const editorial = path.join(root, 'docs/editorial/blog-ai-agents-workflows-australia');
  require(path.join(editorial, 'render-preview.cjs'));
  const route = '/blog/ai-agents-vs-workflow-automation/';
  const canonical = `https://rankingrebels.com${route}`;
  const source = fs.readFileSync(path.join(editorial, '03-articulo-ai-agents-workflows-australia.md'), 'utf8');
  const seo = fs.readFileSync(path.join(editorial, '04-paquete-seo.md'), 'utf8');
  const field = label => {
    const row = seo.split(/\r?\n/).find(line => line.startsWith(`| ${label} |`));
    if (!row) throw new Error(`Missing agents metadata: ${label}`);
    return row.slice(`| ${label} |`.length).replace(/\|\s*$/, '').trim().replace(/\\\|/g, '|');
  };
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const title = source.match(/^# (.+)/)[1];
  const description = field('Meta description');
  const date = '<time datetime="2026-10-21">21 October 2026</time>';
  const names = ['ai-agents-workflow-illustration-1280.webp', 'ai-agents-workflow-illustration-768.webp', 'ai-agents-workflow-comparison.svg', 'ai-agents-workflow-comparison-mobile.svg'];
  const asset = name => `/assets/images/blog/${name}`;
  let html = fs.readFileSync(path.join(editorial, 'preview.html'), 'utf8');
  for (const name of names) {
    const file = path.join(root, asset(name));
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.copyFileSync(path.join(editorial, 'media', name), file);
    html = html.replaceAll(`media/${name}`, asset(name));
  }
  const hero = `https://rankingrebels.com${asset(names[0])}`;
  const alt = 'Three team members review an enquiry and a clipboard brief, connected by illustrated document and tool symbols.';
  const schema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: title,
    description, url: canonical, mainEntityOfPage: canonical, inLanguage: 'en-AU',
    datePublished: '2026-10-21', dateModified: '2026-10-21', image: hero,
    publisher: { '@type': 'Organization', name: 'Ranking Rebels', url: 'https://rankingrebels.com/' }
  };
  html = html.replace('  <meta name="robots" content="noindex, nofollow" />\n', '')
    .replace(/  <link rel="stylesheet" href="preview\.css[^\n]+\n/, '')
    .replace('blog-preview blog-agents-preview', 'blog-preview')
    .replace('<span class="blog-version"><i aria-hidden="true"></i>Local preview · V1</span>', `<span class="blog-version">${date}</span>`)
    .replace('  <meta name="theme-color"', `  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escape(field('Open Graph title'))}" />
  <meta property="og:description" content="${escape(field('Open Graph description'))}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:locale" content="en_AU" />
  <meta property="og:image" content="${hero}" />
  <meta property="og:image:width" content="1280" />
  <meta property="og:image:height" content="720" />
  <meta property="og:image:alt" content="${escape(alt)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${hero}" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <script src="/assets/js/google-analytics.js?v=20260920" defer></script>
  <meta name="theme-color"`);
  fs.mkdirSync(path.join(root, route), { recursive: true });
  fs.writeFileSync(path.join(root, route, 'index.html'), html);

  const hubPath = path.join(root, 'blog/index.html');
  let hub = fs.readFileSync(hubPath, 'utf8');
  const readTime = Math.ceil(source.replace(/\]\([^)]+\)/g, ']').split(/\s+/).length / 220);
  const excerpt = 'An enquiry arrives, details are missing and someone has to follow it up. See when rules, an AI workflow or an agent can help, and what your team should check before handing over more decisions.';
  const story = `<a class="blog-story" href="${route}"><img class="blog-story-image" src="${asset(names[1])}" width="768" height="432" loading="lazy" decoding="async" alt="" aria-hidden="true" /><div class="blog-story-body"><div class="blog-story-label"><span>AI agents &amp; workflows</span><span>${date} · ${readTime} min read</span></div><h2>${escape(title)}</h2><p>${escape(excerpt)}</p><span class="blog-story-read">Read the article <span aria-hidden="true">↗</span></span></div></a>`;
  const hubTitle = 'SEO & AI Automation Blog | Ranking Rebels';
  const hubDescription = 'Practical reading on SEO, Google Maps, AI search and automation for Australian service businesses. Read the Ranking Rebels blog.';
  hub = hub.replace('<section class="blog-list" aria-label="Latest articles">', `<section class="blog-list" aria-label="Latest articles">${story}`)
    .replace(/<title>[^<]+<\/title>/, `<title>${escape(hubTitle)}</title>`)
    .replace(/<meta name="description"[^>]+>/, `<meta name="description" content="${escape(hubDescription)}" />`)
    .replace(/<meta property="og:title"[^>]+>/, `<meta property="og:title" content="${escape(hubTitle)}" />`)
    .replace(/<meta property="og:description"[^>]+>/, `<meta property="og:description" content="${escape(hubDescription)}" />`)
    .replace('Make sense<br />of <span>being found.</span>', 'Make sense<br />of <span>the next step.</span>')
    .replace('Practical reading on SEO, local search and AI for businesses that want to connect discovery with useful enquiries.', 'Practical reading on search, AI and automation for Australian service businesses.')
    .replace('<span>Search, explained.</span>', '<span>Search. Work. Explained.</span>')
    .replace('<span>SEO · LOCAL SEARCH · AI</span>', '<span>SEO · LOCAL SEARCH · AUTOMATION</span>')
    .replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (_, json) => {
      const data = JSON.parse(json);
      data.name = 'SEO & AI Automation Blog';
      data.hasPart = [{ '@type': 'BlogPosting', headline: title, url: canonical }, ...data.hasPart];
      return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
    });
  fs.writeFileSync(hubPath, hub);
  const sitemapPath = path.join(root, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) sitemap = sitemap.replace('</urlset>', `  <url><loc>${canonical}</loc><lastmod>2026-10-21</lastmod></url>\n</urlset>`);
  for (const url of ['https://rankingrebels.com/blog/', 'https://rankingrebels.com/blog/is-seo-still-relevant-ai-search/', 'https://rankingrebels.com/blog/local-seo-google-maps-visibility/']) {
    const pattern = new RegExp(`(<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>)(?:\\s*<lastmod>[^<]+</lastmod>)?`);
    sitemap = sitemap.replace(pattern, (_, loc) => `${loc}<lastmod>2026-10-21</lastmod>`);
  }
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`Generated AI agents article: nine sections, two visuals, ${readTime} min read and four hub entries.`);
};
