# Agency Website

Static website for Ranking Rebels, built with plain HTML, CSS, and JavaScript.

## Quick Start

This project does not currently use a package manager. Serve the repository root as a static site:

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

Run the static regression tests from the repository root:

```sh
node --test tests/onboarding.test.js
```

The tests validate route files, SEO metadata, schema markup, local links, sitemap entries, and key onboarding copy.

## Project Structure

```text
.
|-- index.html
|-- styles.css
|-- script.js
|-- tests/
|-- docs/
|-- DirectionFiles/
|-- es/
|-- locations/
|-- onboarding/
|-- proposals/
`-- service and content pages/
```

## Useful Docs

- `CONTRIBUTING.md`: team workflow, branch naming, PR checklist, and review rules.
- `docs/screenshot-and-test-workflow.md`: visual QA and screenshot workflow.
- `DirectionFiles/`: product, development, and deployment notes inherited from the project.

