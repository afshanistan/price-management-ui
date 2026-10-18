# Review row (molecule, step 4)

**Figma:** Review row `836:2688`, page → Cards, section "Step 4 · Review template" (Type × 2: Vendor `836:2677`, Brand `836:2685`)
> ReviewRow — read-only row (no hover, no focus stop).
> Props — name · vendorID · brandCount · vendor · value · type: vendor | brand

## Props
| Prop | Type | Notes |
|---|---|---|
| `type` | `'vendor' \| 'brand'` | |
| `name` | `string` | Vendor or brand name |
| `wordmark` | `string` | vendor only (Vendor logo sm) |
| `brandCount` | `number` | vendor only, shown as "4 brands" / "1 brand" |
| `esn` | `string` | vendor only ("DEMO-0022") |
| `vendorName` | `string` | brand only |

Figma's `Value` text property ("Nov 1, 2026") isn't shown in either variant; leave it out.

## Anatomy and sizes
Row, padding 0 / 12, gap 12, items centered, **space-between**, fills the list width. Use `min-height` (Figma fixed heights: Vendor 48, Brand 40).

- **Vendor**: left = Vendor logo **sm** (56×36, default look) + 12 gap + name group (row, gap 8, baseline): name `.type-body-md` `--text-heading` + brand count `.type-body-sm` `--text-subtle`. Right = ESN `.type-data-sm` `--text-subtle`.
- **Brand**: left = name `.type-body-md` `--text-heading`. Right = vendor name `.type-data-sm` `--text-subtle`.
- Long names: one line, ellipsis, full name in `title`.

## States
None. No hover fill, no focus stop.

## Accessibility
- Rows are `<li>` in a `<ul>`; the list (not the row) is focusable for scrolling (see the card).
- Vendor logo `aria-hidden` (name is in text).

## Code backlog
- Review template card: Read-only rows, pluralize brand count.

## Flags
1. Figma gives Review rows **fixed** heights (48 / 40) with no min-height, unlike the other text rows (Rule ID 6 says min-height everywhere). Use `min-height`; no need to ask.
2. The brand row's vendor name uses the **mono** Data/SM style (like an ID). Build it as drawn.
