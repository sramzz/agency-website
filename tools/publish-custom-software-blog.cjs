const fs = require('node:fs');
const path = require('node:path');

// Publish the user's reviewed light-reading version, keeping source assets private.
module.exports = ({ root }) => {
  const editorial = path.join(root, 'docs/editorial/blog-custom-software-australia');
  const approval = JSON.parse(fs.readFileSync(path.join(editorial, '13-aprobacion-publicacion.json'), 'utf8'));
  if (approval.finalVersionApproved !== true || approval.readingTheme !== 'light' || approval.illustrationVersion !== 'V2') {
    throw new Error('Blog 8 requires its recorded final-version approval.');
  }
  require(path.join(editorial, 'render-preview.cjs'));
  const route = '/blog/custom-software-benefits/';
  const canonical = `https://rankingrebels.com${route}`;
  const publicationDate = '2026-11-02';
  const date = '<time datetime="2026-11-02">2 November 2026</time>';
  const source = fs.readFileSync(path.join(editorial, '03-articulo-custom-software-australia.md'), 'utf8');
  const seo = fs.readFileSync(path.join(editorial, '04-paquete-seo.md'), 'utf8');
  const field = label => {
    const row = seo.split(/\r?\n/).find(line => line.startsWith(`| ${label} |`));
    if (!row) throw new Error(`Missing automation metadata: ${label}`);
    return row.slice(`| ${label} |`.length).replace(/\|\s*$/, '').trim();
  };
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const title = source.match(/^# (.+)/)[1], description = field('Meta description');
  const names = ['custom-software-illustration-v2-1280.webp', 'custom-software-illustration-v2-768.webp'];
  const asset = name => `/assets/images/blog/${name}`;
  let html = fs.readFileSync(path.join(editorial, 'preview.html'), 'utf8');
  for (const name of names) {
    const target = path.join(root, asset(name));
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(editorial, 'media', name), target);
    html = html.replaceAll(`media/${name}`, asset(name));
  }
  const hero = `https://rankingrebels.com${asset(names[0])}`;
  const alt = 'A maintenance business owner uses a small customer portal beside existing job records, with a red line connecting the two.';
  const schema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: title,
    description, url: canonical, mainEntityOfPage: canonical, inLanguage: 'en-AU',
    datePublished: publicationDate, dateModified: '2026-11-04', image: hero,
    publisher: { '@type': 'Organization', name: 'Ranking Rebels', url: 'https://rankingrebels.com/' }
  };
  let css = fs.readFileSync(path.join(editorial, 'preview.css'), 'utf8')
    .replace('/* Local design study. Established brand/type remain in the shared public styles. */', '/* Approved light reading for custom software; shared brand and type. */')
    .replaceAll('blog-custom-software-preview', 'blog-custom-software-article').replaceAll(',.preview-switch', '');
  css = css.split(/\r?\n/).filter(line => !line.includes('.preview-switch') && !line.includes('.theme-dark')).join('\n');
  css = css.replace('.blog-reading-surface {', '.blog-custom-software-article .blog-reading-surface {');
  if (css.includes('</style')) throw new Error('Unsafe reading CSS.');
  html = html.replace(/\s*<meta name="robots" content="noindex, nofollow" \/>/, '')
    .replace(/<nav class="preview-switch"[\s\S]*?<\/nav>/, '')
    .replace(/<link rel="stylesheet" href="preview\.css[^\"]*" \/>/, `<style data-custom-software-reading>${css}</style>`)
    .replaceAll('blog-custom-software-preview', 'blog-custom-software-article')
    .replace('<span class="blog-version"><i aria-hidden="true"></i>Local draft · V2</span>', `<span class="blog-version">${date}</span>`)
    .replace(/href="\/assets\/css\/blog\.css(?:\?[^\"]*)?"/, 'href="/assets/css/blog.css?v=20261027-underlined-links"')
    .replace('  <meta name="theme-color"', `  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escape(field('OG title propuesto'))}" />
  <meta property="og:description" content="${escape(field('OG description propuesta'))}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:locale" content="en_AU" />
  <meta property="og:image" content="${hero}" />
  <meta property="og:image:width" content="1280" />
  <meta property="og:image:height" content="853" />
  <meta property="og:image:alt" content="${escape(alt)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escape(field('OG title propuesto'))}" />
  <meta name="twitter:description" content="${escape(field('OG description propuesta'))}" />
  <meta name="twitter:image" content="${hero}" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <script src="/assets/js/google-analytics.js?v=20260920" defer></script>
  <meta name="theme-color"`);
  if (/<meta name="robots" content="noindex|Local draft|preview-switch|href="preview\.css|src="media\//.test(html)) throw new Error('Draft-only markup remains.');
  fs.mkdirSync(path.join(root, route), { recursive: true });
  fs.writeFileSync(path.join(root, route, 'index.html'), html);

  const hubPath = path.join(root, 'blog/index.html');
  let hub = fs.readFileSync(hubPath, 'utf8');
  if (hub.includes(`href="${route}"`)) throw new Error('Duplicate custom software hub entry.');
  const readTime = Math.ceil(source.replace(/\]\([^)]+\)/g, ']').split(/\s+/).length / 220);
  const story = `<a class="blog-story" href="${route}"><img class="blog-story-image" src="${asset(names[1])}" width="768" height="512" loading="lazy" decoding="async" alt="" aria-hidden="true" /><div class="blog-story-body"><div class="blog-story-label"><span>Custom software</span><span>${date} · ${readTime} min read</span></div><h2>${escape(title)}</h2><p>${escape(field('Excerpt'))}</p><span class="blog-story-read">Read the article</span></div></a>`;
  hub = hub.replace('<section class="blog-list" aria-label="Latest articles">', `<section class="blog-list" aria-label="Latest articles">${story}`)
    .replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (_, json) => {
      const data = JSON.parse(json); data.hasPart = [{ '@type': 'BlogPosting', headline: title, url: canonical }, ...data.hasPart];
      return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
    });
  fs.writeFileSync(hubPath, hub);
  const sitemapPath = path.join(root, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) sitemap = sitemap.replace('</urlset>', `  <url><loc>${canonical}</loc><lastmod>${publicationDate}</lastmod></url>\n</urlset>`);
  for (const slug of ['', 'ai-agents-vs-workflow-automation/', 'which-business-processes-to-automate-first/']) {
    const url = `https://rankingrebels.com/blog/${slug}`;
    const pattern = new RegExp(`(<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>)(?:\\s*<lastmod>([^<]+)</lastmod>)?`);
    sitemap = sitemap.replace(pattern, (_, loc, previous) => `${loc}<lastmod>${previous && previous > publicationDate ? previous : publicationDate}</lastmod>`);
  }
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`Generated approved custom software article: light reading, V2 illustration, ${readTime} min read, eight hub entries.`);
};
