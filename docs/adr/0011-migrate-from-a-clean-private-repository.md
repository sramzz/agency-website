# ADR 0011: Migrate from a clean private repository

## Status

Accepted

## Context

The current public repository mixes the public site, internal documentation, Worker code, and private client proposals in its reachable history. Changing that repository in place risks disturbing the simple Coolify deployment before the replacement has been proven. A public GitHub fork cannot become independently private.

## Decision

Create a new, independent private GitHub repository from a clean snapshot of the public-site source. Do not create a GitHub fork and do not copy proposal pages, proposal media, generated QA artifacts, or the old Git history into it. Start a new history whose initial commit records the migration source revision.

Connect the new repository to Cloudflare Pages with `main` as the production branch. Validate first through a Pages preview or a protected staging hostname that is blocked from indexing. After validation, attach both `rankingrebels.com` and `www.rankingrebels.com`, preserve the canonical apex hostname, and redirect `www` consistently.

After the production cutover and rollback window, make the old repository private and archive it as historical context. Move active proposal source to its dedicated private repository.

## Consequences

- The replacement repository has a short, comprehensible history free of proposal content.
- Historical blame and commits remain available only in the archived private repository.
- The migration can be tested without changing the Coolify source or production DNS.
- Staging must use Access and `X-Robots-Tag: noindex`; it must never become a competing indexed hostname.
- Both apex and `www` behavior must be verified during cutover because current canonical URLs use the apex hostname.
