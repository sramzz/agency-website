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
The highest-quality input used during a deliberate, local conversion into deployable image variants. It is never included in the public deployment and may be deleted after the final variants pass visual and performance acceptance.
_Avoid_: Original served image, production image

**Priority delivery regions**:
Australia and Europe, with Europe represented initially by the Netherlands and nearby Western European locations for performance verification.
_Avoid_: Global-equal target

**Public-site repository**:
The private GitHub repository containing only the source and documentation needed to maintain and deploy the public site through Cloudflare Pages.
_Avoid_: Current mixed repository, proposal repository

**Proposal repository**:
The private GitHub repository containing client proposal source and media for authenticated proposal deployments. It may have the same human collaborators as the public-site repository, but it has a separate deployment and confidentiality boundary.
_Avoid_: Public-site repository, public proposals folder

**Production hostnames**:
The two public hostnames `rankingrebels.com` and `www.rankingrebels.com`. The naked/apex domain `rankingrebels.com` is canonical and `www` redirects to it; both must be attached and verified during cutover.
_Avoid_: Staging hostname, preview URL

**Acceptance window**:
The seven days immediately after the public Cloudflare Pages cutover during which the previous Coolify deployment remains unchanged as a rollback origin. It is not an additional staging period, and production indexing controls must already be correct before it begins.
_Avoid_: Staging window, DNS propagation period
