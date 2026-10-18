# Result row (molecule)

**Figma:** Result row `678:174`, page → Molecules (Select × State: Single 5, Multi 7)
> ResultRow — option in a listbox (vendor search single, brand list multi). Keyboard active = fill + 2px inset focus outline; mouse hover = fill only.
> Props — name · meta · skuCount · select: single | multi · state (Figma only)

**Single was built in batch 2. Batch 3 adds `select="multi"` (section below); it needs `checkbox.md`.**

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `select` | `'single' \| 'multi'` | `'single'` | single = vendor search; multi = brand list |
| `name` | `string` | — | Vendor or brand name |
| `meta` | `string` | — | single: ESN ("DEMO-0022"); multi: "SKUs: 64" |
| `wordmark` | `string` | — | single only, for the Vendor logo |
| `isSelected` | `boolean` | — | Via React Aria `ListBoxItem` selection, not a hand prop |

Render as a React Aria **`ListBoxItem`** inside the Results panel `ListBox`. Hover / pressed / keyboard active come from `data-hovered`, `data-pressed`, `data-focus-visible` (or the item referenced by `aria-activedescendant`).

## Anatomy and sizes (single)
- Row, `min-height` 48, padding 0 / 12, gap 12, items centered, radius 6 (`--radius-6`).
- **Vendor logo** sm (56×36), see `vendor-logo.md`.
- **Name**: `.type-body-md`, `--text-heading`, one line + ellipsis, fills.
- **Meta** (ESN): `.type-data-sm` (JetBrains Mono Medium 12/18), `--text-subtle`.
- **Selected indicator** (selected only, replaces Meta): `check-circle` 16px **filled**, `--icon-on-tertiary` + "Selected" `.type-label-sm`, `--text-selected`, gap 4.

## States and tokens (single)
| State | Row fill | Vendor logo | Right side |
|---|---|---|---|
| Default | `--fill-tertiary-default` (transparent) | Default | ESN |
| Highlighted (hover) | `--fill-row-highlight` | Default | ESN |
| Keyboard active | `--fill-row-highlight` + **2px inset outline** `--focus-ring` | Default | ESN |
| Pressed | `--fill-row-highlight` | Selected (teal) | ESN |
| Selected | `--fill-tertiary-default` | Selected (teal) | "Selected" mark |

Keyboard outline: `outline: 2px solid var(--focus-ring); outline-offset: -2px`. Mouse hover never shows it.

## Multi (step 2, batch 3)
Figma variants: Default `728:343`, Highlighted `728:354`, Keyboard active `911:620`, Pressed `728:365`, Selected `728:376`, Selected hover `732:352`, Selected keyboard active `911:628`.

**Anatomy:** row, `min-height` 48, padding 0 / 12, gap 12, items centered. Leading **checkbox box** 18×18 (visual only, `aria-hidden`, see `checkbox.md`) → **Name** `.type-body-md` `--text-heading`, fills, one line + ellipsis → **Meta** = the SKU count, `.type-data-sm`. No vendor logo, no "Selected" mark (the checkbox carries selection). In multi, `meta` holds "SKUs: 7".

| State | Row fill | Checkbox box | Meta color |
|---|---|---|---|
| Default | transparent | False | `--text-subtle` |
| Highlighted (hover) | `--fill-row-highlight` | False + Hover | `--text-subtle` |
| Keyboard active | `--fill-row-highlight` + 2px inset `--focus-ring` | False + Hover | `--text-subtle` |
| Pressed | `--fill-row-highlight` | True + Hover | `--text-selected` |
| Selected | transparent | True | `--text-selected` |
| Selected hover | `--fill-row-highlight` | True + Hover | `--text-selected` |
| Selected keyboard active | `--fill-row-highlight` + 2px inset `--focus-ring` | True + Hover | `--text-selected` |

The checkbox Hover look follows the **row** state (`[data-hovered]`, `[data-focus-visible]` or `data-active`), not the pointer on the box.

**Multi props:** `select="multi"`, `name`, `meta` ("SKUs: 7"), selection via React Aria `ListBox selectionMode="multiple"`. Accessible name "Truvia, 4 SKUs" (write it out; don't read "SKUs: 4"). Pluralize: "1 SKU" / "4 SKUs".

**Highlight matches** applies here too: while a query is active, wrap the matched part of the name in `<mark>` with `font-weight: 600`, no background.

## Accessibility
- `role="option"` + `aria-selected` inside `role="listbox"`; focus **stays in the search input**, rows are reached with `aria-activedescendant` (arrows move, Enter selects).
- Accessible name "Cargill, DEMO-0022" (code-backlog accessible names list).
- Logo and check are `aria-hidden`.
- Long names: one line, ellipsis, full name in `title`.

## Code backlog
- Select brands card: Row states (two fills only, no accent bar), Highlight matches (`<mark>` with weight), Keyboard, Long names.
- Accessibility: Result row Keyboard active (Rule ID 2); Min-height 48 (Rule ID 6).

## Flags
1. Every Figma row has a **1px stroke in `--fill-tertiary-default`** (an invisible border that keeps the size equal with the 2px keyboard ring, hence padding 1/13 there). In code use the inset `outline`, which takes no space; drop the border.
2. **Multi rows have no corner radius**; single rows have 6. Multi rows sit edge to edge inside the Brand list's border, so square corners look intended there. Build multi with radius 0 until Will answers (already in `docs/open-questions.md`).
3. Highlight matches (bold the matched part of the name) isn't drawn in Figma. Build it as a `<mark>` with `font-weight: 600` and no background color.
