const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");

const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const normalize = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const englishSteps = [
  "Demo Meeting",
  "Letter of Intent Signed",
  "First Payment Completed",
  "Strategy Brief Meeting",
  "SEO Foundations",
  "First Delivery",
  "Review & Adjustments",
  "Launch & Tracking",
  "Monthly Growth Meeting",
  "Continuous Optimization",
];

const spanishSteps = [
  "Reunion de demo",
  "Carta de intencion firmada",
  "Primer pago completado",
  "Reunion de brief estrategico",
  "Bases SEO",
  "Primera entrega",
  "Revision y ajustes",
  "Lanzamiento y seguimiento",
  "Reunion mensual de crecimiento",
  "Optimizacion continua",
];

test("bilingual onboarding pages exist", () => {
  assert.equal(exists("onboarding.html"), true);
  assert.equal(exists("onboarding-es.html"), true);
});

test("onboarding pages include all ten journey steps", () => {
  const english = normalize(read("onboarding.html"));
  const spanish = normalize(read("onboarding-es.html"));

  for (const step of englishSteps) {
    assert.match(english, new RegExp(step.replace("&", "&amp;|&"), "i"));
  }

  for (const step of spanishSteps) {
    assert.match(spanish, new RegExp(step, "i"));
  }
});

test("onboarding timelines use ordered accessible markup", () => {
  for (const file of ["onboarding.html", "onboarding-es.html"]) {
    const html = read(file);
    assert.match(html, /<ol[^>]+class="[^"]*onboarding-timeline[^"]*"/);
    assert.match(html, /aria-label="[^"]*onboarding[^"]*"/i);
    assert.equal((html.match(/class="[^"]*onboarding-step[^"]*"/g) || []).length, 10);
  }
});

test("home pages link to onboarding in desktop and mobile navigation", () => {
  const english = read("index.html");
  const spanish = read("es.html");

  assert.equal((english.match(/href="\/agencia\/onboarding\.html"/g) || []).length, 2);
  assert.equal((spanish.match(/href="\/agencia\/onboarding-es\.html"/g) || []).length, 2);
});

test("onboarding pages link to each other through the language switcher", () => {
  const english = read("onboarding.html");
  const spanish = read("onboarding-es.html");

  assert.match(english, /href="\/agencia\/onboarding-es\.html"[^>]*>ES<\/a>/);
  assert.match(english, /href="\/agencia\/onboarding\.html"[^>]*aria-current="page"[^>]*>EN<\/a>/);
  assert.match(spanish, /href="\/agencia\/onboarding-es\.html"[^>]*aria-current="page"[^>]*>ES<\/a>/);
  assert.match(spanish, /href="\/agencia\/onboarding\.html"[^>]*>EN<\/a>/);
});

test("new local links point to existing pages or valid anchors", () => {
  const htmlFiles = ["index.html", "es.html", "onboarding.html", "onboarding-es.html"];
  const routeToFile = {
    "/agencia/": "index.html",
    "/agencia/es.html": "es.html",
    "/agencia/onboarding.html": "onboarding.html",
    "/agencia/onboarding-es.html": "onboarding-es.html",
    "/agencia/styles.css": "styles.css",
  };

  for (const file of htmlFiles) {
    const html = read(file);
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);

    for (const href of hrefs) {
      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        continue;
      }

      if (href.startsWith("#")) {
        assert.equal(ids.has(href.slice(1)), true, `${file} has missing anchor ${href}`);
        continue;
      }

      const [route, anchor] = href.split("#");
      const linkedFile = routeToFile[route];
      assert.ok(linkedFile, `${file} has unknown local route ${href}`);
      assert.equal(exists(linkedFile), true, `${file} links to missing ${linkedFile}`);

      if (anchor && linkedFile.endsWith(".html")) {
        const linkedHtml = read(linkedFile);
        assert.match(linkedHtml, new RegExp(`\\sid="${anchor}"`), `${file} links to missing ${href}`);
      }
    }
  }
});

test("stylesheet keeps the Ocean Depth system flat and palette-bound", () => {
  const css = read("styles.css");
  const allowedHex = new Set([
    "#e8f0f5",
    "#8fa5b5",
    "#3cbab2",
    "#0b1a28",
    "#142637",
    "#102232",
    "#06101d",
    "#172c3f",
    "#ffffff",
    "#050607",
  ]);

  assert.doesNotMatch(css, /gradient/i);

  const hexValues = [...css.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((match) => match[0].toLowerCase());
  for (const value of hexValues) {
    assert.ok(allowedHex.has(value), `Unexpected CSS color ${value}`);
  }
});
