# ADR 0009: Self-host public-site fonts

## Status

Accepted

## Context

Every public page currently requests Inter, JetBrains Mono, and Oswald through Google Fonts. This adds external connection setup and gives the project less control over font caching and delivery, while the visual system relies on all three families.

## Decision

Preserve the existing typography but serve the required WOFF2 font files as public-site assets from Cloudflare Pages. Include only the Latin character coverage and weight ranges actually used by the site. Use `font-display: swap`, declare suitable local fallbacks, and preload only fonts proven necessary for the initial viewport.

Do not add a runtime dependency or recurring font build pipeline. Treat a future font update as a deliberate, reviewed asset change.

## Consequences

- Initial rendering no longer depends on connections to Google Fonts.
- Font files share the site's Cloudflare delivery and cache behavior.
- The repository becomes responsible for font license notices and explicit font-version updates.
- Incorrect preload choices can waste bandwidth, so they must be verified against real page usage.
- Removing unused weights must be validated visually to avoid synthetic or incorrect typography.
