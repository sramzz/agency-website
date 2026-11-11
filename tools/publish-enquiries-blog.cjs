const fs = require('node:fs');
const path = require('node:path');

// Integrate only the explicitly approved light-reading version of blog 5.
module.exports = ({ root }) => {
  const editorial = path.join(root, 'docs/editorial/blog-visits-few-enquiries-australia');
  const approval = JSON.parse(fs.readFileSync(path.join(editorial, '11-version-preparada.json'), 'utf8'));
  if (!approval.versionApproved || approval.selectedTheme !== 'light' || approval.visualVersion !== 'V3') {
    throw new Error('Blog 5 requires approval of light reading and illustration V3.');
  }
  require(path.join(editorial, 'render-preview.cjs'));
  const route = '/blog/website-visits-few-enquiries/';
  const canonical = `https://rankingrebels.com${route}`;
  const source = fs.readFileSync(path.join(editorial, '03-articulo-visits-few-enquiries-australia.md'), 'utf8');
  const seo = fs.readFileSync(path.join(editorial, '04-paquete-seo.md'), 'utf8');
  const field = label => {
    const row = seo.split(/\r?\n/).find(line => line.startsWith(`| ${label} |`));
    if (!row) throw new Error(`Missing enquiries metadata: ${label}`);
    return row.slice(`| ${label} |`.length).replace(/\|\s*$/, '').trim();
  };
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const title = source.match(/^# (.+)/)[1];
  const description = field('Meta description');
  const date = '<time datetime="2026-10-26">26 October 2026</time>';
  const names = ['website-enquiries-illustration-v3-1280.webp', 'website-enquiries-illustration-v3-768.webp', 'enquiry-checks.svg', 'enquiry-checks-mobile.svg'];
  const asset = name => `/assets/images/blog/${name}`;
  let html = fs.readFileSync(path.join(editorial, 'preview.html'), 'utf8');
  for (const name of names) {
    const file = path.join(root, asset(name));
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.copyFileSync(path.join(editorial, 'media', name), file);
    html = html.replaceAll(`media/${name}`, asset(name));
  }
  const hero = `https://rankingrebels.com${asset(names[0])}`;
  const alt = 'An illustrated landscaping business owner reviews a project brief beside a laptop and garden plan in a bright studio.';
  const schema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: title,
    description, url: canonical, mainEntityOfPage: canonical, inLanguage: 'en-AU',
    datePublished: '2026-10-26', dateModified: '2026-11-11', image: hero,
    publisher: { '@type': 'Organization', name: 'Ranking Rebels', url: 'https://rankingrebels.com/' }
  };
  html = html.replace('  <meta name="robots" content="noindex, nofollow" />\n', '')
    .replace(/<nav class="preview-switch"[\s\S]*?<\/nav>/, '')
    .replace(/href="preview\.css[^\"]*"/, 'href="/assets/css/blog-enquiries.css?v=20261026-light-v2"')
    .replaceAll('blog-enquiries-preview', 'blog-enquiries-article')
    .replace('<span class="blog-version"><i aria-hidden="true"></i>Local draft · V3</span>', `<span class="blog-version">${date}</span>`)
    .replace('  <meta name="theme-color"', `  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escape(field('OG title'))}" />
  <meta property="og:description" content="${escape(field('OG description'))}" />
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
  if (/noindex|Local draft|preview-switch|href="preview\.css|src="media\//.test(html)) throw new Error('Draft-only markup remains.');
  fs.mkdirSync(path.join(root, route), { recursive: true });

  let css = fs.readFileSync(path.join(editorial, 'preview.css'), 'utf8')
    .replace('/* Local design study. Established brand/type remain in the shared public styles. */', '/* Approved light reading for the enquiries article. Brand/type remain shared. */')
    .replaceAll('blog-enquiries-preview', 'blog-enquiries-article')
    .replace(', .preview-switch', '').replace(',.preview-switch', '');
  css = css.split(/\r?\n/).filter(line => !line.includes('.preview-switch') && !line.includes('.theme-dark')).join('\n');
  css = css.replace('.blog-reading-surface {', '.blog-enquiries-article .blog-reading-surface {');
  // Keep the small reading palette inline, preserving the existing CSS request budget.
  if (css.includes('</style')) throw new Error('Unsafe reading CSS.');
  html = html.replace(/<link rel="stylesheet" href="\/assets\/css\/blog-enquiries\.css[^\"]*" \/>/, `<style data-enquiries-reading>${css}</style>`);
  fs.writeFileSync(path.join(root, route, 'index.html'), html);

  const hubPath = path.join(root, 'blog/index.html');
  let hub = fs.readFileSync(hubPath, 'utf8');
  const readTime = Math.ceil(source.replace(/\]\([^)]+\)/g, ']').split(/\s+/).length / 220);
  const excerpt = 'Website visits are increasing, but useful enquiries are not. Check who is visiting, what the page explains and whether requests reach your team before choosing what to change.';
  const story = `<a class="blog-story" href="${route}"><img class="blog-story-image" src="${asset(names[1])}" width="768" height="432" loading="lazy" decoding="async" alt="" aria-hidden="true" /><div class="blog-story-body"><div class="blog-story-label"><span>Website enquiries</span><span>${date} · ${readTime} min read</span></div><h2>${escape(title)}</h2><p>${escape(excerpt)}</p><span class="blog-story-read">Read the article</span></div></a>`;
  if (hub.includes(`href="${route}"`)) throw new Error('Duplicate enquiries hub entry.');
  hub = hub.replace('<section class="blog-list" aria-label="Latest articles">', `<section class="blog-list" aria-label="Latest articles">${story}`)
    .replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (_, json) => {
      const data = JSON.parse(json);
      data.hasPart = [{ '@type': 'BlogPosting', headline: title, url: canonical }, ...data.hasPart];
      return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
    });
  fs.writeFileSync(hubPath, hub);
  const sitemapPath = path.join(root, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) sitemap = sitemap.replace('</urlset>', `  <url><loc>${canonical}</loc><lastmod>2026-10-29</lastmod></url>\n</urlset>`);
  sitemap = sitemap.replace(/(<loc>https:\/\/rankingrebels\.com\/blog\/website-visits-few-enquiries\/<\/loc>)(?:\s*<lastmod>[^<]+<\/lastmod>)?/, '$1<lastmod>2026-10-29</lastmod>');
  for (const slug of ['', 'is-seo-still-relevant-ai-search/', 'local-seo-google-maps-visibility/', 'what-is-seo/', 'ai-agents-vs-workflow-automation/']) {
    const url = `https://rankingrebels.com/blog/${slug}`;
    const pattern = new RegExp(`(<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>)(?:\\s*<lastmod>[^<]+</lastmod>)?`);
    sitemap = sitemap.replace(pattern, (_, loc) => `${loc}<lastmod>${slug === '' ? '2026-10-29' : '2026-10-26'}</lastmod>`);
  }
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`Generated approved enquiries article: light reading, V3 illustration, ${readTime} min read, five hub entries.`);
};
