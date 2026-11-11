const fs = require('node:fs');
const path = require('node:path');

// Publish the user's reviewed light-reading version, keeping source assets private.
module.exports = ({ root }) => {
  const editorial = path.join(root, 'docs/editorial/blog-ai-workflow-pilot-australia');
  const approval = JSON.parse(fs.readFileSync(path.join(editorial, '14-aprobacion-publicacion.json'), 'utf8'));
  if (approval.finalVersionApproved !== true || approval.readingTheme !== 'light' || approval.illustrationVersion !== 'V1') {
    throw new Error('Blog 9 requires its recorded final-version approval.');
  }
  require(path.join(editorial, 'render-preview.cjs'));
  const route = '/blog/how-to-build-ai-workflow/';
  const canonical = `https://rankingrebels.com${route}`;
  const publicationDate = '2026-11-04';
  const date = '<time datetime="2026-11-04">4 November 2026</time>';
  const source = fs.readFileSync(path.join(editorial, '03-articulo-ai-workflow-pilot-australia.md'), 'utf8');
  const seo = fs.readFileSync(path.join(editorial, '04-paquete-seo.md'), 'utf8');
  const field = label => {
    const row = seo.split(/\r?\n/).find(line => line.startsWith(`| ${label} |`));
    if (!row) throw new Error(`Missing automation metadata: ${label}`);
    return row.slice(`| ${label} |`.length).replace(/\|\s*$/, '').trim();
  };
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const title = source.match(/^# (.+)/)[1], description = field('Meta description');
  const names = ['ai-workflow-pilot-illustration-1280.webp', 'ai-workflow-pilot-illustration-768.webp'];
  const asset = name => `/assets/images/blog/${name}`;
  let html = fs.readFileSync(path.join(editorial, 'preview.html'), 'utf8');
  for (const name of names) {
    const target = path.join(root, asset(name));
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(editorial, 'media', name), target);
    html = html.replaceAll(`media/${name}`, asset(name));
  }
  const kitRoute = route + 'pilot-kit/';
  const resources = ['07-pilot-kit.md', '08-synthetic-development-cases.csv', '09-development-results-template.csv'];
  for (const name of resources) {
    const target = path.join(root, route, 'resources', name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(editorial, 'recursos', name), target);
  }
  html = html.replace('Supporting materials · Local draft', 'Supporting materials').replace('href="kit-preview.html"', 'href="' + kitRoute + '"');
  const hero = `https://rankingrebels.com${asset(names[0])}`;

  const alt = 'A coordinator checks a proposed enquiry handover against the original message, with separate cards for the customer record, owner and follow-up task.';
  const schema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: title,
    description, url: canonical, mainEntityOfPage: canonical, inLanguage: 'en-AU',
    datePublished: publicationDate, dateModified: '2026-11-04', image: hero,
    publisher: { '@type': 'Organization', name: 'Ranking Rebels', url: 'https://rankingrebels.com/' }
  };
  let css = fs.readFileSync(path.join(editorial, 'preview.css'), 'utf8')
    .replace('/* Local design study. Established brand/type remain in the shared public styles. */', '/* Approved light reading for AI workflow pilot; shared brand and type. */')
    .replaceAll('blog-workflow-pilot-preview', 'blog-workflow-pilot-article').replaceAll(',.preview-switch', '');
  css = css.split(/\r?\n/).filter(line => !line.includes('.preview-switch') && !line.includes('.theme-dark')).join('\n');
  css = css.replace('.blog-reading-surface {', '.blog-workflow-pilot-article .blog-reading-surface {');
  if (css.includes('</style')) throw new Error('Unsafe reading CSS.');
  html = html.replace(/\s*<meta name="robots" content="noindex, nofollow" \/>/, '')
    .replace(/<nav class="preview-switch"[\s\S]*?<\/nav>/, '')
    .replace(/<link rel="stylesheet" href="preview\.css[^\"]*" \/>/, `<style data-workflow-pilot-reading>${css}</style>`)
    .replaceAll('blog-workflow-pilot-preview', 'blog-workflow-pilot-article')
    .replace('<span class="blog-version"><i aria-hidden="true"></i>Local draft · Review 4 Nov</span>', `<span class="blog-version">${date}</span>`)
    .replace(/href="\/assets\/css\/blog\.css(?:\?[^\"]*)?"/, 'href="/assets/css/blog.css?v=20261027-underlined-links"')
    .replace('  <meta name="theme-color"', `  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escape(field('OG title propuesto'))}" />
  <meta property="og:description" content="${escape(field('OG description propuesta'))}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:locale" content="en_AU" />
  <meta property="og:image" content="${hero}" />
  <meta property="og:image:width" content="1280" />
  <meta property="og:image:height" content="720" />
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
  require(path.join(editorial, 'render-kit.cjs'));
  let kit = fs.readFileSync(path.join(editorial, 'kit-preview.html'), 'utf8')
    .replace('content="noindex, nofollow"', 'content="noindex, follow"')
    .replace('AI Workflow Pilot Kit | Local Draft', 'AI Workflow Pilot Kit | Ranking Rebels')
    .replaceAll('Supporting materials · Local draft', 'Supporting materials')
    .replaceAll('href="preview.html#article"', 'href="' + route + '#article"')
    .replaceAll('href="recursos/', 'href="' + route + 'resources/')
    .replaceAll('blog-workflow-pilot-preview', 'blog-workflow-pilot-article')
    .replace(/<link rel="stylesheet" href="preview\.css[^"]*">/, '<style data-workflow-pilot-reading>' + css + '</style>')
    .replace('/assets/css/blog.css?v=20261019-local-seo', '/assets/css/blog.css?v=20261027-underlined-links')
    .replace('</head>', '<link rel="canonical" href="https://rankingrebels.com' + kitRoute + '"/><meta name="description" content="A pilot brief, twelve synthetic development cases and an empty results log. Educational materials; no scenarios have been run."/><script src="/assets/js/google-analytics.js?v=20260920" defer></script><script src="/assets/js/scroll-progress.js" defer></script><style>.kit-legal{max-width:900px;margin:auto;padding:24px;display:flex;gap:24px;flex-wrap:wrap}.kit-legal a{color:var(--reading-link);text-decoration:underline;min-height:44px;display:inline-flex;align-items:center}.kit-legal a:focus-visible{outline:3px solid var(--reading-link);outline-offset:5px}</style></head>')
    .replace('</body>', '<footer class="kit-legal" aria-label="Legal information"><a href="/privacy/">Privacy</a><a href="/cookies/">Cookies</a><a href="/legal/">Legal</a></footer></body>');
  if (/Local [Dd]raft|href="preview|href="recursos|href="preview\.css/.test(kit)) throw new Error('Draft-only kit markup remains.');
  fs.mkdirSync(path.join(root, kitRoute), { recursive: true });
  fs.writeFileSync(path.join(root, kitRoute, 'index.html'), kit);


  const hubPath = path.join(root, 'blog/index.html');
  let hub = fs.readFileSync(hubPath, 'utf8');
  if (hub.includes(`href="${route}"`)) throw new Error('Duplicate AI workflow pilot hub entry.');
  const readTime = Math.ceil(source.replace(/\]\([^)]+\)/g, ']').split(/\s+/).length / 220);
  const story = `<a class="blog-story" href="${route}"><img class="blog-story-image" src="${asset(names[1])}" width="768" height="432" loading="lazy" decoding="async" alt="" aria-hidden="true" /><div class="blog-story-body"><div class="blog-story-label"><span>AI workflow pilot</span><span>${date} · ${readTime} min read</span></div><h2>${escape(title)}</h2><p>${escape(field('Excerpt'))}</p><span class="blog-story-read">Read the article</span></div></a>`;
  hub = hub.replace('<section class="blog-list" aria-label="Latest articles">', `<section class="blog-list" aria-label="Latest articles">${story}`)
    .replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (_, json) => {
      const data = JSON.parse(json); data.hasPart = [{ '@type': 'BlogPosting', headline: title, url: canonical }, ...data.hasPart];
      return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
    });
  fs.writeFileSync(hubPath, hub);
  const sitemapPath = path.join(root, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) sitemap = sitemap.replace('</urlset>', `  <url><loc>${canonical}</loc><lastmod>${publicationDate}</lastmod></url>\n</urlset>`);
  for (const slug of ['', 'ai-agents-vs-workflow-automation/', 'website-visits-few-enquiries/', 'which-business-processes-to-automate-first/', 'custom-software-benefits/']) {
    const url = `https://rankingrebels.com/blog/${slug}`;
    const pattern = new RegExp(`(<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>)(?:\\s*<lastmod>([^<]+)</lastmod>)?`);
    sitemap = sitemap.replace(pattern, (_, loc, previous) => `${loc}<lastmod>${previous && previous > publicationDate ? previous : publicationDate}</lastmod>`);
  }
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`Generated approved AI workflow pilot article: light reading, V1 illustration, ${readTime} min read, nine hub entries.`);
};
