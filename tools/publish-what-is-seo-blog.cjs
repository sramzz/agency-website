const fs = require('node:fs');
const path = require('node:path');

// Use the approved public shell without publishing drafts from editorial folders.
module.exports = ({ root, html: shell }) => {
  const route = '/blog/what-is-seo/';
  const canonical = `https://rankingrebels.com${route}`;
  const previousCanonical = 'https://rankingrebels.com/blog/is-seo-still-relevant-ai-search/';
  const editorial = path.join(root, 'docs/editorial/blog-what-is-seo-australia');
  const source = fs.readFileSync(path.join(editorial, '03-articulo-what-is-seo-australia.md'), 'utf8');
  const seo = fs.readFileSync(path.join(editorial, '04-paquete-seo.md'), 'utf8');
  const meta = label => {
    const match = seo.match(new RegExp(`\\*\\*${label}:\\*\\* (.+)`));
    if (!match) throw new Error(`Missing What Is SEO metadata: ${label}`);
    return match[1];
  };
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const inline = value => escape(value).replace(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g, '<a href="$2">$1</a>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  const slug = value => value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
  const title = source.match(/^# (.+)/)[1];
  const description = meta('Meta description');
  const subtitle = meta('Subtítulo propuesto');
  const readTime = Math.ceil(source.replace(/\]\([^)]+\)/g, ']').split(/\s+/).length / 220);
  const date = '<time datetime="2026-10-20">20 October 2026</time>';
  const image = name => `/assets/images/blog/what-is-seo-${name}`;
  const hero = image('landscaping-illustration-1280.webp');
  for (const name of ['landscaping-illustration-1280.webp', 'landscaping-illustration-768.webp', 'search-needs.svg', 'search-needs-mobile.svg']) {
    if (!fs.existsSync(path.join(root, image(name)))) throw new Error(`Missing What Is SEO asset: ${name}`);
  }
  const illustration = `<figure class="blog-editorial-figure"><img src="${hero}" srcset="${image('landscaping-illustration-768.webp')} 768w, ${hero} 1280w" sizes="(max-width: 760px) 92vw, 780px" width="1280" height="720" alt="A person reviews landscaping information on a tablet while a landscaper and homeowner study a garden plan." decoding="async" /><figcaption>From a question to useful service information. Conceptual illustration of the Perth example.</figcaption></figure>`;
  const diagram = `<figure class="blog-editorial-figure blog-journey"><picture><source media="(max-width: 600px)" width="540" height="1010" srcset="${image('search-needs-mobile.svg')}" /><img src="${image('search-needs.svg')}" width="1000" height="560" loading="lazy" decoding="async" alt="A landscaping service search needs a clear service page. A garden-planning question needs a useful guide. Hypothetical Perth example, not a search result or a promised outcome." /></picture><figcaption>Two searches, two different needs. Give each page a useful job.</figcaption></figure>`;
  const labels = ['The Perth example', 'Organic search', 'How SEO works', 'What the work involves', 'Business benefits', 'SEO vs Google Ads', 'Time and ongoing work', 'Measure progress', 'SEO and AI search', 'Where to start'];
  const lines = source.trim().split(/\r?\n/).slice(1);
  const sections = [];
  let body = '', paragraph = [], listType = '', sectionOpen = false;
  const flush = () => { if (paragraph.length) body += `<p>${inline(paragraph.join(' '))}</p>\n`; paragraph = []; };
  const closeList = () => { if (listType) body += `</${listType}>\n`; listType = ''; };
  const closeSection = () => { if (sectionOpen) body += '</section>\n'; sectionOpen = false; };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) { flush(); closeList(); continue; }
    if (line.startsWith('## ')) {
      flush(); closeList(); closeSection();
      if (!sections.length) body += illustration;
      const heading = line.slice(3), id = slug(heading);
      if (sections.some(s => s.id === id)) throw new Error(`Duplicate heading: ${id}`);
      sections.push({ heading, id });
      const variant = heading.startsWith('A Perth example:') ? ' article-example' : heading.startsWith('How do you know') ? ' article-decision' : '';
      body += `<section class="article-section${variant}" aria-labelledby="${id}"><h2 id="${id}">${escape(heading)}</h2>\n`;
      sectionOpen = true;
    } else if (line.startsWith('### ')) {
      flush(); closeList();
      if (line === '### Links and information beyond your website') body += diagram;
      body += `<h3>${escape(line.slice(4))}</h3>\n`;
    } else if (/^(?:- |\d+\. )/.test(line)) {
      flush();
      const type = line.startsWith('- ') ? 'ul' : 'ol';
      if (type !== listType) { closeList(); body += `<${type}>\n`; listType = type; }
      body += `<li>${inline(line.replace(/^(?:- |\d+\. )/, ''))}</li>\n`;
    } else if (line.startsWith('|')) {
      flush(); closeList();
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      i--;
      const cells = row => row.trim().slice(1, -1).split('|').map(cell => inline(cell.trim()));
      body += `<div class="table-hint" aria-hidden="true">Swipe to explore the table <span>↔</span></div><div class="article-table" role="region" aria-label="${escape(sections.at(-1).heading)} table" tabindex="0"><table><thead><tr>${cells(rows[0]).map(v => `<th scope="col">${v}</th>`).join('')}</tr></thead><tbody>${rows.slice(2).map(row => `<tr>${cells(row).map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>\n`;
    } else { closeList(); paragraph.push(line); }
  }
  flush(); closeList(); closeSection();
  const toc = sections.map((s,i) => `<li><a href="#${s.id}"><span>${String(i+1).padStart(2,'0')}</span>${escape(labels[i] || s.heading)}</a></li>`).join('\n');
  const main = `    <section class="blog-cover" aria-labelledby="blog-title">
      <div class="blog-cover-top"><nav aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog/">Blog</a><span aria-hidden="true">/</span><span aria-current="page">What is SEO?</span></nav><span class="blog-version">${date}</span></div>
      <div class="blog-kicker"><span>Search, explained.</span><span>SEO fundamentals</span></div>
      <h1 id="blog-title" aria-label="${escape(title)}">What is SEO?<br />How search engine optimisation<br class="desktop-break" /> <span>works for your business.</span></h1>
      <div class="blog-cover-bottom"><p>${escape(subtitle)}</p><div class="blog-reading-meta"><span>Australia</span><span>${readTime} min read</span><a href="#article">Read the article <span aria-hidden="true">↓</span></a></div></div>
      <div class="blog-cover-rule" aria-hidden="true"><span>THE RANKING REBELS BLOG / SEO FUNDAMENTALS</span><span>START WITH THE QUESTION.</span></div>
    </section>
    <div class="blog-layout">
      <aside class="blog-sidebar" aria-label="Article navigation"><nav class="blog-toc" aria-label="On this page"><p>In this article</p><ol>${toc}</ol><a class="blog-back" href="#top">Back to top <span aria-hidden="true">↑</span></a></nav></aside>
      <div class="blog-reading-column"><details class="blog-mobile-toc"><summary>In this article <span aria-hidden="true">+</span></summary><nav aria-label="On this page"><ol>${toc}</ol></nav></details>
        <article class="blog-article" id="article" aria-labelledby="blog-title" tabindex="-1">${body}</article>
        <div class="blog-endnote"><span>End of article</span><a href="#top">Back to top <span aria-hidden="true">↑</span></a></div>
      </div>
    </div>
`;
  const start = shell.indexOf('    <section class="blog-cover"'), end = shell.indexOf('    <section class="blog-next-step"');
  if (start < 0 || end < start) throw new Error('Approved public blog shell missing');
  let html = shell.slice(0, start) + main + shell.slice(end);
  html = html.replace(/<title>[^<]+<\/title>/, `<title>${escape(meta('Title tag'))}</title>`)
    .replace(/<meta name="description"[^>]+>/, `<meta name="description" content="${escape(description)}" />`)
    .replace(`<link rel="canonical" href="${previousCanonical}" />`, `<link rel="canonical" href="${canonical}" />`)
    .replace(`<meta property="og:url" content="${previousCanonical}" />`, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:title"[^>]+>/, `<meta property="og:title" content="${escape(title)}" />`)
    .replace(/<meta property="og:description"[^>]+>/, `<meta property="og:description" content="${escape(subtitle)}" />`)
    .replace('content="summary"', 'content="summary_large_image"')
    .replace('<meta property="og:locale"', `<meta property="og:image" content="https://rankingrebels.com${hero}" />\n  <meta property="og:image:width" content="1280" />\n  <meta property="og:image:height" content="720" />\n  <meta property="og:image:alt" content="${escape(meta('OG image alt'))}" />\n  <meta name="twitter:image" content="https://rankingrebels.com${hero}" />\n  <meta property="og:locale"`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify({ '@context':'https://schema.org', '@type':'BlogPosting', headline:title, description, url:canonical, mainEntityOfPage:canonical, inLanguage:'en-AU', datePublished:'2026-10-20', dateModified:'2026-10-20', image:`https://rankingrebels.com${hero}`, publisher:{'@type':'Organization',name:'Ranking Rebels',url:'https://rankingrebels.com/'} })}</script>`);
  fs.mkdirSync(path.join(root, route), {recursive:true});
  fs.writeFileSync(path.join(root, route, 'index.html'), html);
  const hubPath = path.join(root, 'blog/index.html');
  let hub = fs.readFileSync(hubPath, 'utf8');
  const story = `<a class="blog-story" href="${route}"><img class="blog-story-image" src="${image('landscaping-illustration-768.webp')}" width="768" height="432" loading="lazy" decoding="async" alt="" aria-hidden="true" /><div class="blog-story-body"><div class="blog-story-label"><span>SEO fundamentals</span><span>${date} · ${readTime} min read</span></div><h2>${escape(title)}</h2><p>${escape(meta('Extracto'))}</p><span class="blog-story-read">Read the article <span aria-hidden="true">↗</span></span></div></a>`;
  hub = hub.replace('<section class="blog-list" aria-label="Latest articles">', `<section class="blog-list" aria-label="Latest articles">${story}`)
    .replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (_,json) => {
      const schema = JSON.parse(json);
      schema.hasPart = [{ '@type':'BlogPosting',headline:title,url:canonical }, ...schema.hasPart];
      return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
    });
  fs.writeFileSync(hubPath, hub);
  fs.appendFileSync(path.join(root,'assets/css/blog.css'), `
/* Ordered editorial steps and keyboard access, shared across the blog. */
.blog-article ol { margin: 0 0 25px; padding-left: 24px; list-style: decimal; }
.blog-article ol li { padding-left: 5px; margin-block: 12px; }
.blog-preview a:focus-visible, .blog-preview summary:focus-visible, .blog-preview .article-table:focus-visible { outline: 2px solid var(--tertiary); outline-offset: 5px; }
.blog-preview .blog-mobile-toc a { min-height: 44px; }
.blog-preview .blog-editorial-figure picture { display: block; }
@media (forced-colors: active) { .blog-preview a:focus-visible, .blog-preview summary:focus-visible, .blog-preview .article-table:focus-visible { outline-color: Highlight; } }
`);
  const sitemapPath = path.join(root,'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath,'utf8');
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) sitemap = sitemap.replace('</urlset>',`  <url><loc>${canonical}</loc><lastmod>2026-10-20</lastmod></url>\n</urlset>`);
  for (const url of ['https://rankingrebels.com/blog/',previousCanonical,'https://rankingrebels.com/blog/local-seo-google-maps-visibility/']) {
    const pattern = new RegExp(`(<loc>${url.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}</loc>)(?:\\s*<lastmod>[^<]+</lastmod>)?`);
    sitemap = sitemap.replace(pattern, (_, loc) => `${loc}<lastmod>2026-10-20</lastmod>`);
  }
  fs.writeFileSync(sitemapPath,sitemap);
  console.log(`Generated What Is SEO: ${sections.length} sections, ${readTime} min read, two visuals and three hub entries.`);
};
