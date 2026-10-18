# Vendor logo (atom)

**Figma:** Vendor logo `677:34`, page → Atoms
> VendorLogo — placeholder wordmark tile; real monochrome SVGs rendered with currentColor in code.
> Props — wordmark: string

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `vendor` | `string` | — | Full vendor name, used as the accessible name |
| `wordmark` | `string` | — | Placeholder text in the tile ("CGL") until real logos exist |
| `size` | `'sm' \| 'lg'` | `'sm'` | sm = 56×36 (Result row); lg = 80×48 (Selected item card) |
| `isSelected` | `boolean` | `false` | Set by the parent row/card. Teal tile, see below |

## Anatomy and sizes
- Fixed tile (icon-like square rule: fixed, not min-height). sm 56×36, lg 80×48.
- Padding 2 / 4, content centered, radius 4 (`--radius-4`).
- Wordmark: `.type-label-xs` (Geist Medium 11/16).

## States and tokens
| State | Background | Border (1px) | Wordmark |
|---|---|---|---|
| Default | `--fill-vendor-logo` | `--border-structural` | `--text-subtle` |
| Selected / pressed (set by parent) | `--fill-row-indicator` | `--fill-row-indicator` | white ink, see flag 1 |

## Accessibility
- The tile is decorative inside a row that already names the vendor; when used alone it needs the vendor name (code-backlog "Screen reader text": "Each Vendor logo needs its vendor name as accessible text"). Use `role="img" aria-label={vendor}` only when standalone; otherwise `aria-hidden`.

## Code backlog
- Real vendor logos: monochrome SVG, `fill="currentColor"`, `object-fit: contain`, padded fixed tile.
- Vendor logo hover (proposed, decide in code): white tile + teal border + teal ink on hover. **Not decided. Don't build yet; log it.**

## Flags
1. Figma only defines the Default tile. The selected/pressed teal tile comes from overrides in Result row and Selected item card (`--fill-row-indicator` fill + stroke); the wordmark color in that state isn't bound in the component. Use `--text-on-primary` for the wordmark on teal and log it in `docs/open-questions.md`.
