# Titanium Proposal Design QA

## Evidence

- Source visual truth: `/Users/sramzzs4d/Projects-sramzz/agency-website/proposals/titanium-gym-9c42e7/assets/final-visual-target.png`
- Pricing source truth: `/Users/sramzzs4d/Projects-sramzz/agency-website/proposals/titanium-gym-9c42e7/assets/qa-pricing-reference.png` (live local capture of `/locations/australia/#plans`)
- Implementation route: `http://127.0.0.1:4176/proposals/titanium-gym-9c42e7/`
- Combined comparison: `/Users/sramzzs4d/Projects-sramzz/agency-website/proposals/titanium-gym-9c42e7/assets/qa-comparison.png`
- Desktop hero: `/Users/sramzzs4d/Projects-sramzz/agency-website/proposals/titanium-gym-9c42e7/assets/qa-desktop-top.png`
- Wide desktop hero: `/Users/sramzzs4d/Projects-sramzz/agency-website/proposals/titanium-gym-9c42e7/assets/qa-desktop-wide.png`
- Mobile hero: `/Users/sramzzs4d/Projects-sramzz/agency-website/proposals/titanium-gym-9c42e7/assets/qa-mobile-top.png`
- Focused regions: `qa-services.png`, `qa-system.png`, and `qa-pricing.png` in the same tokenized assets directory.

## Normalization

- Source: 735 × 2140 pixels, shown at its native density in the combined comparison.
- Desktop implementation: 1425 × 7624 CSS pixels at device scale 1; the top capture is 1425 × 1100 pixels. The full page is scaled to fit beside the source in the combined comparison.
- Tablet check: requested 768 × 1024; browser content viewport 753 pixels wide at device scale 1.
- Mobile check: requested 390 × 844; browser content viewport 375 × 844 pixels at device scale 1.
- State: English proposal, dark theme, default editable values, no authentication.

## Full-view comparison

The combined comparison places the complete approved composition beside the full rendered implementation and focused desktop captures. The implementation keeps the same section order, alternating black/off-white chapters, condensed editorial hierarchy, coral/amber accents, narrow borders, and 1200px content grid. It is intentionally longer than the concept because it contains the complete editable scope, exact plan scopes, paid-campaign note, and presentation-ready diagnostic questions.

## Focused region comparison

- Hero: Oswald scale, line breaks, coral emphasis, monochrome Titanium imagery, and private-proposal treatment match the selected direction. “WHEREVER” is a single no-wrap line at 1425px, 1009px, 753px, and 375px content widths.
- Two business levers: split panel, service grouping, central plus, thin coral borders, and separate AI opportunity match the reference.
- Growth system: three connected pillars and shared measurement rail match the approved replacement section.
- Investment: the proposal now uses the Australia page's `price-card`, `plan-label`, `plan-price`, `feature-list`, `plan-ads`, featured card, and pill-button treatments. The side-by-side comparison confirms the same dark burgundy surfaces, coral bullets, rounded corners, price hierarchy, ad panels, and highlighted middle plan while retaining the proposal-specific scopes and “Discuss in person.”
- Platform coverage: local brand marks replace the initial generic icon treatment. ChatGPT now uses a proposal-local, viewport-cropped copy of the supplied white Blossom mark; all ten platforms remain labelled “To verify.”

## Required fidelity surfaces

- Fonts and typography: Oswald display, Inter body, and JetBrains Mono labels load correctly; hierarchy, wrapping, weight, tracking, and optical contrast match the Ranking Rebels homepage system.
- Spacing and layout rhythm: desktop, tablet, and mobile grids remain aligned with no horizontal overflow. Section spacing is intentionally more generous than the compressed concept to keep real copy legible.
- Colors and tokens: the page uses the homepage black, off-white, muted grey, coral, and amber tokens. No gradient or new replacement brand palette is used.
- Image quality and assets: Titanium’s sourced photography remains sharp and appropriately cropped; platform marks are local assets; no inline custom SVG, CSS illustration, or generic stock placeholder replaces visible brand imagery.
- Copy and content: no invented performance metrics or ranking claims appear. Audit evidence and Colombian proof remain explicitly marked for completion or verification.
- Accessibility and behavior: semantic headings, skip link, alt text, focus styles, reduced-motion support, editable field keyboard behavior, and in-page discussion CTAs were checked. No browser console warnings or errors were present on the proposal route.

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
   - “Discuss in person” navigates to `#discussion`; the editable timeline field accepts keyboard input.
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

## Findings

No actionable P0, P1, or P2 differences remain.

## Follow-up polish

- [P3] Bing Maps intentionally shares the Bing brand mark because no separate current Bing Maps mark was required for comprehension.
- [P3] Replace the proof and audit placeholders after client evidence and account access are available.

final result: passed
