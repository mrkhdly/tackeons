---
layout: default
title: Table of Styles
permalink: /docs/table-of-styles/
description: "Exhaustive selector list — table of styles"
---

# Table of Styles

> **Status:** Planned auto-generation (Phase 5b). Manual placeholder for now. Upstream tachyons.io has similar page with 400+ selectors.

This page will be auto-generated from `src/tackeons.css` + `src/_*.css` parsing.

For now, see [`04-css-architecture.md`](https://github.com/mrkhdly/tackeons/blob/main/docs/../grey-files/projects/tackeons/architecture-kit/04-css-architecture.md) and source modules.

## Current modules (78)

- Variables: `_variables.css`
- Primitives: `_normalize.css`, `_box-sizing.css`, `_container-type.css`, `_font-family.css`
- Layout: `_display.css`, `_flexbox.css`, `_flex-direction.css`, `_flex-wrap.css`, `_align-items.css`, `_align-self.css`, `_align-content.css`, `_justify-content.css`, `_justify-self.css`, `_order.css`, `_grid.css`, `_grid-column.css`, `_grid-row.css`, `_grid-template-columns.css`, `_gap.css`, `_gap-column.css`, `_gap-row.css`
- Positioning: `_position.css`, `_coordinates.css`, `_floats.css`, `_clears.css`
- Spacing: `_spacing.css`, `_negative-margins.css`
- Sizing: `_widths.css`, `_heights.css`, `_max-widths.css`
- Borders: `_borders.css`, `_border-colors.css` (grey/gray dual), `_border-radius.css`, `_border-style.css`, `_border-widths.css`, `_box-shadow.css`, `_text-shadow.css`, `_opacity.css`
- Typography: `_type-scale.css`, `_typography.css`, `_font-style.css`, `_font-weight.css`, `_line-height.css`, `_letter-spacing.css`
- Text: `_text-align.css`, `_text-transform.css`, `_text-decoration.css`, `_vertical-align.css`, `_white-space.css`, `_word-break.css`
- Color: `_skins.css`, `_skins-pseudo.css`
- Misc: `_hovers.css`, `_overflow.css`, `_visibility.css`, `_z-index.css`, `_all.css`, `_outlines.css`, `_rotations.css`, `_aspect-ratios.css`, `_background-size.css`, `_background-position.css`, `_code.css`, `_links.css`, `_lists.css`, `_tables.css`, `_forms.css`, `_nested.css`, `_utilities.css`, `_styles.css`
- Optional: `_glass.css`, `_gradients.css`, `_filters.css`, `_backdrop-filters.css`, `_images.css`, `_debug.css`, `_debug-children.css`, `_debug-grid.css`

### How table will be generated (planned)

Node script:

- Reads `src/tackeons.css` TOC
- For each `src/_*.css`, regex `\.([a-z0-9-]+)` to extract class names
- Outputs `_data/styles.json` → Jekyll template loops to table

See `12-docs-planning.md` §3.3 for details.

Meanwhile, use `css/tackeons.css` directly or `npm run build` to inspect.
