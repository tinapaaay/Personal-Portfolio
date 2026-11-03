# Leemo Cocktails

A responsive cocktail bar landing page with a cream-paper background, blue typography, citrus artwork, and scroll-driven animation. The page introduces Leemo, presents six drinks, explains the preparation ritual, and displays visiting information.

## Features

- Opening counter that follows real image and font loading, then layered hero artwork with a **Book a table** button
- Fixed navigation linking to Menu, Ritual, Visit, and Book, plus a scroll progress line
- A floating **Book a table** button between the hero and the booking form (hidden over the menu)
- Two scrolling marquees and a word-by-word manifesto reveal
- **Tonight's pour**: a pinned showcase that steps through the six drinks with a name reel, counter, and color change
- Six cocktail cards with images, ingredient measures, ABV, serving style, prices, and a **View** hint
- A pinned menu that moves horizontally as the visitor scrolls vertically
- A full-screen drink dialog opened from any card (Previous/Next, arrow keys, Esc, focus trap)
- Four stacking ritual panels: Muddle, Squeeze, Shake, and Garnish
- **Let the lemon pick**: a three-question quiz that recommends a drink
- Opening hours, address, call-ahead information, and a booking form that knows the opening hours (demo only)
- Pointer effects including card tilt, hero parallax, magnetic buttons, and a "View" cursor
- A mobile layout at 760px and below, plus reduced-motion handling

## Built with

- HTML, CSS, and vanilla JavaScript in one `index.html`
- GSAP 3.12.5 and ScrollTrigger 3.12.5, loaded from cdnjs
- Lenis 1.1.13, loaded from unpkg
- Instrument Serif and Lora, loaded from Google Fonts
- Six local PNG images and inline SVG lemon artwork

## Run locally

No package installation or build step is needed. Open the project folder with VS Code Live Server, or run this command from the `leemo-cocktails` folder if Python 3 is installed:

```sh
python3 -m http.server 5500
```

Visit [localhost:5500](http://localhost:5500). Stop the server with Ctrl+C. Internet access is needed for the hosted fonts and animation libraries.

## Project structure

```text
leemo-cocktails/
├── index.html          # Markup, styles, drink data, rendering, and motion
├── img/
│   ├── 1.png           # Leemo Sunset and hero image
│   ├── 2.png           # Burnt Orange Sour
│   ├── 3.png           # Cucumber Martini
│   ├── 4.png           # Mission Paloma
│   ├── 5.png           # Midnight Old Fashioned
│   └── 6.png           # Blue Hour
└── README.md
```

## Edit the content

Change the `drinks` array in the final script to update cocktail names, image paths, card colors, ABV labels, serving styles, prices, or ingredient measures. Cards are generated in array order before `.menu-end`; their numbering updates automatically. Ingredient entries are `[name, measure]` pairs. Prices render with a dollar sign.

Edit the HTML for the manifesto, menu season, ritual, opening hours, address, and contact details. The `@media (max-width:760px)` block controls the mobile layout. Animation code follows the `motion` comment in the final script.

## Design tokens

All shared values live in `:root` at the top of the stylesheet. Change them there rather than in individual rules.

| Group | Tokens | Notes |
|---|---|---|
| Color | `--paper`, `--paper-2`, `--ink`, `--ink-deep`, `--ink-night`, `--lemon`, `--rind`, `--leaf`, `--shade`, `--error` | Drink colors stay in the `drinks` array as content. The select arrow in the booking form is a data URI and repeats `--ink` as `%231b3a9b`. |
| Focus | `--focus` | Defaults to `--ink`. Dark sections (marquee, loader, quiz) set it to `--paper`; the quiz result card sets it back to `--ink-deep`. Set it on any new dark section. |
| Display type | `--fs-d1` … `--fs-d5`, `--fs-statement` | d1 section titles, d2 step/Visit/dialog titles, d3 quiz and booking titles, d4 card titles, d5 counters and confirmation. Poster-sized art type (hero lines, loader count, step numbers, marquee, footer wordmark, pour names) keeps its own sizes. |
| Text | `--fs-lg`, `--fs-body`, `--fs-ui`, `--fs-sm`, `--fs-label`, `--ls-label` | Every small uppercase label shares one rule (`.label` and its aliases). |
| Shape | `--r-panel` (6px), `--r-pill` | |
| Elevation | `--shadow-1` … `--shadow-3`, `--shadow-float` | One warm tint, light from the top right. Use as `filter:` on cut-out drink images; `--shadow-float` is a `box-shadow`. |
| Layers | `--z-header`, `--z-progress`, `--z-fab`, `--z-loader`, `--z-dialog`, `--z-grain`, `--z-cursor` | Small local stacking (0–5) inside sections stays literal. |
| Motion | `--ease-out`, `--ease-in-out`, `--dur-1` … `--dur-3` | GSAP uses the matching `EASE` constants at the top of the script. |

### Button states

`.btn` has default, hover (darker ink, arrow nudges right), pressed (`--ink-night`), disabled (`:disabled` or `aria-disabled="true"`), loading (`.is-loading` with `aria-busy="true"`; the arrow pulses), and keyboard focus. `.chip` has default, hover, pressed, disabled, and focus. The booking button shows the loading state briefly before its confirmation.

Drink content is inserted using HTML template strings. Keep it as trusted project content; sanitize it before connecting an external content source.

## Deploy

Upload `index.html` and the complete `img/` folder to a static web host, keeping the same relative paths and filename case. There is no backend, database, build output, or environment-variable configuration. Check that the host permits the external script and font origins, then run the manual checks below on the deployed URL.

## Current scope and limitations

This is a presentation site. **Book a table** opens the booking section. The form validates a name, date, and available time locally, then shows a demo confirmation; nothing is sent or reserved. There is no ordering, payment, login, or application data storage. The phone number is displayed as text rather than a clickable call link.

JavaScript generates the cocktail cards and artwork. With scripting disabled, the static sections remain but the cards and generated artwork are absent. Reduced motion skips the animation setup and allows horizontal menu scrolling. If GSAP or ScrollTrigger fails to load with reduced motion off, the script removes the loader styling, but the menu does not receive that reduced-motion scrolling rule; access to later cards needs review.

The menu currently says “Autumn list · 2026.” Confirm the menu, prices, business information, image permissions, and the general ritual copy against the individual drink recipes before using the page for a real business. No license file is included in this project.

## Maintenance and scope

The page is a static presentation with inline CSS, drink data, rendering, and motion in `index.html`, plus six local drink images in `img/`. GSAP/ScrollTrigger, Lenis, and Google Fonts load externally. Edit the `drinks` array for menu cards and the HTML for business information. Review all business details before production use.

The current version also includes a drink-selection quiz and booking UI; these are frontend interactions. There is no reservation API, ordering backend, payment processing, or account system. Keep data used in HTML templates trusted.

For local development, run `python3 -m http.server 5500` from this folder and open [localhost:5500](http://localhost:5500). Deploy the HTML and complete `img/` folder together.

Before release, check menu scrolling, quiz outcomes, booking feedback, keyboard access, phone width, reduced motion, missing-CDN behavior, and image loading on the deployed URL. This checklist does not imply those checks have already passed.
