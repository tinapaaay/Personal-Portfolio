# Design system

The design system now lives in [`DESIGN.md`](../DESIGN.md) at the root of this repo, in Google's DESIGN.md format so AI design and coding tools can read it. Everything that was in this file (principles, tokens, components) moved there.

All CSS tokens still live in `:root` at the top of [`styles.css`](../styles.css). After editing `DESIGN.md`, check it with:

```sh
npx -y @google/design.md@0.4.0 lint DESIGN.md
```
