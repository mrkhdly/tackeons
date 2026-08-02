---
layout: default
title: Container Queries
permalink: /docs/container-queries/
description: "Tackeons container-query responsive system (-s/-m/-l)"
---

# Container Queries

Tackeons uses **container queries** (`@container`) for responsive variants `-s`/`-m`/`-l` instead of `@media` breakpoints.

## Default Behavior

`html` defaults to `container-type: inline-size` per ADR-002 so responsive variants work out of the box.

From `_container-type.css`:

```css
html { container-type: inline-size; }
.container-normal { container-type: normal; } /* opt-out */
.container-inline,
.root { container-type: inline-size; }
.container-size { container-type: size; }
```

## Opt-Out

Opt out on any subtree to scope nested containers:

```html
<div class="container-normal">
  <!-- inside here, -s/-m/-l queries use this container, not viewport -->
  <div class="container-inline">
    <!-- nested inline-size container -->
  </div>
</div>
```

## Breakpoints

Fixed at exactly:

- `-s` = `30em`
- `-m` = `48em`
- `-l` = `64em`

Formatting convention: space before `{` → `@container (min-width:30em) {`

## Responsive Example

```html
<div class="dn db-s db-m db-l">Hidden base, block at s/m/l</div>
<div class="flex-s">Flex at ≥30em container width</div>
```

## Caveat: cq* Units

When `html { container-type: inline-size; }` is set, `cqw`, `cqh`, `cqi`, `cqb`, `cqmin`, `cqmax` units resolve against the container (now root), effectively viewport-locked. Acceptable for utility framework. Documented in README.

See [Color System](/docs/colors/) next.
