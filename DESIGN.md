---
version: alpha
name: Tinapay Plum Editorial
description: Personal portfolio of a front-end developer — projects shown as real, working sites, wrapped in a quiet editorial page that lets the work be the loudest thing on screen.

colors:
  primary: "#3D1426"
  secondary: "#7A4459"
  tertiary: "#C48A9B"
  neutral: "#ECE5DA"
  neutral-2: "#E2D9CB"
  neutral-3: "#D8CDBC"
  on-surface: "#2A161F"
  on-surface-article: "#3B2A32"
  muted: "#5F4B54"
  on-dark-muted: "rgba(236, 229, 218, 0.72)"
  on-dark-faint: "rgba(236, 229, 218, 0.35)"
  line: "rgba(61, 20, 38, 0.18)"
  line-light: "rgba(236, 229, 218, 0.22)"
  header: "rgba(236, 229, 218, 0.86)"
  canvas: "#FFFFFF"
  ok: "#3F8F5A"
  error: "#A3324F"

typography:
  wordmark-hero:
    fontFamily: Bodoni Moda
    fontSize: 17.5rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.02em
  wordmark-stack:
    fontFamily: Bodoni Moda
    fontSize: 6.6rem
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: -0.01em
  brand:
    fontFamily: Bodoni Moda
    fontSize: 1.125rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.14em
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 9.5rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.04em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 6.6rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 4.2rem
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: -0.035em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.2rem
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.025em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.025em
  body-lg:
    fontFamily: Manrope
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Manrope
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.7
  link:
    fontFamily: Manrope
    fontSize: 1rem
    fontWeight: 500
    lineHeight: 1.7
  body-sm:
    fontFamily: Manrope
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: Manrope
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.9
    letterSpacing: 0.2em
  label-xs:
    fontFamily: Manrope
    fontSize: 0.6875rem
    fontWeight: 500
    lineHeight: 1.9
    letterSpacing: 0.2em

rounded:
  none: 0px
  code: 6px
  card: 14px
  phone: 36px
  full: 9999px

spacing:
  space-1: 4px
  space-2: 8px
  space-3: 12px
  space-4: 16px
  space-5: 24px
  space-6: 32px
  space-7: 48px
  space-8: 64px
  space-9: 96px
  gutter: 64px
  col-gap-tight: 64px
  col-gap: 80px
  col-gap-wide: 96px
  max-width: 1440px

components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  page-tint:
    backgroundColor: "{colors.neutral-2}"
    textColor: "{colors.on-surface}"
  section-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
  section-dark-body:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-dark-muted}"
    typography: "{typography.body-lg}"
  section-dark-meta:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-3}"
    typography: "{typography.body-sm}"
  header:
    backgroundColor: "{colors.header}"
    textColor: "{colors.on-surface}"
  brand-mark:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.brand}"
  lead:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.muted}"
    typography: "{typography.body-lg}"
  article-body:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface-article}"
    typography: "{typography.body-md}"
  category-label:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.label-xs}"
  caption:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-caps}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: "{spacing.space-4}"
  button-primary-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  button-on-dark:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
  button-on-dark-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
  button-sm:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: "{spacing.space-3}"
  text-link:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.link}"
  text-link-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.space-3}"
  input-label:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.muted}"
  input-error:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.error}"
  live-preview:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.muted}"
    rounded: "{rounded.card}"
  live-preview-canvas:
    backgroundColor: "{colors.canvas}"
  live-preview-phone:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.phone}"
  live-clip:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.phone}"
    padding: "{spacing.space-2}"
  live-clip-toggle:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
  live-clip-toggle-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  brand-also:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  brand-pick:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-md}"
  brand-pick-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  code:
    backgroundColor: "{colors.neutral-2}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.code}"
  case-card:
    backgroundColor: "{colors.neutral-2}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.space-5}"
  code-block:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.code}"
    padding: "{spacing.space-5}"
  status-dot:
    backgroundColor: "{colors.ok}"
    size: 8px
  shape-accent:
    backgroundColor: "{colors.tertiary}"
    size: 12px
  divider:
    backgroundColor: "{colors.line}"
    height: 1px
  divider-on-dark:
    backgroundColor: "{colors.line-light}"
    height: 1px
  outline-on-dark:
    backgroundColor: "{colors.on-dark-faint}"
    height: 1.5px
---

# Tinapay Plum Editorial

## Overview

