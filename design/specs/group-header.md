# Group header (molecule)

**Figma:** Group header `758:377`, page → Molecules (Tone = Subtle only; Strong was deleted Oct 17)
> GroupHeader — vendor group label in a list: name, "4 of 5", optional tri-state select-all checkbox. Sticky in code.
> Props — vendor: string · count: string · showCount: boolean · showCheckbox: boolean · tone: subtle

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `vendor` | `string` | — | "Cargill" |
| `count` | `string \| undefined` | — | "4 of 5". Omit to hide (Figma `showCount`) |
| `selectAll` | `{ checked: boolean \| 'mixed'; onChange: () => void; label: string } \| undefined` | — | Omit to hide the checkbox (Figma `showCheckbox`) |

No `tone` prop: Subtle is the only tone left.

## Anatomy and sizes
- Row, `min-height` 40, items centered, gap 6, **1px bottom border `--border-brand`**.
- Padding: component 13 top / 8 bottom / 0 sides. **Inside the Brand list it's 13 / 12 / 8 / 13** (instance override, lines it up with the rows' 12px inset + 1px list border). Build the list version: `padding: 13px 12px 8px 12px` inside the list's own 1px border.
- Optional **Checkbox** (select all), then an extra gap so the name lines up with the row names. In the rows the name starts after checkbox 18 + gap 12, so give the header the same: checkbox, then 12px to the name.
- **Vendor**: `.type-label-md` (Geist Medium 13/18), `--text-brand`, one line + ellipsis.
- **Count**: `.type-body-sm`, `--text-subtle`.
- **Background**: none in Figma. In code it's sticky, so give it `background: var(--surface-card)` or rows will show through.

## Behavior
- `position: sticky; top: 0` inside the Brand list's scroll container.
- Select all (tri-state): none → unchecked; some → Mixed; all → checked. Clicking unchecked or Mixed selects all; clicking checked clears the vendor. **During a search it acts on the visible matches only.**
- Count reads "4 of 5" (selected of total). While searching, keep "4 of 5" (code-backlog "Open": "4 of 5" vs "2 matches" is undecided; keep the default).

## Accessibility
- **Not a heading** (code-backlog Landmarks: the left list's group headers aren't headings). It labels a group of options: the group gets `aria-labelledby` → the vendor text.
- Screen reader text for the group: "Cargill, 4 of 5 brands selected".
- Select all is a **tab stop** with name "Select all Cargill brands" ("Select 2 matches" while searching), `aria-checked="mixed"` when partial.

## Code backlog
- Select brands card: Select all per vendor, Sticky group headers, Screen reader text, Groups drop out when empty, Collapsible vendor groups (parked, don't build).
- Sizing: Group header min-height 40 (Rule ID 6).

## Flags
1. The Figma default text for Count is "4 brands"; every use in the cards says "4 of 5". Build "N of M".
