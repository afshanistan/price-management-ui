# Button (molecule)

**Figma:** Button `580:26`, page → Molecules (45 variants: 3 sizes × 3 hierarchies × 5 states)
> Button — the one action control. Primary = forward, Secondary = tonal teal (plum on brand), Tertiary = text. Min width 64; min-height, not height.
> Props — label: string · leadingIcon: boolean · trailingIcon: boolean · size: xsmall | medium | xlarge · hierarchy: primary | secondary | tertiary · state (Figma only; in code these are pseudo-classes / ARIA): default | hover | pressed | focus | disabled

## Props
| Prop | Type | Default | Figma property |
|---|---|---|---|
| `children` | `ReactNode` | — | Label |
| `size` | `'xsmall' \| 'medium' \| 'xlarge'` | `'medium'` | Size |
| `hierarchy` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | Hierarchy |
| `leadingIcon` | `IconName` | — | Leading icon (boolean + nested Icon type in Figma) |
| `trailingIcon` | `IconName` | — | Trailing icon |
| `isDisabled` | `boolean` | `false` | State=Disabled |
| + React Aria `Button` props | | | `onPress`, `type`, `aria-*` |

Build on **React Aria `Button`** (from `react-aria-components`). Style the states with its data attributes: `[data-hovered]`, `[data-pressed]`, `[data-focus-visible]`, `[data-disabled]`.

## Anatomy and sizes
Horizontal flex, centered, label never wraps. `min-height`, never `height`.

| Size | min-height | Side padding | Gap | Icon | Radius | Label text style | min-width |
|---|---|---|---|---|---|---|---|
| XSmall | 24 (`--size-24`) | 8 | 4 | 14 | 4 | Button/Label (Geist SemiBold 12/18) | none (backlog: "no min-width") |
| Medium | 32 (`--size-32`) | 12 | 6 | 16 | 4 | Button/Label (Geist SemiBold 12/18) | 64 (`--size-64`) |
| XLarge | **56** (`--size-56`) | **24** | 8 | 20 | 6 | 16/24 SemiBold (see flags) | 64 |

Border: Primary and Tertiary 1px (same color as the fill, or transparent), Secondary **1.5px**. Border is inside the box (`box-sizing: border-box`), so it never changes the size.

## States and tokens
Label and icon share one color, set as `color` on the button. Icons inherit it (`currentColor`). Every Button icon uses the **filled** drawing.

| Hierarchy | State | Background | Border | Label + icon |
|---|---|---|---|---|
| Primary | Default | `--fill-primary-default` | 1px `--fill-primary-default` | `--text-on-primary` |
| Primary | Hover | `--fill-primary-hover` | 1px `--fill-primary-hover` | `--text-on-primary` |
| Primary | Pressed | `--fill-primary-pressed` | 1px `--fill-primary-pressed` | `--text-on-primary` |
| Primary | Disabled | `--fill-disabled` | 1px `--border-disabled` | `--text-disabled` |
| Secondary | Default | `--fill-secondary-default` | 1.5px `--border-secondary-default` | `--text-on-secondary` |
| Secondary | Hover | `--fill-secondary-hover` | 1.5px `--border-secondary-hover` | `--text-on-secondary` |
| Secondary | Pressed | `--fill-secondary-pressed` | 1.5px `--border-secondary-default` (not hover) | `--text-on-secondary` |
| Secondary | Disabled | `--surface-card` | 1.5px `--border-disabled` | `--text-disabled` |
| Tertiary | Default | transparent | transparent | `--text-on-tertiary` |
| Tertiary | Hover | `--fill-tertiary-hover` | transparent | `--text-on-tertiary` |
| Tertiary | Pressed | `--fill-tertiary-pressed` | transparent | `--text-on-tertiary` |
| Tertiary | Disabled | transparent | transparent | `--text-disabled` |

**Focus** (all hierarchies): the Default look plus a 2px `--focus-ring` outline with a **2px offset**. In Figma the ring frame is 4px larger on each side with a 2px inside stroke and radius = button radius + 2. Code: `outline: var(--focus-width-2) solid var(--focus-ring); outline-offset: var(--focus-offset-2);`. Show it only on keyboard focus (`[data-focus-visible]`).

**On brand:** no extra code. Inside `data-mode="on-brand"`, the same tokens resolve to the header colors. Secondary becomes the plum "Save and exit" (Plum/600 fill, Plum/500 border, Neutral/50 label).

## Motion
- 150ms ease-out on `background-color`, `border-color`, `color` (`--motion-duration`, `--motion-ease`).
- Press: `transform: scale(0.97)` on `[data-pressed]`; off under `prefers-reduced-motion`.

## Accessibility
- Accessible name = the visible label. Footer buttons: the visible label without the arrow ("Edit vendors", "Select brands").
- Review's Edit buttons show "Edit" with `aria-label="Edit vendors"` (the name starts with the visible label).
- Disabled primary is exempt from contrast AA. Always pair it with visible hint text (see Wizard navigation).
- `min-height` so text can grow to 200% without clipping.

## Code backlog
- Global: motion standard, press scale 0.97, reduced motion, focus ring = outline.
- Accessibility: Disabled primary (`--fill-disabled` + 1px `--border-disabled`, label and icons Neutral/500), On brand Secondary border (Plum/500, hover Plum/400).
- Review: Button XSmall (24px, 8px padding, 4 gap, 14px icon, Button/Label, no min-width). Edit = XSmall Tertiary with a leading icon (the edit icon is still to come).

## Flags
1. **XLarge height: 56.** Decided by Will on Oct 17 (Figma, the decision log and Foundations say 56; the 48 in code-backlog was stale and has been corrected).
2. **XLarge side padding: Figma 24, code-backlog said 20.** Corrected to Figma's 24 along with the height. If anything looks off, ask Will.
3. **XLarge label text style:** the XLarge label isn't bound to a text style in Figma (Medium and XSmall use Button/Label). Code-backlog says "16/24 label". Use Geist SemiBold 16/24, and ask Will whether to add a `Button/Label-LG` style.
