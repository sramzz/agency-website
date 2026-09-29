# Architecture Decision Records

This directory records decisions that materially affect the Ranking Rebels website architecture, operations, security, or performance. ADRs explain context, the chosen direction, and accepted consequences; they are documentation, not executable configuration.

## Status meanings

- **Accepted**: current direction for future implementation.
- **Superseded**: replaced by a later ADR and retained for decision history.
- **Proposed**: under active discussion and not approved for implementation.

## Records

- [0001: Retain the static vanilla frontend](./0001-retain-static-vanilla-frontend.md) — Accepted
- [0002: Host the public site on Cloudflare Pages](./0002-host-public-site-on-cloudflare-pages.md) — Accepted
- [0003: Generate deployable assets at build time](./0003-generate-deployable-assets-at-build-time.md) — Superseded by ADR 0005
- [0004: Separate private client proposals](./0004-separate-private-client-proposals.md) — Accepted
- [0005: Optimize images manually with budget gates](./0005-optimize-images-manually-with-budget-gates.md) — Accepted
- [0006: Adopt strict field performance objectives](./0006-adopt-strict-field-performance-objectives.md) — Accepted
- [0007: Start with conservative browser caching](./0007-start-with-conservative-browser-caching.md) — Accepted
- [0008: Use a zero-dependency public-site build](./0008-use-a-zero-dependency-public-site-build.md) — Accepted
- [0009: Self-host public-site fonts](./0009-self-host-public-site-fonts.md) — Accepted
- [0010: Use a staged Cloudflare Pages cutover](./0010-use-a-staged-cloudflare-pages-cutover.md) — Accepted
- [0011: Migrate from a clean private repository](./0011-migrate-from-a-clean-private-repository.md) — Accepted
- [0012: Define release verification and browser support](./0012-define-release-verification-and-browser-support.md) — Accepted

## Conventions

Use the next four-digit number and a short lowercase slug. An ADR contains `Status`, `Context`, `Decision`, and `Consequences`. Do not delete superseded records; update their status and link to the replacement.
