# Why Isn't My Website Showing Up on Google? A Step-by-Step SEO Diagnosis

If your website is not showing up on Google, first establish what is missing: the whole site, one page, visibility for a particular search or a local business listing. Those situations need different investigations.

A page may be undiscovered, inaccessible, excluded from indexing or indexed without appearing prominently for the searches you want. It may also be represented by a different URL. A search from your own device cannot reliably distinguish those explanations.

This guide helps Australian business owners gather evidence, choose the appropriate next step and check what changed. It is an educational process, not an audit of your website or a promise that every eligible page will be indexed.

## 1. Define the problem before changing the website

Write down the exact page, search and result you expected. Include whether the problem is new or has always existed.

| What you observe | What to investigate first |
|---|---|
| A new service page cannot be found | That URL's discovery and indexing status |
| The business appears by name but not for a service search | The relevant service page's indexing, search visibility and usefulness |
| One URL is absent but another version appears | Redirects and Google's selected canonical URL |
| Pages that previously received Google visits have declined | Affected pages, timing, technical changes, search demand and reported issues |
| The business is missing from Maps | Google Business Profile and local visibility, separately from website indexing |

Avoid changing all these things at once. If the intended page is not indexable, repeating service keywords will not remove the exclusion. If it is indexed, submitting it repeatedly is not a strategy for improving its relevance.

Keep the website question separate from enquiries too. If relevant visitors already reach the page but rarely contact you, the next investigation is the visit-to-enquiry journey rather than whether Google knows the page exists.

## 2. Use the exact URL, not a search result count

You can try a search such as `site:example.com`, using your own domain. It can provide clues, but Google's [site operator documentation](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site) says its results are not an exhaustive list of indexed URLs. The displayed count should not be treated as an index audit.

Not seeing a page in that search does not settle its status. Likewise, finding a page does not show how it performs for the service searches that matter to your business.

For a property you manage, inspect the exact intended URL in Google Search Console. Check the final address after any redirect, including the correct domain and path. If you do not have access, ask the person responsible for the site to provide the inspection result for that address.

Record the date and the URL inspected. “The website is on Google” is too broad to tell whether a specific service page is included.

## 3. Read the indexed result and the live test differently

