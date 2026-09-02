# Titanium Proposal Design QA

## Evidence

- Source visual truth: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/final-visual-target.png`
- Pricing source truth: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-pricing-reference.png` (live local capture of `/locations/australia/#plans`)
- Implementation route: `http://127.0.0.1:4176/proposals/titanium-gym-9c42e7/`
- Combined comparison: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-comparison.png`
- Desktop hero: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-desktop-top.png`
- Wide desktop hero: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-desktop-wide.png`
- Mobile hero: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-mobile-top.png`
- Mobile investment: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-pricing-mobile.png`
- Desktop identity: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-identity-desktop.png`
- Mobile identity: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-identity-mobile.png`
- Desktop discovery evidence: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-diagnosis-desktop.png`
- Mobile discovery evidence: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-diagnosis-mobile.png`
- In-page evidence viewer: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-diagnosis-lightbox.png`
- Desktop Growth System → Investment transition: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-system-investment-desktop.png`
- Mobile Growth System → Investment transition: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-system-investment-mobile.png`
- Desktop Colombian proof: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-client-proof-desktop.png`
- Mobile Colombian proof: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-client-proof-mobile.png`
- Desktop public case studies: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-case-studies-desktop.png`
- Mobile public case studies: `/Users/sramzzs4d/Projects-sramzz/agency-website/docs/qa/proposals/titanium-gym/qa-case-studies-mobile.png`
- Focused regions: `qa-solutions.png`, `qa-system.png`, and `qa-pricing.png` in the same tokenized assets directory.

## Normalization

- Source: 735 × 2140 pixels, shown at its native density in the combined comparison.
- Desktop implementation: 1425 × 7624 CSS pixels at device scale 1; the top capture is 1425 × 1100 pixels. The full page is scaled to fit beside the source in the combined comparison.
- Tablet check: requested 768 × 1024; browser content viewport 753 pixels wide at device scale 1.
- Mobile check: requested 390 × 844; browser content viewport 375 × 844 pixels at device scale 1.
- State: English proposal, dark theme, default presentation state, no authentication.

## Full-view comparison

The combined comparison places the complete approved composition beside the full rendered implementation and focused desktop captures. The implementation keeps the same section order, alternating black/off-white chapters, condensed editorial hierarchy, coral/amber accents, narrow borders, and 1200px content grid. It is intentionally longer than the concept because it contains the complete evidence gallery, exact plan scopes, paid-campaign note, and presentation-ready diagnostic findings.

## Focused region comparison

- Hero: Oswald scale, line breaks, coral emphasis, monochrome Titanium imagery, and private-proposal treatment match the selected direction. “WHEREVER” is a single no-wrap line at 1425px, 1009px, 753px, and 375px content widths.
- Two business levers: split panel, service grouping, central plus, thin coral borders, and separate AI opportunity match the reference.
- Growth system: three connected pillars preserve the approved replacement section while the removed measurement rail creates a tighter handoff into investment.
- Investment: the proposal uses the Australia page's `price-card`, `plan-label`, `plan-price`, `feature-list`, and `plan-ads` treatments. The side-by-side comparison confirms three clearly separated burgundy boxes with matching neutral borders, coral bullets, rounded corners, price hierarchy, and ads panels while retaining proposal-specific scopes. Plan CTAs are intentionally omitted for the owner-presented meeting format.
- Platform coverage: local brand marks replace the initial generic icon treatment. ChatGPT now uses a proposal-local, viewport-cropped copy of the supplied white Blossom mark; all ten platforms remain labelled “To verify.”
- Discovery diagnosis: a full-width, evidence-led Search chapter groups seven supplied captures across Google, Perplexity, ChatGPT, Copilot and Bing. Ads and Strategy remain a connected two-card conclusion beneath it. The same-page evidence viewer preserves screenshot detail without disrupting the presentation flow.

## Required fidelity surfaces

- Fonts and typography: Oswald display, Inter body, and JetBrains Mono labels load correctly; hierarchy, wrapping, weight, tracking, and optical contrast match the Ranking Rebels homepage system.
- Spacing and layout rhythm: desktop, tablet, and mobile grids remain aligned with no horizontal overflow. Section spacing is intentionally more generous than the compressed concept to keep real copy legible.
- Colors and tokens: the page uses the homepage black, off-white, muted grey, coral, and amber tokens. No gradient or new replacement brand palette is used.
- Image quality and assets: Titanium’s sourced photography remains sharp and appropriately cropped; platform marks are local assets; no inline custom SVG, CSS illustration, or generic stock placeholder replaces visible brand imagery.
- Copy and content: no invented performance metrics or universal ranking claims appear. Colombian client metrics are transcribed from the supplied Google Ads, Search Console and Analytics screenshots. Discovery and ads findings are explicitly limited to the supplied public snapshots, with account access still required for campaign conclusions.
- Accessibility and behavior: semantic headings, skip link, alt text, focus styles, reduced-motion support, and evidence-viewer keyboard controls were checked. No browser console warnings or errors were present on the proposal route.

## Comparison history

1. Initial pass
   - [P2] Platform coverage used generic Material symbols where the visual target used brand marks.
   - [P2] The sticky translucent header made the browser’s full-page QA capture unreliable and caused anchor captures to drift.
2. Fixes
   - Downloaded and localized the platform brand marks in the tokenized asset directory, retaining the platform labels as the accessible names.
   - Removed sticky/backdrop behavior from the header, matching the static presentation composition and improving anchor behavior.
   - Re-captured desktop, tablet, mobile, focused regions, and the combined comparison.
3. Post-fix evidence
   - All ten platform assets/labels render; local image load checks pass.
   - Desktop, tablet, and mobile report no horizontal overflow.
   - The proposal route reports no console errors or warnings.
4. Feedback revision pass
   - [P2] “WHEREVER” broke inside the word at desktop width.
   - [P2] The previous ChatGPT mark was not visible in platform coverage.
   - [P2] The proposal pricing composition did not yet reproduce the Australia homepage card surfaces, add-on panels, featured state, or pill buttons.
5. Revision fixes
   - Refined the desktop hero grid and display scale, then applied a no-wrap rule to the highlighted word.
   - Replaced the ChatGPT asset with a proposal-local cropped copy of `assets/Logos/Blossom_Dark.svg`.
   - Rebuilt all three investment cards with the Australia pricing markup and scoped visual rules, preserving proposal-specific prices, scopes, and CTA wording.
6. Revision evidence
   - Hero text has one client rect at 1425px, 1009px, 753px, and 375px content widths; each viewport reports zero horizontal overflow.
   - ChatGPT asset reports a 280 × 280 natural viewport and renders sharply at 31 × 31 pixels.
   - Australia and proposal pricing both render three price cards, three ads panels, two outline buttons, one featured primary button, and zero horizontal overflow.
   - Desktop, tablet, and mobile browser checks report no console warnings or errors.
7. Wide-screen regression fix
   - [P2] User evidence showed the last “R” in “WHEREVER” dropping to a new line above the previous desktop breakpoint.
   - Lowered the fluid display ceiling from 104px to 96px, allocated 20px more minimum width to the copy column, and gave the highlighted word an intrinsic max-content line box with normal word breaking and no hyphenation.
   - Browser checks at 1455px, 1585px, 1905px, and 2545px content widths report one text rect, `white-space: nowrap`, no media overlap, and zero horizontal overflow.
8. Investment-section source match
   - [P2] The previous “A starting point for the conversation” heading was weaker than the Australia source.
   - [P2] The featured card's coral outline and different surface disrupted the evenly separated three-box treatment visible on the live Australia page.
   - Replaced the heading with “Start with foundations. Grow into dominance.” and added the source's audit-led explanatory line.
   - Matched all three plan boxes to the same burgundy surface, neutral border, 18px radius, 28px padding, and 16px inter-card gap. The middle plan remains recommended through its label and primary CTA.
   - Desktop source/implementation comparison and the 375px mobile check show three distinct cards, one-column mobile stacking, and zero horizontal overflow.
9. Owner-presented pricing mode
   - Removed all three “Discuss in person” buttons because the proposal will be presented directly beside the Titanium Gym owner.
   - Removed the now-unused investment button styling; card height and ads-panel alignment remain consistent.
10. Titanium identity revision
   - Merged the private and 24/7 signals into “Private, 24/7” with polished Australian-English positioning.
   - Replaced the standalone 24/7 Access item with “Recovery Centre,” covering the named active-recovery facilities and using the existing Material `spa` symbol.
   - Preserved four identity cards, the image/card composition, section summary, and responsive behavior. Browser checks at 1425px and 375px report zero horizontal overflow.
11. Colombian client proof
   - Replaced the three Section 03 placeholders with compact, linked proof rows for Petrogrease, Terraformados Antioquia and Tejas Trading, using the supplied logos and screenshot-supported headline metrics.
   - Added three named public case-study groups with six full-size evidence links and copied public assets under `/assets/images/case-studies/`; the existing Business Profile portfolio remains intact.
   - Preserved source-language screenshots, added English source-aware captions, and omitted ad cost from headline claims because the screenshots do not identify a currency.
   - Proposal and public case-study checks at 1425px and 375px report all logos/evidence loaded, working anchors, one-column mobile stacking and zero horizontal overflow.
12. Discovery evidence reform
   - Replaced the three placeholder audit cards with a full-width Search visibility chapter, seven grouped search/AI captures, a supplied Meta Ad Library capture, and a strategy finding that acknowledges the stronger Instagram direction since 6 July.
   - Added an accessible same-page evidence viewer with previous/next controls, Arrow key navigation, explicit Escape handling, backdrop/close controls and focus restoration.
   - The first visual pass exposed intrinsic image heights overriding the intended thumbnail ratio; explicit CSS height containment corrected the gallery density before final capture.
   - Browser checks at 1600px, 1440px, 768px and 390px report five evidence groups, correct responsive card stacking and zero horizontal overflow. The viewer opens at `01 / 08`, advances to `02 / 08`, closes with Escape and restores focus to the originating thumbnail.
   - Desktop, mobile and lightbox captures show all evidence loaded; the proposal route reports no console errors.
13. Sections 07–09 simplification
   - Removed the Measurement & Insights rail and the complete editable scope chapter while preserving all three Growth System pillars and their measurement dependency labels.
   - Renumbered Investment Options to 08 and In-person Discussion to 09, creating a direct chapter transition with the existing border and section spacing.
   - Removed the obsolete scope/editing CSS and localStorage behavior; the proposal script now serves only the evidence viewer.
   - Updated no-JavaScript guidance and regression coverage to reflect the simplified presentation.
   - Desktop and mobile transition captures show a clean bordered handoff between the two dark chapters. Checks at 1600px, 1440px, 768px and 390px report `07 → 08 → 09`, three price cards, no removed-section remnants and zero horizontal overflow.

## Findings

No actionable P0, P1, or P2 differences remain.

## Follow-up polish

- [P3] Bing Maps intentionally shares the Bing brand mark because no separate current Bing Maps mark was required for comprehension.
- [P3] Confirm account-level Google and Meta campaign data when client access becomes available.

final result: passed

---

# Service Selector Design QA

## Evidence

- Approved desktop visual: `C:/Users/Kelly Serna/.codex/generated_images/01a0613b-81c6-7101-8dc0-87d251715875/exec-a7fbefee-b455-4f2b-8876-902a030f4bcb.png`
- Approved mobile visual: `C:/Users/Kelly Serna/.codex/generated_images/01a0613b-81c6-7101-8dc0-87d251715875/exec-25ca3622-870d-41c9-8e10-9c5cb73a8899.png`
- Desktop comparison: `docs/qa/service-selector-comparison-desktop.png`
- Mobile comparison: `docs/qa/service-selector-comparison-mobile.png`
- Final desktop modal: `docs/qa/service-selector-modal-desktop.png`
- Final mobile inline form: `docs/qa/service-selector-mobile.png`
- Local route: `http://127.0.0.1:4176/#service-selector`

