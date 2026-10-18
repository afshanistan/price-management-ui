# Input (molecule)

**Figma:** Input `661:56`, page → Molecules (State × 6)
> Input — the field itself (icon + value + clear button when filled). Clicking in is focus.
> Props — text: string · leadingIcon: boolean · state (Figma only; in code these are pseudo-classes / ARIA): default | hover | focus | filled | disabled | error

## Props
Usually rendered inside **Text field**; build it as the visual part of React Aria's `SearchField` / `TextField` `Input`.
| Prop | Type | Default | Notes |
|---|---|---|---|
| `placeholder` | `string` | — | "Search by vendor name or ESN" |
| `leadingIcon` | `IconName \| undefined` | `'search'` | Omit to hide |
| `isClearable` | `boolean` | `true` for search | Shows Clear when it has a value |
| `isInvalid`, `isDisabled` | `boolean` | `false` | |
| + React Aria input props | | | |

"Filled" = has a value (derived). Hover / focus = pseudo-classes or `data-hovered` / `data-focused`.

## Anatomy and sizes
- Row, `min-height` 40, padding 0 / 12, gap 8, items centered, radius 8 (`--radius-8`), 1px border.
- Leading icon 20×20 (`search`, stroke).
- Text: `.type-body-md`, **one line with ellipsis**, fills the rest.
- **Clear** (Filled only): 24×24 round button at the end, 16px `close` icon.
- Focus ring: **not** an element. Use `outline: 2px solid var(--focus-ring)` with a 4px offset (Figma's ring sits 4px outside, radius 12).

## States and tokens
| State | Background | Border | Text | Icon color |
|---|---|---|---|---|
| Default (placeholder) | `--fill-input` | `--border-input` | `--text-subtle` | `--icon-default` |
| Hover | `--fill-input-hover` | `--border-input-hover` | `--text-subtle` | `--icon-default` |
| Focus | `--fill-input` | `--border-input-focus` + ring | `--text-default` (caret `--text-default`) | `--icon-default` |
| Filled | `--fill-input` | `--border-input` | `--text-default` | `--icon-default`; Clear `--icon-subtle` |
| Disabled | `--fill-input-disabled` | `--border-disabled` | `--text-disabled` | `--icon-disabled` |
| Error | `--fill-input` | `--border-error` | `--text-default` | `--icon-default` |

(Icon colors from the Figma Icon modes: Default, Subtle for Clear, Disabled.)

## Accessibility
- Clear is a real `<button aria-label="Clear search">`, shown only with a value; clears the query and keeps focus in the input. **Esc** also clears.
- Clear: 24×24 target, round focus ring, hover = a light neutral circle behind the × (not in Figma: pick the neutral hover token, e.g. `--fill-tertiary-hover`, and note your pick in `docs/open-questions.md`).
- `aria-invalid="true"` in Error (set by Text field).

## Code backlog
- Global: Search clear button.
- Accessibility: Input Clear button (Rule IDs 2, 12); Min-height Input 40 (Rule ID 6); Focus = outline.

## Flags
- Clear's hover circle has no token in Figma (see above). Log your pick; don't add a token.
