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

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## AI-assisted development

tackeons is directed by a human maintainer: all ideas, design decisions,
and final judgment calls are the maintainer's. Implementation — code edits,
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
