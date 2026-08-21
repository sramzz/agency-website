const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const repositoryFiles = (directory = root) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git") return [];
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? repositoryFiles(absolutePath) : [absolutePath];
  });

const routes = [
  "/",
  "/onboarding/",
  "/case-studies/",
  "/contact/",
  "/seo-agency/",
  "/local-seo/",
  "/technical-seo/",
  "/seo-content/",
  "/google-business-profile/",
  "/google-ads-management/",
  "/locations/",
  "/locations/australia/",
  "/locations/australia/melbourne/",
  "/locations/australia/sydney/",
  "/locations/australia/brisbane/",
  "/locations/australia/gold-coast/",
  "/locations/europe/",
  "/locations/europe/netherlands/",
  "/locations/europe/london/",
  "/locations/europe/madrid/",
  "/locations/europe/barcelona/",
  "/locations/europe/milan/",
  "/locations/europe/munich/",
  "/locations/europe/zurich/",
  "/es/",
  "/es/onboarding/",
];

const routeToFile = (route) => {
  if (route === "/") return "index.html";
  return `${route.replace(/^\/|\/$/g, "")}/index.html`;
};

const htmlFiles = () =>
  routes.map(routeToFile).filter((file) => file.endsWith(".html"));

const normalize = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const decodeEntities = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) =>
    JSON.parse(match[1])
  );

test("all planned static routes exist as clean index pages", () => {
  for (const route of routes) {
    assert.equal(exists(routeToFile(route)), true, `${route} should exist`);
  }
});

test("editorial redesign is scoped to public routes only", () => {
  for (const file of htmlFiles()) {
    const html = read(file);
    assert.match(html, /<body class="editorial-site">/, `${file} should use the editorial public-site scope`);
    assert.match(html, /<meta name="theme-color" content="#050609"\s*\/>/, `${file} should declare the dark browser theme`);
    assert.match(html, /family=Oswald/, `${file} should load the editorial display typeface`);
    assert.doesNotMatch(html, /href="#"/, `${file} should not contain placeholder links`);
  }

  for (const file of [
    "proposals/winpress/index.html",
    "proposals/winpress/es/index.html",
    "proposals/whatsapp-booking/index.html",
    "proposals/whatsapp-booking/es/index.html",
  ]) {
    assert.doesNotMatch(read(file), /<body class="editorial-site">/, `${file} should keep its private proposal presentation`);
  }
});

