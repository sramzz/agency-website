# Verification — 2026-10-12

- Five variants render in the in-app browser at 1440 px and 390 px. Narrow viewports have no horizontal overflow. All referenced images resolve.
- Picker clicks, ArrowRight, URL selection, pause/continue, replay, service selection and the reduced-motion checkbox exercised in the browser. Paid Ads and Automation correctly replace the selected scene. Reduced CRM uses the final column.
- Browser error/warning log empty at review. Node syntax checks pass for variants.js and picker.js. Existing Solutions regression checks pass: 6/6.
- Screenshots saved alongside the preview directory. Fictional examples are marked illustrative. Production files were not changed by this exploration.
- Premium static audit returned eight actionless-button findings. These are false positives from its HTML-only inspection: all eight controls are wired in external variants.js / picker.js, and actions were exercised in the browser. Original audit retained in static-audit.json; it is not reported as a clean static pass.
- Full production accessibility and real-device performance are outside this exploratory preview. Final integration follows selection.

## Round 2

Five replacement compositions render in the in-app browser at 1440 and 390 px. All five animated branches executed without browser errors or warnings. Pause/continue and keyboard ArrowLeft verified. Reduced-motion toggle verified. Interactive challenge changes both statement and service link for paid ads and AI automation. Every referenced image resolves; narrow document width stays within viewport and the picker is 349 px wide. Node syntax checks pass. Screenshots use the round2 prefix. An engine caption overlap and dark TikTok mark were corrected during review. Production files remain untouched by this exploration.

## Round 03 — explanatory scenes (2026-10-12)

The active preview now loads scenes.js and scenes.css. Five distinct compositions: local radar map, layered website construction, channel currents, enquiry handling and an isometric growth architecture. Previous explorations remain as inactive reference files.

Verification:
- Node syntax check passes for scenes.js.
- All five variants selected through the real picker and saved in desktop and mobile screenshots.
- Desktop reviewed at 1440px. All five mobile variants checked at 390px; no horizontal overflow.
- Reduced motion renders the complete composition and disables pause.
- Pause freezes progress (scaleX 0.0290375 remained unchanged across separate observations); Continue resumes.
- Browser console returned no errors or warnings after cycling all five.
- Corrected an invisible light ChatGPT logo on a light tile, a connector crossing the qualification caption and scene scaling that crowded the footer on wide stages.
- Viewport override reset. User-facing tab retained with the new picker and animation enabled.

This is an isolated visual exploration, not a production deployment. Website example is an illustrative studio, not a customer case study. No performance figures or ranking guarantees are displayed. Production and automation files with pre-existing work were left alone.

## Scope correction
User rejected all alterations outside the hero animation. Preview index.html restored byte-for-byte from solutions/index.html. It now uses the original page markup, content, layout, styles and scripts; none of the experimental scene or copy scripts are loaded. Production files were not modified during this restoration. Any future exploration must replace only the animation inside .solutions-hero-signal and preserve all surrounding page content and styling.

## Animation-only comparison
Five options now live inside the existing .solutions-hero-signal container: Recorrido, Ventanas con profundidad, Web que convierte, Mecanismo de oportunidades and Historia editorial. The preview retains the original Solutions markup; only two preview stylesheets and the comparison controls/script were added. A source comparison removing those additions confirmed exact equality with solutions/index.html. All animation CSS is scoped beneath .solutions-hero-signal; JS does not edit hero copy, CTA links or surrounding sections. Production Solutions has no Git diff. Finite WAAPI sequences, reduced-motion final states and visibility pausing are implemented. No dependency added.

## Option 2 refinement
Replaced overlapping floating windows with three separate depth windows and a permanent numbered spine: 01 Found, 02 Contacted, 03 Handled better. Original service labels and step descriptions retained within the animation. Removed the decorative chart; each stage now demonstrates a search result, enquiry receipt or follow-up handoff. Six-second finite activation sequence with connectors between stages; all step titles remain visible throughout. Changes restricted to preview animation JS/CSS and their cache version in preview HTML. Browser checks at 1280px and 390px confirmed no card overlap and no horizontal overflow; console error/warning log empty. Hero copy and CTA links preserved. Screenshot: option2-flow-desktop.png.
