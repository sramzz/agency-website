const fs = require('node:fs');
const path = require('node:path');

// Render only this local draft; the public routes and publishing entry point stay separate.
const root = path.resolve(__dirname, '../../..');
const source = fs.readFileSync(path.join(__dirname, '03-articulo-ai-chatbot-outdated-answers-australia.md'), 'utf8');
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
const labels = ['Where answers come from', 'Six places to investigate', 'The Saturday example', 'Does it need retraining?', 'Test the repair', 'Maintain the information'];
const names = ['chatbot-evidence-illustration-1280.webp', 'chatbot-evidence-illustration-768.webp'];
for (const name of names) if (!fs.existsSync(path.join(__dirname, 'media', name))) throw new Error(`Missing preview asset: ${name}`);
const illustration = `<figure class="blog-editorial-figure"><img src="media/${names[0]}" srcset="media/${names[1]} 768w, media/${names[0]} 1280w" sizes="(max-width: 760px) 92vw, 780px" width="1280" height="720" alt="An illustrated speaking horn draws a paper ribbon from an old manual while a newer red-tabbed guide sits beside it." decoding="async" /><figcaption>Conceptual illustration: follow an answer back to the information supplying it. This is a visual metaphor, not a chatbot or client case.</figcaption></figure>`;
const journey = `<figure class="blog-editorial-figure blog-journey"><picture><source media="(max-width: 600px)" srcset="media/saturday-answer-evidence-mobile.svg" width="540" height="1545" /><img src="media/saturday-answer-evidence.svg" width="1000" height="1070" loading="lazy" decoding="async" alt="Fictional Saturday-visit example, not a chatbot test. K2-v2 is the current approved guide: standard visits are on weekdays and Saturday visits require separate confirmation. The website reflects K2-v2, but the superseded K1-v1 PDF remains eligible for search. The chatbot retrieves K1-v1 and says Saturday visits are included. Check source eligibility and selection, then verify that K2-v2 is accessible, retrieved with its conditions intact and correctly reflected in the response. The expected answer does not invent a Saturday price, available slot or booking. No repair or test result is represented." /></picture><figcaption>Fictional example: the website uses K2-v2, but the chatbot retrieves the superseded K1-v1 PDF. The expected response preserves the weekday rule and separate confirmation for Saturdays. No repair or test result is represented.</figcaption></figure>`;
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
  if (sections.at(-1).heading.startsWith('A fictional example')) body += journey;
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
  } else if (/^>(?: |$)/.test(line)) {
    flush(); closeList(); const quoteLines = [];
    while (i < lines.length && /^>(?: |$)/.test(lines[i])) quoteLines.push(lines[i++].replace(/^> ?/, ''));
    i--; const quoteParagraphs = quoteLines.join('\n').split(/\n\s*\n/).filter(Boolean);
    body += '<blockquote>' + quoteParagraphs.map(part => '<p>' + inline(part.replace(/\n/g, ' ')) + '</p>').join('') + '</blockquote>\n';
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
if (sections.length !== 6) throw new Error('The reviewed draft has six sections; review changed structure before rendering.');
const toc = sections.map((section, i) => `<li><a href="#${section.id}"><span>${String(i + 1).padStart(2, '0')}</span>${escape(labels[i])}</a></li>`).join('\n');
const readTime = Math.ceil(source.replace(/\]\([^)]+\)/g, ']').split(/\s+/).length / 220);
const main = `    <section class="blog-cover" aria-labelledby="blog-title">
      <div class="blog-cover-top"><nav aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog/">Blog</a><span aria-hidden="true">/</span><span aria-current="page">Chatbot answers</span></nav><span class="blog-version"><i aria-hidden="true"></i>Local draft · V1</span></div>
      <div class="blog-kicker"><span>Follow the evidence.</span><span>Chatbot answers</span></div>
      <h1 id="blog-title" aria-label="${escape(title)}">Why does your<br class="desktop-break" /><span>AI chatbot</span><small>give outdated answers?</small></h1>
      <div class="blog-cover-bottom"><p>Your website has changed. Find out why the chatbot is still telling customers the old answer.</p><div class="blog-reading-meta"><span>Australia</span><span>${readTime} min read</span><a href="#article">Read the article <span aria-hidden="true">↓</span></a></div></div>
      <div class="blog-cover-rule" aria-hidden="true"><span>19 / THE RANKING REBELS BLOG</span><span>ONE ANSWER. FOLLOW IT TO THE SOURCE.</span></div>
    </section>
    <div class="blog-reading-surface"><div class="blog-layout">
      <aside class="blog-sidebar" aria-label="Article navigation"><nav class="blog-toc" aria-label="On this page"><p>In this article</p><ol>${toc}</ol><a class="blog-back" href="#top">Back to top <span aria-hidden="true">↑</span></a></nav></aside>
      <div class="blog-reading-column"><details class="blog-mobile-toc"><summary>In this article <span aria-hidden="true">+</span></summary><nav aria-label="On this page"><ol>${toc}</ol></nav></details>
        <article class="blog-article" id="article" aria-labelledby="blog-title" tabindex="-1">${body}</article>
        <aside class="blog-resource-note" aria-labelledby="chatbot-card-title"><h2 id="chatbot-card-title">Chatbot answer evidence card · Local draft</h2><p>Record the disputed answer, follow its evidence and define the next check. Read or print the complete worksheet, with eight fictional exercises and blank observations.</p><a href="worksheet-preview.html">Open the chatbot answer evidence card</a></aside>
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
  <link rel="stylesheet" href="preview.css?v=20261111-v1" />
  <script src="/assets/js/scroll-progress.js" defer></script>
  <script src="/assets/js/blog.js?v=20261019-melbourne" defer></script>
</head>`;
const shell = fs.readFileSync(path.join(root, 'blog/local-seo-google-maps-visibility/index.html'), 'utf8');
const start = shell.indexOf('    <section class="blog-cover"');
const end = shell.indexOf('  </main>', start);
if (start < 0 || end < start) throw new Error('Approved blog shell not found.');
const page = (shell.slice(0, start) + main + shell.slice(end))
  .replace(/<head>[\s\S]*?<\/head>/, head)
  .replace('class="editorial-site blog-preview"', 'class="editorial-site blog-preview blog-chatbot-evidence-preview"')
  .replace('SEO + GEO strategy for organic discovery.', 'Practical guidance on investigating outdated chatbot answers for Australian service businesses.');
for (const theme of ['light', 'dark']) {
 const switcher = `<nav class="preview-switch" aria-label="Compare reading backgrounds"><span>Local design study</span><a href="preview.html"${theme === 'light' ? ' aria-current="page"' : ''}>Light reading</a><a href="preview-dark.html"${theme === 'dark' ? ' aria-current="page"' : ''}>Dark reading</a></nav>`;
 const output = page.replace('blog-chatbot-evidence-preview"', `blog-chatbot-evidence-preview theme-${theme}"`).replace('<main', switcher + '<main');
 fs.writeFileSync(path.join(__dirname, theme === 'light' ? 'preview.html' : 'preview-dark.html'), output);
}
console.log(`Two local themes generated: ${sections.length} sections, two tables, one illustration and one diagram, ${readTime} min read. No public files written.`);

require('./render-worksheet.cjs');
