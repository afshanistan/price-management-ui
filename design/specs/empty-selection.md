# Empty selection (molecule)

**Figma:** Empty selection `903:616`, page → Molecules (Layout × 2)
> EmptySelection — non-interactive placeholder (pictogram + message). Stacked for a whole panel, inline for one vendor.
> Props — message: string · helper: string · showHelper: boolean · layout: stacked | inline

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `layout` | `'stacked' \| 'inline'` | `'stacked'` | Step 1 uses stacked; inline is step 2 (one vendor without brands) |
| `pictogram` | `PictogramType` | `'vendor'` | `brand` in step 2 |
| `message` | `string` | — | "No vendors selected yet" |
| `helper` | `string \| undefined` | — | "Search above to add vendors to this template." (stacked only) |

## Anatomy and sizes
- 1px **dashed** `--border-placeholder` border, radius 8, no fill.
- **Stacked**: column, centered both ways, gap 6, padding 0 / 16, `min-height` 126. Pictogram 24 → message `.type-body-md` → helper `.type-body-sm`, both `--text-subtle`, centered text.
- **Inline**: row, gap 8, padding 10 / 12, items centered. Pictogram 24 + message only.
- Pictogram color `--icon-subtle`.

## Accessibility
- Not interactive, no focus. Plain text; pictogram `aria-hidden`.
- When it replaces the last removed vendor card, the "removed" announcement covers it; no extra live region.

## Code backlog
- Select brands card: Removing from the panel (inline empty state per vendor).
- Sizing: Empty selection min-height 126 (Rule ID 6).

## Flags
- CSS dashed borders draw shorter dashes than Figma's. If it looks off, an SVG border is the fix; log it rather than changing the token.
