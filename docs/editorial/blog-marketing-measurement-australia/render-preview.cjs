const fs = require('node:fs');
const path = require('node:path');

// Render only this local draft; the public routes and publishing entry point stay separate.
const root = path.resolve(__dirname, '../../..');
const source = fs.readFileSync(path.join(__dirname, '03-articulo-marketing-measurement-australia.md'), 'utf8');
const seo = fs.readFileSync(path.join(__dirname, '04-paquete-seo.md'), 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const inline = value => escape(value)
  .replace(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g, '<a href="$2">$1</a>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>');
const slug = value => value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
const field = label => {
  const row = seo.split(/\r?\n/).find(line => line.startsWith(`| ${label} |`));
  if (!row) throw new Error(`Missing SEO field: ${label}`);
  return row.slice(`| ${label} |`.length).replace(/\|\s*$/, '').trim().replace(/\\\|/g, '|');
};
const title = source.match(/^# (.+)/)[1];
const titleTag = field('Title');
const description = field('Meta description');
const labels = ['Business objective', 'Define the records', 'Give tools a job', 'Why reports disagree', 'Allow for follow-up', 'Costs and rates', 'Attribution limits', 'Choose a next step'];
const names = ['marketing-results-illustration-1280.webp', 'marketing-results-illustration-768.webp'];
for (const name of names) if (!fs.existsSync(path.join(__dirname, 'media', name))) throw new Error(`Missing preview asset: ${name}`);
const illustration = `<figure class="blog-editorial-figure"><img src="media/${names[0]}" srcset="media/${names[1]} 768w, media/${names[0]} 1280w" sizes="(max-width: 760px) 92vw, 780px" width="1280" height="720" alt="Two colleagues compare a job folder with paper records on a workshop board, with a service vehicle visible through the open door." decoding="async" /><figcaption>Conceptual illustration: compare the report with the enquiries and work your business can verify. Not a client case study.</figcaption></figure>`;
const journey = `<figure class="blog-editorial-figure blog-journey"><picture><source media="(max-width: 600px)" srcset="media/revenue-and-costs-mobile.svg" width="540" height="1080" /><img src="media/revenue-and-costs.svg" width="1000" height="640" loading="lazy" decoding="async" alt="Hypothetical revenue of AUD 7,500 includes AUD 3,600 delivery costs and AUD 2,100 marketing, leaving AUD 1,800 before other costs. A revenue ROAS of 5 times media spend does not measure profit." /></picture><figcaption>Hypothetical amounts, consistently excluding GST. The remaining contribution is before other overheads and costs.</figcaption></figure>`;
const lines = source.trim().split(/\r?\n/).slice(1);
const sections = [];
let body = '';
let paragraph = [];
let listType = '';
let sectionOpen = false;
const flush = () => {
  if (paragraph.length) body += `<p>${inline(paragraph.join(' '))}</p>\n`;
  paragraph = [];
};
const closeList = () => { if (listType) body += `</${listType}>\n`; listType = ''; };
const closeSection = () => {
  if (!sectionOpen) return;
  body += '</section>\n';
  if (sections.at(-1).heading.startsWith('Define what each cost')) body += journey;
  sectionOpen = false;
};
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) { flush(); closeList(); continue; }
  if (line.startsWith('## ')) {
    flush(); closeList(); closeSection();
    if (!sections.length) body += illustration;
    const heading = line.slice(3);
    const id = slug(heading);
    if (sections.some(section => section.id === id)) throw new Error(`Duplicate section id: ${id}`);
    sections.push({ heading, id });
    const variant = '';
    body += `<section class="article-section${variant}" aria-labelledby="${id}"><h2 id="${id}">${escape(heading)}</h2>\n`;
    sectionOpen = true;
  } else if (line.startsWith('### ')) {
    flush(); closeList(); body += `<h3>${escape(line.slice(4))}</h3>\n`;
  } else if (/^(?:- |\d+\. )/.test(line)) {
    flush();
    const type = line.startsWith('- ') ? 'ul' : 'ol';
    if (listType !== type) { closeList(); body += `<${type}>\n`; listType = type; }
    body += `<li>${inline(line.replace(/^(?:- |\d+\. )/, ''))}</li>\n`;
  } else if (line.startsWith('|')) {
    flush(); closeList();
    const rows = [];
    while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
    i--;
    const cells = row => row.trim().slice(1, -1).split('|').map(value => inline(value.trim()));
    const name = escape(sections.at(-1).heading);
    body += `<div class="table-hint" aria-hidden="true">Swipe to explore the table <span>↔</span></div><div class="article-table" role="region" aria-label="${name} table" tabindex="0"><table><thead><tr>${cells(rows[0]).map(value => `<th scope="col">${value}</th>`).join('')}</tr></thead><tbody>${rows.slice(2).map(row => `<tr>${cells(row).map(value => `<td>${value}</td>`).join('')}</tr>`).join('')}</tbody></table></div>\n`;
  } else { closeList(); paragraph.push(line); }
}
flush(); closeList(); closeSection();
if (sections.length !== 8) throw new Error('The reviewed draft has eight sections; review changed structure before rendering.');
const toc = sections.map((section, i) => `<li><a href="#${section.id}"><span>${String(i + 1).padStart(2, '0')}</span>${escape(labels[i])}</a></li>`).join('\n');
const readTime = Math.ceil(source.replace(/\]\([^)]+\)/g, ']').split(/\s+/).length / 220);
const main = `    <section class="blog-cover" aria-labelledby="blog-title">
      <div class="blog-cover-top"><nav aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog/">Blog</a><span aria-hidden="true">/</span><span aria-current="page">Marketing results</span></nav><span class="blog-version"><i aria-hidden="true"></i>Local draft · V1</span></div>
      <div class="blog-kicker"><span>Follow the evidence.</span><span>Marketing results</span></div>
      <h1 id="blog-title" aria-label="${escape(title)}">How to tell whether<br class="desktop-break" />your digital marketing<br /><span>is working.</span><small>From Visits to Customers</small></h1>
      <div class="blog-cover-bottom"><p>Connect reports with the enquiries, jobs and costs your business can verify.</p><div class="blog-reading-meta"><span>Australia</span><span>${readTime} min read</span><a href="#article">Read the article <span aria-hidden="true">↓</span></a></div></div>
      <div class="blog-cover-rule" aria-hidden="true"><span>11 / THE RANKING REBELS BLOG</span><span>CHECK THE RECORDS. CHOOSE THE NEXT STEP.</span></div>
    </section>
    <div class="blog-reading-surface"><div class="blog-layout">
      <aside class="blog-sidebar" aria-label="Article navigation"><nav class="blog-toc" aria-label="On this page"><p>In this article</p><ol>${toc}</ol><a class="blog-back" href="#top">Back to top <span aria-hidden="true">↑</span></a></nav></aside>
      <div class="blog-reading-column"><details class="blog-mobile-toc"><summary>In this article <span aria-hidden="true">+</span></summary><nav aria-label="On this page"><ol>${toc}</ol></nav></details>
        <article class="blog-article" id="article" aria-labelledby="blog-title" tabindex="-1">${body}</article>
        <aside class="blog-resource-note" aria-labelledby="marketing-scorecard-title"><h2 id="marketing-scorecard-title">Marketing results scorecard · Local draft</h2><p>Define the goal, check the records and review the same group of enquiries. Read or print the complete scorecard, with a local download.</p><a href="scorecard-preview.html">Open the scorecard</a></aside>
        <div class="blog-endnote"><span>End of article</span><a href="#top">Back to top <span aria-hidden="true">↑</span></a></div>
      </div>
    </div></div>

`;
const head = `<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>${escape(titleTag)}</title>
  <meta name="description" content="${escape(description)}" />
  <meta name="theme-color" content="#050609" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="stylesheet" href="/assets/css/styles.css?v=20261013-autoplay-only" />
  <link rel="stylesheet" href="/assets/css/blog.css?v=20261027-underlined-links" />
  <link rel="stylesheet" href="preview.css?v=20261029-v1" />
  <script src="/assets/js/scroll-progress.js" defer></script>
  <script src="/assets/js/blog.js?v=20261019-melbourne" defer></script>
</head>`;
const shell = fs.readFileSync(path.join(root, 'blog/local-seo-google-maps-visibility/index.html'), 'utf8');
const start = shell.indexOf('    <section class="blog-cover"');
const end = shell.indexOf('  </main>', start);
if (start < 0 || end < start) throw new Error('Approved blog shell not found.');
const page = (shell.slice(0, start) + main + shell.slice(end))
  .replace(/<head>[\s\S]*?<\/head>/, head)
  .replace('class="editorial-site blog-preview"', 'class="editorial-site blog-preview blog-measurement-preview"')
  .replace('SEO + GEO strategy for organic discovery.', 'Practical guidance on marketing results for Australian service businesses.');
for (const theme of ['light', 'dark']) {
 const switcher = `<nav class="preview-switch" aria-label="Compare reading backgrounds"><span>Local design study</span><a href="preview.html"${theme === 'light' ? ' aria-current="page"' : ''}>Light reading</a><a href="preview-dark.html"${theme === 'dark' ? ' aria-current="page"' : ''}>Dark reading</a></nav>`;
 const output = page.replace('blog-measurement-preview"', `blog-measurement-preview theme-${theme}"`).replace('<main', switcher + '<main');
 fs.writeFileSync(path.join(__dirname, theme === 'light' ? 'preview.html' : 'preview-dark.html'), output);
}
console.log(`Two local themes generated: ${sections.length} sections, four tables, one illustration and one diagram, ${readTime} min read. No public files written.`);
