// Run with Node and Playwright available through NODE_PATH.
// BROWSER_EXECUTABLE_PATH optionally selects an installed Chromium browser.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

async function run() {
  const root = path.resolve(process.env.SITE_ROOT || path.join(__dirname, '..'));
  const server = http.createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      let file = path.resolve(root, '.' + pathname);
      if (!file.startsWith(root + path.sep) && file !== root) throw new Error('Invalid path');
      if (pathname.endsWith('/')) file = path.join(file, 'index.html');
      const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
      res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
      res.end(await fs.readFile(file));
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE_PATH ? { executablePath: process.env.BROWSER_EXECUTABLE_PATH } : { channel: 'chrome' }) });
    const page = await browser.newPage();
    const base = `http://127.0.0.1:${server.address().port}`;
    // Keep layout checks independent of external font and analytics services.
    await page.route('**/*', route => route.request().url().startsWith(base) ? route.continue() : route.abort());
    let checks = 0;
    for (const route of ['/case-studies/', '/', '/locations/netherlands/', '/solutions/paid-ads/']) {
      await page.goto(base + route, { waitUntil: 'load' });
      for (const width of [320, 360, 390, 430, 768, 1440]) {
        await page.setViewportSize({ width, height: 844 });
        const bounds = await page.locator('.site-header').evaluate(header => [...header.querySelectorAll('a.brand, .location-trigger, .menu-toggle')].filter(e => e.getBoundingClientRect().width > 0).map(e => ({ name: e.className, left: e.getBoundingClientRect().left, right: e.getBoundingClientRect().right })));
        for (const box of bounds) assert.ok(box.left >= 0 && box.right <= width, `${route} at ${width}px: ${box.name} outside viewport: ${JSON.stringify(box)}`);
        assert.equal(await page.getByRole('button', { name: /Locations|Netherlands|Australia|LATAM/ }).count(), 1, 'Location control retains its accessible name');
        if (width <= 980) {
          await page.locator('.location-trigger').click();
          const panel = await page.locator('.location-panel').boundingBox();
          assert.ok(panel && panel.x >= 0 && panel.x + panel.width <= width, `${route}: location menu overflows at ${width}px`);
          await page.keyboard.press('Escape');
          assert.equal(await page.locator('.location-trigger').getAttribute('aria-expanded'), 'false');
          await page.locator('.menu-toggle').click();
          assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
          await page.keyboard.press('Escape');
          assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
        }
        checks++;
      }
    }
    console.log(`PASS: ${checks} header layouts; location/menu bounds, accessible names and keyboard dismissal.`);
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
run().catch(error => { console.error(error.message); process.exitCode = 1; });
