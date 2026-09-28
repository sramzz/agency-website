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
      const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon' };
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
    browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE_PATH });
    const page = await browser.newPage();
    const base = `http://127.0.0.1:${server.address().port}`;
    await page.route('https://challenges.cloudflare.com/**', route => route.fulfill({
      contentType: 'text/javascript',
      body: 'window.turnstile={render:(node,options)=>{queueMicrotask(()=>options.callback("test-token"));return 1},reset(){},remove(){}};',
    }));
    await page.route('https://www.google.com/maps/**', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>Map</title>' }));
    await page.route('https://fonts.googleapis.com/**', route => route.abort());
    await page.route('https://fonts.gstatic.com/**', route => route.abort());

    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: width >= 768 ? 1000 : 844 });
      await page.goto(`${base}/contact/`, { waitUntil: 'load' });
      await page.waitForTimeout(50);
      const layout = await page.evaluate(() => ({
        viewport: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        formColumns: getComputedStyle(document.querySelector('.contact-form')).gridTemplateColumns.split(' ').length,
        maps: [...document.querySelectorAll('.contact-map')].map(node => ({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })),
      }));
      assert.ok(layout.scrollWidth <= layout.viewport, `${width}px contact page should not overflow: ${JSON.stringify(layout)}`);
      assert.equal(layout.maps.length, 2);
      layout.maps.forEach(map => assert.ok(map.width > 0 && map.height > 0 && map.width <= width, `${width}px map should stay visible and bounded`));
      assert.equal(layout.formColumns, width <= 700 ? 1 : 2, `${width}px form grid should use the approved responsive columns`);
      assert.equal(await page.locator('.contact-office').count(), 2);
      assert.equal(await page.locator('a[href="/contact/"][aria-current="page"]').count() >= 1, true);
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${base}/contact/`, { waitUntil: 'load' });
    await page.locator('[data-country-trigger]').click();
    const menu = page.locator('[data-country-menu]');
    await menu.waitFor({ state: 'visible' });
    const menuBox = await menu.boundingBox();
    assert.ok(menuBox && menuBox.x >= 0 && menuBox.x + menuBox.width <= 390, `country menu should stay in the mobile viewport: ${JSON.stringify(menuBox)}`);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('[data-country-trigger]').getAttribute('aria-expanded'), 'false');

    await page.locator('button[type="submit"]').click();
    assert.equal(await page.locator('[name="phone"]').getAttribute('aria-invalid'), 'true');
    assert.equal(await page.locator('[data-error-for="phone"]').textContent(), 'This field is required.');
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('name')), 'phone');

    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('.contact-page *')).animationName), 'none');
    console.log('PASS: contact layout at 320/390/768/1440; maps, inline validation, country picker, focus and reduced motion.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}

run().catch(error => { console.error(error.stack || error.message); process.exitCode = 1; });
