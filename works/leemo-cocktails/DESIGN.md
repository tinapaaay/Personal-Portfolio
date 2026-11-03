---
version: alpha
name: Leemo Citrus Poster
description: One-page site for Leemo, a Santa Barbara cocktail bar — a screen-printed bar poster that comes apart as you scroll, built to sell a mood and then a table.

colors:
  primary: "#1B3A9B"
  primary-deep: "#10236A"
  primary-night: "#0B1640"
  neutral: "#F1EBE0"
  neutral-sunk: "#E9E1D2"
  tertiary: "#F0C443"
  rind: "#E9A91F"
  secondary: "#2F6B3C"
  error: "#A3261B"
  rule: "color-mix(in srgb, #1B3A9B 25%, transparent)"
  tint-sunset: "#F6DCC0"
  tint-burnt-orange: "#F1DCBC"
  tint-blue-hour: "#DDE2F4"
  tint-paloma: "#F6D8D2"
  tint-cucumber: "#DFEBD3"
  tint-midnight: "#EAD0CF"

typography:
  display-xl:
    fontFamily: Instrument Serif
    fontSize: 9rem
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: 0em
  display-lg:
    fontFamily: Instrument Serif
    fontSize: 7rem
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: 0em
  statement:
    fontFamily: Instrument Serif
    fontSize: 5.6rem
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Instrument Serif
    fontSize: 4.4rem
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: 0em
  headline-md:
    fontFamily: Instrument Serif
    fontSize: 2.9rem
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: 0em
  headline-sm:
    fontFamily: Instrument Serif
    fontSize: 2.2rem
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: 0em
  body-lg:
    fontFamily: Lora
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.55
  body-md:
    fontFamily: Lora
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
  ui:
    fontFamily: Lora
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.25
  body-sm:
    fontFamily: Lora
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
  label-caps:
    fontFamily: Lora
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.1em

rounded:
  none: 0px
  panel: 6px
  full: 9999px

spacing:
  xs: 6px
  sm: 10px
  md: 16px
  lg: 24px
  xl: 44px
  gutter: 44px
  section: 160px

components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  page-sunk:
    backgroundColor: "{colors.neutral-sunk}"
    textColor: "{colors.primary}"
  band-ink:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
  band-ink-accent:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.tertiary}"
  section-title:
    textColor: "{colors.primary}"
    typography: "{typography.display-xl}"
  label:
    textColor: "{colors.primary}"
    typography: "{typography.label-caps}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.ui}"
    rounded: "{rounded.full}"
    padding: 14px
    height: 47px
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.neutral}"
  button-primary-active:
    backgroundColor: "{colors.primary-night}"
    textColor: "{colors.neutral}"
  chip:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary-deep}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm}"
  chip-hover:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.neutral}"
  chip-on-ink:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.full}"
  chip-on-ink-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.none}"
    padding: 8px
  input-error:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.error}"
  divider:
    backgroundColor: "{colors.rule}"
    height: 1px
  progress:
    backgroundColor: "{colors.rind}"
    height: 3px
  step-ink:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.panel}"
    padding: "{spacing.xl}"
  step-lemon:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.panel}"
  step-mint:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.panel}"
  step-paper:
    backgroundColor: "{colors.neutral-sunk}"
    textColor: "{colors.primary}"
    rounded: "{rounded.panel}"
  card-sunset:
    backgroundColor: "{colors.tint-sunset}"
    textColor: "{colors.primary-deep}"
    typography: "{typography.headline-md}"
    rounded: "{rounded.panel}"
    padding: 22px
  card-burnt-orange:
    backgroundColor: "{colors.tint-burnt-orange}"
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.panel}"
  card-blue-hour:
    backgroundColor: "{colors.tint-blue-hour}"
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.panel}"
  card-paloma:
    backgroundColor: "{colors.tint-paloma}"
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.panel}"
  card-cucumber:
    backgroundColor: "{colors.tint-cucumber}"
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.panel}"
  card-midnight:
    backgroundColor: "{colors.tint-midnight}"
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.panel}"
---

# Leemo Citrus Poster

## Overview

Leemo is a cocktail bar on State Street that squeezes every lemon to order. The site is the bar's printed poster — cream stock, one blue ink, a lemon wheel — taken apart by the scroll. Someone landing on it should feel, in the first second, *thirsty and a little charmed*: this is a place that cares about one drink at a time.

