# ADR 0002: Host the public site on Cloudflare Pages

## Status

Accepted

## Context

The public site is static, its source is hosted on GitHub, its DNS already passes through Cloudflare, and its lead endpoint already runs independently as a Cloudflare Worker. The team requires automatic production deployments after pushes to `origin/main` and has a zero-euro monthly infrastructure budget for this migration.

## Decision

Move the public-site hosting from the Coolify-managed Hetzner origin to a Git-integrated Cloudflare Pages project. Configure `main` as the production branch so a successful build after each push to `origin/main` deploys automatically. Keep the existing `/api/leads` Cloudflare Worker and its route independent from the static-site deployment.

Use Cloudflare Pages' built-in preview deployments for non-production branches. The production build must run the repository's regression tests and static validation before publishing, without adding a separate deployment platform or mandatory GitHub Actions workflow.

## Consequences

- Public static assets are deployed to Cloudflare's distributed network without a site container or VPS origin to administer.
- The build must produce an explicit deployable output directory rather than publish the repository root indiscriminately.
- The existing `_redirects` file can remain part of the static output, subject to migration verification.
- The Hetzner/Coolify deployment remains available during a staged cutover and rollback window, then can be retired for this site without affecting other hosted applications.
- The design must remain within Cloudflare Pages Free-plan limits and must not depend on paid image transformation services.
- A failed build must prevent production deployment; successful pushes to `main` are otherwise deployed automatically.
- Preview and production behavior, rollback, and the Cloudflare dashboard settings must be documented for maintainers.
