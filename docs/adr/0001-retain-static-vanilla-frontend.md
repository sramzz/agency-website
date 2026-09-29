# ADR 0001: Retain the static vanilla frontend

## Status

Accepted

## Context

The public site is implemented as static HTML, CSS, and JavaScript. Improving perceived and measured loading performance does not require introducing a client-side framework, and the team has explicitly chosen to keep the vanilla JavaScript stack. The lead endpoint is already deployed separately as a Cloudflare Worker.

## Decision

Keep the public-site runtime as static HTML, CSS, and vanilla JavaScript. Performance work may add build-time or CI asset processing, validation, and deployment automation, but it must not introduce a client-side framework or require a JavaScript application runtime to render public content.

## Consequences

- The browser receives server-ready HTML without framework hydration or a framework runtime.
- Hosting remains portable across static hosts and CDNs.
- Repeated markup and asset references remain the repository's responsibility unless lightweight build-time tooling is deliberately adopted later.
- Image optimization, CSS reduction, caching, and delivery configuration become the main performance levers.
- The independently deployed lead endpoint can remain unchanged during a frontend-hosting migration.
