# Accessibility check: the recruiter journey

**Date:** 11 Nov 2026
**Routes:** Home → Projects → TrailPeak and Leemo case studies → About → Contact, plus Articles and the live-previews article
**Sizes:** 1440×900, 1366×768, 1280×720, 1024×700, 640px wide (stands in for 200% zoom on a 1280px screen), 390×844, 320px wide
**Tools:** Chrome (desktop app browser pane and headless Chrome), a script that measures the WCAG contrast ratio of every visible text element against its real background, keyboard and Escape-key checks of the menu, and headless runs with reduced motion forced on and with the GSAP CDN blocked

This is a focused check, not a claim of full WCAG 2.1 AA conformance.

## Fixed

| Finding | Where | Fix |
| --- | --- | --- |
| Small dusty-plum labels measured **4.23:1** on tinted sections, below the 4.5:1 needed for normal text | About (company names in Experience); the same color is used for project category labels and case study meta labels | Darkened the `secondary` / `--plum-soft` token from `#8A5468` to `#7A4459`: now 6.0:1 on cream and 5.4:1 on tinted cream |
| With the phone menu open, Tab could reach links hidden behind the overlay | Every page, under 961px | `main` and the footer get `inert` while the menu is open, so focus stays in the menu; Escape closes it and restores them |
| Links inside paragraphs had no underline or color, so they only looked like text | TrailPeak case study sources | New inline link style: underlined plum, cream on dark sections |

## Checked and passing

- **Contrast:** after the fix, no visible text on the pages above is under 4.5:1 (normal text) or 3:1 (large text). Body text on cream is 12.7:1 (plum) and 6.4:1 (muted).
- **Focus:** every link, button and form field gets a visible 1.5px outline with a 4px offset (`:focus-visible`), plum on cream and cream on plum. Both are well above 3:1 against their background.
- **Skip link:** "Skip to content" is the first focusable element on each page.
- **Menu:** the toggle reports `aria-expanded`, its label switches between Menu and Close, and Escape closes it.
- **Reduced motion:** with `prefers-reduced-motion` on, smooth scrolling is off, reveals show at once, shapes stop floating and the live hosting clips don't autoplay.
- **If GSAP fails to load:** the page doesn't get the `has-gsap` class, and content fades in on scroll with IntersectionObserver instead. Nothing stays hidden.
- **Reflow:** no horizontal scrolling at 320px, 390px or 640px wide on Home, About, Projects, Contact or the TrailPeak case study. The home hero's View projects and Download résumé stay visible before the portrait on phones.
- **Contact form:** every field has a real `<label>`, and errors appear inline, linked to the field with `aria-describedby`. I didn't send a test message.

## Not covered yet

- **Screen readers:** no VoiceOver or NVDA pass yet.
- **Embedded projects:** the live iframe previews show other sites. Their accessibility belongs to those projects and wasn't checked here.
- **Real 200% browser zoom:** checked as a 640px-wide viewport. Text-only zoom wasn't tested separately.
