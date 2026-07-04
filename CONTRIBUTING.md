# Contributing

This repository is shared work. Keep changes small, documented, and easy to review.

## Team Workflow

1. Sync before starting:

```sh
git checkout main
git pull --ff-only origin main
```

2. Create a feature branch:

```sh
git checkout -b feat/short-description
```

Use these prefixes:

```text
feat/     new page, section, or behavior
fix/      bug fix or broken content/link
content/  copy, SEO text, metadata, or sitemap update
design/   layout, spacing, visual, or responsive change
test/     test-only change
docs/     documentation-only change
```

3. Make focused commits:

```sh
git status
git add path/to/file
git commit -m "type: concise change summary"
```

Examples:

```text
content: update Google Ads page metadata
fix: repair local SEO internal links
design: adjust onboarding card spacing
test: cover Spanish onboarding copy
```

4. Push and open a pull request:

```sh
git push -u origin feat/short-description
```

## Before Opening a PR

Run:

```sh
node --test tests/onboarding.test.js
```

For layout, package copy, onboarding copy, route, or navigation changes, also follow:

```text
docs/screenshot-and-test-workflow.md
```

## Pull Request Checklist

- The PR changes one clear thing.
- Static tests pass.
- New or changed routes are linked from the correct hub or navigation.
- Each HTML page has exactly one title, meta description, and canonical URL.
- Canonical URLs use `https://rankingrebels.com/...`.
- FAQ schema appears only when the page has visible FAQ content.
- Sitemap and robots updates are included when routes change.
- English and Spanish pages stay aligned when the change affects both languages.
- Screenshots are attached for visual or responsive changes.

## Review Rules

- At least one teammate should review every PR before merge.
- The author resolves conversations before merging.
- Prefer small PRs over large batches of unrelated edits.
- Do not force-push over review comments unless the team has agreed.
- Merge only after the branch is up to date with `main`.

## Local Git Setup

If commits fail because Git does not know your identity, configure it once:

```sh
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

If you prefer repository-only config, omit `--global` while inside this project.

