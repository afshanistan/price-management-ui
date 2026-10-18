# Brand list (organism, step 2)

**Figma:** Brand list `744:777`, page → Cards, section "Step 2 · Select brands" (State × 2: Default `738:753`, No results `744:755`)
> BrandList — multi-select listbox of brands grouped by vendor.
> Props — state (derived from data in code, not a prop): default | no-results

## Props
| Prop | Type | Notes |
|---|---|---|
| `groups` | `{ vendor: Vendor; brands: Brand[] }[]` | Already filtered by the query, in step-1 vendor order |
| `query` | `string` | For highlight matches and the no-results message |
| `selectedIds` | `Set<string>` | Controlled by the card |
| `onSelectionChange` | `(ids: Set<string>) => void` | |
| `onSelectAll` | `(vendorId: string) => void` | Group header checkbox |
| `activeId` | `string \| undefined` | Row referenced by the input's `aria-activedescendant` |

`Brand = { id, name, vendorId, skuCount }`. "No results" = every group is empty after filtering.

## Element
React Aria **`ListBox`** with `selectionMode="multiple"`, one **`ListBoxSection`** per vendor whose **`Header`** is the Group header, rows are multi **Result rows**. Keep focus in the search input; the input points at the active row with `aria-activedescendant` (React Aria `Autocomplete` + `ListBox`, or wire it by hand the same way the step 1 Results panel was done; reuse that approach).

## Anatomy and sizes (Default)
- Column, no gap, fills the space under the search field (width and height), radius 8, 1px `--border-structural`, background `--surface-card`, `overflow-y: auto` (Figma: vertical scrolling, clips content).
- Per vendor: **Group header** (sticky, select-all checkbox shown, count "0 of 5") then its multi **Result rows**. No gap between rows, no dividers.
- Figma also puts **`Elevation/2 – floating`** on it (see flag).

## No results
- Same box, hugs: one message row, padding 12, text `.type-body-md` `--text-subtle`: **No brands match “xyz”.** (curly quotes around the query).
- In the card, the search field shows its Filled state (clear button visible).

## Behavior
- Typing filters live by brand name; a query that matches a **vendor name** shows all of that vendor's brands.
- Groups with no matches disappear entirely (no empty header).
- **Arrows** move the active row (across groups, skipping headers); **Enter** toggles it; Space types a space (focus is in the input). The query stays after toggling.
- The select-all checkbox in each header is a separate tab stop (Tab from the input reaches them in order).
- Highlight matches in names (`<mark>`, weight 600).

## Accessibility
- `role="listbox" aria-multiselectable="true"`, an accessible name ("Brands"), groups labelled by the vendor name, rows `role="option"` + `aria-selected`.
- Result count announced politely while typing ("12 brands match"; "No brands match xyz"). The card owns the live region.
- The select-all checkbox inside a section header is an interactive control inside a listbox. axe may flag it (`aria-required-children` / nested interactive). If it does, keep the header and checkbox visually where they are but render each section's header outside the `role="group"`/options structure, and log what you did in `docs/open-questions.md`.

## Code backlog
- Select brands card: Left ↔ right sync, Select all per vendor, Search by vendor name too, Highlight matches, Keyboard, Sticky group headers, Groups drop out when empty, Collapsible vendor groups (parked), Row states.
- Accessibility: Result row Keyboard active (Rule ID 2), keys (Rule ID 10), announcements (Rule ID 15).

## Flags
1. **Floating shadow on an inline list.** Figma gives the Brand list `Elevation/2 – floating` (and radius 8), though it sits inside the card, not over it. It's probably left over from when it was a dropdown. Build it **without** the shadow and log it in `docs/open-questions.md` for Will.
