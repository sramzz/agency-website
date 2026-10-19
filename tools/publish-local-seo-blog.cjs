const fs = require('node:fs');
const path = require('node:path');

// Extend the approved blog shell so the main publishing entry point keeps both posts.
module.exports = ({ root, html: shell, title: firstTitle, date: firstDate, readingMinutes: firstReadTime }) => {
  const route = '/blog/local-seo-google-maps-visibility/';
  const canonical = `https://rankingrebels.com${route}`;
  const firstCanonical = 'https://rankingrebels.com/blog/is-seo-still-relevant-ai-search/';
  const editorial = path.join(root, 'docs/editorial/blog-local-seo-australia');
  const source = fs.readFileSync(path.join(editorial, '03-articulo-local-seo-australia.md'), 'utf8');
  const seo = fs.readFileSync(path.join(editorial, '04-paquete-seo.md'), 'utf8');
  const title = source.match(/^# (.+)/)[1];
  const meta = label => {
    const match = seo.match(new RegExp(`\\*\\*${label}:\\*\\* (.+)`));
    if (!match) throw new Error(`Missing local SEO metadata: ${label}`);
    return match[1];
  };
  const metaTitle = meta('Title tag');
  const description = meta('Meta description');
  const subtitle = meta('Subtítulo propuesto');
  const excerpt = meta('Extracto');
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const inline = value => escape(value)
    .replace(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  const slug = value => value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
  const readTime = Math.ceil(source.replace(/\]\([^)]+\)/g, ']').split(/\s+/).length / 220);
  const date = '<time datetime="2026-10-19">19 October 2026</time>';
  const asset = name => `/assets/images/blog/${name}`;
  const hero = asset('local-seo-discovery-illustration-1280.webp');
  for (const name of ['local-seo-discovery-illustration-1280.webp', 'local-seo-discovery-illustration-768.webp', 'local-seo-enquiry-journey.svg', 'local-seo-enquiry-journey-mobile.svg']) {
    if (!fs.existsSync(path.join(root, asset(name)))) throw new Error(`Missing publication image: ${name}`);
  }
  const illustration = `<figure class="blog-editorial-figure"><img src="${hero}" srcset="${asset('local-seo-discovery-illustration-768.webp')} 768w, ${hero} 1280w" sizes="(max-width: 760px) 92vw, 780px" width="1280" height="720" alt="Editorial illustration of a person checking a local map on a phone as a tradesperson approaches a home beside a work van." decoding="async" /><figcaption>A local search can help someone find a service that can attend their address. Conceptual illustration.</figcaption></figure>`;
  const journey = `<figure class="blog-editorial-figure blog-journey"><picture><source media="(max-width: 600px)" width="540" height="970" srcset="${asset('local-seo-enquiry-journey-mobile.svg')}" /><img src="${asset('local-seo-enquiry-journey.svg')}" width="1000" height="440" loading="lazy" decoding="async" alt="A phone-button click, a connected call, a suitable enquiry and a booking or accepted quote are separate stages, each requiring its own evidence." /></picture><figcaption>An illustrative route after a phone click. Profile metrics and business records answer different questions.</figcaption></figure>`;
  const labels = ['The Brisbane example', 'What local SEO can do', 'Identify the problem', 'Profile eligibility', 'How local results work', 'Profile information', 'Genuine reviews', 'Your website', 'Measure the enquiry', 'Choose the next change', 'Questions before investing'];
  const sections = [];
  let body = '';
  let paragraph = [];
  let listOpen = false;
  let sectionOpen = false;
  const flush = () => {
    if (paragraph.length) body += `<p>${inline(paragraph.join(' '))}</p>\n`;
    paragraph = [];
  };
  const closeList = () => { if (listOpen) body += '</ul>\n'; listOpen = false; };
  const closeSection = () => {
    if (!sectionOpen) return;
    if (sections.at(-1).heading === 'Measure actions and commercial outcomes separately') body += journey;
    body += '</section>\n';
  };
  const lines = source.trim().split(/\r?\n/).slice(1);
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (!line.trim()) { flush(); closeList(); continue; }
    if (line.startsWith('## ')) {
      flush(); closeList();
      if (!sections.length) body += illustration;
      closeSection();
      const heading = line.slice(3);
      const id = slug(heading);
      sections.push({ heading, id });
      const variant = heading.startsWith('A Brisbane example') ? ' article-example' : heading.startsWith('First, identify') ? ' article-decision' : '';
      body += `<section class="article-section${variant}" aria-labelledby="${id}"><h2 id="${id}">${escape(heading)}</h2>\n`;
      sectionOpen = true;
    } else if (line.startsWith('### ')) {
      flush(); closeList(); body += `<h3>${escape(line.slice(4))}</h3>\n`;
    } else if (line.startsWith('- ')) {
      flush();
      if (!listOpen) body += '<ul>\n';
      listOpen = true;
      body += `<li>${inline(line.slice(2))}</li>\n`;
    } else if (line.startsWith('|')) {
      flush(); closeList();
      const rows = [];
      while (index < lines.length && lines[index].startsWith('|')) rows.push(lines[index++]);
      index--;
      const cells = row => row.slice(1, -1).split('|').map(value => inline(value.trim()));
      const name = escape(sections.at(-1).heading);
      body += `<div class="table-hint" aria-hidden="true">Swipe to explore the table <span>↔</span></div><div class="article-table" role="region" aria-label="${name} table" tabindex="0"><table><thead><tr>${cells(rows[0]).map(value => `<th scope="col">${value}</th>`).join('')}</tr></thead><tbody>${rows.slice(2).map(row => `<tr>${cells(row).map(value => `<td>${value}</td>`).join('')}</tr>`).join('')}</tbody></table></div>\n`;
    } else { closeList(); paragraph.push(line); }
  }
  flush(); closeList(); closeSection();
  const toc = sections.map((section, index) => `<li><a href="#${section.id}"><span>${String(index + 1).padStart(2, '0')}</span>${escape(labels[index] || section.heading)}</a></li>`).join('\n');
  const main = `    <section class="blog-cover" aria-labelledby="blog-title">
      <div class="blog-cover-top"><nav aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog/">Blog</a><span aria-hidden="true">/</span><span aria-current="page">Local SEO</span></nav><span class="blog-version">${date}</span></div>
      <div class="blog-kicker"><span>Search, explained.</span><span>Local SEO &amp; Google Maps</span></div>
      <h1 id="blog-title" aria-label="${escape(title)}">Local SEO: how to improve<br class="desktop-break" /> your business's visibility<br class="desktop-break" /> <span>on Google Maps</span></h1>
      <div class="blog-cover-bottom"><p>${escape(subtitle)}</p><div class="blog-reading-meta"><span>Australia</span><span>${readTime} min read</span><a href="#article">Read the article <span aria-hidden="true">↓</span></a></div></div>
      <div class="blog-cover-rule" aria-hidden="true"><span>02 / THE RANKING REBELS BLOG</span><span>CLARITY BEFORE CLICKS.</span></div>
    </section>
    <div class="blog-layout">
      <aside class="blog-sidebar" aria-label="Article navigation"><nav class="blog-toc" aria-label="On this page"><p>In this article</p><ol>${toc}</ol><a class="blog-back" href="#top">Back to top <span aria-hidden="true">↑</span></a></nav></aside>
      <div class="blog-reading-column"><details class="blog-mobile-toc"><summary>In this article <span aria-hidden="true">+</span></summary><nav aria-label="On this page"><ol>${toc}</ol></nav></details>
        <article class="blog-article" id="article" aria-labelledby="blog-title" tabindex="-1">${body}</article>
        <div class="blog-endnote"><span>End of article</span><a href="#top">Back to top <span aria-hidden="true">↑</span></a></div>
      </div>
    </div>
`;
  const mainStart = shell.indexOf('    <section class="blog-cover"');
  const mainEnd = shell.indexOf('    <section class="blog-next-step"');
  if (mainStart < 0 || mainEnd < mainStart) throw new Error('Approved blog shell was not found');
  let html = shell.slice(0, mainStart) + main + shell.slice(mainEnd);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(metaTitle)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(description)}" />`)
    .replace(`<link rel="canonical" href="${firstCanonical}" />`, `<link rel="canonical" href="${canonical}" />`)
    .replace(`<meta property="og:url" content="${firstCanonical}" />`, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escape(title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escape(description)}" />`)
    .replace(/<meta name="twitter:card"[^>]*>/, '<meta name="twitter:card" content="summary_large_image" />')
    .replace('<meta property="og:locale"', `<meta property="og:image" content="https://rankingrebels.com${hero}" />\n  <meta property="og:image:width" content="1280" />\n  <meta property="og:image:height" content="720" />\n  <meta property="og:image:alt" content="A local service search illustrated with a phone, neighbourhood map and tradesperson." />\n  <meta name="twitter:image" content="https://rankingrebels.com${hero}" />\n  <meta property="og:locale"`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'BlogPosting', headline: title, description,
      url: canonical, mainEntityOfPage: canonical, inLanguage: 'en-AU',
      datePublished: '2026-10-19', dateModified: '2026-10-19', image: `https://rankingrebels.com${hero}`,
      publisher: { '@type': 'Organization', name: 'Ranking Rebels', url: 'https://rankingrebels.com/' }
    })}</script>`);
  fs.mkdirSync(path.join(root, route), { recursive: true });
  fs.writeFileSync(path.join(root, route, 'index.html'), html);

  const story = ({ href, image, category, number, date, minutes, title, excerpt }) => `<a class="blog-story" href="${href}"><img class="blog-story-image" src="${image}" width="768" height="432" loading="lazy" decoding="async" alt="" aria-hidden="true" /><div class="blog-story-body"><div class="blog-story-label"><span>${number} / ${category}</span><span>${date} · ${minutes} min read</span></div><h2>${escape(title)}</h2><p>${escape(excerpt)}</p><span class="blog-story-read">Read the article <span aria-hidden="true">↗</span></span></div></a>`;
  let hub = fs.readFileSync(path.join(root, 'blog/index.html'), 'utf8');
  hub = hub.replace(/<section class="blog-list"[\s\S]*?<\/section>/, `<section class="blog-list" aria-label="Latest articles">${story({ href: route, image: asset('local-seo-discovery-illustration-768.webp'), category: 'Local SEO &amp; Google Maps', number: '02', date, minutes: readTime, title, excerpt })}${story({ href: '/blog/is-seo-still-relevant-ai-search/', image: asset('seo-ai-discovery-illustration-768.webp'), category: 'SEO &amp; AI search', number: '01', date: firstDate, minutes: firstReadTime, title: firstTitle, excerpt: 'How SEO still helps people find your business, what AI search changes, and what to improve next. Follow a Melbourne office-cleaning example.' })}</section>`)
    .replace('Practical reading on SEO and AI search for businesses that want to connect discovery with useful enquiries.', 'Practical reading on SEO, local search and AI for businesses that want to connect discovery with useful enquiries.')
    .replaceAll('SEO &amp; AI Search Blog | Ranking Rebels', 'SEO, Local Search &amp; AI Blog | Ranking Rebels')
    .replace('Practical guides to SEO, AI search and useful enquiries for Australian service businesses. Read the Ranking Rebels blog.', 'Practical guides to SEO, Google Maps and AI search for Australian service businesses. Read the Ranking Rebels blog.')
    .replace('<span>SEO &amp; AI SEARCH</span>', '<span>SEO · LOCAL SEARCH · AI</span>')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'SEO, Local Search & AI Blog', url: 'https://rankingrebels.com/blog/', inLanguage: 'en-AU',
      hasPart: [{ '@type': 'BlogPosting', headline: title, url: canonical }, { '@type': 'BlogPosting', headline: firstTitle, url: firstCanonical }]
    })}</script>`);
  fs.writeFileSync(path.join(root, 'blog/index.html'), hub);
  fs.appendFileSync(path.join(root, 'assets/css/blog.css'), `
/* Both articles share the approved editorial shell. */
.blog-article ul { margin: 0 0 25px; padding-left: 24px; list-style: disc; }
.blog-article li { padding-left: 5px; margin-block: 9px; }
.blog-article strong { color: var(--neutral); font-weight: 600; }
.blog-story { display: grid; grid-template-columns: minmax(200px, 300px) minmax(0, 1fr); gap: 36px; align-items: start; }
.blog-story-image { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; border: 1px solid var(--blog-rule); border-radius: 8px; }
.blog-story h2 { margin-top: 20px; font-size: clamp(28px, 3.2vw, 42px); }
.blog-story:focus-visible { outline: 2px solid var(--tertiary); outline-offset: 8px; }
@media (max-width: 760px) { .blog-story { grid-template-columns: minmax(0, 1fr); gap: 24px; } .blog-story-image { max-width: 540px; } }
`);
  const sitemapPath = path.join(root, 'sitemap.xml');
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) fs.writeFileSync(sitemapPath, sitemap.replace('</urlset>', `  <url><loc>${canonical}</loc><lastmod>2026-10-19</lastmod></url>\n</urlset>`));
  console.log(`Generated complete local SEO article with ${sections.length} sections, two visuals and both hub entries.`);
};
