# Selected brands panel (organism, step 2)

**Figma:** Selected brands panel `756:1494`, page → Cards, section "Step 2 · Select brands" (State × 3: With selections `756:1243`, Incomplete `892:3029`, Empty `756:1474`)
> SelectedBrandsPanel — the basket: summary, coverage strip, chips by vendor; 3px plum top edge.
> Props — state (derived from data in code, not a prop): with-selections | empty | incomplete

## Props
| Prop | Type | Notes |
|---|---|---|
| `vendors` | `Vendor[]` | Step-1 order |
| `brandsByVendor` | `Record<vendorId, Brand[]>` | All brands per vendor (for "N of M" and "All N brands") |
| `selectedIds` | `Set<string>` | |
| `onRemove` | `(brandId: string) => void` | |
| `onRemoveVendor` | `(vendorId: string) => void` | From the "All N brands" chip |

State is derived: nothing selected → Empty; some vendor has 0 → Incomplete; otherwise With selections.

## Element
`<aside aria-labelledby="selected-brands-title">` or `<section>`; the H2 is the Selection summary title.

## Anatomy and sizes
- Fixed **width 360**, **fills the card body height** (beside the card header + search + list). Column, padding 16, gap 16, radius 8, overflow hidden.
- Border: 1px `--border-structural` on left, right and bottom; **top edge `border-top: 3px solid var(--border-brand-strong)`** (the Figma "Accent edge" rectangle is a stand-in). No fill (it's on the card's `--surface-card`).
- Children, top to bottom:
  1. **Selection summary**: "Selected brands" + CountBadge. Pinned.
  2. **Coverage strip**: row, gap 8, one **Vendor coverage tile** per vendor (equal widths). Pinned. `<ul aria-label="Brand coverage">`.
  3. **Divider**: 1px `--border-structural`.
  4. **Chips by vendor**: column, gap 16, **fills the rest and scrolls** (`overflow-y: auto`, `min-height: 0`). One group per vendor:
     - **Label row**, gap 6: vendor name `.type-body-xs` `--text-brand` + "4 of 5" `.type-body-xs` `--text-subtle`. The vendor name is an **H3** (Landmarks: H3 = vendor groups inside a panel), styled small.
     - 8px below: **chips**, wrapping row, gap 6 both ways. Brand chips in list order. When every brand is selected: one full-width **All brands** chip ("All 9 brands") instead.
     - **0 brands** (Incomplete): Empty selection **inline**, brand pictogram, "No Kraft Heinz brands yet".

## States
| State | Badge | Coverage tiles | Chip area |
|---|---|---|---|
| With selections | complete, "16" | all complete | groups of chips |
| Incomplete | todo, "13" | the 0-brand vendor is to-do | that vendor shows the inline empty state |
| Empty | todo, "0" | all to-do | one **stacked** Empty selection filling the area: brand pictogram, "No brands selected yet", helper "Check brands on the left. Each vendor needs at least one." |

## Behavior
- Chips mirror the Brand list (left ↔ right sync). × unchecks the row on the left.
- Vendor collapses to "All N brands" when all are selected; unchecking any brand splits it back into chips. "All" is a snapshot (today's brands).
- "All N brands" × clears the vendor (undo toast, see card spec).
- After a removal, focus goes to the next chip's ×, else the previous chip's ×, else the vendor's H3 (give it `tabindex="-1"`). Log this in `docs/open-questions.md` (not specified in Figma; same question as step 1's focus after remove).
- Pluralize: "1 of 1"; "All 1 brand" reads oddly, so a single-brand vendor just shows its one chip.

## Accessibility
- H2 "Selected brands" (Selection summary), H3 per vendor.
- Chips inside each vendor: `<ul>` / `<li>`.
- Coverage tiles carry the full text ("Cargill, 4 of 5 brands selected, complete").

## Code backlog
- Select brands card: Panel top edge, Panel fills the card, Coverage strip, Removing from the panel, "All N brands" chip, Large partial selections (parked; don't build "Show more"), Count badge = whole step.

## Flags
1. **Incomplete note.** code-backlog says a newly added vendor shows a "Sysco needs at least one brand." note in the panel. Figma's Incomplete state shows the inline empty state ("No Kraft Heinz brands yet") instead, with no separate note. Build Figma's version; the footer hint already says what to do.
