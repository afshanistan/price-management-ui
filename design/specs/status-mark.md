# Status mark (atom)

**Figma:** Status mark `890:3037`, page → Atoms (Status × 2: Complete `890:3034`, To do `890:3036`)
> StatusMark — complete (citron + check) or to-do (dashed ring). Never interactive, never color alone.
> Props — status: complete | to-do

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `status` | `'complete' \| 'todo'` | — | |

## Anatomy and sizes
- Fixed 16×16 circle (`--radius-full`), 1.5px border (`--border-width-1-5`). Icon-only square, so a fixed size is fine (Rule ID 6 exception).
- **Complete**: fill `--fill-status-complete`, border `--border-status-complete`, check 7×5 drawn as a stroke, 1.75px, `--icon-on-status-complete`. Draw the check as an inline SVG path (it's not one of the 21 icons).
- **To do**: fill `--surface-card`, border **dashed** `--border-status-todo` (Figma dash 2.5 / gap 2). No glyph.

## Accessibility
- Always `aria-hidden="true"`. The status is carried in text by whatever uses it (coverage tile name: "Cargill, 4 of 5 brands selected, complete").
- Forced colors: the dashed vs solid ring must still read. Keep the border, not just the fill (Rule ID 18).

## Used by
Vendor coverage tile (top-right corner). Later: maybe the review summary; Summary stat currently draws its own check badge (see `summary-stat.md`).

## Code backlog
- Global: Status tokens (Citron never interactive, never alone).
- Select brands card: Coverage tile, "the to-do ring currently reads as a solid white dot on plum — likely wants a transparent center".

## Flags
1. **To do center.** Figma fills it with `--surface-card` (white). code-backlog suggests a transparent center once real logos land. Build it as Figma has it; it's one line to change.
2. CSS dashed borders draw different dashes from Figma's 2.5/2 at this size. If it looks wrong, draw the ring as an SVG circle with `stroke-dasharray="2.5 2"`. That's a rendering fix, not a design change; no need to ask.
