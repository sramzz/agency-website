# ADR 0006: Adopt strict field performance objectives

## Status

Accepted

## Context

The public site is a relatively simple static website and the team wants it to feel faster than the minimum Core Web Vitals definition of good. Australia and Europe are the priority delivery regions, and mobile and desktop experiences must be evaluated separately.

## Decision

Use the following real-user performance objectives for the public site:

- At the 75th percentile: LCP at or below 1.8 seconds, INP at or below 150 milliseconds, and CLS at or below 0.05.
- At the 90th percentile: LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1.
- Segment reporting by mobile and desktop, with Australia and Europe reviewed independently.
- Use a Lighthouse mobile performance score of 95 or higher as a regression signal in controlled tests, not as a substitute for field measurements.
- Use Cloudflare Web Analytics for production Core Web Vitals and regional/device percentiles while retaining Google Analytics for marketing analytics. Do not enable either analytics system on private proposal pages unless a later privacy decision explicitly requires it.
- Enforce these initial compressed-transfer budgets for the public site's initial viewport: no more than 500 KB total on mobile including fonts and third parties, 30 KB of HTML, a 45 KB target and 50 KB release ceiling for initial CSS, 30 KB of first-party initial JavaScript, and 150 KB of initially required fonts. Allow at most two render-blocking resources in addition to the HTML, and defer non-essential scripts.
- Do not make a broad CSS refactor part of the hosting migration. First improve images, fonts, delivery, and render-blocking behavior. If initial compressed CSS exceeds 50 KB or measurement shows significant browser work, diagnose the contributing rules and delivery path after migration before choosing a focused remediation.

## Consequences

- Passing Google's standard 75th-percentile Core Web Vitals thresholds is necessary but not sufficient for the project's internal target.
- Real-user monitoring needs enough samples per region and device class before percentile comparisons are treated as reliable.
- Third-party scripts, fonts, images, and future content must remain within documented performance budgets.
- Targets may be tightened after a stable production baseline demonstrates consistent headroom.
- The 45 KB CSS figure remains an optimization target; deployments up to 50 KB may proceed during the migration when the rest of the release contract passes.