This is a developer's portfolio, and its job is to get out of the way of the work. Every project is shown as the **real, working site** inside a browser frame, so the page around it is deliberately quiet: cream paper, one deep plum, and type doing all the emphasis. A visitor — usually a recruiter or a client skimming between tabs — should feel in the first second that this person is *careful*: nothing extra, everything aligned, and the work is the loudest thing on the screen.

The direction is **Plum Editorial**: magazine-style restraint (big confident headlines, generous space, hairline rules, uppercase captions) in a single warm plum on paper. Personality comes from two editorial gestures only — the Bodoni Moda **TINAPAY** wordmark and the scrolling word stack — and from thin floating shapes around headings.

**What it gives up:** color and decoration. There is one accent, used as ink and as full dark sections, never as a highlight color sprinkled around. Project sites bring all the color; the portfolio stays neutral so each project's own design reads clearly next to it. Also given up: anything that looks clickable but isn't. Only links and buttons react to hover.

Principles carried over from the original design notes:

- **Every element earns its place.** No section numbers, no labels that repeat a heading, no extra calls to action.
- **Hierarchy through type.** Title first, one short line second, quiet details last.
- **Honest UI.** Only links and buttons react to hover.
- **Decoration with meaning.** Shapes and wordmarks support the content; they never replace it.
- **Readable first.** Sans-serif for all reading text. The Bodoni serif is only for wordmarks.

## Colors

One plum, one paper, and the inks between them.

- **Primary — deep plum.** The only accent. It is the button fill, the color of full dark sections, the italic emphasis in headlines and the hover color for links. It is dark enough (about 12.7:1 on cream) to work as ink, which is why it can carry both jobs.
- **Neutral, neutral-2, neutral-3 — cream paper in three shades.** The page, tinted sections and code blocks, then soft fills and meta text on plum. Never pure white.
- **On-surface — plum-black ink.** Main text. It is plum pushed almost to black rather than a neutral grey, so the whole page stays in one hue family.
- **On-surface-article** — a slightly softer ink for long articles, to reduce glare over many paragraphs.
- **Muted** — secondary text: leads, dates, descriptions. It is the lowest-contrast text pair (about 4.5:1 on cream), so it is never used below body-sm size.
- **Secondary — dusty plum.** Small category labels and shape outlines: a quieter step of the accent for things that should be noticed last. It is set dark enough to pass 4.5:1 on both cream (6.0:1) and the tinted cream-2 sections (5.4:1), because its labels are small.
- **Tertiary — rose.** Accent shapes only. Never text, never a button.
- **On-dark-muted / on-dark-faint** — cream at 72% and 35% for body text and outlines inside plum sections.
- **Line / line-light** — hairline dividers on light and dark grounds.
- **Header** — cream at 86% behind a blur, so the fixed header reads as frosted paper over content.
- **Canvas — white.** The only pure white on the site, and only inside the live preview frame, because that is the default background of the sites being previewed, not part of this design.
- **Ok / error** — a muted green status dot ("Open to internships") and a plum-leaning red for form errors, so neither breaks the warm palette.

## Typography

Three faces, each with exactly one job.

- **Bodoni Moda** (open source, Google Fonts) — the wordmark voice. Only the **TINAPAY** brand in the header, the giant hero and footer wordmarks, and the word stack. High contrast and wide tracking at small sizes, slightly negative tracking at large ones.
- **Plus Jakarta Sans** (open source) — headings. Weight 500 throughout, with negative tracking that tightens as size grows (−0.025em on card and row titles up to −0.04em on page titles) so big lines hold together. Italic Plus Jakarta Sans in plum is the emphasis inside headlines.
- **Manrope** (open source) — all reading text, labels and links. Generous line height (1.7 for body, 1.75 for leads) because the page is read in short bursts and should feel airy.

**Sizes are fluid.** The tokens record each level's largest size; in CSS most levels are `clamp()` values that scale with the viewport (`--fs-4xl` runs 3.4–9.5rem, `--fs-2xl` 2.2–4.2rem). The CSS names map as: `display` = `--fs-4xl`, `headline-xl` = `--fs-3xl`, `headline-lg` = `--fs-2xl`, `headline-md` = `--fs-xl`, `headline-sm` = `--fs-lg`, `body-lg` = `--fs-md`, `body-md` = `--fs-base`, `body-sm` = `--fs-sm`, `label-caps` = `--fs-xs`, `label-xs` = `--fs-2xs`.

