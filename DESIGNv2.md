---
version: alpha
name: Ranking Rebels
description: Bold local SEO agency identity for Google visibility, local search, and WhatsApp-led enquiries across Australia and Europe.
colors:
  primary: "#050609"
  secondary: "#94A3B8"
  tertiary: "#FF304F"
  accent: "#FF8A00"
  highlight: "#FFB000"
  neutral: "#F8FAFC"
  surface: "#12050B"
  surface-card: "#1A0A12"
  on-primary: "#F8FAFC"
  on-tertiary: "#050609"
  border: "#2A1A22"
typography:
  headline-display:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.08em"
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.06em"
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.12em"
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  section: 96px
  container-max: 1200px
  gutter: 24px
rounded:
  sm: 8px
  md: 14px
  lg: 24px
  xl: 32px
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 16px
  button-secondary:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 16px
  card-dark:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  badge:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.tertiary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 8px
---

# DESIGN.md — Ranking Rebels

## Overview

Ranking Rebels is a bold local SEO agency for businesses that want to be found in Google when customers are ready to buy.

The interface should feel like a challenger brand: dark, sharp, energetic, and direct. It should communicate search momentum, local dominance, and fast enquiry capture without sounding like a scam or promising guaranteed rankings.

Primary positioning:

> Stop ranking politely.

Service focus:

- Local SEO.
- Website positioning.
- Google Business Profile optimization.
- SEO-ready websites and landing pages.
- Content that supports local discovery.
- WhatsApp enquiry capture and follow-up.

Markets served:

- Australia: Melbourne, Sydney, Brisbane, Gold Coast.
- Europe: Amsterdam, Rotterdam, Utrecht, London, Madrid, Barcelona, Milano, Munich, Zurich.

Core user journey:

1. Visitor searches for a local service.
2. Ranking Rebels explains how visibility is won.
3. Visitor sees clear services, process, proof, and plans.
4. Visitor contacts through WhatsApp or an audit CTA.
5. Onboarding moves through Start, Build, and Grow.

The brand should be rebellious in tone, but disciplined in execution.

## Colors

The palette is dark, high-contrast, and action-oriented.