## Normalization and state

- Desktop implementation: 1440 x 1000 CSS pixels, device scale 1.
- Mobile implementation: 390 x 844 CSS pixels, device scale 1.
- Selected-state evidence uses `ChatGPT & GEO` and `AI Automation`; production loads with no selections and a disabled CTA.
- The same form node is moved between its inline location and the modal, so selection state is preserved without maintaining duplicate controls.

## Responsive and interaction verification

- Desktop renders a balanced 3 x 3 service grid; mobile transforms it into a single vertical list without horizontal overflow.
- Every commercial CTA on the four in-scope homepages opens the selector dialog. The selector CTA alone opens WhatsApp.
- Footer WhatsApp text links remain direct and unchanged.
- The dialog traps background interaction through native `dialog`, closes by button, backdrop, or Escape, and restores focus to the CTA that opened it.
- The CTA remains disabled with zero selections and becomes enabled with one or more selections.
- WhatsApp message content was verified with selected services in display order and the correct market label.
- Routing was verified to `31613390178` for Netherlands and `61439499441` for the root, Australia, and LATAM homepages.
- Browser checks reported no JavaScript console errors and no horizontal overflow at 390px.

## Comparison history

1. Initial implementation
   - [P2] The heading inherited an uppercase site style that diverged from the approved form.
   - [P2] Programmatic heading focus produced an oversized red outline.
   - [P1] Escape did not close the dialog consistently in the browser integration.
