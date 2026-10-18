# Dates preset (molecule, step 3)

**Figma:** Dates preset `825:3744`, page → Cards, section "Step 3 · Global presets" (State × 3: Closed `802:2304`, Open `825:3498`, Confirmed `825:3680`). Final Comps 03a–03c.
> DatesPreset — Effective date fieldset; Custom date opens the Date picker. One value, three inputs.
> Props — state (derived from data in code, not a prop): closed | open | confirmed

Same shell as `preset-fieldset.md`, plus the Date picker.

## Props
| Prop | Type | Notes |
|---|---|---|
| `value` | `{ source: 'none' \| 'next-month' \| 'next-quarter' \| 'custom'; date: CalendarDate \| null }` | Controlled |
| `onChange` | `(value) => void` | |
| `today` | `CalendarDate` | Injected so stories and tests can freeze the date |

## Content
- Title "Effective date", helper "Choose when prices take effect."
- Options:
  1. **No default** (Stacked, no description). Initial value.
  2. **Next month** (Inline), description = first day of next month ("Nov 1, 2026" when today is Oct 17, 2026).
  3. **Next quarter** (Inline), description = first day of the next calendar quarter ("Jan 1, 2027").
  4. **Custom date** (Inline), description "Pick a date" until confirmed, then the date ("Oct 28, 2026"). Has the **action**: Icon button `calendar`, `aria-label="Choose custom date"`.
- Dates display as "MMM d, yyyy" (en-US).

## States
| State | Selected tile | Picker |
|---|---|---|
| Closed (03a) | No default (or any) | closed |
| Open (03b) | Custom date | open below the Custom date tile |
| Confirmed (03c) | Custom date, description = the date | closed |

## Behavior (code-backlog "Custom date flow", the later decision)
- Choosing Custom date when it isn't selected selects it **and opens the picker**.
- Clicking the already-selected Custom date tile, or the calendar button at any time, reopens it.
- OK confirms; Cancel / Esc / click outside discards and, if no date was ever confirmed, goes back to the previous option.
- The custom date is remembered while another option is selected (switching back shows it again without reopening).
- Preset dates are computed from `today`.
- No typed date input.

## Accessibility
- Same radiogroup pattern. The calendar button is a separate tab stop right after the group (or after the Custom date tile in DOM order; keep it next to the tile).
- Announce the confirmed date once (card live region).

## Code backlog
- Global presets card: Custom date flow, Effective date (older item, superseded; see flag).

## Flags
1. **Typed field vs no typed input (open question, Oct 17).** code-backlog has an older item, "Effective date: one value, three inputs", with a typed MM/DD/YYYY field, and the later "Custom date flow" item (Oct 16) that says **no typed input**. Figma matches the later one: no field anywhere, OK/Cancel picker. This spec builds the later decision. Figma's component description still says "One value, three inputs"; that's leftover wording. The `{ source, date }` value shape from the older item still applies. **Will to confirm.**
