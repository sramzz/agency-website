const fs = require('node:fs');
const path = require('node:path');

// Render only this local draft; the public routes and publishing entry point stay separate.
const root = path.resolve(__dirname, '../../..');
const source = fs.readFileSync(path.join(__dirname, '03-articulo-business-apps-stopped-syncing-australia.md'), 'utf8');
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
const labels = ['Define the expected result', 'Recognise the symptom', 'Trace one affected item', 'Check likely causes', 'Understand what replay repeats', 'A fictional uncertain write', 'Repair and reconcile', 'Prepare for the next failure'];
const names = ['integration-trace-illustration-1280.webp', 'integration-trace-illustration-768.webp'];
for (const name of names) if (!fs.existsSync(path.join(__dirname, 'media', name))) throw new Error(`Missing preview asset: ${name}`);
const illustration = `<figure class="blog-editorial-figure"><img src="media/${names[0]}" srcset="media/${names[1]} 768w, media/${names[0]} 1280w" sizes="(max-width: 760px) 92vw, 780px" width="1280" height="720" alt="Two colleagues trace a handover on a process board, checking the gap between record cards." decoding="async" /><figcaption>Conceptual illustration: follow the handover and check where the evidence stops. This generated scene is not a real investigation or a repaired connection.</figcaption></figure>`;
const journey = `<figure class="blog-editorial-figure blog-journey"><picture><source media="(max-width: 600px)" srcset="media/uncertain-write-mobile.svg" width="540" height="1795" /><img src="media/uncertain-write.svg" width="1000" height="1110" loading="lazy" decoding="async" alt="Fictional teaching premises, not observed results. The source and trigger contain enquiry E104; contact C42 is linked. Opportunity creation timed out, leaving the write uncertain. The follow-up task was not attempted. Investigate the destination, current owner, manual actions and pending retries. A later premise establishes that opportunity O104 already exists for E104: preserve the confirmed relationship and address only the missing task if still needed through a supported recovery method. If the opportunity cannot be established, keep the write uncertain and refer it to the owner. A blank search does not prove that creating again is safe. E105 is a separate legitimate enquiry from the same contact. No recovery has been executed." /></picture><figcaption>Fictional E104: the opportunity write is uncertain after a timeout, while the task was not attempted. The later O104 premise does not establish that recovery was executed. Check current state before addressing missing work.</figcaption></figure>`;
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
  if (sections.at(-1).heading.startsWith('A fictional enquiry')) body += journey;
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
  } else if (line.startsWith('> ')) {
    flush(); closeList(); body += `<blockquote><p>${inline(line.slice(2))}</p></blockquote>\n`;
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
      <div class="blog-cover-top"><nav aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog/">Blog</a><span aria-hidden="true">/</span><span aria-current="page">Integration troubleshooting</span></nav><span class="blog-version"><i aria-hidden="true"></i>Local draft · V1</span></div>
      <div class="blog-kicker"><span>Follow the work between your apps.</span><span>Integration troubleshooting</span></div>
      <h1 id="blog-title" aria-label="${escape(title)}">Business apps<br class="desktop-break" /><span>stopped syncing?</span></h1>
      <div class="blog-cover-bottom"><p>Trace one affected enquiry, check what actually happened and plan recovery before repeating an action.</p><div class="blog-reading-meta"><span>Australia</span><span>${readTime} min read</span><a href="#article">Read the article <span aria-hidden="true">↓</span></a></div></div>
      <div class="blog-cover-rule" aria-hidden="true"><span>16 / THE RANKING REBELS BLOG</span><span>TRACE THE ITEM. VERIFY THE RESULT.</span></div>
    </section>
    <div class="blog-reading-surface"><div class="blog-layout">
      <aside class="blog-sidebar" aria-label="Article navigation"><nav class="blog-toc" aria-label="On this page"><p>In this article</p><ol>${toc}</ol><a class="blog-back" href="#top">Back to top <span aria-hidden="true">↑</span></a></nav></aside>
      <div class="blog-reading-column"><details class="blog-mobile-toc"><summary>In this article <span aria-hidden="true">+</span></summary><nav aria-label="On this page"><ol>${toc}</ol></nav></details>
        <article class="blog-article" id="article" aria-labelledby="blog-title" tabindex="-1">${body}</article>
        <aside class="blog-resource-note" aria-labelledby="integration-card-title"><h2 id="integration-card-title">Integration trace and recovery card · Local draft</h2><p>Record the expected result, trace one item and separate proposed recovery from actual evidence. Read or print the complete worksheet, with a local download.</p><a href="worksheet-preview.html">Open the trace and recovery card</a></aside>
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
  <link rel="stylesheet" href="preview.css?v=20261104-v1" />
  <script src="/assets/js/scroll-progress.js" defer></script>
  <script src="/assets/js/blog.js?v=20261019-melbourne" defer></script>
</head>`;
const shell = fs.readFileSync(path.join(root, 'blog/local-seo-google-maps-visibility/index.html'), 'utf8');
const start = shell.indexOf('    <section class="blog-cover"');
const end = shell.indexOf('  </main>', start);
if (start < 0 || end < start) throw new Error('Approved blog shell not found.');
const page = (shell.slice(0, start) + main + shell.slice(end))
  .replace(/<head>[\s\S]*?<\/head>/, head)
  .replace('class="editorial-site blog-preview"', 'class="editorial-site blog-preview blog-integration-preview"')
  .replace('SEO + GEO strategy for organic discovery.', 'Practical guidance on tracing connected business applications for Australian service businesses.');
for (const theme of ['light', 'dark']) {
 const switcher = `<nav class="preview-switch" aria-label="Compare reading backgrounds"><span>Local design study</span><a href="preview.html"${theme === 'light' ? ' aria-current="page"' : ''}>Light reading</a><a href="preview-dark.html"${theme === 'dark' ? ' aria-current="page"' : ''}>Dark reading</a></nav>`;
 const output = page.replace('blog-integration-preview"', `blog-integration-preview theme-${theme}"`).replace('<main', switcher + '<main');
 fs.writeFileSync(path.join(__dirname, theme === 'light' ? 'preview.html' : 'preview-dark.html'), output);
}
console.log(`Two local themes generated: ${sections.length} sections, two tables, one illustration and one diagram, ${readTime} min read. No public files written.`);