- **Primary (#050609):** Main rebel black for backgrounds, headers, and brand depth.
- **Surface (#12050B):** Deep red-black used for hero sections and page backgrounds.
- **Surface Card (#1A0A12):** Raised card surface for service cards, proof blocks, and pricing.
- **Tertiary (#FF304F):** Signal red used for primary CTAs, active states, ranking arrows, and key emphasis.
- **Accent (#FF8A00):** Momentum orange used for highlights, progress, city markers, and secondary emphasis.
- **Highlight (#FFB000):** Warm gold used sparingly for proof, wins, and “recommended” badges.
- **Neutral (#F8FAFC):** Main light text on dark backgrounds.
- **Secondary (#94A3B8):** Muted text, captions, helper copy, and metadata.
- **Border (#2A1A22):** Subtle dividers and card outlines.

Use red for the most important action only. Use orange/gold to suggest movement, not decoration.

## Typography

Typography should be loud at the headline level and calm at the reading level.

- **Display headlines:** Huge, compressed-feeling, uppercase or near-uppercase, with tight tracking.
- **Section headlines:** Bold, short, and direct.
- **Body copy:** Clear, plain-English, and practical.
- **Labels:** Use JetBrains Mono or a similar mono font for SEO metrics, ranking positions, city labels, and process tags.

Headline examples:

- Stop ranking politely.
- Get organic leads.
- Marketing campaigns that convert.
- Win your city.
- SEO with teeth.
- Google to WhatsApp to sale.

Avoid long, corporate headlines. Each page should have one dominant message.

## Layout

Use a fixed max-width desktop container with responsive mobile stacking.

Layout rules:

- Max content width: 1200px.
- Use generous section spacing.
- Start each key page with a strong hero and one clear CTA.
- Prefer two-column hero layouts: copy on the left, search/ranking/lead-flow visual on the right.
- Use card grids for services, benefits, pricing, and proof.
- Use timeline layouts for process and onboarding.
- Use sticky or persistent navigation only if it does not block content on mobile.
- Mobile layout must stack cleanly with CTA buttons visible without crowding.

Recommended page structure:

- Home.
- Services / SEO Positioning.
- Benefits.
- Process.
- Onboarding.
- Proof / Case Studies.
- FAQ.
- Plans.
- Contact / WhatsApp CTA.

Recommended local page pattern:

- `/locations/australia/melbourne/`
- `/locations/australia/sydney/`
- `/locations/australia/brisbane/`
- `/locations/australia/gold-coast/`
- `/locations/europe/amsterdam/`
- `/locations/europe/rotterdam/`
- `/locations/europe/utrecht/`
- `/locations/europe/london/`
- `/locations/europe/madrid/`
- `/locations/europe/barcelona/`
- `/locations/europe/milano/`
- `/locations/europe/munich/`
- `/locations/europe/zurich/`

## Elevation & Depth

Depth should come from dark tonal layers, borders, glow, and contrast.

Use:

- Dark background layers.
- Thin borders on cards.
- Subtle red or orange glow for active/high-value elements.
- Light shadows only on floating cards, modals, or hero visuals.

Avoid:

- Heavy generic drop shadows.
- Flat white-card SaaS styling.
- Too many glow effects on one screen.

The UI should feel premium and intense, not noisy.

## Shapes

Ranking Rebels should use rounded geometric shapes with a slightly aggressive edge.

- Buttons: full pill radius.
- Cards: large rounded corners.
- Logo mark: tilted rounded square with an upward arrow.
- Badges: pill shape.
- Search-result cards: medium rounded corners.
- Timeline numbers: square or rounded-square blocks.

Do not mix too many shape styles. Use rounded cards and sharp typography for contrast.

## Components

### Logo

Use an `RankingRebels` mark inside a tilted rounded square with a small upward arrow. The mark should suggest ranking movement and search momentum.

Logo usage:

- Full logo in header.
- Mark alone for favicon, social avatar, and compact mobile states.
- “Rebels” may use Signal Red for emphasis.

### Buttons

Primary buttons should be red with dark text.

Primary CTA examples:

- Grow my business.
- Start the audit.
- Find my ranking blockers.
- Check my city visibility.

Secondary buttons should be dark with light text and a subtle border.

### Hero

Every hero should include:

- Small label explaining the offer or market.
- One strong headline.
- One practical subheadline.
- Primary CTA.
- Secondary CTA only when useful.
- Visual proof element: search result, lead flow, ranking card, or city visibility panel.

### Search Result Card

Use to simulate Google/local visibility without pretending it is a real result unless it is verified.

Required elements:

- Search query.
- Ranked result block.
- Local intent label.
- Lead-flow path, such as Google -> Website/Profile -> WhatsApp -> Sale.

### Service Cards

Service cards should use:

- Number label.
- Short service title.
- Plain-English outcome.
- No vague agency language.

Example services:

- Local research.
- Technical SEO.
- Content that ranks.
- Google Business Profile.
- WhatsApp conversion flow.
- Monthly reporting and improvement.
- Google Marketing Campaigns optimization.

### Timeline

Use for process and onboarding.

Process language:

- Scout.
- Strike.
- Scale.

Onboarding language:

- Start.
- Build.
- Grow.

Each step should show what Ranking Rebels does and what the client needs to provide.

### Pricing / Plans

Plans should be presented as clear comparison cards.

Use:

- Plan label.
- Plan name.
- Price range.
- Best-fit description.
- Feature list.
- CTA.
- Optional “Most recommended” badge.

Avoid hiding important pricing assumptions.

### FAQ

Use native accordion/details behavior where possible. Answers should be short, honest, and non-hype.

### Proof Cards

Proof must be clearly marked if it is placeholder.

Real proof should include:

- City.
- Industry.
- Keyword or search context.
- Screenshot date.
- Metric definition.
- Permission status.

## Do's and Don'ts

### Do

- Do keep the DESIGN.md focused on visual identity and implementation guidance.
- Do use YAML tokens as the source of truth for colors, typography, spacing, radius, and components.
- Do keep the tone bold, direct, and practical.
- Do connect local SEO to business outcomes: calls, messages, bookings, and sales opportunities.
- Do design for local markets in Australia and Europe.
- Do keep WhatsApp CTAs prominent but not spammy.
- Do preserve strong contrast and readable mobile layouts.
- Do demonstrate professionalism and expertise in marketing and SEO.
- Do mark placeholders clearly until real proof is available.
- Do use the Start / Build / Grow onboarding structure.

### Don't

- Don't turn this file into a full SEO manual.
- Don't promise guaranteed rankings.
- Don't use fake Google screenshots or fake testimonials.
- Don't create separate city pages with copied text and only the city name changed.
- Don't overuse rebel language until it feels childish.
- Don't place multiple competing CTAs in the same section.
- Don't use red for every element; reserve it for action and emphasis.
- Don't hide important content behind JavaScript-only interactions.
- Don't publish pricing or proof without clear context.
