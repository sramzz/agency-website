# Agency Website

Static website for Ranking Rebels, built with plain HTML, CSS, and JavaScript.

## Quick Start

The public site does not use a package manager. Serve the repository root as a static site:

```sh
python -m http.server 4176
```

Then open:

```text
http://127.0.0.1:4176/
```

If your system uses `python3` instead of `python`, run:

```sh
python3 -m http.server 4176
```

## Tests

The blog is available at `/blog/`, with the first article at
`/blog/is-seo-still-relevant-ai-search/`. Its reviewed Markdown and local preview
live in `docs/editorial/blog-seo-ai-australia/`. After editing that manuscript,
regenerate the public pages with `node tools/publish-blog.cjs` and run the tests.
The public blog uses the existing brand and self-hosted fonts, and does not
invent a human author or reviewer.

Run the complete static regression suite from the repository root:

```sh
node --test
```

The tests validate the public route inventory, SEO metadata, schema markup, local links, image paths, navigation, sitemap entries, redirects, and proposal privacy.

The lead endpoint is a separate Cloudflare Worker project:

```sh
cd worker
npm ci
npm test
npm run typecheck
```

See `worker/README.md` for local variables, provisioning, rollout, DLQ inspection, and rollback. Coolify still serves only the static site; the Worker is deployed separately.

## Project Structure

```text
.
|-- index.html
|-- solutions/
|-- locations/
|-- case-studies/
|-- about/
|-- journey/
|-- assets/
|   |-- css/
|   |-- js/
|   `-- images/
|-- tests/
|-- worker/
|-- docs/
|-- DirectionFiles/
|-- proposals/
|-- robots.txt
|-- sitemap.xml
`-- 404.html
```

## Useful Docs

- `CONTRIBUTING.md`: team workflow, branch naming, PR checklist, and review rules.
- `CONTEXT.md`: shared project-specific vocabulary and delivery boundaries.
- `docs/adr/`: accepted and superseded architecture decision records.
- `docs/screenshot-and-test-workflow.md`: visual QA and screenshot workflow.
- `docs/url-migration-map.md`: redirect and retired-route policy.
- `worker/README.md`: lead Worker verification, authorized provisioning, operations, and rollback.
- `DirectionFiles/`: product, development, and deployment notes inherited from the project.
