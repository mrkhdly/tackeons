---
layout: default
title: Getting Started
permalink: /docs/getting-started/
description: "Install and use tackeons — no npm, streamlined"
---

# Getting Started

No npm package — intentional, streamlined distribution via GitHub Releases.

**For using tackeons in your project:**

Download `css/tackeons.min.css` from [Latest release](https://github.com/mrkhdly/tackeons/releases/latest) (or clone repo), then link:

```html
<link rel="stylesheet" href="/path/to/tackeons.min.css">
```

`css/tachyons.css` is a deprecated re-export shim for existing consumers. Don't use it in new projects.

**For developing tackeons itself (contributors):**

`npm install` installs build tooling only (PostCSS, cssnano, purgecss, immutable-css), not the library for consumption. No `npm publish` intended — releases are GitHub Releases with attached artifacts.

```
npm install      # dev deps
npm run build    # builds css/tackeons.css + css/tackeons.min.css
npm run size     # brotli byte count
npm run mutations  # class-collision lint
npm run metrics  # full metric suite (size + mutations + class counts + var checks + regression guards)
npm start        # watch mode
```

Requires Node >= 18.

## CDN / Distribution (no npm)

Tackeons is not on npm — intentional streamlined distribution.

**Recommended: Self-host (zero external dependency)**

1. Download `css/tackeons.min.css` from [Latest release](https://github.com/mrkhdly/tackeons/releases/latest) (release attaches `tackeons.css` + `tackeons.min.css`)
2. Copy to your project `/css/` and link:

```html
<link rel="stylesheet" href="/css/tackeons.min.css">
```

**Optional CDN — zero manual Cloudflare config:**

- **jsDelivr GitHub CDN** — proxies GitHub, caches globally on Cloudflare/Fastly/etc., proper headers, version pinning. No setup:

```
https://cdn.jsdelivr.net/gh/mrkhdly/tackeons@main/css/tackeons.min.css        (main branch)
https://cdn.jsdelivr.net/gh/mrkhdly/tackeons@v0.2.1/css/tackeons.min.css      (pinned version)
```

Use in HTML:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mrkhdly/tackeons@v0.2.1/css/tackeons.min.css">
```

jsDelivr is a real CDN (not GitHub raw — raw.githubusercontent.com is not a CDN, no caching, rate-limited, wrong MIME type, not suitable for production).

- **Why not GitHub raw?** `raw.githubusercontent.com` disallows caching, serves with `text/plain`, rate-limited. Don't use for CSS.

**Optional CDN — using your own Cloudflare Pages deployment (tackeons.grey.cx) — no extra service beyond docs site:**

The docs site itself (`tackeons.grey.cx`) is hosted on Cloudflare Pages — its static assets are already served via Cloudflare global CDN. If you want to serve full library via your own domain:

- Ensure full file is available at a path that is NOT overwritten by purge. Current scaffold: `docs/css/tackeons.min.css` is full (copied from root via `npm run build:docs`), then `npm run build:docs:purge` overwrites `docs/_site/css/tackeons.min.css` with purged version for docs site internal performance.
- To provide full library via same domain, add separate folder that is never purged, e.g., `docs/dist/` or `docs/static/` containing full `tackeons.min.css`. Jekyll will copy it to `_site/dist/` as-is.
- Then full library CDN URL: `https://tackeons.grey.cx/dist/tackeons.min.css` — served via Cloudflare Pages CDN, same domain as docs, no extra R2 bucket or DNS config.
- This requires only adding `docs/dist/` folder with full file + ensuring `_config.yml` does not exclude it. No manual Cloudflare dashboard config beyond existing Pages project.

**Future dedicated CDN (manual config — only if you want cdn.tackeons.grey.cx):**

- Create Cloudflare R2 bucket, upload css files, enable public access or custom domain `cdn.tackeons.grey.cx`, set Cache-Control headers (e.g., `public, max-age=31536000, immutable` for versioned files), configure CNAME. More work, gives you control over cache invalidation and versioning strategy.
- Not needed for launch — jsDelivr or self-host + Pages CDN via /dist covers streamlined use case.

**Current docs scaffold status:**

- `docs/css/tackeons.min.css` = full (via `npm run build:docs`)
- `docs/_site/css/tackeons.min.css` after `build:docs:purge` = purged for docs site (9KB vs 193KB)
- Next step: add `docs/dist/tackeons.min.css` as full copy for own-domain CDN if you choose option 3, or just rely on jsDelivr + self-host for now.

Recommendation for launch: **Self-host + jsDelivr** (zero Cloudflare manual work). Add own-domain `/dist` CDN later if you want all traffic on tackeons.grey.cx domain.

## Build Artifacts

- `css/tackeons.css` — full, unminified
- `css/tackeons.min.css` — minified via cssnano
- `css/tachyons.css` — deprecated shim re-exporting tackeons.css (one release cycle)

## Docs Site Development (tackeons.grey.cx)

This site (Jekyll):

```
cd docs
bundle install
bundle exec jekyll serve --livereload   # http://localhost:4000 — full CSS, fast
```

Prod simulation with purge (like grey.cx):

```
bundle exec jekyll build
NODE_ENV=production npx postcss css/tackeons.min.css -o _site/css/tackeons.min.css --env production
npx pagefind --source _site
```

Deploy: Cloudflare Pages project `tackeons` with custom domain `tackeons.grey.cx`, build command includes purge + pagefind.

See [Container Queries](/docs/container-queries/) next.
