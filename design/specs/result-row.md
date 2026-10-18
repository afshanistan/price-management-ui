# Result row (molecule)

**Figma:** Result row `678:174`, page → Molecules (Select × State: Single 5, Multi 7)
> ResultRow — option in a listbox (vendor search single, brand list multi). Keyboard active = fill + 2px inset focus outline; mouse hover = fill only.
> Props — name · meta · skuCount · select: single | multi · state (Figma only)

**Build `select="single"` now (step 1). `multi` needs the Checkbox spec, which comes with step 2.**

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

## Multi (for step 2, reference only)
Leading Checkbox 18×18 instead of the logo; no radius in Figma (see flag); Meta = SKU count and turns `--text-selected` when pressed / selected / selected-hover. States add Selected hover and Selected keyboard active.

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
2. **Multi rows have no corner radius**; single rows have 6. Probably unintended, but ask Will before step 2.
3. Highlight matches (bold the matched part of the name) isn't drawn in Figma. Build it as a `<mark>` with `font-weight: 600` and no background color.
