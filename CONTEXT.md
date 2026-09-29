# Ranking Rebels Website

This context describes the delivery surfaces that make up the Ranking Rebels website and keeps performance discussions scoped to the correct surface.

## Language

**Public site**:
The static marketing website served from the repository root, including the home, solution, market, case-study, journey, about, contact, and legal pages.
_Avoid_: App, frontend application

**Proposal pages**:
Private, client-specific documents currently stored under `/proposals/`. They must be excluded from public indexing and made inaccessible to anyone who has not been explicitly authorized.
_Avoid_: Public site pages, unlisted pages

**Lead endpoint**:
The `/api/leads` service implemented and deployed independently as a Cloudflare Worker, with D1, Queue, and email bindings.
_Avoid_: Contact page, static form

**Source image**:
The highest-quality retained input used to generate deployable image variants. A source image is not a public-site asset and does not need to be included in the deployed output.
_Avoid_: Original served image, production image

**Priority delivery regions**:
Australia and Europe, with Europe represented initially by the Netherlands and nearby Western European locations for performance verification.
_Avoid_: Global-equal target
