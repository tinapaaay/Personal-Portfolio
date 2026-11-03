# Development and maintenance

## Run locally

From the repository root, run `python3 -m http.server 5500`, then open [localhost:5500](http://localhost:5500). Python 3 is only a development-server option; VS Code Live Server also works. Stop the server with Ctrl+C. No package installation or build is required to serve this checkout.

## Implementation and boundaries

HTML pages share `styles.css` and `script.js`. GSAP/ScrollTrigger/SplitText and Lenis load from CDNs; project previews embed external sites. The contact form posts to FormSubmit and requires that service configuration to deliver mail. Leemo Cocktails and the retro calculator are bundled standalone subprojects. GitHub Pages can serve guest mode of Little Feelings, but cannot run its Node account API.

## Make changes

Edit shared navigation/footer across all HTML pages. Update preview URLs and thumbnails in `index.html` and `projects.html`, content in case/article pages, and the form destination in `contact.html`. Keep `resume.html` and `resume.pdf` synchronized.

## Source map

- [`about.html`](../about.html)
- [`article-live-previews.html`](../article-live-previews.html)
- [`articles.html`](../articles.html)
- [`case-css-casebook.html`](../case-css-casebook.html)
- [`case-leemo-cocktails.html`](../case-leemo-cocktails.html)
- [`case-little-feelings.html`](../case-little-feelings.html)
- [`contact.html`](../contact.html)
- [`index.html`](../index.html)
- [`projects.html`](../projects.html)
- [`resume.html`](../resume.html)
- [`resume.pdf`](../resume.pdf)
- [`script.js`](../script.js)
- [`styles.css`](../styles.css)

## Verification

No automated test command is provided by this repository. The following manual checks are a checklist, not a claim that browser QA has been completed.

1. Open every top-level page and follow shared navigation, project links, case studies, and the PDF download.
2. Check desktop/mobile preview toggles and click-to-interact behavior, including phone/data-saver loading.
3. Check reduced-motion and blocked-CDN behavior. Test the contact form only with an intentional test message and verify delivery separately.
4. Open `retro-calculator/` directly and check its controls.
5. Inspect the browser console and Network panel for missing assets or script errors; check keyboard access, phone width, and 200% zoom.

## Deployment

Serve the tracked HTML, CSS, JavaScript, and required assets from a static host, preserving relative paths and filename case. There is no application server or environment-variable configuration in this checkout. Verify the actual deployment URL, external resources, and the checks below after publishing. A repository existing on GitHub does not by itself prove Pages is enabled.

## Keep documentation current

Update the README and this guide when entry points, dependencies, behavior, or deployment steps change. Record commands actually run and distinguish them from pending manual checks.

## Bundled websites

- [Typewriter Calculator](../retro-calculator/README.md)

Leemo Cocktails moved to its own repository, [tinapaaay/leemo-cocktails](https://github.com/tinapaaay/leemo-cocktails), live at [tinapaaay.github.io/leemo-cocktails](https://tinapaaay.github.io/leemo-cocktails/). The portfolio embeds it like the other external projects.
