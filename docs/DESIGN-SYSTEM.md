# Design system

Plum editorial: cream paper, one deep plum accent, and type doing the emphasis. All tokens live in `:root` at the top of [`styles.css`](../styles.css).

## Principles

- **Every element earns its place.** No section numbers, no labels that repeat a heading, no extra calls to action.
- **Hierarchy through type.** Title first, one short line second, quiet details last.
- **Honest UI.** Only links and buttons react to hover. Nothing looks clickable unless it is.
- **Decoration with meaning.** Shapes and wordmarks support the content; they never replace it.
- **Readable first.** Sans-serif for all reading text. The Bodoni serif is only for the TINAPAY wordmarks and the word stack.

## Tokens

### Color

| Token | Value | Use |
|---|---|---|
| `--cream` | `#ece5da` | Page background, text on plum |
| `--cream-2` | `#e2d9cb` | Tinted sections, code backgrounds |
| `--cream-3` | `#d8cdbc` | Meta text on plum, soft fills |
| `--plum` | `#3d1426` | The accent: buttons, dark sections, links on hover |
| `--plum-soft` | `#8a5468` | Small category labels, shape outlines |
| `--rose` | `#c48a9b` | Accent shapes only |
| `--ink` | `#2a161f` | Main text |
| `--ink-soft` | `#3b2a32` | Long-form article text |
| `--muted` | `#5f4b54` | Secondary text |
| `--line` / `--line-light` | plum / cream at low opacity | Dividers on light / dark |
| `--on-dark-muted` | cream at 72% | Body text on plum |
| `--on-dark-faint` | cream at 35% | Outlines on plum |
| `--ok` / `--error` | `#3f8f5a` / `#a3324f` | Status dot / form errors |

All text pairs pass WCAG AA. The lowest is small muted text on cream, at about 4.5:1.

### Type

Fonts: `--display` (Bodoni Moda) for wordmarks, `--heading` (Plus Jakarta Sans) for headings, `--sans` (Manrope) for body text.

| Token | Size | Use |
|---|---|---|
| `--fs-2xs` | 11px | Floating form labels, category labels |
| `--fs-xs` | 12px | Uppercase captions (`.cap`) |
| `--fs-sm` | 14px | Tools lists, notes, small buttons |
| `--fs-base` | 16px | Body text, row descriptions |
| `--fs-md` | 17–18px | Lead paragraphs, project one-liners |
| `--fs-lg` | 20–24px | Form inputs, arrows, small headings |
| `--fs-xl` | 24–35px | Card and row titles (h3) |
| `--fs-2xl` | 35–67px | Section titles, quotes |
| `--fs-3xl` | 48–106px | Closing headlines, About headline, word stack |
| `--fs-4xl` | 54–152px | Page titles |

Exceptions, on purpose: the hero and footer TINAPAY wordmarks are sized to fit the screen width, and the phone menu links use their own size.

### Spacing

A 4px-based scale: `--space-1` 4 · `--space-2` 8 · `--space-3` 12 · `--space-4` 16 · `--space-5` 24 · `--space-6` 32 · `--space-7` 48 · `--space-8` 64 · `--space-9` 96. Page edges use `--gutter`, and section padding uses fluid `clamp()` values.

### Shape, depth, motion

| Token | Value |
|---|---|
| `--radius-pill` | 999px, for buttons and chips |
| `--radius-card` | 14px, for preview windows |
| `--shadow-soft` / `--shadow-deep` | Phone frame / desktop preview window |
| `--dur-fast` / `--dur` / `--dur-slow` | 0.3s / 0.45s / 0.8s |
| `--ease` | `cubic-bezier(0.2, 0.7, 0.1, 1)` for every transition |

Visitors with reduced motion get no pinning, parallax, or floating shapes.

## Components

### Buttons and links

- **Button** (`.btn`): the one main action in a spot. Plum pill that clears to an outline on hover. Use `.btn-sm` inside project entries.
- **Text link** (`.text-link`): every secondary action. Sentence case, with an underline that grows on hover. Use → for your own pages and ↗ for other sites.
- Don't put two solid buttons side by side, and don't use uppercase letter-spaced links.

### Header

TINAPAY wordmark on the left, nav links in the center, and a MENU button on phones. Items are centered vertically. The current page is underlined (`aria-current="page"`).

### Live preview (`.live`)

A real website in a browser frame, rendered at desktop width and scaled down. Click the cover to try it, and switch between Desktop and Mobile. On phones, sites load only when tapped.

### Form fields (`.field`)

The label floats up on focus, and a plum line grows under the input. A missing or invalid value turns the line and label `--error`, shows a short message under the field (linked with `aria-describedby`), and clears as the visitor types.

### Project entry (`.feature`)

Category label, title, one short line (`.feature-text`), up to four tools (`.stack`), then one button and plain text links.

### Word stack and floating shapes

- **Word stack:** four words in the wordmark font. The filled word follows the scroll.
- **Floating shapes:** thin rings, squares and dots around section headings, drifting slowly as you scroll. They're hidden on phones where they would touch text.