test("all pages use root-domain SEO metadata without /agencia", () => {
  for (const route of routes) {
    const file = routeToFile(route);
    const html = read(file);
    assert.equal((html.match(/<title>/g) || []).length, 1, `${file} should have one title`);
    assert.equal((html.match(/name="description"/g) || []).length, 1, `${file} should have one description`);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${file} should have one canonical`);
    assert.match(html, new RegExp(`href="https://rankingrebels\\.com${route === "/" ? "/" : route}"`), `${file} canonical should match route`);
    assert.doesNotMatch(html, /\/agencia\b|PLACEHOLDER Brand|PLACEHOLDER Marca/);
  }
});

test("home page has Organization schema and verified Ranking Rebels Business Profile proof", () => {
  const html = read("index.html");
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) =>
    JSON.parse(match[1])
  );
  const organization = scripts.find((schema) => schema["@type"] === "Organization");
  assert.ok(organization, "Organization schema should exist");
  assert.equal(organization.name, "Ranking Rebels");
  assert.equal(organization.url, "https://rankingrebels.com/");
  assert.equal(organization.email, "info@rankingrebels.com");
  assert.match(normalize(html), /Local visibility results/i);
  assert.match(normalize(html), /2,458 interactions/i);
  for (const asset of [
    "assets/case-studies/gbp-interactions-growth.jpeg",
    "assets/case-studies/gbp-directions-growth.jpeg",
    "assets/case-studies/gbp-calls-growth.jpeg",
    "assets/case-studies/gbp-website-clicks-growth.jpeg",
  ]) {
    assert.ok(fs.existsSync(path.join(root, asset)), `${asset} should exist`);
    assert.match(html, new RegExp(`src="/${asset}"`), `home should render ${asset}`);
  }

  const caseStudies = read("case-studies/index.html");
  for (const asset of [
    "assets/case-studies/gbp-interactions-323.jpeg",
    "assets/case-studies/gbp-directions-256.jpeg",
    "assets/case-studies/gbp-calls-61.jpeg",
  ]) {
    assert.ok(fs.existsSync(path.join(root, asset)), `${asset} should exist`);
    assert.match(caseStudies, new RegExp(`src="/${asset}"`), `case studies should render ${asset}`);
  }
});

test("case-study proof media stays constrained to the shared responsive container", () => {
  const css = read("styles.css");
  assert.match(css, /--page-gutter:\s*clamp\(18px,\s*4vw,\s*48px\)/);
  assert.match(css, /width:\s*min\(var\(--max-width\),\s*calc\(100%\s*-\s*var\(--page-gutter\)\s*-\s*var\(--page-gutter\)\)\)/);
  assert.match(css, /\.proof-gallery\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*40%\)\)[\s\S]*?justify-content:\s*space-between/);
  assert.match(css, /\.result-image\s*\{[\s\S]*?aspect-ratio:\s*2\s*\/\s*1[\s\S]*?max-width:\s*100%/);
  assert.match(css, /\.result-image img\s*\{[\s\S]*?max-width:\s*100%[\s\S]*?object-fit:\s*contain/);
});

test("removed sibling-company name is absent from repository content and paths", () => {
  const removedName = ["smark", "eting"].join("");

  for (const absolutePath of repositoryFiles()) {
    const relativePath = path.relative(root, absolutePath);
    assert.equal(relativePath.toLowerCase().includes(removedName), false, `${relativePath} should use a neutral path`);
    assert.equal(fs.readFileSync(absolutePath).toString().toLowerCase().includes(removedName), false, `${relativePath} should not contain the removed name`);
  }
});

test("plans appear only on the Australia hub", () => {
  const home = read("index.html");
  const australia = read("locations/australia/index.html");
  const heading = /Start with foundations\. Grow into dominance\./g;

  assert.doesNotMatch(home, /id="plans"|Start with foundations\. Grow into dominance\./);
  assert.equal((australia.match(/id="plans"/g) || []).length, 1);
  assert.equal((australia.match(heading) || []).length, 1);
});

test("Australia plans and paid campaign pricing use the approved scopes", () => {
  const australia = normalize(read("locations/australia/index.html"));
  const ads = normalize(read("google-ads-management/index.html"));

  for (const expected of [
    "Search Foundation",
    "AUD 1,080/month",
    "Six-page SEO-ready website",
    "Google Business Profile update",
    "Local Authority",
    "AUD 1,680/month",
    "SEO-ready website plus six blog posts",
    "Local consultant marketing strategy plan",
    "Review and reputation direction",
    "Full website conversion tracking",
    "Automated Growth",
    "AUD 2,580–3,480/month",
    "Twelve-page SEO-ready website plus twelve blog posts",
    "Full process auditing and AI agents MVP",
    "GEM | SEM | Ads clarification",
    "Campaign management is charged separately from plan fees and direct advertising spend",
    "Google, ChatGPT, TikTok, Instagram, Facebook, and YouTube",
    "AUD 350",
    "AUD 300 each",
    "AUD 250 each",
    "Monthly visibility report included",
  ]) {
    assert.match(australia, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  for (const obsolete of [
    "Starter Presence",
    "Local Growth",
    "Market Leader",
    "AUD 1,080-1,480/month",
    "AUD 1,680-1,980/month",
  ]) {
    assert.doesNotMatch(australia, new RegExp(obsolete.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  for (const expected of [
    "GEM | SEM | Ads clarification",
    "Google, ChatGPT, TikTok, Instagram, Facebook, and YouTube",
    "Campaign management is charged separately from organic plan fees and direct advertising spend",
    "Monthly visibility report included",
    "Direct advertising spend excluded",
    "AUD 350",
    "AUD 300 each",
    "AUD 250 each",
  ]) {
    assert.match(ads, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("Australia hub follows the approved conversion journey with accurate proof", () => {
  const html = read("locations/australia/index.html");
  const copy = normalize(html);
  const sectionMarkers = [
    'id="verified-results"',
    'class="section australia-problem"',
    'class="section system-section"',
    'id="australia-services-title"',
    'class="section australia-case-study"',
    'class="section why-rebels"',
    'class="section australia-process"',
    'class="section australia-cities"',
    'id="plans"',
    'id="faq"',
    'class="section final-cta australia-final-cta"',
  ];

  let previousIndex = -1;
  for (const marker of sectionMarkers) {
    const markerIndex = html.indexOf(marker);
    assert.ok(markerIndex > previousIndex, `${marker} should appear in the approved order`);
    previousIndex = markerIndex;
  }

  assert.match(html, /<title>SEO &amp; GEO Agency Australia \| Ranking Rebels<\/title>/);
  assert.match(html, /name="robots" content="index, follow,/);
  assert.match(html, /property="og:locale" content="en_AU"/);
  assert.match(html, /name="twitter:card" content="summary"/);
  assert.match(html, /"@type": "WebPage"/);
  assert.match(html, /"@type": "Service"/);
  assert.match(html, /"areaServed": \{ "@type": "Country", "name": "Australia" \}/);
  assert.match(html, /"@type": "FAQPage"/);
  assert.equal((html.match(/<details>/g) || []).length, 6);

  for (const city of ["melbourne", "sydney", "brisbane", "gold-coast"]) {
    assert.match(html, new RegExp(`href="/locations/australia/${city}/"`));
  }

  for (const asset of [
    "assets/resultsGoogleAds/GoogleAdsResults.png",
    "assets/resultsGoogleAds/Resultados.png",
    "assets/case-studies/gbp-interactions-growth.jpeg",
  ]) {
    assert.equal(exists(asset), true, `${asset} should exist`);
    assert.match(html, new RegExp(`src="/${asset}"`));
  }

  for (const expected of [
    "9.06K",
    "457K",
    "2,458",
    "1,198",
    "AUD 1,080/month",
    "AUD 1,680/month",
    "AUD 2,580–3,480/month",
  ]) {
    assert.equal(copy.includes(expected), true, `Australia hub should include ${expected}`);
  }

  assert.doesNotMatch(copy, /Google Ads (results|performance)/i);
  assert.doesNotMatch(copy, /(Australian|Australia-specific) (client|project|result)/i);
});

test("Australia hero uses the supplied accurate map with accessible city links", () => {
  const html = read("locations/australia/index.html");
  const css = read("styles.css");
  const map = html.match(/<aside class="australia-map-stage"[\s\S]*?<\/aside>/)?.[0];

  assert.ok(map, "Australia hero should include the editorial map stage");
  assert.match(html, /href="\/styles\.css\?v=20260817-map8"/, "Australia page should bust the previous map stylesheet cache");
  assert.equal(exists("assets/Maps/australia-svgrepo-com.svg"), true, "supplied Australia SVG should remain available");
  assert.match(map, /M434\.071,449\.363/, "Tasmania geometry should come from the supplied SVG");
  assert.match(map, /M511\.913,270\.556/, "mainland geometry should come from the supplied SVG");
  assert.equal((map.match(/class="market-marker"/g) || []).length, 4, "map should expose four interactive markers");
  assert.equal((map.match(/class="market-label"/g) || []).length, 4, "desktop map should expose four visible labels");
  assert.equal((map.match(/class="market-label" fill="#f8fafc"/g) || []).length, 4, "SVG labels should remain legible before CSS loads");
  assert.doesNotMatch(map, /east-coast-accent/, "map should not draw an artificial east-coast line");
  assert.match(map, /class="australia-map overview-map" viewBox="-10 0 540 512"/, "overview should show the full country");
  assert.match(map, /class="map-zoom-frame"[\s\S]*?class="map-zoom-svg" viewBox="390 220 280 280"/, "map should include a separate east-coast magnifier");
  assert.match(map, /href="#australia-mainland-shape"/);
  assert.match(map, /href="#australia-tasmania-shape"/);
  assert.doesNotMatch(css, /\.map-zoom-frame::before/, "magnifier should not include a decorative connector line");
  assert.match(css, /@media \(max-width: 700px\)[\s\S]*?\.overview-map \{[\s\S]*?width: 48%/, "mobile should retain a compact full-country overview");
  assert.match(css, /@media \(max-width: 700px\)[\s\S]*?\.map-zoom-frame \{[\s\S]*?width: 58%[\s\S]*?max-width: 240px/, "mobile should keep the magnifier compact beside the overview");

  let previousCityIndex = -1;
  for (const city of ["brisbane", "gold-coast", "sydney", "melbourne"]) {
    const href = `href="/locations/australia/${city}/"`;
    assert.equal((map.match(new RegExp(href, "g")) || []).length, 2, `${city} should have a map and text link`);
    const cityIndex = map.lastIndexOf(href);
    assert.ok(cityIndex > previousCityIndex, `${city} should appear in north-to-south index order`);
    previousCityIndex = cityIndex;
  }

  assert.equal((map.match(/tabindex="0" aria-label="Explore [^"]+ search strategy"/g) || []).length, 4);
  assert.doesNotMatch(map, /map-grid|map-route|map-outline|map-topline|australia-map-panel/);
  assert.doesNotMatch(css, /\.australia-map \.map-grid|\.australia-map \.map-route|@keyframes australia-route/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.australia-map \.market-pulse[\s\S]*?animation: none/);
});

test("home page presents AI process automation in business language", () => {
  const html = read("index.html");
  const section = html.match(/<section id="ai-automation"[\s\S]*?<\/section>/)?.[0];

  assert.ok(section, "home should include the AI automation section");
  assert.match(html, /href="#ai-automation">Explore AI automation<\/a>/);
  assert.equal((section.match(/<li>/g) || []).length, 5, "automation process should have five stages");
  assert.equal((section.match(/<article class="feature-card">/g) || []).length, 4, "automation section should have four scenarios");

  for (const expected of [
    "Find the bottleneck",
    "Map the work",
    "Write the playbook",
    "Automate the fixed steps",
    "Add the AI agent",
    "WhatsApp sales agent",
    "Monthly sales reports",
    "Connected calendars",
    "Client update packs",
  ]) {
    assert.match(section, new RegExp(expected, "i"));
  }

  assert.match(section, /href="https:\/\/wa\.me\/61439499441"[^>]*>Show me what to automate<\/a>/);
});

test("FAQ schema only appears on pages with visible FAQ details", () => {
  for (const file of htmlFiles()) {
    const html = read(file);
    const hasFaqSchema = /"@type"\s*:\s*"FAQPage"/.test(html);
    const hasVisibleFaq = /<section[^>]+class="[^"]*faq/.test(html) && /<details>/.test(html);
    assert.equal(hasFaqSchema, hasVisibleFaq, `${file} FAQ schema should match visible FAQ`);
  }
});

test("crawlable navigation and hub links expose core SEO routes", () => {
  const home = read("index.html");
  for (const href of [
    "/seo-agency/",
    "/local-seo/",
    "/google-ads-management/",
    "/locations/",
    "/case-studies/",
    "/contact/",
  ]) {
    assert.match(home, new RegExp(`href="${href}"`), `home should link to ${href}`);
  }

  assert.match(read("locations/index.html"), /href="\/locations\/australia\/"/);
  assert.match(read("locations/index.html"), /href="\/locations\/europe\/"/);
  assert.match(read("locations/australia/index.html"), /href="\/locations\/australia\/melbourne\/"/);
  assert.match(read("locations/europe/index.html"), /href="\/locations\/europe\/netherlands\/"/);
});

test("public navigation consistently presents the four service pillars", () => {
  const serviceLinks = [
    ["/seo-agency/", "SEO + GEO"],
    ["/local-seo/", "Local SEO"],
    ["/google-ads-management/", "SEM + GEM"],
    ["/#ai-automation", "AI Process Automation"],
  ];

  for (const file of htmlFiles()) {
    const html = read(file);
    const desktop = html.match(/<nav class="desktop-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1] || "";
    const mobile = html.match(/<nav id="mobile-nav" class="mobile-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1] || "";

    assert.equal((desktop.match(/<a /g) || []).length, 4, `${file} desktop navigation should have four services`);
    for (const [href, label] of serviceLinks) {
      const link = new RegExp(`href="${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}">${label.replace(/\+/g, "\\+")}<\\/a>`);
      assert.match(desktop, link, `${file} desktop navigation should include ${label}`);
      assert.match(mobile, link, `${file} mobile navigation should include ${label}`);
    }
  }
});

test("all local links resolve to existing clean routes or valid anchors", () => {
  const fileByRoute = new Map(routes.map((route) => [route, routeToFile(route)]));

  for (const file of htmlFiles()) {
    const html = read(file);
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);

    for (const href of hrefs) {
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      if (/\.(css|js|png|jpg|jpeg|webp|svg|ico|xml|txt)(?:\?[^#]*)?$/i.test(href)) continue;

      if (href.startsWith("#")) {
        assert.equal(ids.has(href.slice(1)), true, `${file} has missing anchor ${href}`);
        continue;
      }

      const [route, anchor] = href.split("#");
      const linkedFile = fileByRoute.get(route);
      assert.ok(linkedFile, `${file} has unknown local route ${href}`);
      assert.equal(exists(linkedFile), true, `${file} links to missing ${linkedFile}`);

      if (anchor) {
        assert.match(read(linkedFile), new RegExp(`\\sid="${anchor}"`), `${file} links to missing ${href}`);
      }
    }
  }
});

test("onboarding covers SEO + GEO and multi-platform campaign readiness", () => {
  const english = normalize(read("onboarding/index.html"));
  const spanish = normalize(read("es/onboarding/index.html"));

  for (const expected of ["SEO + GEO", "SEM + GEM", "Google Ads access", "Meta", "ChatGPT", "Analytics", "conversion tracking", "ad spend"]) {
    assert.ok(english.toLowerCase().includes(expected.toLowerCase()), `English onboarding should include ${expected}`);
  }

  for (const expected of ["SEO + GEO", "SEM + GEM", "accesos a Google Ads", "Meta", "ChatGPT", "Analytics", "conversiones", "presupuestos"]) {
    assert.ok(spanish.toLowerCase().includes(expected.toLowerCase()), `Spanish onboarding should include ${expected}`);
  }
});

test("public pages have unique, bounded SEO metadata and one H1", () => {
  const titles = new Map();
  const descriptions = new Map();

  for (const file of htmlFiles()) {
    const html = read(file);
    const title = decodeEntities(html.match(/<title>([^<]+)<\/title>/)?.[1] || "");
    const description = decodeEntities(html.match(/<meta\s+name="description"\s+content="([^"]+)"/s)?.[1] || "");

    assert.ok(title.length >= 30 && title.length <= 60, `${file} title length is ${title.length}`);
    assert.ok(description.length >= 70 && description.length <= 155, `${file} description length is ${description.length}`);
    assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1, `${file} should have one H1`);
    assert.doesNotMatch(html, /<meta\s+name="keywords"/i, `${file} should not use meta keywords`);
    assert.doesNotMatch(html, /<meta\s+name="robots"[^>]*noindex/i, `${file} should remain indexable`);
    assert.equal(titles.has(title), false, `${file} duplicates title from ${titles.get(title)}`);
    assert.equal(descriptions.has(description), false, `${file} duplicates description from ${descriptions.get(description)}`);
    titles.set(title, file);
    descriptions.set(description, file);
  }
});

test("JSON-LD parses, uses approved public types, and service pages describe their canonical service", () => {
  const allowedTypes = new Set(["Organization", "WebSite", "WebPage", "FAQPage", "Service"]);
  const serviceRoutes = [
    "/seo-agency/",
    "/local-seo/",
    "/technical-seo/",
    "/seo-content/",
    "/google-business-profile/",
    "/google-ads-management/",
  ];

  for (const file of htmlFiles()) {
    for (const schema of jsonLd(read(file))) {
      assert.ok(allowedTypes.has(schema["@type"]), `${file} has unsupported top-level schema ${schema["@type"]}`);
    }
  }

  for (const route of serviceRoutes) {
    const schemas = jsonLd(read(routeToFile(route)));
    const service = schemas.find((schema) => schema["@type"] === "Service");
    assert.ok(service, `${route} should include Service schema`);
    assert.equal(service.url, `https://rankingrebels.com${route}`);
    assert.equal(service.provider?.name, "Ranking Rebels");
    assert.ok(service.name && service.description && service.areaServed, `${route} Service schema should be complete`);
  }
});

