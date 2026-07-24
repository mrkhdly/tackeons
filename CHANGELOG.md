# Changelog

## [Unreleased]

### Added

- CI workflow (`build` + `mutations` lint + `size` check on push to dev/main and PRs)
- Release workflow (on tag push: builds CSS, generates release notes, attaches artifacts)
- Migration guide for Tachyons v4 → v5 → tackeons in README

### Changed

- Scope README compatibility wording to Tachyons v5 beta (not v4.x)

## [0.2.1] — 2026-07-20

### Fixed

- Correct `gap-row` to `row-gap` CSS property
- Correct `gap-column` to `column-gap` CSS property

### Changed

- Make changelog versions collapsible in README (moved to separate file)
- Add credits section linking dependency repos
- Fix AI disclaimer and link credits properly

## [0.2.0] — 2026-07-19

### Added

- Default `html` to `container-type: inline-size` for out-of-the-box container-query responsive variants
- Semantic dark/light color scheme with `prefers-color-scheme` overrides
- Grey/gray numbered border-color classes (`b--grey-0` through `b--grey-9`, dual spellings)
- Unified opacity class naming with responsive variants (`-s`/`-m`/`-l`)
- `llms.txt` — structured reference for LLM-assisted development

### Changed

- DRY glass module refactored with custom properties
- Rewritten README with container-query docs and project differences

## [0.1.0] — 2026-07-19

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