The [URL Inspection tool](https://support.google.com/webmasters/answer/9012289) provides information about Google's indexed version and can test the current page. These are different views.

The indexed result helps establish what Google knows about that URL, including reported indexing information and, where available, the canonical URL Google selected. The live test checks the page as it can be fetched and processed now. It does not prove that the current version has entered the index or that Google will show it for a particular query.

After a repair, the current page may pass a live test while the indexed information still reflects an earlier state. Note the relevant dates instead of treating the difference as a contradiction.

Use the [Page Indexing report](https://support.google.com/webmasters/answer/7440203) to investigate patterns across pages, then inspect important examples individually. Not every excluded URL needs to be indexed: redirected addresses, genuine duplicates and deliberately private pages can have legitimate reasons for being absent.

The goal is appropriate treatment of important public pages, not making every discovered URL appear in the index.

## 4. If the page is not indexed, identify the relevant cause

Start with the reason and evidence for the URL. The checks below are possible branches, not a requirement to change every setting.

### Can Google discover and reach it?

A useful page needs a discoverable route. Check whether a relevant page on your site links to it and whether the link leads to the intended address. A page that exists only as a URL in an internal document may be hard to discover.

Google's [link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) explains crawlable links and descriptive anchor text. A [sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) can also help with discovery, but submitting one does not guarantee crawling or indexing.

If the report says the URL has been discovered but not crawled, do not immediately conclude that the server is broken. Investigate access, links and any relevant crawl or server evidence. The label alone is not a complete diagnosis.

### Is access or indexing intentionally blocked?

`robots.txt` controls crawler access; `noindex` tells Google not to index content it can access and process. They are not interchangeable.

Google's [noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing) explains that blocking crawling can prevent Google from reading that instruction. A URL blocked by robots.txt may still appear without its content if Google knows about it from elsewhere.

For an important public page, ask the developer to check the applicable rules, including a `noindex` in the page or HTTP response headers. A restriction carried over from a development environment is one possibility to verify, rather than an explanation to assume.

Do not remove intentional restrictions from private or staging areas just to increase index counts. The decision starts with which content should be public and searchable; search controls are also not a substitute for proper access protection.

### Does the server return the right page?

A page can look correct in your browser while another request encounters a login, access denial, server error or empty response. Ask for the actual response and content available to Google, rather than relying only on a screenshot.

Google's [HTTP status guidance](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes) distinguishes successful responses, redirects and errors. An HTTP 200 response alone does not guarantee indexing. A valid redirect can be intentional; the destination needs checking. A redirect error is a different issue.

Also distinguish a missing page from an empty page that returns a success response. The latter may be treated as a soft 404. Repair according to the intended outcome: restore the correct public page, use an appropriate replacement where one exists or retain an accurate not-found response for content genuinely removed. Do not send every missing URL to the homepage to make an error report look smaller.

### Is Google choosing another version?

A canonical URL is the version Google selects to represent a group of duplicate or very similar pages. Your declared canonical expresses a preference; it does not give absolute control over that selection. Google's [canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) describes the relevant signals.

If an alternate URL is correctly represented by the intended main version, its exclusion may be expected. Check the selected version before trying to make every duplicate index separately.

If the selected page is unexpected, review the relationship between the content, redirects, internal links, sitemap and declared canonical. A useful service page pointing to an unrelated preferred page needs investigation. Changing one tag without understanding the other signals may not resolve the underlying issue.

### Is the important content available when Google processes it?

If the visible page depends on scripts, check the fetched and rendered content rather than assuming that Google sees the same thing you do after interacting with the page.

Google can process JavaScript, but its [JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) explains crawling, rendering and indexing considerations. A blocked resource, error or [content loaded only after an interaction](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading) may affect what becomes available.

This is a reason to inspect the output, not a conclusion that every JavaScript site needs rebuilding. Ask a developer to compare the intended content and links with what the inspection tools can show.

If a page is reported as crawled but currently not indexed, review its current treatment, content and role alongside those checks. That status does not prove a specific quality defect or give a guaranteed fix. Do not rewrite or resubmit it solely because of the label.

## 5. If it is indexed, investigate visibility for relevant searches

Indexing makes a different investigation possible; it does not reserve a ranking.

Use Search Console performance data to examine the relevant page, queries, country, device and period. Google's [Performance documentation](https://support.google.com/webmasters/answer/17011259?hl=en) explains reporting details, including attribution to canonical URLs and limits on query data. An absent query row is not proof that the page never appeared for that search. Check active filters and [data freshness](https://support.google.com/webmasters/answer/17011364?hl=en) before treating a recent low or zero as a confirmed decline; the most recent data can be preliminary.

For an Australian service business, consider what the page actually helps a searcher decide. Does it explain the service, genuine area of operation, relevant scope and next step? Is it the appropriate page for that need, or is the website expecting a short homepage description to answer several different service questions?

Compare useful alternatives without copying them. Look for missing explanations, evidence or project context that your business can truthfully provide. Google's [helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) supports a review focused on usefulness, not a prescribed keyword density or word count.

The same page may perform differently across searches. Separate business-name searches from service discovery where useful and interpret the available data in context. A single average position or a search on one phone is not a complete measure of visibility.

A technical fix may remove a barrier without making your page the most useful option. That is why “eligible”, “indexed” and “performing well” should remain separate conclusions.

## 6. If visibility dropped, check timing and reported issues

A newly published page and an established site that lost traffic need different context. Record deployments, URL changes, outages and meaningful content changes around the date of the decline.

Google's [traffic-drop guide](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops) recommends examining technical problems, changes in demand, ranking changes and reporting issues. Compare affected pages and searches before attributing everything to an algorithm update.

Establish whether impressions, clicks or measured website sessions declined: they describe different observations. Stable impressions with fewer clicks do not, by themselves, establish deindexing, an AI-search effect or a penalty. If the decline appears only in Analytics, [compare measurement and coverage](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console) before treating it as lost Google visibility.

If URLs changed, check that old links and redirects lead to the intended replacements. If the entire site appears affected, investigate shared access or server issues as well as individual pages. A small movement in one query is different from a persistent loss across important pages.

Check the [Manual Actions report](https://support.google.com/webmasters/answer/9044175) and [Security Issues report](https://support.google.com/webmasters/answer/9044101) where relevant. They describe different issues. A clear manual-action report does not prove that every page is technically sound or that automated ranking systems will favour it.

For an indexed URL that disappeared, also check whether an active [temporary removal](https://support.google.com/webmasters/answer/9689846?hl=en) affects it. A successful live inspection does not rule out that block. Review the request and its purpose with the responsible owner before changing it.

Do not call every decline a penalty. If a report identifies a specific problem, follow the corresponding investigation and review process rather than treating an ordinary indexing request as a substitute.

## 7. After a correction, verify the change and allow reprocessing

Keep a short record: URL, intended outcome, evidence, change, date and what will be checked next. A successful deployment is not the same as a changed index entry or better visibility.

Recheck the current page and the relevant issue. For an important corrected URL, the responsible site owner may then [request recrawling](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl). Google says crawling can take days to weeks, requests have limits and repeating a request does not make crawling faster. A request is not an indexing or ranking guarantee.

Use the appropriate report to review subsequent processing. Where a report offers issue validation, that process checks the reported issue; it does not guarantee indexing of every URL. Discovery across many pages may also be supported by an accurate sitemap and useful links.

Avoid chasing an all-green report. The intended canonical page may be indexed while its duplicates remain excluded. If the important page is indexed but receives little relevant visibility, continue the content and search-needs investigation rather than repeatedly resubmitting it.

## A Perth example: one missing page, two possible explanations

Imagine a landscaping business serving a defined part of Perth adds a new service page. Other pages are already known to Google, but the owner cannot find the new address in a manual search. This is a hypothetical scenario, not a client case study.

The first task is to inspect that exact address. If evidence shows an unintended `noindex` on a page meant for public discovery, the team can correct it, check the live page and monitor subsequent processing.

Alternatively, Google may treat the address as a duplicate of the intended main service page. If that main version is correct, forcing both into the index may serve no useful purpose. If it is the wrong representative, the team needs to investigate the signals rather than assume Google missed the sitemap.

The same visible symptom leads to different decisions. Neither scenario proves how much traffic the business will gain or how many enquiries will follow.

## What to send the person investigating your site

Provide a specific, useful brief:

- The exact URL and the page that should represent the service.
- The search or search surface where you expected to appear.
- Whether the issue is new, long-standing or limited to certain pages.
- The indexed inspection result, current test and relevant dates.
- Recent site changes and the outcome you want to verify.

This evidence can help prioritise a targeted repair, confirm that an exclusion is intentional or show that the work belongs in search relevance rather than access. It can also prevent unnecessary rebuilding or content rewrites. The benefit is a better-supported decision; the commercial outcome still needs to be measured.

For help with that investigation, [contact Ranking Rebels](https://rankingrebels.com/contact/) with the affected page and the evidence available. A useful diagnosis starts with what Google can access and report about the page, then moves to the searches and people it should serve.
