# Date picker (organism)

**Figma:** Date picker `815:3262`, page → Organisms (one component). Shown open in Final Comps 03b and in Dates preset State=Open `825:3498`.
> DatePicker — popover calendar anchored to the Custom date tile; explicit OK / Cancel; grid with arrow keys.

## Props
| Prop | Type | Notes |
|---|---|---|
| `value` | `CalendarDate \| null` | The confirmed custom date |
| `onConfirm` | `(date: CalendarDate) => void` | OK |
| `onCancel` | `() => void` | Cancel, Esc, click outside |
| `minValue` | `CalendarDate` | Tomorrow (past days and today disabled; see flag) |

Use `@internationalized/date` (comes with React Aria) for dates.

## Element
React Aria **`Popover`** (anchored to the Custom date tile) → **`Dialog`** (`aria-label="Choose custom date"`) → **`Calendar`** with **`CalendarGrid`** / **`CalendarCell`**. The calendar holds a *draft* date; OK commits it, Cancel throws it away.

## Anatomy and sizes
- Column, padding 16, gap 8, radius 12 (`--radius-12`), 1px `--border-structural`, background `--surface-card`, shadow **`Elevation/2 – floating`** (correct here: it does float).
- Width = the tile's width (Figma 287 in the component, 282 in the card's column). Hugs its height (338).
- **Header**: row, space-between, items centered, 4px bottom padding.
  - Month + year: `.type-heading-xs` (Bricolage 600 16/22), `--text-heading` ("March 2027"). React Aria `Heading`.
  - Month nav: two Icon buttons, Size Medium (32), Tone Default, gap 2: `chevron-left` "Previous month", `chevron-right` "Next month".
- **Weekdays**: 7 columns of 36, labels Su Mo Tu We Th Fr Sa, `.type-label-xs`, `--text-subtle`, centered. Weeks start on **Sunday**.
- **Days**: weeks as rows, 2px between rows, 7 Calendar days of 36 per row, spread edge to edge (`justify-content: space-between`). Other-month days are empty cells.
- **Footer**: row, right-aligned, gap 8, 8px top padding: **Cancel** (Button Tertiary, Medium) then **OK** (Button Primary, Medium).

## Behavior (code-backlog "Custom date flow", decided Oct 16)
- Opens on the confirmed date's month, else the current month.
- Click or Enter on a day highlights it (Selected look); nothing is saved yet.
- **OK** is disabled (`aria-disabled`) until a day is highlighted; OK confirms, closes, and the tile shows the date.
- **Cancel, Esc or click outside** discards the draft and closes. If no date was ever confirmed, the radio goes back to the option selected before.
- Opens directly below the tile at the tile's width; flips above when there's no room (React Aria `Popover` does this with `placement="bottom start"` and `shouldFlip`). It renders in a portal, so the card's scrolling body won't clip it.
- Focus: on open, move focus to the highlighted day (or today / first enabled day). On close, return focus to whatever opened it (the tile or the calendar button).
- Arrow keys move between days; Page Up/Down change month (React Aria built-in).

## Accessibility
- `role="dialog"` with a name; grid is `role="grid"` (React Aria). Day names "Wednesday, October 28, 2026"; nav buttons "Previous month" / "Next month".
- One polite announcement when a date is confirmed ("Effective date set to October 28, 2026"); the card's live region owns it.

## Code backlog
- Global presets card: Custom date flow. Accessibility: popover dismissal (Rule ID 11), keys (Rule ID 10), names (Rule ID 13).

## Flags
1. **Is today selectable?** code-backlog says "past days disabled" and "Choose a date after today" (older item). Build with **today disabled too** (`minValue` = tomorrow), matching "after today", and log it so Will can confirm.
2. **Typed date input**: none. Figma and the later "Custom date flow" item both have no typed field. The older "Effective date: one value, three inputs" item describes a typed field; it's superseded. See `dates-preset.md`.