test("English and Spanish alternates are reciprocal", () => {
  for (const [englishRoute, spanishRoute] of [["/", "/es/"], ["/onboarding/", "/es/onboarding/"]]) {
    const english = read(routeToFile(englishRoute));
    const spanish = read(routeToFile(spanishRoute));
    assert.match(english, new RegExp(`hreflang="es" href="https://rankingrebels\\.com${spanishRoute}"`));
    assert.match(spanish, new RegExp(`hreflang="en-AU" href="https://rankingrebels\\.com${englishRoute}"`));
  }
});

test("FAQ JSON-LD matches the visible homepage questions and answers", () => {
  const html = read("index.html");
  const faq = jsonLd(html).find((schema) => schema["@type"] === "FAQPage");
  const visible = [...html.matchAll(/<details><summary>([^<]+)<\/summary><p>([^<]+)<\/p><\/details>/g)].map((match) => ({
    name: decodeEntities(match[1]),
    text: decodeEntities(match[2]),
  }));
  const structured = faq.mainEntity.map((entity) => ({
    name: entity.name,
    text: entity.acceptedAnswer.text,
  }));
  assert.deepEqual(structured, visible);
});

test("positioning covers organic discovery and paid campaign platforms", () => {
  const home = normalize(read("index.html"));
  const paid = normalize(read("google-ads-management/index.html"));

  for (const platform of ["Google Search", "Bing", "Google Maps", "ChatGPT", "Perplexity", "Claude"]) {
    assert.match(home, new RegExp(platform, "i"));
  }
  for (const platform of ["Google", "ChatGPT", "TikTok", "Instagram", "Facebook", "YouTube"]) {
    assert.match(paid, new RegExp(platform, "i"));
  }
  assert.match(home, /SEO \+ GEO/i);
  assert.match(home, /SEM \+ GEM Management/i);
  assert.match(paid, /direct advertising spend/i);
  assert.match(paid, /monthly visibility report/i);
});