Uppercase appears only in labels, captions and main button labels, always tracked at 0.2em. Weights are 400 for reading text, 500 for headings, links and labels, plus 600 for bold inside articles. The hero and footer wordmarks are sized to fit the screen width rather than following the scale. Reading text is held to about 30–34em.

## Layout

A centered column up to 1440px with a fluid gutter, `clamp(16px, 4.4vw, 64px)` (`gutter` is its maximum). Spacing sits on a **4px base** (`space-1` to `space-9`: 4, 8, 12, 16, 24, 32, 48, 64, 96); section padding uses fluid `clamp()` values on top of it. Space **between side-by-side columns** comes from three fluid tokens only (values are their maximums): `col-gap-tight` (compact index rows and the project slider), `col-gap` (the default, heading next to text) and `col-gap-wide` (big two-column splits like contact, features and live hosting). Pick one of the three instead of writing a new `clamp()`. No inline `style` attributes for spacing; give the element a class (for example `.section-flush`, a section with no top padding because the page hero above already gives the space).

Project entries alternate image left and image right down the Projects page, so a long list doesn't become a uniform grid. Light and plum sections alternate to give the scroll a rhythm. Two breakpoints: 960px narrows multi-column layouts and 720px goes to a single column, swaps the nav for a MENU button, and hides floating shapes that would touch text.

## Elevation & Depth

The page is flat paper; depth is reserved for the **work**. Only the live preview has a shadow, because it is a real window sitting on the page:

- **shadow-deep** `0 50px 90px -50px` plum-black at 55% — the desktop preview window.
- **shadow-soft** `0 40px 60px -30px` plum-black at 60% — the phone frame, which also gets a 10px plum bezel, and the live hosting clip, which is real footage in the same plum bezel.

Both shadows are tinted with the plum-black ink, not neutral black, and fall straight down. Everything else separates with hairline rules (`line`, `line-light`), tinted sections or a plum section, never a shadow. The fixed header uses a 14px backdrop blur over 86% cream once the page scrolls.

## Shapes

- **Pill (`full`)** — buttons, the Desktop/Mobile switch and anything else you press.
- **Card (`card`, 14px)** — the live preview window. It is the only rounded rectangle at this size, which marks it as "a different thing": someone else's site.
- **Phone (`phone`, 36px)** — the mobile preview's screen inside its plum bezel.
- **Code (`code`, 6px)** — inline code and code blocks in articles. All code shares this one small radius, so the 14px card shape stays unique to live previews.
- **None** — form inputs, which are a single bottom line, and the tinted "Key decisions" cards on case studies, which stay square like paper.

Decorative shapes are 1.5px outlines: rings, rotated squares and small filled dots, in dusty plum, rose on light sections or faint cream on plum. Borders elsewhere are always 1px hairlines.

## Components

**Button (`.btn`, `button-primary`).** The one main action in a spot. A plum pill with an uppercase caption label (`.btn cap`) that **clears to an outline on hover** — the fill disappears and the text turns plum — while the gap to the arrow widens. On plum sections it inverts (`button-on-dark`). Use `.btn-sm` (`button-sm`, sentence case) inside project entries. Never two solid buttons side by side.

**Text link (`.text-link`).** Every secondary action. Sentence case, weight 500, with an underline that grows from the left on hover and an arrow that nudges. Use → for pages on this site and ↗ for other sites.

**Inline link (inside a paragraph).** A link in running text, like the sources under a case study section. Always underlined (1px, 3px offset, thicker on hover) in plum, cream on dark, because there’s no arrow or button shape to show it’s clickable.

**Header.** The TINAPAY wordmark left, nav links center, a MENU button on phones. The current page is underlined (`aria-current="page"`). It gains the frosted background and a hairline after scrolling.

**Live preview (`.live`).** A real website in a browser frame, rendered at desktop width and scaled down, with a Desktop/Mobile switch. Each site loads only when someone clicks (or taps) its cover; until then the frame shows a poster image. Never auto-load previews: each one is a whole website, and several running at once made scrolling lag. Previews are never animated with `clip-path` or anything else that forces a repaint of the frame.

**Form field (`.field`, `input`).** No box: a hairline under the input, a label that floats up on focus, and a plum line that grows across on focus. Invalid fields turn the line and label `error`, show a short message linked with `aria-describedby`, and clear as the visitor types.

