# Brand chip (molecule)

**Figma:** Brand chip `891:629`, page → Molecules (Type × State: Brand / All brands × Default / Hover)
> BrandChip — a selected brand in the basket; only the × reacts (24px target, teal, no red). "All N brands" collapses a full vendor.
> Props — brand: string · summary: string · type: brand | all-brands · state (Figma only; in code these are pseudo-classes / ARIA): default | hover

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `type` | `'brand' \| 'all'` | `'brand'` | |
| `label` | `string` | — | Brand name ("Truvia") or summary ("All 9 brands") |
| `removeLabel` | `string` | — | "Remove Truvia" / "Remove all General Mills brands" |
| `onRemove` | `() => void` | — | |

## Anatomy and sizes
Pill, radius full, fill `--fill-chip`, 1px border `--border-chip`. The chip body never reacts.

| | Brand | All brands |
|---|---|---|
| Height | 30 (hugs) | 34 (hugs) |
| Padding | 2 right/top/bottom, 10 left | 4 right/top/bottom, 14 left |
| Gap label → × | 4 | 8 |
| Width | hugs the label | **fills** the panel width |
| Label | `.type-body-sm` (Geist 13/18), `--text-on-chip` | `.type-label-sm` (Geist Medium 12/16), `--text-on-chip`, fills |

- Use `min-height` 30 / 34, not `height` (text may grow).
- **Remove button**: 24×24 round (`--radius-full`), centered `close` icon at 16px, color `--text-on-chip` (code-backlog: 1.5px Teal/800 ×; the icon inherits `currentColor`). Use the Icon button pattern or a plain `<button>`; it's *not* the destructive tone.

## States and tokens
| State | Remove circle |
|---|---|
| Default | transparent |
| Hover (on the ×) | `--fill-chip-remove-hover` |
| Pressed | same as hover (no separate token) |
| Focus visible | round focus ring on the button: `outline` 2px `--focus-ring`, offset 1px, radius full (Rule ID 8) |

No red anywhere. Removing a chip is low-stakes and reversible.

## Behavior
- × on a **Brand** chip unchecks that brand in the Brand list.
- × on **All brands** clears the whole vendor **and shows an undo toast**. There's no Toast component in Figma yet. In Storybook, just call `onRemove`; the card spec covers the toast.
- Long brand names: one line + ellipsis, full name in `title`. A chip never grows wider than the panel (`max-width: 100%`).

## Accessibility
- Chip is plain text + a button. The button's `aria-label` is `removeLabel`; the visible label isn't repeated.
- After a chip is removed, focus moves to the next chip's ×, else the previous one, else the vendor's empty state's parent region (see `selected-brands-panel.md`).

## Code backlog
- Select brands card: Brand chip styling, "All N brands" chip, Removing from the panel, Long brand names, Pluralize.
- Accessibility: Brand chip × target (Rule ID 12), accessible names (Rule ID 13), round focus ring (Rule ID 8).

## Flags
1. Figma's Close icon instance is 16px but has its width bound to `size/24` (a leftover binding). Build the icon at 16 inside the 24 target, as drawn.
2. Padding values 2, 10 and 14 may not all exist as space tokens. If one is missing, add it to `docs/figma-sync.md` the usual way (with a stand-in) rather than using a raw number.
