# Summary stat (molecule, step 4)

**Figma:** Summary stat `832:2673`, page → Cards, section "Step 4 · Review template" (Status × 2: Complete `832:2661`, Optional `832:2667`)
> SummaryStat — big number + label; complete shows the citron check, optional shows the Tag.
> Props — value: string · label: string · status: complete | optional

## Props
| Prop | Type | Notes |
|---|---|---|
| `value` | `string` | "5", "20", "1 of 3" |
| `label` | `string` | "Vendors", "Brands", "Presets set" |
| `status` | `'complete' \| 'optional'` | |
| `srLabel` | `string` | "5 vendors, complete" / "1 of 3 presets set, optional" |

## Anatomy and sizes
- Column, padding 16, gap 4, fills its third of the strip.
- **Value**: `.type-display-number` (Bricolage 800 40/44), `--text-heading`. Display/Number is only used on Review.
- **Meta** row, gap 8, items centered: label `.type-body-sm` `--text-subtle` + either
  - **complete**: a 16px round check badge, fill `--fill-status-complete`, check stroke 1.7px `--text-on-status-complete` (inline SVG). Visually the same as Status mark Complete but **without the border**. Reuse StatusMark if you add a `bordered={false}` option, or draw it here.
  - **optional**: **Tag** "Optional".
- Presets always show the Tag, never a check or a warning, whatever the count.

## Accessibility
- Visually hidden `srLabel` replaces the visual pieces (value, label, badge/tag `aria-hidden`), so it reads "5 vendors, complete".
- Not interactive.

## Code backlog
- Review template card: Summary stat.

## Flags
None.
