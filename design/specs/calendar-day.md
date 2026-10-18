# Calendar day (atom)

**Figma:** Calendar day `801:24`, page → Atoms (State × 6: Default, Hover, Today, Selected, Disabled, Empty)
> CalendarDay — one day cell in the Date picker grid (role="gridcell").
> Props — day: string · state (Figma only; in code these are pseudo-classes / ARIA): default | hover | today | selected | disabled | empty

Build it as the styling of React Aria's **`CalendarCell`** inside `CalendarGrid` (see `date-picker.md`). Every state maps to a `data-*` attribute React Aria already sets.

## Anatomy and sizes
- Fixed 36×36 circle (`--radius-full`), number centered, `.type-body-md`.

## States and tokens
| State | React Aria attribute | Fill | Text |
|---|---|---|---|
| Default | — | none | `--text-default` |
| Hover | `data-hovered` | `--fill-row-highlight` | `--text-default` |
| Today | `data-today` (custom; compare with `today()`) | none | `--text-default` + 4px dot `--icon-subtle`, centered, 3px above the bottom edge |
| Selected | `data-selected` | `--fill-primary-default` | `--text-on-primary` |
| Disabled (past days) | `data-disabled` | none | `--text-disabled` |
| Empty (other month) | `data-outside-month` | none | hidden (keep the cell for the grid) |
| Focus visible | `data-focus-visible` | as current | round focus ring: `outline` 2px `--focus-ring`, offset 2px (Rule ID 8) |

## Accessibility
- `role="gridcell"` with a button inside (React Aria does this). Name is the full date: "Wednesday, October 28, 2026".
- Disabled days are announced as unavailable (React Aria).

## Code backlog
- Global presets card: Custom date flow (past days disabled, today dot).
- Accessibility: day accessible name (Rule ID 13), round focus ring (Rule ID 8).

## Flags
1. **Today + Selected** isn't drawn. Keep the dot and color it `--text-on-primary` so "today" stays visible on the teal circle. Log it.
2. code-backlog's older "Effective date" item says "today outlined"; Figma and the later "Custom date flow" item say a **dot**. Build the dot.
