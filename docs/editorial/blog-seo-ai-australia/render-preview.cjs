const fs = require('node:fs');
const path = require('node:path');

// A deliberately small renderer for this reviewed manuscript: headings, paragraphs and tables.
const source = fs.readFileSync(path.join(__dirname, '04-blog-seo-ai-australia.md'), 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const inline = value => escape(value).replace(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g, '<a href="$2">$1</a>');
const slug = value => value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
const lines = source.trim().split(/\r?\n/);
const title = lines.shift().replace(/^# /, '');
const sections = [];
const shortLabels = ['What customers need', 'SEO, GEO & AEO', 'Where SEO can help', 'What the research says', 'Google & ChatGPT Search', 'Invest, repair or test?', 'The Brisbane example', 'Where to start', 'What to measure', 'Before you buy'];
let html = '';
let sectionOpen = false;
let paragraph = [];
const flush = () => {
  if (paragraph.length) html += `<p>${inline(paragraph.join(' '))}</p>\n`;
  paragraph = [];
};
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) { flush(); continue; }
  if (line.startsWith('## ')) {
    flush();
    if (sectionOpen) html += '</section>\n';
    const heading = line.slice(3);
    const id = slug(heading);
    sections.push({ heading, id });
    html += `<section class="article-section${heading.startsWith('A Brisbane') ? ' article-example' : ''}${heading.startsWith('When should') ? ' article-decision' : ''}" aria-labelledby="${id}"><h2 id="${id}">${escape(heading)}</h2>\n`;
    sectionOpen = true;
  } else if (line.startsWith('### ')) {
    flush(); html += `<h3>${escape(line.slice(4))}</h3>\n`;
  } else if (line.startsWith('|')) {
    flush();
    const rows = [];
    while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
    i--;
    const cells = row => row.slice(1, -1).split('|').map(cell => inline(cell.trim()));
    const headers = cells(rows[0]);
    const tableName = escape(sections.at(-1).heading);
    html += `<div class="table-hint" aria-hidden="true">Swipe to explore the table <span>↔</span></div><div class="article-table" role="region" aria-label="${tableName} table" tabindex="0"><table><thead><tr>${headers.map(cell => `<th scope="col">${cell}</th>`).join('')}</tr></thead><tbody>${rows.slice(2).map(row => `<tr>${cells(row).map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>\n`;
  } else paragraph.push(line);
}
flush();
if (sectionOpen) html += '</section>';
const toc = sections.map((section, index) => `<li><a href="#${section.id}"><span>${String(index + 1).padStart(2, '0')}</span>${escape(shortLabels[index] || section.heading)}</a></li>`).join('\n');
const readTime = Math.ceil(source.replace(/\]\([^)]+\)/g, ']').split(/\s+/).length / 220);
const page = `<!doctype html>
<html lang="en-AU">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Is SEO Still Relevant in the Age of AI? | Ranking Rebels</title>
  <meta name="description" content="Is SEO still worth the budget? See what AI search changes, how Google and ChatGPT differ, and what Australian service businesses should measure." />
  <meta name="theme-color" content="#050609" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&family=Oswald:wght@500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/css/styles.css?v=20261013-autoplay-only" />
  <link rel="stylesheet" href="/assets/css/scroll-progress.css" />
  <link rel="stylesheet" href="preview.css" />
  <script src="/assets/js/scroll-progress.js" defer></script>
  <script src="preview.js" defer></script>
</head>
<body class="editorial-site blog-preview">
  <a class="blog-skip" href="#article">Skip to article</a>
  <header class="site-header">
    <a class="brand" href="/" aria-label="Ranking Rebels home"><span class="brand-mark">RR</span><span>Ranking Rebels</span></a>
    <nav class="desktop-nav" aria-label="Primary navigation"></nav>
    <div class="header-actions"><a class="header-cta" href="/contact/">Hire us!</a></div>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open navigation"><span></span><span></span><span></span></button>
  </header>
  <nav id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation"></nav>
  <main id="top">
    <section class="blog-cover" aria-labelledby="blog-title">
      <div class="blog-cover-top"><nav aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Journal</span></nav><span class="blog-version"><i aria-hidden="true"></i>Local preview · V1</span></div>
      <div class="blog-kicker"><span>Search, explained.</span><span>SEO &amp; AI search</span></div>
      <h1 id="blog-title" aria-label="${escape(title)}">Is SEO still relevant<br class="desktop-break" /> in the age of ChatGPT<br class="desktop-break" /> <span>and AI search?</span></h1>
      <div class="blog-cover-bottom"><p>A practical guide for Australian service businesses deciding where SEO belongs in the budget.</p><div class="blog-reading-meta"><span>Australia</span><span>${readTime} min read</span><a href="#article">Read the article <span aria-hidden="true">↓</span></a></div></div>
      <div class="blog-cover-rule" aria-hidden="true"><span>01 / THE RANKING REBELS JOURNAL</span><span>CLARITY BEFORE CLICKS.</span></div>
    </section>
    <div class="blog-layout">
      <aside class="blog-sidebar" aria-label="Article navigation">
        <nav class="blog-toc" aria-label="On this page"><p>In this article</p><ol>${toc}</ol><a class="blog-back" href="#top">Back to top <span aria-hidden="true">↑</span></a></nav>
      </aside>
      <div class="blog-reading-column">
        <details class="blog-mobile-toc"><summary>In this article <span aria-hidden="true">+</span></summary><nav aria-label="On this page"><ol>${toc}</ol></nav></details>
        <article class="blog-article" id="article" aria-labelledby="blog-title" tabindex="-1">${html}</article>
        <div class="blog-endnote"><span>End of article</span><a href="#top">Back to top <span aria-hidden="true">↑</span></a></div>
      </div>
    </div>
    <section class="blog-next-step" aria-labelledby="next-step-title"><div><p class="eyebrow">Organic Discovery · SEO + GEO</p><h2 id="next-step-title">Put the next step<br />in focus.</h2></div><div><p>Explore how Ranking Rebels approaches search visibility and the path from discovery to enquiry.</p><a class="button button-primary" href="/solutions/organic-discovery/">Explore Organic Discovery <span aria-hidden="true">↗</span></a></div></section>
  </main>
  <footer class="site-footer"><div><a class="brand" href="/"><span>Ranking Rebels</span></a><p>SEO + GEO strategy for organic discovery.</p></div><div class="blog-footer-links"><a href="/solutions/">All solutions</a><a href="/about/">About us</a><a href="/contact/">Contact</a><span>Editorial preview · Not published</span></div></footer>
  <script src="/assets/js/script.js?v=20260926-header-surface-global"></script>
</body>
</html>`;
fs.writeFileSync(path.join(__dirname, 'preview.html'), page);
console.log(`Rendered complete article: ${sections.length} sections, ${readTime} min read.`);
