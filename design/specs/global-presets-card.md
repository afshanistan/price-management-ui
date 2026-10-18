# Global presets card (card, step 3)

**Figma:** Global presets card `791:2631`, page → Cards, section "Step 3 · Global presets" (one component). Final Comps 03a (default), 03b (date picker open), 03c (custom date set).
> GlobalPresetsCard — step 3: three fieldsets (Effective date, Currency, Pricing model).

Build last in batch 4, after Radio, Option tile, Calendar day, Date picker, Preset fieldset and Dates preset.

## Props
| Prop | Type | Notes |
|---|---|---|
| `value` | `{ effectiveDate: DatesValue; currency: string; pricingModel: string }` | Controlled by the app (Review needs it) |
| `onChange` | `(value) => void` | |
| `today` | `CalendarDate` | Passed to Dates preset |

`presetsSetCount(value)` (0–3, how many aren't "No default") is a helper Review uses ("1 of 3").

## Element
The card is the page's `<main>` content.

## Anatomy and sizes
- Width `--layout-content-width` (960); column, padding 24, gap 24, radius 16, 1px `--border-structural`, `--surface-card`.
- **Card header**: title "Add pricing defaults", `pictogram="presets"`, **Tag "Optional"** (`showTag`), no description.
- **Preset grid**: CSS grid, **3 equal columns** (`grid-template-columns: repeat(3, 1fr)`), **column gap 32**. Order left to right: **Effective date** (Dates preset) · **Currency** · **Pricing model**.
- Height: hugs at 451 in Figma; the page shell fixes 644 with the body scrolling. The Date picker is a portal popover, so it isn't clipped.

## Behavior
- The step is optional: **Next is never blocked**. Footer: "← Edit brands" / "Review template →".
- Values are kept when leaving and coming back (Edit from Review lands here with everything as it was).

## Accessibility
- H1 = "Add pricing defaults" + the Tag, read as "Add pricing defaults, optional" (see `tag.md`).
- The three preset titles are radio-group labels (legends), **not headings**.
- Tab order: Effective date group → calendar button → Currency group → Pricing model group → footer.
- Page title "Add pricing defaults – Template Builder" (set by the page).

## Sample data
Today = **Oct 17, 2026** in stories (so Next month = Nov 1, 2026 and Next quarter = Jan 1, 2027, as in Figma). Confirmed custom date story: Oct 28, 2026. Open picker story: Figma shows March 2027 with the 14th highlighted; any month is fine.

## Code backlog
- Global presets card (step 3): Tag, Radio groups, Radio labels, Custom date flow, Pricing model names.
- Accessibility: Landmarks (Rule ID 4), dismissal (Rule ID 11), announcements (Rule ID 15).

## Flags
1. **Grid layout.** code-backlog "Grid" says 2 columns with Dates spanning both. Figma (the later design) has 3 equal columns, gap 32, Dates first. Build Figma's and log that the backlog item is superseded.
2. **Effective date typed field**: see `dates-preset.md` flag 1 (open question, building "no typed input").