test("robots and sitemap expose the full rankingrebels.com URL set", () => {
  assert.equal(exists("robots.txt"), true);
  assert.equal(exists("sitemap.xml"), true);

  const robots = read("robots.txt");
  const sitemap = read("sitemap.xml");
  assert.match(robots, /Sitemap: https:\/\/rankingrebels\.com\/sitemap\.xml/);

  for (const route of routes) {
    assert.match(sitemap, new RegExp(`<loc>https://rankingrebels\\.com${route === "/" ? "/" : route}</loc>`));
  }
});

test("Ranking Rebels contact details follow regional phone routing", () => {
  const australian = {
    display: /\+61 439 499 441/,
    whatsapp: "61439499441",
  };
  const dutch = {
    display: /\+31 613 390 178/,
    whatsapp: "31613390178",
  };

  for (const route of routes) {
    const file = routeToFile(route);
    const html = read(file);
    const expected = route.startsWith("/locations/europe/") ? dutch : australian;
    const unexpected = expected === dutch ? australian : dutch;
    const whatsappTargets = [...html.matchAll(/https:\/\/wa\.me\/(\d+)/g)].map((match) => match[1]);

    assert.match(html, /Ranking Rebels/);
    assert.match(html, /info@rankingrebels\.com/);
    assert.ok(whatsappTargets.length > 0, `${file} should include a WhatsApp CTA`);
    assert.equal(whatsappTargets.every((target) => target === expected.whatsapp), true, `${file} should use the regional WhatsApp number`);
    assert.match(html, expected.display);
    assert.doesNotMatch(html, unexpected.display);
    assert.doesNotMatch(html, /61000000000|\+61 000 000 000|WhatsApp placeholder|Final phone number is pending/);
    assert.doesNotMatch(html, /hello@yourbrand\.com|hola@tumarca\.com|fake testimonial|guaranteed rankings/i);
  }
});
