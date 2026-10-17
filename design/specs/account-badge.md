# Account badge (molecule)

**Figma:** Account-Badge `617:107`, page → Molecules
> AccountBadge — avatar button in the header; hover thickens the rim, focus uses the offset ring.
> Props — state (Figma only; in code these are pseudo-classes / ARIA): default | hover | pressed | focus

Used only by **Main navigation, Variant=Default**.

## Props
| Prop | Type | Notes |
|---|---|---|
| `src` | `string` | Photo URL |
| `name` | `string` | Accessible name: "Account: {name}" |
| + React Aria `Button` props | | Opens the account menu later |

## Anatomy
- Fixed 36×36 circle; the photo covers it (`object-fit: cover`).
- Rim = inside border.

## States and tokens
| State | Rim |
|---|---|
| Default | 1px `--border-avatar-default` |
| Hover | **2px** `--border-avatar-hover` |
| Pressed | 2px `--border-avatar-pressed` |
| Focus | 1px default rim + 2px `--focus-ring` outline at 2px offset (ring 44px), round |

Decision log: hover thickens the rim to teal, and focus uses the standard offset ring, so keyboard users can tell hover and focus apart.

## Motion
- 150ms ease-out on the border color and width. The border sits inside the box, so the badge never grows.

## Flags
- None.
