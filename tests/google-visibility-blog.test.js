const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),test=require('node:test');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const slug='website-not-showing-up-on-google',route=`/blog/${slug}/`,page=()=>read(`blog/${slug}/index.html`);
const body=h=>h.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)[1];
const schema=h=>JSON.parse(h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
test('Google visibility diagnosis is a complete indexable light-reading article with truthful metadata',()=>{
 const h=page(),b=body(h),s=schema(h);
 assert.match(h,/blog-visibility-article theme-light/);assert.match(h,/--reading-bg: #f7f6f2/);
 assert.equal((h.match(/<link rel="stylesheet"/g)||[]).length,2);
 assert.doesNotMatch(h,/<meta name="robots" content="noindex|Local draft|preview-switch|href="preview\.css|src="media\//);
 assert(h.includes(`rel="canonical" href="https://rankingrebels.com${route}"`));
 assert.equal(s.datePublished,'2026-10-28');assert.equal(s.dateModified,'2026-10-28');assert.equal(s.inLanguage,'en-AU');assert.equal(s.author,undefined);assert.equal(s.publisher.name,'Ranking Rebels');
 assert.equal((b.match(/<section class="article-section/g)||[]).length,9);assert.equal((b.match(/<h3>/g)||[]).length,5);assert.equal((b.match(/<table>/g)||[]).length,1);assert.equal((b.match(/<figure\b/g)||[]).length,2);
 assert.match(b,/This is a hypothetical example, not a client result/);
 for(const text of ['selected canonical URL','live test','noindex','soft 404','canonical','days to weeks','Manual Actions','temporary removal']) assert(b.includes(text),text);
 for(const [,id]of h.matchAll(/href="#([^\"]+)"/g))assert(h.includes(`id="${id}"`),id);
 for(const name of ['google-visibility-illustration-1280.webp','google-visibility-illustration-768.webp','visibility-diagnosis.svg','visibility-diagnosis-mobile.svg']){assert(h.includes(`/assets/images/blog/${name}`));assert(fs.existsSync(path.join(root,'assets/images/blog',name)));if(fs.existsSync(path.join(root,'scripts/public-files.json')))assert(JSON.parse(read('scripts/public-files.json')).includes('assets/images/blog/'+name));}
 for(const meta of ['og:image:alt','og:locale','twitter:card','og:title','og:description'])assert(h.includes(meta));
});
test('the sixth guide has contextual links in both directions and preserves the published library',()=>{
 const h=page(),b=body(h),dest='https://rankingrebels.com'+route;
 for(const s of ['what-is-seo','local-seo-google-maps-visibility','website-visits-few-enquiries'])assert(b.includes(`href="https://rankingrebels.com/blog/${s}/"`),s);
 const previous=[['is-seo-still-relevant-ai-search','2026-10-16'],['local-seo-google-maps-visibility','2026-10-19'],['what-is-seo','2026-10-20'],['website-visits-few-enquiries','2026-10-26']];
 for(const [s,date]of previous){const old=read(`blog/${s}/index.html`);assert(body(old).includes(`href="${dest}"`),s);assert.equal(schema(old).datePublished,date);assert.equal(schema(old).dateModified,'2026-11-11');}
 const agents=read('blog/ai-agents-vs-workflow-automation/index.html');assert(!body(agents).includes(dest));assert.equal(schema(agents).datePublished,'2026-10-21');assert.equal(schema(agents).dateModified,'2026-11-04');
 const hub=read('blog/index.html'),links=[...hub.matchAll(/<a class="blog-story" href="([^\"]+)"/g)].map(m=>m[1]);assert.equal(links.length, 11);assert.equal(new Set(links).size, 11);assert.equal(links[0],'/blog/measure-digital-marketing-results/');assert.equal(schema(hub).hasPart.length, 11);
 assert.equal((hub.match(/<span class="blog-story-read">Read the article<\/span>/g)||[]).length, 11);assert.doesNotMatch(hub,/↗/);assert.match(read('assets/css/blog.css'),/text-decoration: underline/);
 assert(read('sitemap.xml').includes(`<loc>${dest}</loc><lastmod>2026-10-28</lastmod>`));
 for(const text of [h,hub,read('sitemap.xml')])assert.doesNotMatch(text,/facebook-instagram-advertising/);
});
