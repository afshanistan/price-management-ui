# Icon button (molecule)

**Figma:** Icon button `603:52`, page → Molecules (Tone × State × Size = 10 variants)
> IconButton — square/round icon-only action; needs aria-label naming action + object.
> Props — tone: destructive | default · state (Figma only; in code these are pseudo-classes / ARIA) · size: medium

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `icon` | `IconName` | — | Required |
| `aria-label` | `string` | — | **Required.** Action + object: "Remove Cargill", "Settings" |
| `tone` | `'default' \| 'destructive'` | `'default'` | Destructive = the vendor-card trash |
| `size` | `'medium'` | `'medium'` | Only Medium exists now (Small was deleted with Quiet destructive) |
| `isDisabled` | `boolean` | `false` | |
| + React Aria `Button` props | | | |

Separate component from Button (decision log: different structure; matches `<IconButton>` in most systems).

## Anatomy and sizes
- Fixed 32×32 (`--size-32`); icon-only squares stay **fixed**, not min-height.
- Icon 24×24, centered.
- Radius: Default tone 4 (`--radius-4`); Destructive tone full circle (`--radius-full`).

## States and tokens
Icon color is set as `color` on the button.

| Tone | State | Background | Icon color | Icon drawing |
|---|---|---|---|---|
| Default | Default | transparent | `--icon-on-tertiary` | stroke |
| Default | Hover | transparent | `--icon-on-tertiary` | **filled** |
| Default | Pressed | `--fill-tertiary-pressed` | `--icon-on-tertiary` | filled |
| Default | Focus | transparent + ring | `--icon-on-tertiary` | stroke |
| Default | Disabled | transparent | `--icon-disabled` | stroke |
| Destructive | Default | transparent | `--icon-on-tertiary` | **filled** (teal trash at rest) |
| Destructive | Hover | `--fill-destructive-hover` (circle) | `--icon-destructive` | filled |
| Destructive | Pressed | `--fill-destructive-pressed` (circle) | `--icon-destructive` | filled |
| Destructive | Focus | transparent + round ring | `--icon-on-tertiary` | filled |
| Destructive | Disabled | transparent | `--icon-disabled` | filled |

Focus: 2px `--focus-ring` outline, 2px offset; the ring follows the radius (round for Destructive).

## Motion
- "Icon buttons fill on hover, stay filled on press" (decision log). Crossfade stroke → filled in 150ms ease-out; no movement.
- Press scale 0.97; off under reduced motion.

## Accessibility
- `aria-label` names action + object ("Remove Cargill"). The icon is `aria-hidden`.
- 32px target (above the 24px minimum).

## Code backlog
- Global: press scale, motion standard, focus = outline.
- Accessibility: accessible names list (Rule ID 13).

## Flags
- The Figma Default/Hover variant has a transparent fill. The hover cue is the icon switching to filled, with no background. That's intentional per the decision log; don't add a hover background.
