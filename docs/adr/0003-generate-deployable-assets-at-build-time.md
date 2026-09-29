# ADR 0003: Generate deployable assets at build time

## Status

Accepted

## Context

The browser runtime must remain static HTML, CSS, and vanilla JavaScript, but the current repository serves oversized raster images and does not provide responsive image candidates. The team permits build-time tooling if its behavior is documented and its software supply-chain risk is controlled.

## Decision

Add a minimal, documented Node-based build pipeline that produces the Cloudflare Pages output directory. It will generate responsive AVIF and WebP variants plus a broadly compatible fallback, minify suitable text assets, validate generated references, and leave the browser runtime framework-free.

Build dependencies must be necessary, actively maintained, pinned through the lockfile, and reviewed through automated dependency updates and security checks. Build output must be reproducible and must not require secrets.

Retain source images through migration and verification, but exclude them from the deployed output. Any later deletion of source images requires a separate retention and recovery decision.

## Consequences

- Contributors need a documented build and verification command in addition to the existing local static-server workflow.
- Generated assets are not edited by hand.
- Responsive variants increase the repository or build-artifact file count while reducing bytes delivered to each visitor.
- The pipeline becomes part of the production supply chain and therefore requires version pinning, review, and automated verification.
- Removing source images from the public deployment does not require discarding the highest-quality inputs needed for future redesigns or re-encoding.
