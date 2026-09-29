# ADR 0012: Define release verification and browser support

## Status

Accepted

## Context

The migration needs a small, comprehensible release contract that builds on the repository's existing tests. It must protect every public page without turning every change into a full manual audit, and it must state which browsers contributors are expected to support.

## Decision

Keep the existing test suite and extend it as the site gains behavior, routes, and regression coverage. A production deployment is blocked when applicable required checks fail.

Apply the following coverage:

- Static validation, internal links, and resource budgets cover every public page.
- Controlled mobile and desktop Lighthouse checks cover the home page, one representative solution page, one representative location page, the case-studies index, and the contact page.
- Form behavior is verified on the home and contact pages, including the existing lead integration contract.
- Visual review covers the pages modified by a change rather than the entire site on every deployment.
- Proposal checks remain a separate suite and never require proposal content to enter the public deployment.

Deterministic build, structure, link, resource-budget, and form checks are deployment gates. Lighthouse is an advisory regression signal rather than an automatic per-push gate because laboratory measurements vary. Run the agreed mobile and desktop Lighthouse set before cutover and after materially performance-sensitive changes. An upper-bound lab metric up to 10% worse than its numeric threshold may proceed but must be recorded and reviewed to identify the cause. For example, an LCP threshold of 1.8 seconds has a review tolerance through 1.98 seconds. Do not turn the Lighthouse score target of 95 into a 10% lower passing score; the score remains an advisory signal. A larger metric regression requires a repeat measurement and investigation before release; the team makes the release decision from the repeated result, affected user path, and rollback risk rather than from one run alone.

Support current stable Chrome, Edge, Firefox, and Safari, including current iOS Safari. Do not support Internet Explorer or obsolete browser releases. Prefer AVIF with WebP fallback, retaining JPEG or PNG only where compatibility or content characteristics require them. Public content and the lead form must remain usable when optional JavaScript fails; behavior that inherently requires JavaScript may degrade clearly without hiding the primary content.

## Consequences

- Existing tests are preserved and become the base of the migration gate rather than being replaced by a new testing system.
- Adding a public route requires it to participate in repository-wide static, link, and budget validation.
- The representative Lighthouse set limits CI time while still covering materially different templates.
- A single variable Lighthouse run cannot fail an otherwise valid deployment automatically; regressions beyond the 10% tolerance still require investigation and an explicit release decision.
- Contributors must update tests when they add new behavior or discover a regression class worth preventing.
- The project can use modern image formats and browser APIs without carrying Internet Explorer compatibility code.
