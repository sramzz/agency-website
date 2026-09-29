# ADR 0004: Separate private client proposals from the public site

## Status

Accepted

## Context

The `/proposals/` pages contain client-specific commercial material. Although the pages use `noindex` metadata and are disallowed in `robots.txt`, they are currently reachable without authentication and are stored in a GitHub repository that is publicly readable. Search directives do not provide confidentiality.

## Decision

Remove proposal pages and proposal-specific media from the public-site deployment, then move them to a dedicated private repository and a separate protected deployment. Changing the current repository's visibility is deferred until its Coolify access and collaborator requirements have been validated, so containment must be staged without pretending the current exposure has already been resolved.

Protect each client proposal with a deny-by-default Cloudflare Access policy that sends a one-time code only to explicitly allowlisted client email addresses. Keep `noindex`, `nofollow`, `noarchive`, `nosnippet`, and `noimageindex` controls as defense in depth, not as authentication.

Set the Access session duration to seven days. Keep each proposal published for fourteen days by default, then revoke access or archive it manually unless the review period is extended.

The same maintainers may collaborate on both private repositories. Repository separation exists to create independent deployment and confidentiality boundaries, not to imply separate internal teams.

During the transition, protect the existing `/proposals/*` routes with Cloudflare Access, issue each client a replacement authenticated URL, exclude all proposal content from the new public-site build, move the active source to the proposal repository, and finally make the old mixed repository private and archive it.

Remove the following historical proposal pages and their proposal-specific assets from the public-site source and deployment:

- `/proposals/titanium-gym-9c42e7/`
- `/proposals/titanium-gym-9c42e7/wellness-recommendation/`
- `/proposals/whatsapp-booking/`
- `/proposals/whatsapp-booking/es/`
- `/proposals/winpress/`
- `/proposals/winpress/es/`

Keep `Disallow: /proposals/` and `Disallow: /assets/images/proposals/` in the public site's `robots.txt` as defense in depth against accidental reintroduction. These paths were intended to remain unindexed, but `noindex` and `robots.txt` are crawler instructions rather than access control.

Do not add proposal-specific `410 Gone` responses or submit Search Console removals as part of the initial migration. Once the old deployment is retired, historical proposal paths may return the public site's ordinary `404 Not Found` response. Reconsider targeted removals only if monitoring shows that a specific private URL was indexed or continues to receive unintended traffic.

## Consequences

- The public Pages build must not contain proposal HTML, styles, scripts, or client-specific images.
- The new public-site repository must not contain the removed proposal files or media.
- A client authorized for one proposal must not gain access to another client's proposal.
- Until repository containment is completed, the current public Git history remains a known confidentiality gap.
- Making the repository private does not retract copies, forks, search caches, or content downloaded while it was public; the exposure must be treated as historical disclosure.
- Coolify or any other system that currently clones the repository anonymously may need a GitHub App or deploy credential after the visibility change.
- If the public-site source is made public again, it must use sanitized history that never contained proposal material.
- Proposal expiration removes access without requiring immediate destruction of the private source.
- Historical proposal URLs are not redirected to replacement client URLs, avoiding disclosure of the new protected location.
- A normal `404` may take longer than a `410` or an explicit Search Console request to disappear from a search index, but neither indexing control substitutes for authentication.
