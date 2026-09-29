# ADR 0010: Use a staged Cloudflare Pages cutover

## Status

Accepted

## Context

The current Coolify deployment is simple and operational. Moving the public site to Cloudflare Pages must not combine validation, DNS cutover, and retirement of the known-good origin into one irreversible event.

## Decision

Deploy and verify the Cloudflare Pages version on a non-production preview before changing the production hostnames. Test public routes, redirects, forms, the `/api/leads` Worker route, visual output, security headers, analytics, and agreed performance budgets.

Staging and preview deployments must remain protected from indexing. Immediately before the public cutover, verify that the production artifact does not contain a site-wide `noindex` directive, that production responses do not send a site-wide `X-Robots-Tag: noindex`, that `robots.txt` permits the intended public pages, and that canonical URLs use the selected production hostname. Preserve the existing indexable state of every intended public page so the hosting transition does not remove it from search. Attach and verify both `rankingrebels.com` (the naked/apex domain) and `www.rankingrebels.com`; keep the apex as canonical and redirect `www` consistently to it. Private proposal paths, previews, and staging retain their indexing blocks.

After production cutover, retain the existing Coolify application unchanged as a rollback origin for seven days. Monitor functional errors and real-user performance during that window. Retire the Coolify application for this site only after the seven-day acceptance window completes without a blocking regression.

## Consequences

- The migration requires explicit pre-cutover and post-cutover checklists.
- Hetzner and Coolify continue to incur their existing operational footprint for one additional week.
- DNS and routing changes must preserve the independently deployed lead Worker.
- A rollback can use either a previous successful Pages deployment or, during the acceptance window, the retained Coolify origin.
- The preview environment must be protected from indexing and should not be treated as another production hostname.
- Removing staging-only indexing blocks and validating both production hostnames are mandatory cutover checklist items, not post-launch cleanup.
- The cutover must compare production robots directives, response headers, canonical tags, and sitemap URLs with the pre-migration public site before DNS is changed.
