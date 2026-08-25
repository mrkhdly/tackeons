---
layout: default
title: Table of Properties
permalink: /docs/table-of-properties/
description: "Property → class mapping"
---

# Table of Properties

> **Status:** Planned auto-generation. Placeholder.

Upstream `tachyons.io/docs/table-of-properties/` groups by CSS property (e.g., `align-content` → `.content-around`, `.content-between`...).

Planned for tackeons:

- Parse `04-css-architecture.md` module → property → classes table
- Auto-generate from src files: extract property name from rule, map to selectors

Example (from architecture kit):

| Module | Property | Classes |
|--------|----------|---------|
| `_display.css` | `display` | `dn`, `di`, `db`, `dib`, `df/.flex`, `dif/.inline-flex`, `dg/.grid`, `dig/.inline-grid` |
| `_flex-direction.css` | `flex-direction` | `flex-column`, `flex-row`, etc. |
| `_gap-column.css` | `column-gap` | `gc0..gc7` (or gap-column-0..7? actual class names .gc) |
| `_skins.css` | `color`, `background-color` | `.gray-0..11`, `.bg-blue-0..11`, etc. |
| ... | ... | ... |

See `04-css-architecture.md` for full mapping (already documents 65+ modules).

Generation approach same as Table of Styles — Node script reading CSS AST via PostCSS.

Will include note about known collision: `.shadow-1..8` appears under both `color` and `box-shadow`.

Stay tuned — or check `src/` directly for now.
