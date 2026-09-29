# ADR 0007: Start with conservative browser caching

## Status

Accepted

## Context

The website changes regularly for SEO and GEO work. Long-lived immutable caching can improve repeat navigation, but applying it before assets are reliably fingerprinted makes stale-file defects harder to understand and reproduce. The migration must favor operational clarity during its verification period.

## Decision

Do not apply `immutable` browser caching during the initial Cloudflare Pages migration. Use Pages' default ETag revalidation behavior and `Cache-Control: public, max-age=0, must-revalidate` for public static content unless a narrower rule is justified.

Associate every deployment with its Git commit and expose a generated `version.json` plus an `X-RR-Revision` response header so maintainers can identify the deployed revision. Document how to inspect the revision, clear local browser state when diagnosing, and roll back to a previous successful production deployment.

Reconsider immutable caching only after the migrated site is stable and only for files with content-derived names.

## Consequences

- Browsers revalidate cached assets instead of trusting a long expiration, reducing stale-deployment ambiguity.
- Repeat visits may incur lightweight conditional requests that a future fingerprinting phase could remove.
- Edge caching, ETags, Brotli/Gzip delivery, and atomic Pages deployments still provide meaningful performance benefits.
- A reported issue can be tied to a Git revision and a specific Pages deployment before cache behavior is investigated.
