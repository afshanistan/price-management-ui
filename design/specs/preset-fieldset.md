# Preset fieldset: Currency preset, Pricing model preset (molecule)

**Figma:** Currency preset `796:2752`, Pricing model preset `796:2785`, page → Cards, section "Step 3 · Global presets"
> CurrencyPreset — fieldset + legend of Option tiles.
> PricingModelPreset — fieldset + legend of Option tiles (names are placeholders).

Both are the same pattern. Build **one** `PresetFieldset` and two thin wrappers (or just data). Dates preset uses the same shell plus the picker (`dates-preset.md`).

## Props (PresetFieldset)
| Prop | Type | Notes |
|---|---|---|
| `title` | `string` | "Currency" |
| `helper` | `string` | "Choose which currency to use." |
| `options` | `{ value, label, description?, layout }[]` | |
| `value` | `string` | Controlled; `'none'` = No default |
| `onChange` | `(value: string) => void` | |

## Element
React Aria **`RadioGroup`** (renders `role="radiogroup"` with native radio inputs inside; arrow keys move the selection). Title = the group's `Label` (this is the "legend"; **not a heading**, code-backlog Landmarks). Helper = `Text slot="description"`. A native `<fieldset>` + `<legend>` is fine too if you prefer; same result.

## Anatomy and sizes
- Column, gap 16, fills its grid column.
- **Top edge**: 3px `--border-brand-strong` across the full width (`border-top`). Figma draws it as an "Accent edge" rectangle followed by the 16 gap, so use `border-top: 3px solid var(--border-brand-strong); padding-top: 16px`.
- **Heading**: column, gap 4. Title `.type-heading-sm` (Bricolage 600 18/24) `--text-heading`; helper `.type-body-sm` `--text-subtle`.
- **Options**: column, gap 8, Option tiles at full width.

## Options
| Preset | Title / helper | Options (first is the initial value) |
|---|---|---|
| Currency | "Currency" / "Choose which currency to use." | **No default** (Stacked, no description) · USD "US dollar" · CAD "Canadian dollar" · MXN "Mexican peso" (Inline) |
| Pricing model | "Pricing model" / "Choose how prices are calculated." | **No default** · Fixed price · Cost plus · Target margin (all Stacked, no description) |

Pricing model is a setting only (no markup/margin values). The three names are placeholders; keep them in data, not in the component.

## Behavior
- One selection per group (code enforces it; the Figma prototype can show several).
- "No default" is the initial value.

## Accessibility
- `radiogroup` named by the title, described by the helper. One tab stop per group.

## Code backlog
- Global presets card: Radio groups, Pricing model names, Grid (superseded, see the card spec).

## Flags
None.
