# Screenshot and Test Workflow

Use this note when changing package copy, onboarding copy, route structure, or layout.

## Tests

Run the static test suite from the repo root:

```sh
node --test tests/onboarding.test.js
```

For TDD content checks, add the regression test first and confirm it fails for the missing content before editing HTML.

Gotcha: if expected text includes `+`, do not put the raw text inside `new RegExp(...)` unless the `+` is escaped. Prefer literal string checks:

```js
assert.equal(normalize(card).includes(expectedText), true);
```

## Local Server

The HTML files reference assets from the root, so serve the repo directly at `/`.

```sh
python3 -m http.server 4176 --directory "$PWD"
curl -I http://127.0.0.1:4176/styles.css
```

The `curl` check should return `200 OK`. If it returns `404`, screenshots will look unstyled and are not valid review evidence.

Stop the server with `Ctrl-C` when done.

## Basic Page Screenshots

These commands are fine for first-viewport desktop screenshots:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new \
  --disable-gpu \
  --disable-background-networking \
  --disable-component-update \
  --disable-sync \
  --no-first-run \
  --run-all-compositor-stages-before-draw \
  --force-device-scale-factor=1 \
  --window-size=1280,1100 \
  --screenshot=/private/tmp/ranking-rebels-index-desktop.png \
  http://127.0.0.1:4176/
```

Repeat with these URLs and output names:

```text
http://127.0.0.1:4176/                         -> /private/tmp/ranking-rebels-index-desktop.png
http://127.0.0.1:4176/es/                      -> /private/tmp/ranking-rebels-es-desktop.png
http://127.0.0.1:4176/onboarding/              -> /private/tmp/ranking-rebels-onboarding-desktop.png
http://127.0.0.1:4176/google-ads-management/   -> /private/tmp/ranking-rebels-google-ads-desktop.png
```

## Accurate Mobile and Section Screenshots

Chrome CLI `--window-size=390,844` may not always reflect the actual layout viewport on macOS, and `#plans` hash screenshots can capture blank or wrong areas. Use Chrome DevTools Protocol (CDP) for accurate mobile widths and focused section shots.

Start Chrome once:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new \
  --disable-gpu \
  --disable-background-networking \
  --disable-component-update \
  --disable-sync \
  --no-first-run \
  --remote-debugging-port=9234 \
  --user-data-dir=/private/tmp/chrome-ranking-rebels-cdp \
  about:blank
```

Then run this Node script from the repo root:

```sh
node <<'NODE'
import fs from 'node:fs/promises';

async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const callbacks = pending.get(message.id);
      pending.delete(message.id);
      message.error ? callbacks.reject(new Error(JSON.stringify(message.error))) : callbacks.resolve(message.result);
    }
  });

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const message = { id: ++id, method, params };
      pending.set(message.id, { resolve, reject });
      ws.send(JSON.stringify(message));
    });

  return { ws, send };
}

async function capture({ url, path, width = 390, height = 844, selector }) {
  const target = await fetch(`http://127.0.0.1:9234/json/new?${encodeURIComponent(url)}`, {
    method: 'PUT',
  }).then((response) => response.json());

  const { ws, send } = await connect(target.webSocketDebuggerUrl);
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send('Page.navigate', { url });

  await new Promise((resolve) => {
    const onMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.method === 'Page.loadEventFired') {
        ws.removeEventListener('message', onMessage);
        resolve();
      }
    };
    ws.addEventListener('message', onMessage);
  });

  if (selector) {
    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector(${JSON.stringify(selector)});
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.scrollBehavior = 'auto';
        el.scrollIntoView({ block: 'start', behavior: 'instant' });
        window.scrollBy(0, -84);
      })()`,
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 300));
  const result = await send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: false,
  });
  await fs.writeFile(path, Buffer.from(result.data, 'base64'));

  const metrics = await send('Runtime.evaluate', {
    expression: `({ innerWidth: window.innerWidth, scrollWidth: document.documentElement.scrollWidth })`,
    returnByValue: true,
  });
  console.log(path, JSON.stringify(metrics.result.value));
  ws.close();
}

const base = 'http://127.0.0.1:4176/';

await capture({ url: base, path: '/private/tmp/ranking-rebels-index-mobile.png' });
await capture({ url: `${base}es/`, path: '/private/tmp/ranking-rebels-es-mobile.png' });
await capture({ url: `${base}onboarding/`, path: '/private/tmp/ranking-rebels-onboarding-mobile.png' });
await capture({ url: `${base}google-ads-management/`, path: '/private/tmp/ranking-rebels-google-ads-mobile.png' });

await capture({
  url: base,
  selector: '#plans',
  width: 1280,
  height: 1500,
  path: '/private/tmp/ranking-rebels-plans-desktop-tallsection.png',
});
await capture({
  url: `${base}locations/`,
  selector: '.grid',
  width: 1280,
  height: 1500,
  path: '/private/tmp/ranking-rebels-locations-desktop-tallsection.png',
});
await capture({
  url: base,
  selector: '#plans',
  width: 390,
  height: 1800,
  path: '/private/tmp/ranking-rebels-plans-mobile-tallsection.png',
});
await capture({
  url: `${base}locations/`,
  selector: '.grid',
  width: 390,
  height: 1800,
  path: '/private/tmp/ranking-rebels-locations-mobile-tallsection.png',
});
NODE
```

Expected mobile metric output should include:

```text
{"innerWidth":390,"scrollWidth":390}
```

If `scrollWidth` is greater than `innerWidth`, inspect the screenshot for horizontal overflow before calling the review complete.

Stop the CDP Chrome process with `Ctrl-C`.

## Screenshot Review Checklist

Review these every time:

- English home desktop and mobile
- Spanish home desktop and mobile
- English onboarding desktop and mobile
- Spanish onboarding desktop and mobile
- English package section desktop and mobile
- Spanish package section desktop and mobile

For package copy changes, check that the longer bullets wrap inside the cards, the CTA buttons remain visible, and the three cards still look balanced on desktop.
