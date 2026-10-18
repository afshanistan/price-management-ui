# Review template card (card, step 4)

**Figma:** Review template card `830:2654`, page → Cards, section "Step 4 · Review template" (one component). Final Comps 04.
> ReviewTemplateCard — step 4: summary strip, Vendors | Brands scrolling lists, presets strip.

Build last in batch 4, after Summary stat, Review row and Preset readout.

## Props
| Prop | Type | Notes |
|---|---|---|
| `vendors` | `Vendor[]` | From step 1 |
| `selectedBrands` | `Brand[]` | From step 2, grouped/ordered by vendor |
| `presets` | `GlobalPresetsValue` | From step 3 |
| `onEdit` | `(step: 'vendors' \| 'brands' \| 'presets') => void` | The app jumps to that step |

## Element
The card is the page's `<main>` content.

## Anatomy and sizes
- Width `--layout-content-width` (960); column, padding 24, gap 24, radius 16, 1px `--border-structural`, `--surface-card`. Figma height 644, the same fixed height the shell uses.
- Children, top to bottom:
  1. **Card header**: title "Congrats! Your template is ready for download", **description shown**: "Confirm the scope and defaults for your pricing template." Pictogram: see flag 1. No tag.
  2. **Summary strip**: row, radius 12, 1px `--border-structural`, three **Summary stats** of equal width with 1px `--border-structural` vertical dividers between:
     Vendors (complete) · Brands (complete) · Presets set "1 of 3" (optional).
  3. **Scope columns**: two equal columns, gap 24 (`grid-template-columns: 1fr 1fr; align-items: stretch`). Each is a **section**, column, gap 8:
     - **Section header**: row, space-between, items centered. Title group (gap 8): pictogram 20 (`vendor` / `brand`) + H2 `.type-heading-sm` `--text-heading` ("Vendors" / "Brands"). Right: **Edit** button (XSmall, Tertiary, leading icon).
     - **List**: radius 12, 1px `--border-structural`, `overflow-y: auto`, **max-height 230** (see flag 2). Review rows (Vendor type / Brand type) separated by 1px `--border-structural` dividers (`li + li { border-top }`). The shorter box stretches to match the taller so the bottoms align; empty space stays plain.
  4. **Global presets section**: section header with pictogram `presets`, H2 "Global presets", **Tag "Optional"** (gap 8), Edit on the right. Below: a strip, radius 12, 1px border, three **Preset readouts** with vertical dividers, columns aligned with the summary strip's: Effective date · Currency · Pricing model.

## Behavior
- **Edit = jump to that step, then the normal wizard** (code-backlog): Edit vendors → step 1; Edit brands → step 2; Edit presets → step 3. No special return-to-review logic. Every earlier choice is kept.
- Rows are read-only: no hover, no focus.
- Footer: "← Edit presets" / **"Download template"** (Primary XLarge, `download` icon). What download does is out of scope for Storybook; the app can stub it.
- Few items → lists shrink and the card gets shorter (in Storybook; the shell fixes 644).

## Accessibility
- H1 = card title; H2 = Vendors, Brands, Global presets.
- Edit buttons: visible "Edit" + `aria-label` "Edit vendors" / "Edit brands" / "Edit presets" (WCAG 2.5.3: name starts with the visible label).
- Scrolling lists: `tabindex="0"`, `role="region"` (or the `<ul>` itself) with a name like "Brands, 20" so keyboard users can scroll them.
- Summary stats read "5 vendors, complete", "20 brands, complete", "1 of 3 presets set, optional".
- Page title "Review template – Template Builder".

## Sample data
Build from the shared `vendors.ts` / `brands.ts` and a presets value. A good story: the step 2 "Selected" data (Cargill 4, General Mills 9, Kraft Heinz 3 = 16 brands; 3 vendors) and presets Effective date Nov 1, 2026 · Currency USD · Pricing model No default ("1 of 3"). Also a "long lists" story with many brands to show the scrolling, and a "few items" story.

## Code backlog
- Review template card (step 4): Edit = jump to that step, Read-only rows, Side-by-side scrolling lists, Presets strip, Summary stat, Wizard footer, Button XSmall.
- Accessibility: Landmarks (Rule ID 4), accessible names (Rule ID 13).

## Flags
1. **Pictogram.** The Review card header uses Pictograms **Type=Placeholder** in Figma. There's no "review" pictogram. Build with `placeholder` and log it.
2. **List max height.** code-backlog says ~6½ brand rows, **266px**. Figma's lists are now **230** tall, which is what fits in the fixed 644 card. Build 230 and log it.
3. **Edit icon**: still the placeholder icon (existing open question). Use `placeholder`.
