---
layout: default
title: Differences from Tachyons
permalink: /docs/differences/
description: "Migration guide v4 -> v5 beta -> tackeons"
---

# Differences from Tachyons / Migration

Tackeons is a fork of Tachyons v5 beta (`v5-final-final` branch, never released). Not compatible with stable v4.x directly.

## v4.x → v5 beta / tackeons breaking changes

### Critical: renamed or inverted classes

| v4.x | v5 beta / tackeons | Notes |
|---|---|---|
| `-ns` suffix (not-small) | `-s` suffix (small) | All 426 `-ns` classes gone. Breakpoints differ (30em/48em/64em). |
| `-m` suffix | `-m` suffix | Was 30em–60em range, now ≥48em |
| `-l` suffix | `-l` suffix | Was ≥60em, now ≥64em |
| `.f1` = 3rem (largest) | `.f1` = 12px (smallest) | **Type scale inverted.** f1–f7 descending → f1–f12 ascending. |
| `.f-headline`, `.f-subheadline` | Removed | No direct replacement |

### Color system: named → numbered

| v4.x | v5 beta / tackeons |
|---|---|
| `.blue`, `.dark-blue`, `.light-blue`, `.washed-blue` | `.blue-5`, `.blue-7`, `.blue-3` (0–11 scale) |
| `.bg-blue`, `.bg-dark-blue`, etc. | `.bg-blue-5`, `.bg-blue-7`, etc. |
| `.black-50`, `.white-80` (opacity) | `.tint-5`, `.shadow-5` (named scales) |
| `.navy`, `.gold`, `.orange`, `.hot-pink` | Removed (no direct equivalent) |

### Font families: all named fonts removed

`.helvetica`, `.georgia`, `.avenir`, `.athelas`, `.code`, `.courier`, `.times`, `.bodoni`, `.calisto`, `.garamond`, `.baskerville`, `.sans-serif`, `.serif` removed. Use `.f-heading`, `.f-body`, `.f-mono` (configurable via CSS custom properties).

### Spacing: shorthand renamed (v4 → v5)

| v4.x | v5 beta / tackeons | Why |
|---|---|---|
| `pa0`–`pa7` (padding all) | `p0`–`p9` (padding) | Shorter: `pa` (3 chars) → `p` (1). `a` = all is redundant — `padding` already means all. Matches Tailwind `p-*`, saves gzip. |
| `ma0`–`ma7` | `m0`–`m9` | Same logic: `margin` → `m`, not `ma`. |
| `ph`, `pv` (horizontal/vertical) | `px`, `py` | `h/v` → `x/y` axis naming. Industry standard: x=left/right (horizontal axis), y=top/bottom (vertical). Tailwind, Bootstrap 5+, modern CSS grid `gap-x`/`gap-y` all use x/y. Clearer than h (height? horizontal?) / v. |
| `mh`, `mv` | `mx`, `my` | Same x/y migration for margins. |

Scale also expanded 0–7 → 0–9 (2^n scale 0→512px via CSS vars). All responsive `-s/-m/-l` variants still exist: `p0-s`, `px4-m`, `my2-l`, etc. Original `pa`/`ma`/`ph`/`pv`/`mh`/`mv` removed in PR #455 changelog "paX/maX → pX/mX" and PR #705 final "Moved to x,y syntax instead of h,v". See https://github.com/tachyons-css/tachyons/pull/455 and #705.

If you come from v4, replace: `pa4`→`p4`, `ph3`→`px3`, `pv2`→`py2`, `ma2`→`m2`, `mh2`→`mx2`, `mv2`→`my2`.

### Table display classes removed

`.dt`, `.dtc`, `.dit`, `.dt-row`, `.dt-row-group`, `.dt-column`, `.dt-column-group`, `.dt--fixed` & responsive variants removed. Use grid or flex.

### Shadow system: rewritten

`.shadow-1`..`.shadow-5` visual results differ. `.shadow-3`, `.shadow-4`, `.shadow-5` removed. New layered shadow system with CSS custom properties. Also note collision: `.shadow-0..11` color scale vs `.shadow-1..8` box-shadow (both apply) — inherited upstream, see ADR-005.

### Other removals

- `.br-100`, `.br-pill` → `.br11`
- `.aspect-ratio--16x9` → `.aspect-ratio-16x9` (double to single dash)
- `.o-0`..`.o-90` (opacity) → `.o0`..`.o12`
- `.absolute--fill`, `.overflow-container`, `.bg-animate`, `.indent`, `.strike`, `.debug-*` removed
- `.stripe-light-*` / `.stripe-dark-*` → `.striped--light` / `.striped--dark`

### tackeons-specific changes (on top of v5 beta)

| Change | Detail |
|---|---|
| Build system | `tachyons-cli` → PostCSS (`postcss-import` + `cssnano`) |
| Reset | `normalize.css` → `modern-normalize` v3.0.1 (v2.0.0 May 2023 → v3.0.1 Sep 2024, removes `hr`, `abbr[title]`, `-moz-tab-size`, `text-transform` reset, `::-moz-focus-inner`, `:-moz-focusring`, `:-moz-ui-invalid`, `text-indent` → `border-color: currentcolor`, size 4530→3338 raw) |
| Grey/gray | Dual spellings permanent; `grey` canonical, `gray` alias for US English (Oxford rationale), overhead ~100-150B brotli |
| New modules | Glass, gradient, filter, backdrop-filter |
| Font stacks | `modern-font-stacks` (15 stacks, in sync as of 2026-08-01 — system-ui, transitional, old-style, humanist, geo-humanist, classic-humanist, neo-grotesque, mono-slab, mono-code, industrial, rounded-sans, slab-serif, antique, didone, handwritten), Inter/Roboto fallback |
| Container queries | `html { container-type:inline-size }` default, `-s/-m/-l` responsive via `@container (min-width:30em/48em/64em)`, opt-out `.container-normal` |
| Broli size | v0.2.1 15533 → v0.2.2 15537 after flex dup fix + normalize v3 (raw −1KB, gzip −230B, brotli +4 due to dict) |

See [Container Queries](/docs/container-queries/) and [Color System](/docs/colors/) for details.
