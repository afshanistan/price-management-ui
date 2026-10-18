# Vendor coverage tile (molecule)

**Figma:** Vendor coverage tile `891:643`, page → Molecules (Status × 2: Complete `891:630`, To do `891:637`)
> VendorCoverageTile — vendor logo + StatusMark in the coverage strip. Informational only; placeholder until real logos.
> Props — vendor: string · status: complete | to-do

## Props
| Prop | Type | Notes |
|---|---|---|
| `vendorName` | `string` | For the accessible text ("Cargill") |
| `wordmark` | `string` | Placeholder wordmark ("CGL"), same source as Vendor logo |
| `selectedCount` | `number` | For the accessible text only |
| `totalCount` | `number` | For the accessible text only |

Status is **derived**: `selectedCount > 0` → complete, else to-do. Don't take it as a separate prop.

## Anatomy and sizes
- Fixed 104 × 48 in Figma (the strip gives three tiles 103 each; let the strip size them: `flex: 1 1 0`, height 48). Padding 0 / 12, content centered, radius 8.
- Fill `--fill-coverage-tile`; wordmark `.type-label-sm`, `--text-on-coverage-tile`.
- **Status mark** (16) absolutely positioned top-right: **6px from the top, 6px from the right** (Figma x 82 in a 104 tile).
- Counts are **not** in the tile. They sit beside the vendor label in the panel ("Cargill 4 of 5").

## States
Complete / To do only change the Status mark. No hover, no focus, not a button, not a filter.

## Accessibility
- Render as a list item in the strip (`<ul aria-label="Brand coverage">` in the panel).
- Text for screen readers (visually hidden): "Cargill, 4 of 5 brands selected, complete" / "Kraft Heinz, 0 of 8 brands selected, to do". Wordmark and Status mark `aria-hidden`.

## Code backlog
- Select brands card: Coverage strip; Coverage tile = placeholder until real logos (redesign in Storybook once monochrome vendor SVGs exist); Real vendor logos (`fill="currentColor"`).
- Accessibility: accessible names ("coverage tile").

## Flags
None. It's a placeholder by design; don't polish it beyond Figma.
