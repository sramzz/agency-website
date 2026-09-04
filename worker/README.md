# Lead capture Worker

This directory is an independent Cloudflare Workers TypeScript project. Coolify must continue serving the repository root as static files; it must not build or run this directory.

## Local verification

```sh
npm ci
npm test
npm run typecheck
npm run types
npm run deploy:dry-run
```

For local development, create `worker/.dev.vars` (gitignored) with only:

```text
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

The frontend automatically uses Cloudflare's public test sitekey on `localhost` and `127.0.0.1`. Never use test keys in production.

## Authorized provisioning

Do not run these steps from an automated subagent. An authorized operator must:

1. Create D1 with `wrangler d1 create ranking-rebels-leads --jurisdiction eu`, replace the zero/placeholder database ID in `wrangler.jsonc`, and run `wrangler d1 migrations apply ranking-rebels-leads --remote`.
2. Create `ranking-rebels-lead-email` and `ranking-rebels-lead-email-dlq`. The producer, consumer, retry limit, and DLQ are declared in `wrangler.jsonc`.
3. Create a Managed Turnstile widget for `rankingrebels.com` and `www.rankingrebels.com`; expose its public sitekey as `window.RankingRebelsLeadCaptureConfig.turnstileSitekey` before `lead-capture.js`, and set the secret only with `wrangler secret put TURNSTILE_SECRET_KEY`.
4. Configure Email Service for `leads@forms.rankingrebels.com`, verify `rankingrebelsmarketingagency@gmail.com`, and retain the destination restriction declared in Wrangler.
5. Configure a WAF rate-limit rule for exact path `/api/leads`: 5 requests per 10 seconds per IP, block for 10 seconds.
6. Run the dry-run, deploy the Worker and its routes first, perform the D1/email smoke test, then publish the static frontend through Coolify.

Production remains blocked until the Turnstile keys, D1 ID, Queue resources, verified email destination, and written approval of `/privacy/` are all present.

## Queue and retention operations

- The Queue carries only `{ "submissionId": "..." }`; contact fields remain in D1.
- The daily cron deletes expired D1 rows and re-enqueues stale `pending` or `failed` notifications.
- Inspect Queue metrics and `ranking-rebels-lead-email-dlq` in the Cloudflare dashboard. Do not purge the DLQ until each `submissionId` has been reconciled against D1.
- Review the DLQ weekly during the first month. Keep Gmail access MFA-protected and delete lead notification emails older than 12 months each quarter.

## Rollback

Rollback only the static frontend so CTA links return directly to WhatsApp. Do not delete D1, Queues, migrations, or retained lead data during rollback.
