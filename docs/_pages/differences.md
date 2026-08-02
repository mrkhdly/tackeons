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

### Spacing: shorthand removed

`ma0`–`ma7`, `mv0`–`mv7`, `mh0`–`mh7`, `pa0`–`pa7`, `pv0`–`pv7`, `ph0`–`ph7` removed. Use individual directional classes (`mt4 mb4 ml4 mr4` instead of `ma4`).

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
| Reset | `normalize.css` → `modern-normalize` v2 |
| Grey/gray | Dual spellings permanent; `grey` canonical, `gray` alias for US English (Oxford rationale) |
| New modules | Glass, gradient, filter, backdrop-filter |
| Font stacks | `modern-font-stacks` (Inter, Inconsolata) |
| Container queries | `html { container-type:inline-size }` default, `-s/-m/-l` responsive variants |

See [Container Queries](/docs/container-queries/) and [Color System](/docs/colors/) for details.