The direction is **Editorial Print crossed with a screen-printed bar poster**. From editorial print it takes the paper ground, a single deep ink, a high-contrast display serif set very large, and color used in full-bleed *fields* (the ink marquee, the lemon and mint ritual panels, each drink's tint) rather than as small highlights. From the poster it takes the gesture: type big enough to be the picture, and photographed drinks cut out and sitting *on* the paper with a cast shadow.

**What it gives up:** density and speed. The page is long, scroll-driven and unhurried; it sells a mood first and a table second. It also gives up grey: there is no secondary text color, so hierarchy comes only from size, case and space. That is a deliberate constraint — if a screen needs fine gradations of importance, it does not belong in this system.

The site is used once, on a phone, often already half out the door. Every section must still answer "what is this place and how do I get a table" without the motion.

## Colors

Everything is printed in one ink on one stock, plus the citrus.

- **Primary (#1B3A9B) — poster ink.** The ultramarine of the original Leemo poster, the blue a screen printer would mix for a single-color run. It is *all* the text and *all* the interaction on light grounds. Using one color for both is the sacrifice above: nothing is ever grey.
- **Primary deep (#10236A) and primary night (#0B1640) — the same ink, heavier.** Deep is text on colored tints (drink cards, dialogs, the lemon panel) and the hover state; night is the pressed state and the dim layer on stacked ritual panels. They are never used as a second brand color.
- **Neutral (#F1EBE0) — uncoated poster stock.** Warm, slightly yellow, never white. **Neutral sunk (#E9E1D2)** is the same paper in shade, used for the menu and the last ritual panel.
- **Tertiary (#F0C443) — lemon flesh.** The accent. One job: emphasis *on ink*. It is the italic marquee line, the word "lemon" in the quiz title, and the second ritual panel. It never fills a button.
- **Rind (#E9A91F) — lemon zest.** A darker sibling for thin marks on paper, where lemon would vanish: only the reading-progress line.
- **Secondary (#2F6B3C) — garden mint.** The mint picked out back. A field color for the "Shake" panel only.
- **Error (#A3261B) — blood-orange rind.** The red already in the citrus family rather than a stock alert red. Used only for form messages.
- **Rule — ink at 25%.** Hairlines in recipe lists and section dividers.
- **Drink tints** (`tint-*`) are the color of each drink, pulled light. Each is a pale, warm field that keeps primary-deep text above 9:1. A new drink gets a new tint by the same rule: take the drink's dominant color, lighten until deep-ink contrast is at least 9:1, and keep it warm.

## Typography

Two serifs with different jobs. **Instrument Serif** (open source, Google Fonts) is a condensed, high-contrast display face; it only ever appears large, at weight 400, and is the poster's voice. **Lora** (open source, Google Fonts) is a calm text serif with enough body for small sizes; it carries reading text, UI and labels. They differ by width and contrast, not classification — a known compromise; the shared serif keeps the page feeling like one printed object instead of "a display face plus an app font." Fallbacks: Didot, Bodoni 72, Georgia for display; Georgia, Times New Roman for text.

**Sizes are fluid.** The tokens record each level's *largest* size; in CSS each display level is a `clamp()` that scales with the viewport (for example `display-xl` is `clamp(3.6rem, 9vw, 9rem)`). Text levels are fixed except `body-lg`, which runs 17–19px.

- **display-xl / display-lg / headline-lg / headline-md / headline-sm** — section titles, then step and dialog titles, then quiz and booking, then card titles, then counters and confirmations. Five display levels, no more.
- **statement** — the manifesto paragraph only.
- **body-lg / body-md / ui / body-sm** — notes and inputs, reading text, nav and buttons, recipe lists and chips.
- **label-caps** — every small uppercase label shares this one style. Uppercase only here.
- **Art type** — the hero "Drink Well / Live Well" lines, the loader counter, the ritual step numbers, the marquee, the footer wordmark and the pour names are sized to the viewport (`vw`/`vh`) as images, not as a scale. They are the only place display tracking goes negative (−0.015em to −0.03em).

One weight (400) throughout. Emphasis is italic Instrument Serif, never bold. Line height runs tight at display sizes (0.85–0.95) and opens to 1.55 for text. Reading text is held to 34–46ch.

## Layout

A full-bleed single column of **scenes**, each roughly one viewport tall: hero, marquee band, manifesto, pinned "Tonight's pour", horizontal menu, stacked ritual panels, the ink quiz band, visit and booking, footer wordmark. Sections alternate between paper and a color field so the scroll has a beat.

The page gutter is fluid, `clamp(16px, 3vw, 44px)` (token `gutter` is its maximum), and respects safe-area insets. Section padding runs from about 80px on phones to `section` (160px) on wide screens. Inside components, use the spacing steps (6, 10, 16, 24, 44). The current CSS has older one-off values (14, 18, 22, 28px); move them onto the steps when you touch them.

Layout is asymmetric where it can be — label in a narrow left column and text in a wide right one, headings flush left with notes pushed right. One breakpoint at 760px collapses grids to a single column and stacks the hero footer under the Book button.

## Elevation & Depth

Depth is for **objects, not interface.** Cut-out drink photos and the lemon artwork cast a shadow because they are things lying on paper; panels, cards and buttons are flat color fields and do not.

Every shadow comes from one light, top right, so it falls down and to the left, in a warm brown (`rgb(40 30 20)`) drawn from the paper rather than black:

- **shadow-1** `drop-shadow(-10px 16px 14px / .22)` — small images (menu cards)
- **shadow-2** `drop-shadow(-18px 24px 20px / .28)` — mid images (hero lemon, quiz result)
- **shadow-3** `drop-shadow(-26px 32px 28px / .3)` — hero glass, pour stage, drink dialog

The one exception is the floating Book button, which really does sit above the page: `0 10px 30px` in ink at 28%. The hero's long diagonal cast shadow is art, painted with the `--shade` green-grey from the original poster.

Layers, bottom to top: header 50, progress line 60, floating button 70, loader 80, dialog 85, paper grain 90, cursor 95. The grain is a fixed noise texture at 9% opacity over everything — it is what makes the ink look printed.

## Shapes

Three shapes, each with a meaning:

- **Pill (`full`)** — anything you press: buttons, chips, the floating Book button.
- **Panel (`panel`, 6px)** — color fields that hold content: drink cards, ritual panels, the quiz box. Just enough to read as a cut card, not a rounded app tile.
- **None (`none`)** — form inputs, which are a single 1.5px ink underline with no box, like a line on a printed form.

Circles are reserved for the lemon artwork, the cursor and the small icon rings. Borders are always 1px `currentColor` (chips, quiz box) or the `rule` hairline; never a colored border.

## Components

**Button (`button-primary`).** The one primary action per section, almost always booking. Ink pill, paper text, a right arrow that nudges 4px on hover. States: hover → primary-deep, pressed → primary-night, disabled at 45% opacity, loading pulses the arrow and sets `aria-busy`. On fine pointers it can be magnetic. It has no outer margin; the parent spaces it. A second action beside it is a chip, never another button.

**Floating Book button.** The same button fixed bottom right (bottom center on phones), shown only between the hero and the booking form and hidden over the menu, where it would cover prices. Removed from the tab order while hidden.

**Chip (`chip`, `chip-on-ink`).** Outline pill for secondary and repeated choices: quiz answers, Previous/Next, Close, Start over. On paper or tints it fills with deep ink on hover; on the ink band it fills with paper.

**Drink card (`card-*`).** A tinted panel with number and ABV on top, the cut-out photo, the name in headline-md, a hairline recipe table and the price. The whole card is a button that opens the drink dialog; a "View ⊕" mark says so on touch screens.

**Drink dialog.** Full screen in the drink's tint, opened with a circle wipe from the tap point while the photo flies in from the card. Focus is trapped; Esc closes; arrow keys step drinks.

**Ritual panel (`step-*`).** Sticky full-width panels in ink, lemon, mint and sunk paper that stack and dim as the next one arrives.

**Input (`input`, `input-error`).** Underline only, label-caps label above, body-lg value. Errors are a message in error red below the form.

**Focus.** A 2px ring in the current section's focus color, 3px off the element: ink on paper and tints, paper on the ink band. The floating button has a two-tone ring because it crosses both.

**Motion.** Lenis smooth scroll with GSAP ScrollTrigger. Two easings: `expo.out` / `cubic-bezier(.2,.8,.2,1)` for things arriving, `expo.inOut` / `cubic-bezier(.7,0,.2,1)` for wipes and swaps. Scroll-scrubbed scenes (hero coming apart, pour reel, horizontal menu, stacking panels) carry the story. **Not animated:** body text, recipe tables, prices, form fields and the visit details — they are read, not watched. Everything respects `prefers-reduced-motion`, which drops smooth scroll and the pinned scenes and lets the menu scroll sideways.

## Do's and Don'ts

- Do set every piece of text in the poster ink (or deep ink on tints). Don't introduce a grey for "secondary" text; use label-caps or a smaller size instead.
- Do keep lemon for emphasis on the ink band. Don't put lemon text on paper — it fails contrast — and don't fill a button with it.
- Don't add a second accent color. A new section gets its color from a drink tint, lemon, mint or ink, as a full-bleed field.
- Do use Instrument Serif for headings, prices and the oval wordmark. Don't use it for running text, below 20px, or in bold; it has one weight.
- Do give cast shadows only to photographed or illustrated objects, from the top right, in warm brown. Don't shadow cards, panels or buttons (the floating button is the single exception).
- Do use one `button-primary` per section, labelled with a verb ("Book a table", "See the drink"). Don't put two side by side; make the second a chip.
- Do add new drinks as data with a tint that keeps deep-ink text at 9:1 or better. Don't hand-pick a saturated card color.
- Do set the section's focus color whenever you add a dark field. Don't remove focus outlines.
- Don't animate reading content. If a new scene needs motion, scrub it to the scroll and give it a reduced-motion fallback.
- Do keep every core fact — what Leemo is, the menu, hours, address, booking — reachable with motion off.
