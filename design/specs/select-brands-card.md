# Select brands card (card, step 2)

**Figma:** Select brands card `772:2750`, page → Cards (State × 4: Default `772:1673`, Selected `713:842`, Incomplete `893:2623`, No results `772:2223`). Final Comps 02a–02e.
> SelectBrandsCard — step 2: brand list (left) + Selected brands panel (right, full height).
> Props — state (derived from data in code, not a prop): selected | default | no-results | incomplete

Build this **last** in batch 3, after Checkbox, Status mark, Brand chip, Vendor coverage tile, Group header, Selection summary, Result row (multi), Brand list and Selected brands panel.

## Props
| Prop | Type | Notes |
|---|---|---|
| `vendors` | `Vendor[]` | The vendors picked on step 1, in that order |
| `brands` | `Brand[]` | All brands of those vendors (sample data) |
| `selectedIds` | `Set<string>` | Controlled by the app (the wizard needs it for Next and Review) |
| `onChange` | `(ids: Set<string>) => void` | |

Derived: `isComplete = every vendor has ≥ 1 selected brand`. The app uses it to unblock Next and mark step 2 complete in the stepper. Expose it as a helper (`isBrandStepComplete(vendors, selectedIds)`) so the card and the wizard use the same rule.

## Element
The card is the page's `<main>` content (the page shell owns `<main>`).

## Anatomy and sizes
- Width `--layout-content-width` (960); column, padding 24, radius 16 (`--radius-16`), 1px `--border-structural`, background `--surface-card`.
- One child, **Body**: row, gap 24, fills.
  - **Main** (fills the width), column, gap 24:
    1. **Card header**: title "Add brands to your template", `pictogram="brand"`, no description, no tag.
    2. **Directory**, column, gap 12, fills the remaining height:
       - **Text field**: label "Search by brand", search icon, **no helper** (Figma hides it), full width. Placeholder optional; don't invent one.
       - **Brand list**: fills the remaining height and scrolls inside itself.
  - **Selected brands panel**: 360 wide, full Body height.
- Height: the page shell fixes the card at **644** (code-backlog Sizing). Unlike step 1, step 2 doesn't scroll the card body: the Brand list and the panel's chip area scroll inside themselves. In Storybook, wrap the story in a 644px-tall frame so you can see that. (The Figma component hugs at 544.)

## States
| State | Search field | Brand list | Panel |
|---|---|---|---|
| Default (02a) | Default | Default, nothing checked | Empty |
| Selected | Default | rows checked, headers "4 of 5" / "9 of 9" | With selections |
| Incomplete (02d/02e) | Default | some vendor has 0 checked | Incomplete |
| No results (02c) | Filled ("xyz") | No results | (unchanged, here With selections) |

## Behavior
- Typing filters the list live (brand name, or vendor name → that vendor's brands). Focus stays in the input; arrows + Enter work the list.
- Checking a row adds a chip; × on a chip unchecks the row. Counts, coverage tiles and the badge update everywhere.
- Select all per vendor (tri-state; visible matches only during a search).
- **"All N brands" × clears the vendor with an undo toast.** There's no Toast component in Figma. Build the clear and announce it ("All General Mills brands removed") in the live region; leave the toast out and log it in `docs/open-questions.md`. Re-checking on the left is the fallback undo.
- Next (footer) is blocked (`aria-disabled`) until every vendor has ≥1 brand, with the hint "Add at least one brand for every vendor to continue." Back reads "← Edit vendors". (Wizard navigation already supports this.)
- Coming back to step 2 (Edit or Back) keeps every earlier choice; brands of a removed vendor drop out silently.

## Accessibility
- One H1 = the card title. H2 = "Selected brands". H3 = vendor names in the panel. Group headers in the list are not headings.
- Live region (polite), owned by the card: result count while typing, "Truvia added" / "Truvia removed", "All General Mills brands selected" / "removed" (Rule ID 15). One message per change.
- Page title "Add brands – Template Builder" is set by the page, not the card.
- Tab order: search field → select-all checkboxes (in list order) → panel chips' × buttons → footer.

## Sample data
Add `src/data/brands.ts` next to `vendors.ts` (shared by stories and the app), from Figma's Brand list (marked illustrative):
- **Cargill** (CGL): Clear Valley 7, Diamond Crystal 9, Honeysuckle White 31, Sterling Silver 14, Truvia 4
- **General Mills** (GMI): Annie's 11, Betty Crocker 42, Cheerios 12, Lucky Charms 6, Nature Valley 27, Old El Paso 19, Pillsbury 35, Progresso 24, Totino's 8
- **Kraft Heinz** (KHC): Heinz 21, Jell-O 16, Kool-Aid 10, Kraft 33, Lunchables 13, Oscar Mayer 23, Philadelphia 18, Velveeta 6

(Numbers are SKU counts. Use the vendor ids and wordmarks already in `vendors.ts`.) The Selected story uses Cargill 4 of 5 (all but Honeysuckle White), General Mills 9 of 9, Kraft Heinz 3 of 8 (Heinz, Kraft, Philadelphia). Incomplete = the same with Kraft Heinz at 0.

## Code backlog
All of "Select brands card (step 2)", plus Accessibility: Landmarks (Rule ID 4), announcements (Rule ID 15), keys (Rule ID 10), Wizard navigation hint (Rule ID 5).

## Flags
1. **Undo toast** isn't designed (above). Build without it and log it.
2. **General Mills wordmark:** `vendors.ts` (from step 1) says "GIS"; the step 2 coverage tiles in Figma say "GMI". Keep one source, `vendors.ts`, and log the mismatch for Will.
3. code-backlog lists "Group count wording while searching" and "Panel order: selection order vs A–Z" as open. Defaults: keep "N of M" while searching; chips in list order.
