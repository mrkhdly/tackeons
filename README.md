# tackeons

A streamlined, self-contained fork of Tachyons CSS. Functional CSS for humans, modernized.

## What is tackeons

tackeons is an independent evolution of Tachyons v5. One-way compatibility is supported: Tachyons → tackeons is the intended migration path (the reverse is not required). The project is self-contained: no upstream Tachyons build tooling, no runtime third-party requests except the opt-in `picsum.photos` placeholder image classes.

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

## Development

```
npm install
npm run build    # builds css/tackeons.css + css/tackeons.min.css
npm run size     # brotli byte count
npm run mutations  # class-collision lint
npm start        # watch mode
```

Requires Node >= 18. No Tachyons tooling required.

## Release process

Tag `vX.Y.Z` — a GitHub Actions workflow builds and attaches `css/tackeons.css` + `css/tackeons.min.css` to the release.

## Changelog

### 0.2.0 (2026-07-19)

- Default `html` to `container-type: inline-size` for out-of-the-box container-query responsive variants
- Semantic dark/light color scheme with `prefers-color-scheme` overrides
- Grey/gray numbered border-color classes (`b--grey-0` through `b--grey-9`, dual spellings)
- Unified opacity class naming with responsive variants (`-s`/`-m`/`-l`)
- DRY glass module refactored with custom properties
- Rewritten README with container-query docs and project differences
- Added `llms.txt` — structured reference for LLM-assisted development

### 0.1.0 (2026-07-19)

- Identity rename from tachyons
- PostCSS build replaces tachyons-cli
- Fixed 98 broken overlay tint/shadow refs (canonical `.hover-tint-N` family + legacy aliases)
- Fixed dark-mode `--shadow-color` setter
- Removed dead modules
- Replaced defunct Unsplash URLs with picsum.photos (+ `--random-image` override)
- Stripped upstream doc links

## AI-assisted development

tackeons is directed by a human maintainer: all ideas, design decisions,
and final judgment calls are the maintainer's. Implementation — code edits,
refactors, build migration, and documentation drafts — is executed by LLM
coding agents working from written tickets with explicit acceptance
criteria, reviewed before merge.

## License / credit

MIT. Built on the shoulders of [Tachyons](https://tachyons.io) by
[Adam Morse](https://mrmrs.cc) and [John Otander](https://johno.com).
