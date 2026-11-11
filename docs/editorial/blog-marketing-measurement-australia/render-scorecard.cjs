const fs = require('node:fs');
const path = require('node:path');
const file = path.join(__dirname, 'scorecard-preview.html');
const source = fs.readFileSync(path.join(__dirname, '07-marketing-results-scorecard.md'), 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const inline = value => escape(value).replace(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g, '<a href="$2">$1</a>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>');
const lines = source.trim().split(/\r?\n/).slice(1);
let body = '', paragraph = [];
const flush = () => { if (paragraph.length) body += `<p>${inline(paragraph.join(' '))}</p>\n`; paragraph = []; };
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) { flush(); continue; }
  if (line.startsWith('## ')) { flush(); body += `<h2>${inline(line.slice(3))}</h2>\n`; }
  else if (line.startsWith('|')) {
    flush(); const rows = [];
    while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
    i--; const cells = row => row.trim().slice(1, -1).split('|').map(value => inline(value.trim()));
    body += '<div class="article-table" role="region" aria-label="Marketing results scorecard table" tabindex="0"><table><thead><tr>' + cells(rows[0]).map(c => `<th scope="col">${c}</th>`).join('') + '</tr></thead><tbody>' + rows.slice(2).map(row => '<tr>' + cells(row).map(c => `<td>${c}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>\n';
  } else paragraph.push(line);
}
flush();
const shell = fs.readFileSync(file, 'utf8');
if (!/<article\b[^>]*>[\s\S]*?<\/article>/.test(shell)) throw new Error('Scorecard shell missing.');
fs.writeFileSync(file, shell.replace(/(<article\b[^>]*>)[\s\S]*?(<\/article>)/, (_, open, close) => open + body + close));
console.log('Rendered complete marketing scorecard; business fields remain blank.');
