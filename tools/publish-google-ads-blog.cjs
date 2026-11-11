const fs = require('node:fs');
const path = require('node:path');

// Convert only the reviewed local edition; keep research and originals private.
module.exports = ({ root }) => {
  const editorial = path.join(root, 'docs/editorial/blog-google-ads-service-businesses-australia');
  const approval = JSON.parse(fs.readFileSync(path.join(editorial, '14-aprobacion-publicacion.json'), 'utf8'));
  if (approval.finalVersionApproved !== true || approval.readingTheme !== 'light' || approval.illustrationVersion !== 'V1') {
    throw new Error('Blog 10 requires its recorded final-version approval.');
  }
  require(path.join(editorial, 'render-preview.cjs'));
  const route = '/blog/google-ads-for-service-businesses/';
  const canonical = `https://rankingrebels.com${route}`;
  const worksheetRoute = route + 'worksheet/';
  const publicationDate = '2026-11-05';
  const date = '<time datetime="2026-11-05">5 November 2026</time>';
  const source = fs.readFileSync(path.join(editorial, '03-articulo-google-ads-service-businesses-australia.md'), 'utf8');
  const seo = fs.readFileSync(path.join(editorial, '04-paquete-seo.md'), 'utf8');
  const field = label => {
    const row = seo.split(/\r?\n/).find(line => line.startsWith(`| ${label} |`));
    if (!row) throw new Error(`Missing Google Ads metadata: ${label}`);
    return row.slice(`| ${label} |`.length).replace(/\|\s*$/, '').trim();
  };
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const title = source.match(/^# (.+)/)[1], description = field('Meta description');
  const names = ['google-search-enquiry-illustration-1280.webp', 'google-search-enquiry-illustration-768.webp', 'search-to-enquiry.svg', 'search-to-enquiry-mobile.svg'];
  const asset = name => `/assets/images/blog/${name}`;
  let html = fs.readFileSync(path.join(editorial, 'preview.html'), 'utf8');
  for (const name of names) {
    const target = path.join(root, asset(name));
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(editorial, 'media', name), target);
    html = html.replaceAll(`media/${name}`, asset(name));
  }
  const download = route + 'resources/search-to-enquiry-worksheet.md';
  fs.mkdirSync(path.dirname(path.join(root, download)), { recursive: true });
  fs.copyFileSync(path.join(editorial, 'recursos/search-to-enquiry-worksheet.md'), path.join(root, download));
  html = html.replace('Search-to-enquiry worksheet · Local draft', 'Search-to-enquiry worksheet')
    .replace('download its local copy.', 'download a copy.')
    .replace('href="worksheet-preview.html"', `href="${worksheetRoute}"`);
  const hero = `https://rankingrebels.com${asset(names[0])}`;
  const alt = 'A conceptual service search leads to a conversation about a residential garden project.';
  const schema = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: title, description, url: canonical, mainEntityOfPage: canonical, inLanguage: 'en-AU', datePublished: publicationDate, dateModified: '2026-11-11', image: hero, publisher: { '@type': 'Organization', name: 'Ranking Rebels', url: 'https://rankingrebels.com/' } };
  let css = fs.readFileSync(path.join(editorial, 'preview.css'), 'utf8')
    .replaceAll('blog-ads-preview', 'blog-ads-article').replaceAll(',.preview-switch', '');
  css = css.split(/\r?\n/).filter(line => !line.includes('.preview-switch') && !line.includes('.theme-dark')).join('\n');
  css = css.replace('.blog-reading-surface {', '.blog-ads-article .blog-reading-surface {');
  if (css.includes('</style')) throw new Error('Unsafe reading CSS.');
  const analytics = '<script src="/assets/js/google-analytics.js?v=20260920" defer></script>';
  html = html.replace(/\s*<meta name="robots" content="noindex, nofollow" \/>/, '')
    .replace(/<nav class="preview-switch"[\s\S]*?<\/nav>/, '')
    .replace(/<link rel="stylesheet" href="preview\.css[^\"]*" \/>/, `<style data-google-ads-reading>${css}</style>`)
    .replaceAll('blog-ads-preview', 'blog-ads-article')
    .replace('<span class="blog-version"><i aria-hidden="true"></i>Local draft · V1</span>', `<span class="blog-version">${date}</span>`)
    .replace('  <meta name="theme-color"', `  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escape(field('OG title propuesto'))}" />
  <meta property="og:description" content="${escape(field('OG description propuesta'))}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:locale" content="en_AU" />
  <meta property="og:image" content="${hero}" />
  <meta property="og:image:width" content="1280" /><meta property="og:image:height" content="720" />
  <meta property="og:image:alt" content="${escape(alt)}" />
  <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${escape(field('OG title propuesto'))}" />
  <meta name="twitter:description" content="${escape(field('OG description propuesta'))}" /><meta name="twitter:image" content="${hero}" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script>${analytics}
  <meta name="theme-color"`);
  if (/noindex|Local draft|preview-switch|href="preview\.css|src="media\/|worksheet-preview/.test(html)) throw new Error('Draft-only article markup remains.');
  fs.mkdirSync(path.join(root, route), { recursive: true });
  fs.writeFileSync(path.join(root, route, 'index.html'), html);
  let worksheet = fs.readFileSync(path.join(editorial, 'worksheet-preview.html'), 'utf8')
    .replace('content="noindex, nofollow"', 'content="noindex, follow"')
    .replace(' · Local draft', '').replace('A local educational worksheet', 'An educational worksheet')
    .replace('RANKING REBELS / LOCAL DRAFT', 'RANKING REBELS / SUPPORTING MATERIAL')
    .replace('Return to the blog draft', 'Return to the article')
    .replace('This resource is available locally and has not been published.', 'The examples are hypothetical.')
    .replaceAll('href="preview.html#article"', `href="${route}#article"`)
    .replace('href="recursos/search-to-enquiry-worksheet.md"', `href="${download}"`)
    .replaceAll('blog-ads-preview', 'blog-ads-article')
    .replace(/<link rel="stylesheet" href="preview\.css[^\"]*"\s*\/>/, `<style data-google-ads-reading>${css}</style>`)
    .replace('</head>', `<link rel="canonical" href="https://rankingrebels.com${worksheetRoute}"/>${analytics}<script src="/assets/js/scroll-progress.js" defer></script><style>.worksheet-legal{max-width:1100px;margin:auto;padding:24px;display:flex;gap:24px;flex-wrap:wrap}.worksheet-legal a{color:var(--reading-link);text-decoration:underline;min-height:44px;display:inline-flex;align-items:center}.worksheet-legal a:focus-visible{outline:3px solid var(--reading-link);outline-offset:5px}</style></head>`)
    .replace('</body>', '<footer class="worksheet-legal" aria-label="Legal information"><a href="/privacy/">Privacy</a><a href="/cookies/">Cookies</a><a href="/legal/">Legal</a></footer></body>');
  if (/draft|available locally|has not been published|href="preview|href="recursos|href="preview\.css/i.test(worksheet)) throw new Error('Draft-only worksheet markup remains.');
  fs.mkdirSync(path.join(root, worksheetRoute), { recursive: true });
  fs.writeFileSync(path.join(root, worksheetRoute, 'index.html'), worksheet);
  const hubPath = path.join(root, 'blog/index.html');
  let hub = fs.readFileSync(hubPath, 'utf8');
  if (hub.includes(`href="${route}"`)) throw new Error('Duplicate Google Ads hub entry.');
  const readTime = Math.ceil(source.replace(/\]\([^)]+\)/g, ']').split(/\s+/).length / 220);
  const excerpt = seo.match(/^Extracto: (.+)/m)?.[1];
  if (!excerpt) throw new Error('Missing Google Ads excerpt.');
  const story = `<a class="blog-story" href="${route}"><img class="blog-story-image" src="${asset(names[1])}" width="768" height="432" loading="lazy" decoding="async" alt="" aria-hidden="true" /><div class="blog-story-body"><div class="blog-story-label"><span>Google Search ads</span><span>${date} · ${readTime} min read</span></div><h2>${escape(title)}</h2><p>${escape(excerpt)}</p><span class="blog-story-read">Read the article</span></div></a>`;
  hub = hub.replace('<section class="blog-list" aria-label="Latest articles">', `<section class="blog-list" aria-label="Latest articles">${story}`)
    .replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (_, json) => { const data = JSON.parse(json); data.hasPart = [{ '@type': 'BlogPosting', headline: title, url: canonical }, ...data.hasPart]; return `<script type="application/ld+json">${JSON.stringify(data)}</script>`; });
  fs.writeFileSync(hubPath, hub);
  const sitemapPath = path.join(root, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) sitemap = sitemap.replace('</urlset>', `  <url><loc>${canonical}</loc><lastmod>${publicationDate}</lastmod></url>\n</urlset>`);
  for (const slug of ['', 'what-is-seo/', 'website-visits-few-enquiries/']) {
    const url = `https://rankingrebels.com/blog/${slug}`;
    const pattern = new RegExp(`(<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>)(?:\\s*<lastmod>([^<]+)</lastmod>)?`);
    sitemap = sitemap.replace(pattern, (_, loc, previous) => `${loc}<lastmod>${previous && previous > publicationDate ? previous : publicationDate}</lastmod>`);
  }
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`Generated approved Google Ads guide, worksheet and ten hub entries (${readTime} min read).`);
};
