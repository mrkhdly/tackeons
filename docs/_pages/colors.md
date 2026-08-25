---
layout: default
title: Color System
permalink: /docs/colors/
description: "Tackeons color system — grey/gray dual spelling permanent, numbered scales, dark/light vars"
---

# Color System

## Spelling: grey canonical, gray alias permanent

`grey` is canonical (Oxford English, preferred by maintainer). `gray` aliases are provided **permanently** for US English compatibility — not temporary alias debt expiring at a major.

Rationale (per maintainer 2026-08-02): Most non-native English speakers learn Oxford English, so `grey` is more familiar, but forcing US users to switch is undesirable. Both spellings work indefinitely.

From ADR-001 + update 2026-08-02:

- Grey dual-spelling is **first-class**, not drift to be reverted.
- Alias overhead: ~100-150 bytes brotli (measured) — acceptable.
- `grey` listed first in grouped selectors per convention: `.b--grey-0, .b--gray-0`

Classes:

```
.b--grey-0 .. b--grey-11  +  .b--gray-0 .. b--gray-11  (border colors)
.gray-0 .. gray-11 + grey-0 .. grey-11 (text)
.bg-gray-0 .. etc + bg-grey- (background)
.slate-gray-0 .. + slate-grey-
```

## Numbered Scales

All colors use 0–11 scale (12 steps):

- `--gray-0` (#000000) → `--gray-11` (#ffffff)
- `--slate-gray-0..11`
- `--blue-0..11`, `--indigo-0..11`, `--violet-0..11`, `--magenta-0..11`, `--red-0..11`, etc.
- `--tint-0..11` (white alpha), `--shadow-0..11` (black alpha) for overlays

Variables in `_variables.css`:

```css
--gray-0: #000000;
--gray-1: #171717;
...
--gray-11: #ffffff;
```

Also P3 overrides via `@supports (color: color(display-p3 1 1 1))` for blue/indigo.

## Dark / Light Semantic Vars

Added in Phase 3 (TICKET-011) per ADR-001 fix for `--shadow-color-invert`:

```css
:root {
  --shadow-color: 0 0 0;
  --shadow-color-invert: 255 255 255;
  --color-dark: white;
  --bg-dark: black;
  --color-light: black;
  --bg-light: white;
}

@media (prefers-color-scheme: dark) {
  :root {
    --shadow-color: 255 255 255;
    --shadow-color-invert: 0 0 0;
    --color-dark: black;
    --bg-dark: white;
    --color-light: white;
    --bg-light: black;
  }
}
```

Usage in `_skins.css`:

```css
.dark {
  background-color: var(--bg-dark, black);
  color: var(--color-dark, white);
}
.light {
  background-color: var(--bg-light, white);
  color: var(--color-light, black);
}
```

Fallbacks preserve backward compatibility.

## Known Collision: shadow

`.shadow-0..11` as color (text) collides with `.shadow-1..8` as box-shadow (layered shadows) — inherited from upstream v5-final-final. Both properties apply (color + box-shadow) for 1..8. Documented in ADR-005. For now, intended to keep both; v1.0 may disambiguate.

See ADR-005 for decision.

Full table: [Table of Styles](/docs/table-of-styles/), [Table of Properties](/docs/table-of-properties/)
