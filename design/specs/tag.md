# Tag (molecule)

**Figma:** Tag `791:2608`, page → Molecules
> Tag — neutral label such as "Optional". Never a status, never interactive.
> Props — label: string

## Props
| Prop | Type | Default |
|---|---|---|
| `children` | `string` | — |

## Anatomy and sizes
- Inline pill, `min-height` 20, padding 2 / 8, radius full (`--radius-full`).
- Background `--fill-tag`; label `--text-on-tag`, `.type-label-xs` (Geist Medium 11/16).

## Accessibility
Plain text inside the heading it sits in. "Add pricing defaults" + Tag reads "Add pricing defaults, optional" (code-backlog step 3): render a visually hidden comma before it, or `aria-label` on nothing; keep it text.

## Code backlog
- Global presets card (step 3): Tag in the Card header.

## Flags
None. Only step 3 uses it, but it's tiny and Card header has a `showTag` prop, so build it with Card header.