2. Fixes
   - Scoped the selector heading to sentence case.
   - Removed the programmatic heading outline while retaining visible focus on interactive controls.
   - Added explicit Escape handling, dialog restoration, and opener-focus restoration.
3. Final verification
   - Desktop and mobile visuals preserve the approved white card, conservative curved red brush, typography, spacing, and interaction hierarchy.
   - Button, checkbox, hover, focus, selected, disabled, modal, narrow-screen, and successful WhatsApp-routing states were exercised.
   - Automated site tests pass: 35 of 35.

## Static audit note

The strict project-wide frontend audit reports 30 pre-existing `affordance.actionless-button` findings, primarily navigation toggles and unrelated proposal pages. The only findings on the four changed homepages point to the existing mobile navigation toggle; the new service-selector submit buttons are correctly recognized as form submissions and introduce no audit finding.

## Findings

No actionable P0, P1, or P2 differences remain for the service-selector scope.

final result: passed

## Service selector mobile and WhatsApp revision — 2026-09-03

- [P1] iOS Safari could retain a clipped red interaction state after a selected service was cleared.
- Restricted hover styling to devices with a fine pointer and removed touch-origin focus after the checkbox change; keyboard focus behavior remains intact.
- Re-captured the 390 × 844 modal with zero selected services. All row dividers return to the neutral grey treatment and the CTA returns to its disabled state.
- Replaced the market-based message with the approved fixed opener, selected-service bullets, optional approximate location, and the new closing question.
- Location detection uses the same-origin Cloudflare trace endpoint, never calls browser geolocation, and keeps submission independent from the request result.
- Country-only, missing-location, request-error, timeout, one-service, multi-service, encoding, and regional-number paths are covered by automated tests.

final result: passed
