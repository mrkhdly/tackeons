# tackeons

A streamlined, self-contained fork of Tachyons CSS. Functional CSS for humans, modernized.

## What is tackeons

tackeons is an independent evolution of the unreleased Tachyons v5 beta (the `v5-final-final` branch — never shipped upstream). It is self-contained: no upstream Tachyons build tooling, no runtime third-party requests except the opt-in `picsum.photos` placeholder image classes.

> **Compatibility note:** Tachyons v5 beta → tackeons is the intended migration path. If you are coming from **Tachyons v4.x** (the widely-used stable release), be aware that the v5 beta itself introduced major breaking changes — see [Migration from Tachyons v4](#migration-from-tachyons-v4) below. There is no v4 → tackeons direct upgrade.

## Install / use

```
npm install tackeons
```

Link `css/tackeons.min.css` in your project. `css/tachyons.css` is a deprecated re-export shim for existing consumers — do not use it in new projects.

## Differences from upstream Tachyons

- Container-query responsive system (`-s`/`-m`/`-l` suffixes) instead of `@media` breakpoints
- Grey + gray color spellings (grey is canonical; gray aliases provided for compatibility)
- Modern font stacks via `modern-font-stacks`
- Vendored `modern-normalize` v2 reset replacing `normalize.css`
- Glass, gradient, and filter/backdrop-filter modules
- PostCSS build toolchain (`postcss-import` + `cssnano`) replacing `tachyons-cli`

## Container query system

Responsive variants `-s`/`-m`/`-l` work out of the box — `html` defaults to `container-type: inline-size`. Opt out on any subtree with `.container-normal`. Scope nested containers with `.container-inline` / `.root`. Breakpoints are fixed at `30em` / `48em` / `64em`.

## Migration from Tachyons v4

Tachyons v5 beta — which tackeons is derived from — was an unreleased rewrite. If you are migrating from **Tachyons v4.x** (the stable release most users know), the following breaking changes apply on top of tackeons' own differences:

### Critical: renamed or inverted classes

| v4.x | v5 beta / tackeons | Notes |
|---|---|---|
| `-ns` suffix (not-small) | `-s` suffix (small) | All 426 `-ns` classes gone; breakpoints differ (30em/48em/64em) |
| `-m` suffix | `-m` suffix | Was 30em–60em range, now ≥48em |
| `-l` suffix | `-l` suffix | Was ≥60em, now ≥64em |
| `.f1` = 3rem (largest) | `.f1` = 12px (smallest) | **Type scale inverted.** f1–f7 descending → f1–f12 ascending. Audit every font-size class. |
| `.f-headline`, `.f-subheadline` | Removed | No direct replacement |

### Color system: named → numbered

| v4.x | v5 beta / tackeons |
|---|---|
| `.blue`, `.dark-blue`, `.light-blue`, `.washed-blue` | `.blue-5`, `.blue-7`, `.blue-3` (0–11 scale) |
| `.bg-blue`, `.bg-dark-blue`, etc. | `.bg-blue-5`, `.bg-blue-7`, etc. |
| `.black-50`, `.white-80` (opacity) | `.tint-5`, `.shadow-5` (named scales) |
| `.navy`, `.gold`, `.orange`, `.hot-pink` | Removed (no direct equivalent) |

### Font families: all named fonts removed

`.helvetica`, `.georgia`, `.avenir`, `.athelas`, `.code`, `.courier`, `.times`, `.bodoni`, `.calisto`, `.garamond`, `.baskerville`, `.sans-serif`, `.serif` — all removed. Use `.f-heading`, `.f-body`, `.f-mono` (configurable via CSS custom properties).

### Spacing: shorthand classes removed

`ma0`–`ma7`, `mv0`–`mv7`, `mh0`–`mh7`, `pa0`–`pa7`, `pv0`–`pv7`, `ph0`–`ph7` — all removed. Use individual directional classes (`mt4 mb4 ml4 mr4` instead of `ma4`).

### Table display classes removed

`.dt`, `.dtc`, `.dit`, `.dt-row`, `.dt-row-group`, `.dt-column`, `.dt-column-group`, `.dt--fixed` and all responsive variants — removed. Use grid (`dg`, `dig`) or flex.

### Shadow system: rewritten

`.shadow-1` through `.shadow-5` produce different visual results. `.shadow-3`, `.shadow-4`, `.shadow-5` removed. New layered shadow system with CSS custom properties.

### Other removals

- `.br-100`, `.br-pill` — use `.br11`
- `.aspect-ratio--16x9` → `.aspect-ratio-16x9` (double to single dash)
- `.o-0` through `.o-90` (opacity) → `.o0` through `.o12`
- `.absolute--fill`, `.overflow-container`, `.bg-animate`, `.indent`, `.strike`, `.debug-*` — removed
- All `.stripe-light-*` / `.stripe-dark-*` variants — reduced to `.striped--light` / `.striped--dark`

### tackeons-specific changes (on top of v5 beta)

| Change | Detail |
|---|---|
| Build system | `tachyons-cli` → PostCSS (`postcss-import` + `cssnano`) |
| Reset | `normalize.css` → `modern-normalize` v2 |
| Grey/gray | Dual spellings; `grey` canonical, `gray` as alias |
| New modules | Glass, gradient, filter, backdrop-filter |
| Font stacks | `modern-font-stacks` (Inter, Inconsolata) |

## Development

```
npm install
npm run build    # builds css/tackeons.css + css/tackeons.min.css
npm run size     # brotli byte count
npm run mutations  # class-collision lint
npm start        # watch mode
```

Requires Node >= 18. No Tachyons tooling required.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## AI-assisted development

tackeons is directed by [Mark Hadley](https://github.com/mrkhdly): all ideas, design decisions,
and final judgment calls are Mark's. Implementation — code edits,
refactors, build migration, and documentation drafts — is executed by LLM
coding agents working from written tickets with explicit acceptance
criteria, reviewed before merge.

## License & Credits

MIT.

tackeons is built on and includes code from these projects:

| Project | Role |
|---------|------|
| [Tachyons](https://github.com/tachyons-css/tachyons) | Origin framework by [Adam Morse](https://mrmrs.cc) & [John Otander](https://johno.com) |
| [PostCSS](https://github.com/postcss/postcss) | CSS build pipeline |
| [postcss-import](https://github.com/postcss/postcss-import) | Module resolution |
| [cssnano](https://github.com/cssnano/cssnano) | CSS minification |
| [modern-normalize](https://github.com/sindresorhus/modern-normalize) | Vendored CSS reset |
| [modern-font-stacks](https://github.com/system-fonts/modern-font-stacks) | System font families |
