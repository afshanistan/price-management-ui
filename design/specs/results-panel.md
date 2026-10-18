# Results panel (organism)

**Figma:** Results panel `688:249`, page → Organisms (State × 2)
> ResultsPanel — floating listbox under the vendor search (Elevation/2). Esc / click outside / blur close it.
> Props — message: string · state (derived from data in code, not a prop): results | no-results

## Props
| Prop | Type | Notes |
|---|---|---|
| `items` | `Vendor[]` | Filtered results; empty = No results state |
| `query` | `string` | For the No results message and match highlighting |
| `selectedKeys` | `Set<string>` | Vendors already added show as Selected |
| `onSelect` | `(vendor) => void` | Selecting adds the vendor immediately |

Build with React Aria **`ComboBox`**-style behavior (input + `Popover` + `ListBox`), so `aria-activedescendant`, arrows, Enter and Esc come for free. The Text field is the combobox input.

## Anatomy and sizes
- Floating, anchored under the Text field's input, **same width as the input** (910 in the card), `position: absolute` over the content below (the card doesn't grow).
- Padding 4, gap 2 between rows, radius 8, 1px `--border-structural`, background `--surface-card`, shadow `--elevation-2`.
- Rows: Result row `select="single"`, full width.
- Max height in Figma: 7 rows (308px). Scroll the list inside beyond that (`overflow-y: auto`, `max-height` ≈ 308).
- **No results**: one message row, padding 12, `.type-body-md`, `--text-subtle`: "No vendors match "xyz"." (curly quotes around the query).

## States
| State | Content |
|---|---|
| Results | Result rows (selected vendors show the Selected mark) |
| No results | Message row only |
| Closed | Not rendered (empty query, Esc, click outside, blur) |

## Accessibility
- Listbox `role="listbox"`, labelled by the field label.
- Closes on **Esc** (focus stays in the input), click outside and blur (Rule ID 11).
- Announce the result count politely ("7 vendors found" / "No vendors match xyz") in a live region (Rule ID 15).
- Selecting a vendor keeps focus in the search and announces "Cargill added".

## Code backlog
- Accessibility: popover dismissal (Rule ID 11), announcements (Rule ID 15).

## Flags
- Whether an already-selected vendor can be clicked again to remove it isn't decided. Figma only shows it as Selected. Make re-selecting a no-op and log it in `docs/open-questions.md`.
