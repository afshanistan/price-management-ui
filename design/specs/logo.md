# Logo (atom)

**Figma:** Logo `637:25`, page → Atoms
> Logo — two-tone "produce bars" mark; layers bound to logo-primary / logo-accent (citron bars on brand).

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `size` | `number` | `32` | Drawn on a 32 grid; filled shapes scale down to 16 |
| `title` | `string` | `'Price Management'` | Accessible name. When the app name sits right beside it, mark it decorative (`aria-hidden`) |

## Anatomy
- `src/assets/logo.svg`: four rounded bars (`--logo-primary`) and a stem with a leaf (`--logo-accent`).
- Inline the SVG as a React component, so the CSS variables resolve from the container's mode.

## Tokens
| Part | Light | On brand |
|---|---|---|
| Bars `--logo-primary` | Teal/500 | Citron/300 |
| Leaf `--logo-accent` | Plum/600 | Plum/300 |

In the header the logo sits in a 36×36 frame with 2px padding, so the drawing is 32px.

## Code backlog
- Containers declare context: the logo never sets a mode. It turns citron because the header has `data-mode="on-brand"`.

## Flags
- None.
