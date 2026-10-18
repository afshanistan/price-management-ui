# Icon tile (molecule)

**Figma:** Icon tile `649:119`, page → Molecules
> IconTile — light plum tile holding a pictogram; a label, not an action.

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `pictogram` | `PictogramType` | — | `vendor` on step 1, `brand` step 2, `presets` step 3 |
| `size` | `32 \| 48` | `32` | The component is 32; the Card header uses it at **48** |

## Anatomy and sizes
- Fixed square, padding 4, pictogram fills the rest: **32 tile → 24 pictogram**, **48 tile → 40 pictogram** (Card header).
- Background `--fill-icon-tile`, radius 4.
- Pictogram color `--icon-brand` (Figma Icon mode Brand).

## Accessibility
Decorative (`aria-hidden="true"`). Not interactive, no hover.

## Code backlog
- Global.

## Flags
None.
