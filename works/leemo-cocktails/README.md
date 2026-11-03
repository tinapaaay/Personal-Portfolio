# Leemo Cocktails

A responsive cocktail bar landing page with a cream-paper background, blue typography, citrus artwork, and scroll-driven animation. The page introduces Leemo, presents six drinks, explains the preparation ritual, and displays visiting information.

## Features

- Animated opening counter and layered hero artwork
- Fixed navigation linking to Menu, Ritual, and Visit
- Two scrolling marquees and a word-by-word manifesto reveal
- Six cocktail cards with images, ingredient measures, ABV, serving style, and prices
- A pinned menu that moves horizontally as the visitor scrolls vertically
- Four stacking ritual panels: Muddle, Squeeze, Shake, and Garnish
- Opening hours, address, and call-ahead information
- Pointer effects including card tilt, hero parallax, a magnetic button, and an ABV cursor
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
├── README.md
├── TESTING.md
└── docs/
    ├── requirements.md
    └── app-flow.md
```

## Edit the content

Change the `drinks` array in the final script to update cocktail names, image paths, card colors, ABV labels, serving styles, prices, or ingredient measures. Cards are generated in array order before `.menu-end`; their numbering updates automatically. Ingredient entries are `[name, measure]` pairs. Prices render with a dollar sign.

Edit the HTML for the manifesto, menu season, ritual, opening hours, address, and contact details. Change the `:root` CSS variables for the palette, font stacks, and page gutter. The `@media (max-width:760px)` block controls the mobile layout. Animation code follows the `motion` comment in the final script.

Drink content is inserted using HTML template strings. Keep it as trusted project content; sanitize it before connecting an external content source.

## Deploy

Upload `index.html` and the complete `img/` folder to a static web host, keeping the same relative paths and filename case. There is no backend, database, build output, or environment-variable configuration. Check that the host permits the external script and font origins, then use [the testing checklist](TESTING.md) on the deployed URL.

## Current scope and limitations

This is a presentation site. **Book a table** scrolls to Visit; it does not submit a reservation. There is no ordering, payment, login, or application data storage. The phone number is displayed as text rather than a clickable call link.

JavaScript generates the cocktail cards and artwork. With scripting disabled, the static sections remain but the cards and generated artwork are absent. Reduced motion skips the animation setup and allows horizontal menu scrolling. If GSAP or ScrollTrigger fails to load with reduced motion off, the script removes the loader styling, but the menu does not receive that reduced-motion scrolling rule; access to later cards needs review.

The menu currently says “Spring list · 2024.” Confirm the menu, prices, business information, image permissions, and the general ritual copy against the individual drink recipes before using the page for a real business. No license file is included in this project.

## Documentation

- [Technical requirements and implementation](docs/requirements.md)
- [Page and interaction flow](docs/app-flow.md)
- [Manual testing checklist](TESTING.md)
