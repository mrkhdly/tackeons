---
layout: default
title: Variables
permalink: /docs/variables/
description: "CSS custom properties — design tokens"
---

# Variables

All design tokens live in `_variables.css`. No hardcoded values downstream per ADR-002.

## Colors

See [Color System](/docs/colors/) for full list. Summary:

- `--gray-0..11`, `--slate-gray-0..11`
- `--blue-0..11`, `--indigo-0..11`, `--violet-0..11`, `--magenta-0..11`, `--red-0..11`, `--red-orange-0..11`, `--orange-0..11`, `--gold-0..11`, `--yellow-0..11`, `--green-0..11`, `--teal-0..11`, `--cyan-0..11`
- `--tint-0..11`, `--shadow-0..11` (alpha overlays)
- `--transparent`

P3 overrides for blue/indigo in `@supports (color: color(display-p3 1 1 1))`.

## Semantic Dark/Light

```css
--shadow-color, --shadow-color-invert
--color-dark, --bg-dark, --color-light, --bg-light
```

With `prefers-color-scheme: dark` overrides.

## Gradients

```css
--degrees-1..8, --gradient-degree-*, --gradient-stripe-width-*
--gradient-color-1..24, --gradient-stop
```

## Type Scale

```css
--font-size-1: 12px; ... --font-size-12: 256px;
--measure-narrow: 45ch; --measure: 66ch; --measure-wide: 80ch;
```

## Borders, Radii, Widths

```css
--border-radius-0..11, --border-radius
--border-width-0..5, --border-width, --border-color
```

## Spacing, Sizing

```css
--spacing-0..9
--size-0..8
```

## Shadows

```css
--shadow-color, --shadow-color-invert, --shadow-border-width, --shadow-opacity
```

## Opacity, Durations, Easing

```css
--opacity-0..12
--duration-0..2
--easing-function-0..4
```

Full source: [`src/_variables.css`](https://github.com/mrkhdly/tackeons/blob/main/src/_variables.css)
