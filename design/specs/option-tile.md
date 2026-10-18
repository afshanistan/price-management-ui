# Option tile (molecule)

**Figma:** Option tile `816:419`, page → Molecules (Layout × State: Stacked / Inline × Default / Hover / Pressed / Selected / Selected hover)
> OptionTile — radio choice as a full tile (min-height 56); whole tile is the label.
> Props — label: string · description: string · showDescription: boolean · showAction: boolean · layout: stacked | inline · state (Figma only)

It replaced the old Radio row (archived Oct 17), so where code-backlog says "Radio row" / "row fills match the Result row", **this spec wins**.

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `string` | — | React Aria `Radio` value |
| `label` | `string` | — | "Next month" |
| `description` | `string \| undefined` | — | "Nov 1, 2026", "US dollar". Omit to hide |
| `layout` | `'stacked' \| 'inline'` | `'stacked'` | Stacked = description under the label; Inline = beside it |
| `action` | `ReactNode \| undefined` | — | Trailing Icon button (Custom date's calendar). Omit to hide |

## Element
A React Aria **`Radio`** inside the preset's `RadioGroup`. The tile is a wrapper `div` holding the `Radio` (label + hidden input + circle + text) and, if present, the **action button as a sibling**. Never nest the button inside the radio's label.

## Anatomy and sizes
- Row, `min-height` 56, padding 0 / 12, gap 12, items centered, radius 8 (`--radius-8`), fills the column width.
- **Radio slot** 18 × 20, the Radio centered in it.
- **Text** (fills):
  - Stacked: column, gap 2. Label `.type-label-lg` (Geist Medium 14/20) + description `.type-body-xs` (12/16) `--text-subtle`.
  - Inline: row, gap 8, aligned on the **baseline**. Label hugs, description fills.
- **Action**: Icon button, Size Medium (32), Tone Default, `calendar` icon.

## States and tokens
| State | Fill | Border | Radio | Label |
|---|---|---|---|---|
| Default | `--surface-card` | 1px `--border-structural` | False | `--text-default` |
| Hover | `--surface-card` | 1px `--border-input-hover` | False + Hover | `--text-default` |
| Pressed | `--fill-row-selected` | 1.5px `--border-selected` | True + Hover | `--text-selected` |
| Selected | `--fill-row-selected` | 1.5px `--border-selected` | True | `--text-selected` |
| Selected hover | `--fill-row-highlight` | 1.5px `--border-selected` | True + Hover | `--text-selected` |
| Focus visible | as current state + `outline` 2px `--focus-ring`, offset 2px on the tile (`:has(input:focus-visible)` or React Aria `data-focus-visible`) | | | |

- Description stays `--text-subtle` in every state.
- Draw the border with `box-shadow: inset 0 0 0 <width> <color>` (or keep `border` 1.5px everywhere with a transparent half) so the 1 → 1.5px change doesn't nudge the content by half a pixel. Figma strokes are inside, so nothing moves there.
- Motion: 150ms ease-out on fill/border, per the global rule.

## Accessibility
- Name = label; description linked with `aria-describedby` ("Next month", described by "Nov 1, 2026").
- Arrow keys move the selection within the group (React Aria). One tab stop per group.
- Action button: its own name ("Choose custom date"), its own tab stop after the group.

## Code backlog
- Global presets card: Radio groups, Radio labels, Custom date flow.
- Sizing: Option tile min-height 56 (Rule ID 6).

## Flags
1. **Label weight.** code-backlog "Radio labels" says always 600 weight (only the color changes on select). Figma uses Label/LG = Geist **Medium 500**, in every state. Only the color changes, so either way there's no width shift. Build Figma's 500 and log it.
