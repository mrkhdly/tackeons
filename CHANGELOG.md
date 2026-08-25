# Changelog

## [0.2.2] - 2026-08-25

### Fixed

- Correct spacing scale fallbacks across all modules: `var(--spacing-N)` fallbacks were one scale-step too high in `_spacing.css` (`px1`, `mb1`, `my1`, `mx1-s`, `mr1-m`, `ml1-l`) and all `_gap*` modules (63 declarations). Only affects rendering when custom properties are undefined; built output brotli 15,442 bytes

### Added

- Metrics regression gate: `scripts/baseline.json` is the size source of truth, `npm run metrics` fails on >5% brotli growth, `npm run metrics:update` refreshes for intentional changes
- CI workflow (build + mutations + size on push to dev/main & PRs)
- Release workflow (on tag push: builds CSS, generates release notes, attaches artifacts)
- Migration guide for Tachyons v4 → v5 → tackeons in README
- Docs site scaffold at `docs/` (Jekyll, tackeons.grey.cx) with metric suite integration

### Changed

- Vendored modern-normalize upgraded v2.0.0 → v3.0.1 (raw −1KB, gzip −230B)
- Tightened tone across README, CHANGELOG, & release notes (no em dashes, casual voice)
- Scoped README compatibility to v5 beta (not v4.x)

## [0.2.1] - 2026-07-20

### Fixed

- Correct `gap-row` to `row-gap` CSS property
- Correct `gap-column` to `column-gap` CSS property

### Changed

- Move changelog to separate CHANGELOG.md
- Add credits section linking dependency repos
- Fix AI disclaimer & link credits properly

## [0.2.0] - 2026-07-19

### Added

- Default `html` to `container-type: inline-size` for out-of-the-box container-query responsive variants
- Semantic dark/light color scheme with `prefers-color-scheme` overrides
- Grey/gray numbered border-color classes (`b--grey-0` through `b--grey-9`, dual spellings)
- Unified opacity class naming with responsive variants (`-s`/`-m`/`-l`)
- `llms.txt`, structured LLM reference

### Changed

- DRY glass module refactored with custom properties
- Rewritten README with container-query docs & project differences

## [0.1.0] - 2026-07-19

### Added

- Identity rename from tachyons to tackeons
- PostCSS build pipeline replacing tachyons-cli

### Fixed

- 98 broken overlay tint/shadow refs (canonical `.hover-tint-N` family + legacy aliases)
- Dark-mode `--shadow-color` setter
- Replaced defunct Unsplash URLs with picsum.photos (+ `--random-image` override)

### Changed

- Removed dead modules
- Stripped upstream doc links

[0.2.1]: https://github.com/mrkhdly/tackeons/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/mrkhdly/tackeons/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/mrkhdly/tackeons/releases/tag/v0.1.0
