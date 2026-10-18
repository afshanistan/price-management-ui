# Selected item card (molecule)

**Figma:** Selected item card `707:717`, page → Molecules (Layout = Stacked only)
> SelectedItemCard — a chosen vendor (logo, name, ESN) with a destructive remove button.
> Props — name: string · meta: string · skuCount: string · layout: stacked

## Props
| Prop | Type | Notes |
|---|---|---|
| `name` | `string` | "Cargill" |
| `meta` | `string` | ESN, "DEMO-0022" |
| `wordmark` | `string` | For the Vendor logo |
| `onRemove` | `() => void` | Destructive Icon button |

No `layout` prop: Stacked is the only layout left (Inline and Row were deleted Oct 17). `skuCount` exists in Figma but isn't shown on step 1; leave it out.

## Anatomy and sizes
- Row, padding 12, gap 12, radius 8, 1px `--border-structural`, background `--surface-card`. Height 126 in Figma; use `min-height`.
- **Identity** column (fills), gap 12:
  - Vendor logo **lg** (80×48), shown in the **selected** (teal) style.
  - Text column, gap 2: name `.type-body-md` `--text-heading` (one line, ellipsis) + ESN `.type-data-sm` `--text-subtle`.
- **Remove**: Icon button `tone="destructive"`, `trash`, top-right (row aligns to the top).

## In the step 1 card
Three across in a wrapping grid, gap 16 both ways (Figma: 293 wide each in 910). Use `grid-template-columns: repeat(3, 1fr)`.

## Accessibility
- A list of cards: wrap them in `<ul aria-label="Selected vendors">` / `<li>`.
- Remove button `aria-label="Remove Cargill"`. After removal, move focus to the next card's Remove, or to the search field if none are left, and announce "Cargill removed".
- Logo `aria-hidden` (name is in text).

## Code backlog
- Select brands card: Vendor logo hover (proposed, not decided) mentions this card too. Don't build.
- Accessibility: accessible names ("Remove Cargill"); min-height 48 is listed in Rule ID 6 for the old Row layout. Use min-height on Stacked too.

## Flags
- Focus after remove isn't specified in Figma or the annotations. Build as above and log it in `docs/open-questions.md`.
