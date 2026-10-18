# Pictogram (atom)

**Figma:** Pictograms `650:15`, page → Atoms (Type × 4)
> Pictogram — filled identity illustration for cards and empty states (icons are for function, pictograms for identity).
> Props — type: vendor | brand | presets | placeholder

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `type` | `'vendor' \| 'brand' \| 'presets' \| 'placeholder'` | — | Required |
| `size` | `24 \| 40` | `24` | Drawn on a 20 grid and scales. 24 in Empty selection and the 32 Icon tile; **40** in the Card header's 48 tile |

Separate from `Icon`: pictograms have **one** drawing (always filled), no `filled` prop.

## Artwork
`src/assets/pictograms/<type>.svg` (exported Oct 17, every fill `currentColor`, `aria-hidden`). viewBox 0 0 20 20.

## Color
`color: inherit`, like Icon. The container sets it:
| Where | Figma Icon mode | Container `color` |
|---|---|---|
| Icon tile (card header) | Brand | `--icon-brand` |
| Empty selection | Subtle | `--icon-subtle` |

## Accessibility
Always decorative (`aria-hidden="true"`); the text next to it carries the meaning.

## Code backlog
- Global: icon color = `currentColor`.

## Flags
- The artwork couldn't be previewed during export. Check the story against the Atoms page in Figma.
