# Selection summary + CountBadge (molecule)

**Figma:** Selection summary `756:394`, page → Molecules (one component, no variants)
> SelectionSummary — panel title (H2) + CountBadge. Badge is to-do until every vendor has ≥1 brand.
> Props — count: string · title: string

Build **two** components: `CountBadge` (reused later by the stepper/review if needed) and `SelectionSummary` (title + badge).

## CountBadge
| Prop | Type | Notes |
|---|---|---|
| `status` | `'todo' \| 'complete'` | |
| `children` | `number` | |
| `aria-label` | `string` | "16 brands selected" |

- Pill, radius full, padding 4 / 10, content centered, hugs (min 28 tall at rest).
- Number `.type-label-lg` (Geist Medium 14/20).
- todo: fill `--fill-status-todo`, text `--text-on-status-todo`. complete: fill `--fill-status-complete`, text `--text-on-status-complete`.
- Citron (complete) is never alone: it always has the number in it.
- Optional "pop" on change (scale 1 → 1.1 → 1, 150ms), off under reduced motion.

## SelectionSummary
| Prop | Type | Notes |
|---|---|---|
| `title` | `string` | "Selected brands" |
| `count` | `number` | |
| `status` | `'todo' \| 'complete'` | Passed in; the card computes it |
| `headingLevel` | `2` | Always H2 here |

- Row, `min-height` 40, gap 8, items centered, fills the width.
- Title: `<h2>` styled `.type-heading-sm` (Bricolage 600 18/24), `--text-heading`, one line + ellipsis.
- Then CountBadge.

## States (from the panel variants)
| Panel state | Badge |
|---|---|
| With selections (every vendor has ≥1) | complete, "16" |
| Incomplete (some vendor has 0) | todo, "13" |
| Empty | todo, "0" |

**Status comes from "every vendor has ≥1 brand", not from count > 0.** Same event marks step 2 complete in the stepper.

## Accessibility
- H2 "Selected brands" (Landmarks: panel titles are H2).
- Badge: `aria-label="16 brands selected"`, or a visually hidden " brands selected" after the number. Don't announce on every change here; the card's live region does that.

## Code backlog
- Select brands card: Count badge = whole step, CountBadge.
- Sizing: Selection summary min-height 40 (Rule ID 6).

## Flags
None.
