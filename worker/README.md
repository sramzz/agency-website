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

1. **Completed 2026-09-04:** D1 `ranking-rebels-leads` was created with jurisdiction `eu`, its real database ID was added to `wrangler.jsonc`, and migration `0001_create_leads.sql` was applied remotely.
2. **Completed 2026-09-04:** Queues `ranking-rebels-lead-email` and `ranking-rebels-lead-email-dlq` were created. The producer, consumer, retry limit, and DLQ are declared in `wrangler.jsonc` and will attach when the Worker is deployed.
3. **Partially completed 2026-09-04:** Managed widget `Ranking Rebels lead capture` was created for `rankingrebels.com` and `www.rankingrebels.com`. Its public sitekey is exposed by `assets/js/lead-capture-config.js` before `lead-capture.js` on all 12 participating pages. The Worker now exists, so the next operator step is `wrangler secret put TURNSTILE_SECRET_KEY`. Never copy the secret into Git or `.dev.vars`.
4. **Completed 2026-09-04:** Email Routing was enabled for the `forms.rankingrebels.com` subdomain and `rankingrebelsmarketingagency@gmail.com` was added and verified. The Worker sender remains `leads@forms.rankingrebels.com`, and Wrangler restricts the Email binding to that verified destination.
5. **Completed 2026-09-04:** Active WAF rate-limit rule `Protect lead capture endpoint` matches only `http.request.uri.path eq "/api/leads"`, counts per IP, and blocks after 5 requests in 10 seconds for 10 seconds.
6. **Partially completed 2026-09-04:** The dry-run passed and Worker version `8b6905df-c6eb-4ef9-bbd4-346dfc31c7aa` was deployed with both production routes, the daily cron, and the Queue producer/consumer. Attaching the Turnstile secret, the D1/email smoke test, and the static frontend publication through Coolify remain pending.

Production remains blocked until the Turnstile secret is attached after the first Worker deployment and written approval of `/privacy/` is present. D1, Queue resources, the verified email destination, the production Turnstile sitekey, and the WAF rule are already provisioned.

## Queue and retention operations

- The Queue carries only `{ "submissionId": "..." }`; contact fields remain in D1.
- The daily cron deletes expired D1 rows and re-enqueues stale `pending` or `failed` notifications.
- Inspect Queue metrics and `ranking-rebels-lead-email-dlq` in the Cloudflare dashboard. Do not purge the DLQ until each `submissionId` has been reconciled against D1.
- On Workers Free, Queue messages expire after 24 hours. Review the DLQ daily during the first month; a weekly review is insufficient on this plan. Keep Gmail access MFA-protected and delete lead notification emails older than 12 months each quarter.

## Rollback

Rollback only the static frontend so CTA links return directly to WhatsApp. Do not delete D1, Queues, migrations, or retained lead data during rollback.
