# Checkbox (atom)

**Figma:** Checkbox `728:38`, page → Atoms (Checked × State: False / True / Mixed × Default / Hover)
> Checkbox — tri-state (mixed = some selected). Press scale-up + check draw-in are code-only.
> Props — checked: false | true | mixed · state (Figma only; in code these are pseudo-classes / ARIA): default | hover

## Two uses, two different elements
The same visual is used in two places that behave differently:

1. **Select all in a Group header**: a real, focusable checkbox. Use React Aria **`Checkbox`** with `isIndeterminate` for Mixed. It's a tab stop.
2. **Inside a multi Result row**: **decoration only**. The row is the `role="option"` and carries `aria-selected`; focus stays in the search input. Render the box as a plain `<span aria-hidden="true">` with the same styles, driven by the row's selected state. Don't put a second interactive control inside an option.

Build one visual component (`CheckboxBox`) and use it inside both, so the styles live in one place.

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `checked` | `boolean \| 'mixed'` | `false` | Visual box |
| (Checkbox) `isSelected`, `isIndeterminate`, `onChange`, `aria-label` | React Aria | | Select-all only |

## Anatomy and sizes
- Fixed 18×18, radius 4 (`--radius-4`), 1.5px border (`--border-width-1-5`). Icon-only square, fixed size.
- Check: 9×7 stroke path, 2px, `--icon-on-primary`. Mixed: an 8px horizontal dash, 2px, same color. Inline SVG paths (not in the icon set).

## States and tokens
| Checked | Default | Hover |
|---|---|---|
| False | fill `--fill-input`, border `--border-input` | fill `--fill-input-hover`, border `--border-input-hover` |
| True | fill + border `--fill-primary-default`, check | fill + border `--fill-primary-hover`, check |
| Mixed | fill + border `--fill-primary-default`, dash | fill + border `--fill-primary-hover`, dash |

- **Hover** inside a Result row comes from the **row** being hovered/highlighted (`.row[data-hovered] .box`), not from hovering the box itself. The Figma rows confirm this: Highlighted rows use the Hover box.
- **Pressed** row: the box shows the checked Hover look (Figma Result row Pressed = True + Hover).
- **Focus** (select-all only): no Focus variant in Figma. Use the global focus rule (`outline` 2px `--focus-ring`, offset 2px) on the box (Rule ID 8).
- **Disabled**: none drawn; not needed in this flow. Don't build it.

## Motion (code only)
- Press: slight scale-up (`scale(1.08)`, the opposite of buttons' 0.97), 150ms ease-out.
- Check draws in with `stroke-dashoffset` over 150ms ease-out after the box fills.
- Both off under `prefers-reduced-motion`.

## Accessibility
- Select all: accessible name "Select all Cargill brands"; during a search "Select 2 matches". `aria-checked="mixed"` comes from React Aria's `isIndeterminate`.
- Row box: `aria-hidden`; the row's `aria-selected` carries the state.

## Code backlog
- Select brands card: Checkbox motion, Select all per vendor, Keyboard.
- Accessibility: focus variants (Rule ID 8), accessible names (Rule ID 13).

## Flags
None.
