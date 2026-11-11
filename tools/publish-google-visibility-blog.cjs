const fs = require('node:fs');
const path = require('node:path');

// Publication of blog 6 was expressly delegated for 28 October, after 07:30 Melbourne.
module.exports = ({ root }) => {
  const editorial = path.join(root, 'docs/editorial/blog-google-visibility-diagnosis-australia');
  const authorisation = fs.readFileSync(path.join(editorial, '11-autorizacion-publicacion.md'), 'utf8');
  if (!authorisation.includes('sin volver a pedir permiso') || Date.now() < Date.parse('2026-10-28T07:30:00+11:00')) {
    throw new Error('Blog 6 requires its recorded authorisation and publication time.');
  }
  require(path.join(editorial, 'render-preview.cjs'));
  const route = '/blog/website-not-showing-up-on-google/';
  const canonical = `https://rankingrebels.com${route}`;
  const source = fs.readFileSync(path.join(editorial, '03-articulo-google-visibility-diagnosis-australia.md'), 'utf8');
  const seo = fs.readFileSync(path.join(editorial, '04-paquete-seo.md'), 'utf8');
  const field = label => {
    const row = seo.split(/\r?\n/).find(line => line.startsWith(`| ${label} |`));
    if (!row) throw new Error(`Missing visibility metadata: ${label}`);
    return row.slice(`| ${label} |`.length).replace(/\|\s*$/, '').trim();
  };
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const title = source.match(/^# (.+)/)[1], description = field('Meta description');
  const date = '<time datetime="2026-10-28">28 October 2026</time>';
  const names = ['google-visibility-illustration-1280.webp', 'google-visibility-illustration-768.webp', 'visibility-diagnosis.svg', 'visibility-diagnosis-mobile.svg'];
  const asset = name => `/assets/images/blog/${name}`;
  let html = fs.readFileSync(path.join(editorial, 'preview.html'), 'utf8');
  for (const name of names) {
    const target = path.join(root, asset(name));
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(editorial, 'media', name), target);
    html = html.replaceAll(`media/${name}`, asset(name));
  }
  const hero = `https://rankingrebels.com${asset(names[0])}`;
  const alt = 'An editorial illustration of a magnifying glass over a service-page layout, with a hand checking page cards beside a laptop.';
  const schema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: title,
    description, url: canonical, mainEntityOfPage: canonical, inLanguage: 'en-AU',
    datePublished: '2026-10-28', dateModified: '2026-10-28', image: hero,
    publisher: { '@type': 'Organization', name: 'Ranking Rebels', url: 'https://rankingrebels.com/' }
  };
  let css = fs.readFileSync(path.join(editorial, 'preview.css'), 'utf8')
    .replace('/* Local design study. Established brand/type remain in the shared public styles. */', '/* Light reading for the delegated visibility article; shared brand and type. */')
    .replaceAll('blog-visibility-preview', 'blog-visibility-article').replaceAll(',.preview-switch', '');
  css = css.split(/\r?\n/).filter(line => !line.includes('.preview-switch') && !line.includes('.theme-dark')).join('\n');
  css = css.replace('.blog-reading-surface {', '.blog-visibility-article .blog-reading-surface {');
  if (css.includes('</style')) throw new Error('Unsafe reading CSS.');
  html = html.replace(/\s*<meta name="robots" content="noindex, nofollow" \/>/, '')
    .replace(/<nav class="preview-switch"[\s\S]*?<\/nav>/, '')
    .replace(/<link rel="stylesheet" href="preview\.css[^\"]*" \/>/, `<style data-visibility-reading>${css}</style>`)
    .replaceAll('blog-visibility-preview', 'blog-visibility-article')
    .replace('<span class="blog-version"><i aria-hidden="true"></i>Local draft · V1</span>', `<span class="blog-version">${date}</span>`)
    .replace(/href="\/assets\/css\/blog\.css(?:\?[^\"]*)?"/, 'href="/assets/css/blog.css?v=20261027-underlined-links"')
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
  <meta name="twitter:title" content="${escape(field('OG title'))}" />
  <meta name="twitter:description" content="${escape(field('OG description'))}" />
  <meta name="twitter:image" content="${hero}" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <script src="/assets/js/google-analytics.js?v=20260920" defer></script>
  <meta name="theme-color"`);
  if (/<meta name="robots" content="noindex|Local draft|preview-switch|href="preview\.css|src="media\//.test(html)) throw new Error('Draft-only markup remains.');
  fs.mkdirSync(path.join(root, route), { recursive: true });
  fs.writeFileSync(path.join(root, route, 'index.html'), html);
  const hubPath = path.join(root, 'blog/index.html');
  let hub = fs.readFileSync(hubPath, 'utf8');
  if (hub.includes(`href="${route}"`)) throw new Error('Duplicate visibility hub entry.');
  const readTime = Math.ceil(source.replace(/\]\([^)]+\)/g, ']').split(/\s+/).length / 220);
  const excerpt = 'Cannot find an important page on Google? Check the exact URL, its indexing status and the searches you expected it to appear for before choosing what to change.';
  const story = `<a class="blog-story" href="${route}"><img class="blog-story-image" src="${asset(names[1])}" width="768" height="432" loading="lazy" decoding="async" alt="" aria-hidden="true" /><div class="blog-story-body"><div class="blog-story-label"><span>Google visibility</span><span>${date} · ${readTime} min read</span></div><h2>${escape(title)}</h2><p>${escape(excerpt)}</p><span class="blog-story-read">Read the article</span></div></a>`;
  hub = hub.replace('<section class="blog-list" aria-label="Latest articles">', `<section class="blog-list" aria-label="Latest articles">${story}`)
    .replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (_, json) => {
      const data = JSON.parse(json); data.hasPart = [{ '@type': 'BlogPosting', headline: title, url: canonical }, ...data.hasPart];
      return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
    });
  fs.writeFileSync(hubPath, hub);
  const sitemapPath = path.join(root, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) sitemap = sitemap.replace('</urlset>', `  <url><loc>${canonical}</loc><lastmod>2026-10-28</lastmod></url>\n</urlset>`);
  for (const slug of ['', 'is-seo-still-relevant-ai-search/', 'local-seo-google-maps-visibility/', 'what-is-seo/', 'website-visits-few-enquiries/']) {
    const url = `https://rankingrebels.com/blog/${slug}`;
    const pattern = new RegExp(`(<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>)(?:\\s*<lastmod>([^<]+)</lastmod>)?`);
    sitemap = sitemap.replace(pattern, (_, loc, previous) => `${loc}<lastmod>${previous && previous > '2026-10-28' ? previous : '2026-10-28'}</lastmod>`);
  }
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`Generated visibility article: light reading, preserved illustration, ${readTime} min read, six hub entries.`);
};
