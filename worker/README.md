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
3. **Completed 2026-09-04:** Managed widget `Ranking Rebels lead capture` was created for `rankingrebels.com` and `www.rankingrebels.com`. Its public sitekey is exposed by `assets/js/lead-capture-config.js` before `lead-capture.js` on all 12 participating pages, and `TURNSTILE_SECRET_KEY` is attached to the production Worker as an encrypted secret. The secret was not copied into Git, local files, or documentation.
4. **Completed 2026-09-04:** Email Routing was enabled for the `forms.rankingrebels.com` subdomain and `rankingrebelsmarketingagency@gmail.com` was added and verified. The Worker sender remains `leads@forms.rankingrebels.com`, and Wrangler restricts the Email binding to that verified destination.
5. **Completed 2026-09-04:** Active WAF rate-limit rule `Protect lead capture endpoint` matches only `http.request.uri.path eq "/api/leads"`, counts per IP, and blocks after 5 requests in 10 seconds for 10 seconds.
6. **Completed 2026-09-05:** Worker version `dd3dcf7b-aea3-4304-a8c2-a87242b99cd8` is deployed with approved notice version `2026-09-04`, both production routes, the daily cron, the Queue producer/consumer, and its encrypted Turnstile secret. The static frontend was published through Coolify from `main`.

**Negative production verification completed 2026-09-04:** A synthetic request with an invalid Turnstile token returned `422 turnstile_rejected` with `Cache-Control: no-store`. Remote D1 contained zero rows for the test `submissionId` both before and after the request, confirming rejection before storage and Queue delivery. No real personal data was used.

**Positive production smoke test completed 2026-09-05:** The public form obtained a production Turnstile token, stored one synthetic lead with notice version `2026-09-04`, queued one notification, and reached `notification_status = sent` with one attempt and a populated `notified_at`. WhatsApp opened only after the successful API response. The exact synthetic D1 row was then deleted and a follow-up query confirmed zero remaining rows for its `submissionId`; the test email remains in Gmail as delivery evidence.

Written owner approval of `/privacy/` was recorded on 2026-09-04 and the matching notice version is deployed to the Worker. The production rollout is complete. D1, Queue resources, the verified email destination, both production Turnstile keys, the Worker, the WAF rule, and the static frontend are provisioned and active.

## Queue and retention operations

- The Queue carries only `{ "submissionId": "..." }`; contact fields remain in D1.
- The daily cron deletes expired D1 rows and re-enqueues stale `pending` or `failed` notifications.
- Inspect Queue metrics and `ranking-rebels-lead-email-dlq` in the Cloudflare dashboard. Do not purge the DLQ until each `submissionId` has been reconciled against D1.
- On Workers Free, Queue messages expire after 24 hours. Review the DLQ daily during the first month; a weekly review is insufficient on this plan. Keep Gmail access MFA-protected and review it monthly, deleting lead notification emails that reach 11 months so none reaches 12 months. Retain a quarterly audit of retention compliance.

## Rollback

Rollback only the static frontend so CTA links return directly to WhatsApp. Do not delete D1, Queues, migrations, or retained lead data during rollback.
