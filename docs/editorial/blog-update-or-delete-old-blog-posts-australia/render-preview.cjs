const fs = require('node:fs');
const path = require('node:path');

// Render only this local draft; the public routes and publishing entry point stay separate.
const root = path.resolve(__dirname, '../../..');
const source = fs.readFileSync(path.join(__dirname, '03-articulo-update-or-delete-old-blog-posts-australia.md'), 'utf8');
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
const labels = ['What a review can improve', 'Content and URL decisions', 'Evidence before editing', 'When to keep a post', 'When to update', 'When to combine', 'When removal makes sense', 'Use a decision log', 'Verify and review the result'];
const names = ['content-review-illustration-1280.webp', 'content-review-illustration-768.webp'];
for (const name of names) if (!fs.existsSync(path.join(__dirname, 'media', name))) throw new Error(`Missing preview asset: ${name}`);
const illustration = `<figure class="blog-editorial-figure"><img src="media/${names[0]}" srcset="media/${names[1]} 768w, media/${names[0]} 1280w" sizes="(max-width: 760px) 92vw, 780px" width="1280" height="720" alt="An editor compares printed article proofs beside archive shelves, marking one passage with a red pencil." decoding="async" /><figcaption>Conceptual illustration: review the answer before deciding what to change. This generated scene is not a real website audit or a record of pages being removed.</figcaption></figure>`;
const journey = `<figure class="blog-editorial-figure blog-journey"><picture><source media="(max-width: 600px)" srcset="media/content-and-url-mobile.svg" width="540" height="1800" /><img src="media/content-and-url.svg" width="1000" height="1030" loading="lazy" decoding="async" alt="Five fictional teaching cases, not a real audit or executed changes. A: keep an accurate distinct guide at its existing address. B: update changed quote-submission instructions at the same address and test the route. C: combine guides confirmed to answer the same task, preserving useful details; verify a genuine replacement before permanently redirecting retired addresses with 301 or 308. D: remove an expired offer with no continuing purpose or equivalent replacement, using an appropriate 404 or 410 and updating controlled links. E: investigate missing evidence; retain pending investigation, with no removal approved. A 410 is not a redirect. Proposed decisions are different from observed technical or business results." /></picture><figcaption>Five fictional cases. Decide what the content needs, then record the URL action separately. A 410 is not a redirect. Proposals and expected benefits are not observed results. No real pages were changed in these examples.</figcaption></figure>`;
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
  if (sections.at(-1).heading.startsWith('Use a decision log')) body += journey;
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
if (sections.length !== 9) throw new Error('The reviewed draft has nine sections; review changed structure before rendering.');
const toc = sections.map((section, i) => `<li><a href="#${section.id}"><span>${String(i + 1).padStart(2, '0')}</span>${escape(labels[i])}</a></li>`).join('\n');
const readTime = Math.ceil(source.replace(/\]\([^)]+\)/g, ']').split(/\s+/).length / 220);
const main = `    <section class="blog-cover" aria-labelledby="blog-title">
      <div class="blog-cover-top"><nav aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog/">Blog</a><span aria-hidden="true">/</span><span aria-current="page">Content review</span></nav><span class="blog-version"><i aria-hidden="true"></i>Local draft · V1</span></div>
      <div class="blog-kicker"><span>Keep the answer useful.</span><span>Content review</span></div>
      <h1 id="blog-title" aria-label="${escape(title)}">Update or delete<br class="desktop-break" /><span>old blog posts?</span><small>A Practical SEO Guide</small></h1>
      <div class="blog-cover-bottom"><p>Decide what still helps the reader, what needs work and what should happen to the existing address.</p><div class="blog-reading-meta"><span>Australia</span><span>${readTime} min read</span><a href="#article">Read the article <span aria-hidden="true">↓</span></a></div></div>
      <div class="blog-cover-rule" aria-hidden="true"><span>15 / THE RANKING REBELS BLOG</span><span>REVIEW THE ANSWER. RECORD THE DECISION.</span></div>
    </section>
    <div class="blog-reading-surface"><div class="blog-layout">
      <aside class="blog-sidebar" aria-label="Article navigation"><nav class="blog-toc" aria-label="On this page"><p>In this article</p><ol>${toc}</ol><a class="blog-back" href="#top">Back to top <span aria-hidden="true">↑</span></a></nav></aside>
      <div class="blog-reading-column"><details class="blog-mobile-toc"><summary>In this article <span aria-hidden="true">+</span></summary><nav aria-label="On this page"><ol>${toc}</ol></nav></details>
        <article class="blog-article" id="article" aria-labelledby="blog-title" tabindex="-1">${body}</article>
        <aside class="blog-resource-note" aria-labelledby="content-log-title"><h2 id="content-log-title">Content review decision log · Local draft</h2><p>Record the purpose, evidence, content decision and URL action. Keep proposals separate from implementation and follow-up. Read or print the complete worksheet, with a local download.</p><a href="worksheet-preview.html">Open the decision log</a></aside>
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
  <link rel="stylesheet" href="preview.css?v=20261103-v1" />
  <script src="/assets/js/scroll-progress.js" defer></script>
  <script src="/assets/js/blog.js?v=20261019-melbourne" defer></script>
</head>`;
const shell = fs.readFileSync(path.join(root, 'blog/local-seo-google-maps-visibility/index.html'), 'utf8');
const start = shell.indexOf('    <section class="blog-cover"');
const end = shell.indexOf('  </main>', start);
if (start < 0 || end < start) throw new Error('Approved blog shell not found.');
const page = (shell.slice(0, start) + main + shell.slice(end))
  .replace(/<head>[\s\S]*?<\/head>/, head)
  .replace('class="editorial-site blog-preview"', 'class="editorial-site blog-preview blog-old-content-preview"')
  .replace('SEO + GEO strategy for organic discovery.', 'Practical guidance on reviewing existing articles for Australian service businesses.');
for (const theme of ['light', 'dark']) {
 const switcher = `<nav class="preview-switch" aria-label="Compare reading backgrounds"><span>Local design study</span><a href="preview.html"${theme === 'light' ? ' aria-current="page"' : ''}>Light reading</a><a href="preview-dark.html"${theme === 'dark' ? ' aria-current="page"' : ''}>Dark reading</a></nav>`;
 const output = page.replace('blog-old-content-preview"', `blog-old-content-preview theme-${theme}"`).replace('<main', switcher + '<main');
 fs.writeFileSync(path.join(__dirname, theme === 'light' ? 'preview.html' : 'preview-dark.html'), output);
}
console.log(`Two local themes generated: ${sections.length} sections, two tables, one illustration and one diagram, ${readTime} min read. No public files written.`);
