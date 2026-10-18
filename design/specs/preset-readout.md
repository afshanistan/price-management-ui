# Preset readout (molecule, step 4)

**Figma:** Preset readout `843:3144`, page → Cards, section "Step 4 · Review template" (one component)
> PresetReadout — label over value; "No default" in text-subtle.
> Props — label: string · value: string

## Props
| Prop | Type | Notes |
|---|---|---|
| `label` | `string` | "Effective date", "Currency", "Pricing model" |
| `value` | `string \| null` | `null` → shows "No default" |

## Anatomy and sizes
- Column, padding 12 / 16, gap 4, fills its third of the presets strip.
- Label `.type-body-sm` `--text-subtle`; value `.type-body-md` `--text-heading`, or **"No default" in `--text-subtle`**.

## Accessibility
Use a description list in the strip: `<dl>` with each readout as `<div><dt>Label</dt><dd>Value</dd></div>`. Not interactive.

## Code backlog
- Review template card: Presets strip.

## Flags
None.
