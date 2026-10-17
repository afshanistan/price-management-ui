# Nav link (molecule)

**Figma:** Nav link `624:108`, page → Molecules
> NavLink — top-nav tab on the brand header; icon slot reserved in every state so nothing reflows.
> Props — label: string · state (Figma only; in code these are pseudo-classes / ARIA): inactive | hover | pressed | active | focus

Used only by **Main navigation, Variant=Default** (the product header). The wizard uses the Focus header, which has no nav links.

## Props
| Prop | Type | Notes |
|---|---|---|
| `children` | `ReactNode` | Label |
| `icon` | `IconName` | Shown in the reserved slot |
| `href` | `string` | It's a link (React Aria `Link`) |
| `isActive` | `boolean` | Current page → `aria-current="page"` |

## Anatomy and sizes
- Pill: `min-height` 32, side padding 12, gap 6, radius full.
- Icon slot 16×16, **always present**. The icon is invisible (opacity 0) when Inactive or focused-inactive, so nothing reflows when it appears.
- Label: Label/LG (Geist Medium 14/20), no wrap.

## States and tokens (inside `data-mode="on-brand"`)
| State | Background | Label | Icon |
|---|---|---|---|
| Inactive | transparent | `--text-subtle` | hidden (opacity 0) |
| Hover | `--fill-nav-hover` | `--text-default` | stroke, visible |
| Pressed | `--fill-nav-pressed` | `--text-default` | filled |
| Active | `--fill-nav-active` | `--text-default` | filled |
| Focus | transparent + ring | `--text-subtle` | hidden |

The icon color is `--icon-default` (Figma Icon mode = Default). Focus: 2px `--focus-ring` outline, 2px offset, full radius.

## Motion
- The icon **fades in** (opacity, no slide). Background and color change in 150ms ease-out.

## Flags
- Default header only. This isn't needed for the wizard flow, so build it after the Focus header if time is short.
