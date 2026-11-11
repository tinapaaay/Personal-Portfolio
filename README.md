# Personal Portfolio

A responsive multi-page personal portfolio website built with HTML and CSS.

This project is part of the [Personal Portfolio project on roadmap.sh](https://roadmap.sh/projects/portfolio-website). I converted my previous HTML-only website into a personal portfolio and used CSS to improve its layout, styling, and responsiveness.

## Pages

- Home
- About
- Projects (with two case studies)
- Articles
- Contact
- Résumé

## Features

- Plum editorial design: cream paper, one deep plum accent, Plus Jakarta Sans headlines and a Bodoni Moda wordmark. The full system is in [DESIGN.md](DESIGN.md) (Google's DESIGN.md format; check it with `npx -y @google/design.md@0.4.0 lint DESIGN.md`)
- Live project previews: each project runs inside a browser-style window (GitHub Pages), with a desktop / mobile toggle and click-to-try
- Pinned horizontal scroller of live projects on the home page
- Scroll animations with GSAP (ScrollTrigger + SplitText): letter-by-letter hero, the name spreading as you scroll, masked headline reveals, words lighting up as you read, and a plum circle that floods the screen
- Lenis smooth scrolling (native on touch and with reduced motion), with a CSS-only fallback if the libraries don't load
- Case studies for Little Feelings and CSS Casebook, and a first article on building the live previews
- Contact form that sends real messages through FormSubmit, with an email fallback
- Printable résumé page and one-page PDF download
- Share image and Open Graph tags for link previews
- Live previews load only on tap on phones and with data saver on
- Full-screen plum mobile menu and responsive layout for desktop and mobile

## Built With

- HTML5
- CSS3
- Vanilla JavaScript
- GSAP, ScrollTrigger, SplitText, and Lenis (from CDN)
- Git and GitHub

## What I Practiced

- Using Flexbox for layouts and navigation
- Creating responsive designs with media queries
- Styling forms, cards, links, and buttons
- Using CSS variables for reusable colors
- Organizing a multi-page website
- Publishing a project using GitHub

## Project Reference

[Personal Portfolio – roadmap.sh](https://roadmap.sh/projects/portfolio-website)

## Author

Christine Joy Espiritu

- GitHub: [@tinapaaay](https://github.com/tinapaaay)

## Development guide

See [Development and maintenance](docs/DEVELOPMENT.md) for setup, source files, implementation limits, editing instructions, verification, and deployment.

The latest accessibility check (routes, tools, fixes and what is not covered yet) is in [docs/accessibility-audit.md](docs/accessibility-audit.md).

## Run locally

From the repository root, run `python3 -m http.server 5500`, then open [localhost:5500](http://localhost:5500). Python 3 is only a development-server option; VS Code Live Server also works. Stop the server with Ctrl+C. No package installation or build is required to serve this checkout.