**Live hosting (`.hosting`, About page).** The brands I've hosted as a list next to one phone (`live-clip`): a plum bezel with 36px corners in the recording's own tall shape (360:780), showing the whole screen, live app and comments included. Brands with media are buttons (`brand-pick`, ink, plum on hover); choosing one switches the phone to that brand's 8-second clip or, when there is no recording, one screenshot, and moves the plum "On screen" mark (`aria-pressed`). Each whole row is the button, so the target is the full row height, not just the text. Brands without media are not in the list; they go in one quiet line under it (`brand-also`, "Also hosted …"), so every row in the list does something. On phones the phone sits above the list, so choosing a brand scrolls the phone into view. Clips are muted, loop, play only while the phone is on screen and never autoplay with reduced motion; the Pause/Play pill (`live-clip-toggle`) sits under the phone, above the caption, and hides when a screenshot is showing. The caption names the brand and is announced politely to screen readers. One piece per brand only: clips about 8 seconds and under 1MB, screenshots about 500px wide.

**Project entry (`.feature`).** Category label (`category-label`), title, one short line, up to four tools, then one small button and plain text links.

**Word stack and floating shapes.** Four words in Bodoni Moda; the filled, italic one follows the scroll, the rest are outlined. Shapes drift slowly around section headings. Shapes are switched off on articles and case studies, so reading pages stay calm.

**Recruiter actions (`.hero-actions`).** The home hero and the Contact hero each end with the two things a recruiter came for: one solid `button-sm` (View projects, or Email me) and one `text-link` (Download résumé, straight to the PDF). The home hero also states availability with the status dot ("Open to internships from January 2027"). On the home hero the pair stacks vertically, so the link never lands on the plum plinth behind the portrait; on phones the whole block sits above the wordmark and portrait.

**Home project slider (`.works`).** Three featured projects only, each with a one-sentence summary (what it is and what I did) and direct links: Case study → when one exists, Live site ↗ and Code ↗. The tech stack is left to the Projects page, so the text under each preview fits while the slider is pinned. Everything else lives on the Projects page, named in the closing slide.

**Article (`.post`).** Text held to 34em (about 65–75 characters a line) in `on-surface-article` ink. Code blocks (`code-block`) are plum boxes with cream text and horizontal scroll. A live preview may sit inside an article at full column width, followed by a short `body-sm` caption in `muted`.

**Résumé page.** `resume.html` is a standalone, printable A4 sheet with its own inline styles; it does not load `styles.css`. It repeats the core tokens (cream, plum, ink, muted, line) by value, so when a token changes, update that page's `:root` too. Its toolbar button follows the uppercase `.btn` style.

**Focus.** A 1.5px plum outline, 4px off the element; cream inside plum sections.

**Touch targets.** On touch screens, small text links (footer links, back links, the case study Live and Code links) get invisible vertical padding, offset by a negative margin, so each tap area is about 44px tall without moving the layout.

**Motion.** One easing for everything, `cubic-bezier(0.2, 0.7, 0.1, 1)`, with three durations: 0.3s for color, 0.45s for movement, 0.8s for larger reveals. Scrolling is native: no smooth-scroll library, so the page follows the wheel instantly. Animate only `transform` and `opacity`, which the browser can hand to the graphics card. Scroll-linked scenes follow the scroll exactly (`scrub: true`) with no catch-up delay, and slides in the pinned project slider glide in straight, without tilting or zooming. Pinning, parallax and floating shapes are all switched off with `prefers-reduced-motion`. **Not animated:** body text, project descriptions and the content inside live previews.

## Do's and Don'ts

- Do keep plum the only accent. Don't introduce a second brand color; a project's own colors belong inside its live preview, not around it.
- Do use Bodoni Moda only for the TINAPAY wordmarks and the word stack. Don't set headings or text in it.
- Do use one `.btn` per spot and make every other action a `.text-link`. Don't put two solid buttons side by side, and don't use uppercase, letter-spaced links.
- Don't make anything react to hover unless it is a link or a button.
- Do reserve shadows for the live preview. Don't shadow cards, sections or buttons; separate them with a hairline or a tinted section.
- Do keep muted text at body-sm size or larger; it is already at the AA limit.
- Don't add section numbers, labels that repeat a heading, or a second call to action.
- Do use rose only for decorative shapes. Don't use it for text or fills you can click.
- Do set uppercase only on labels, captions and main `.btn` labels, at 0.2em tracking.
- Do give every new animation a `prefers-reduced-motion` fallback, and never animate reading text.
