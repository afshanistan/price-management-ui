# Text field (molecule)

**Figma:** Text field `672:182`, page → Molecules (State × 6)
> TextField — label + Input + helper/error. Error message replaces the helper.
> Props — label: string · helper: string · showLabel: boolean · showHelper: boolean · errorMessage: string · state (Figma only)

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | Always rendered; `hideLabel` makes it visually hidden (Figma "Show label") |
| `hideLabel` | `boolean` | `false` | |
| `helper` | `string \| undefined` | — | Figma "Show helper" |
| `errorMessage` | `string \| undefined` | — | When set: Error state, replaces the helper |
| + Input props | | | `placeholder`, `leadingIcon`, `isDisabled`, value / onChange |

Build on React Aria `SearchField` (step 1 and 2 searches) or `TextField`, so label, description and error are wired automatically.

## Anatomy and sizes
- Column, gap 8, fills its container (320 in the component, full card width in step 1).
- **Label**: `.type-label-md` (Geist Medium 13/18).
- **Input**: see `input.md`.
- **Helper**: `.type-body-sm` (Geist Regular 13/18), `--text-subtle`, wraps.
- **Error message** row (replaces helper), gap 6: `alert-circle` icon 16px **filled**, `--icon-destructive` + message `.type-body-sm`, `--text-error`.

## States and tokens
| State | Label | Helper |
|---|---|---|
| Default / Hover / Filled | `--text-heading` | `--text-subtle` |
| Focus | `--text-label-focus` | `--text-subtle` |
| Disabled | `--text-disabled` | `--text-disabled` |
| Error | `--text-heading` | hidden; error row shown |

The input's own states come from Input.

## Step 1 content
Label "Vendor name or ESN" · placeholder "Search by vendor name or ESN" · helper "Results appear as you type. Select a vendor to add it immediately."

## Accessibility
- Label is a real `<label>`; helper via `aria-describedby`; error: `aria-invalid="true"` + `aria-describedby` → the message. The icon is `aria-hidden`.
- Messages say the fix ("Enter a vendor name or ESN."), never "Invalid". No field in the current flow errors yet (component completeness).
- Text grows at 200% without clipping.

## Code backlog
- Accessibility: Text field Error (Rule ID 16).

## Flags
- The Error state is one line shorter than a two-line helper (Figma 92 vs 110). Code-backlog allows a min-height on the helper slot if the jump bothers you; leave it out for now.
