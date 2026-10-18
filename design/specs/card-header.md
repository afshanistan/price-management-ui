# Card header (molecule)

**Figma:** Card header `713:406`, page → Molecules
> CardHeader — icon tile + H1 title (+ optional Tag) + optional description.
> Props — title: string · description: string · showTag: boolean · showDescription: boolean

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | `string` | — | The page's **H1** |
| `pictogram` | `PictogramType` | — | For the Icon tile |
| `description` | `string \| undefined` | — | Omit to hide (Figma "Show description") |
| `tag` | `string \| undefined` | — | e.g. "Optional" on step 3 (Figma "Show tag") |

## Element
`<h1>` for the title; description is a `<p>`.

## Anatomy and sizes
- Row, gap 16, items centered vertically.
- **Icon tile** at 48×48 with a 40px pictogram (see `icon-tile.md`).
- **Heading** column, fills the rest, gap 4:
  - Title row, gap 8, centered: title in `.type-heading-lg` (Bricolage Grotesque Bold 28/34), `--text-heading`; Tag after it when set.
  - Description: `.type-body-md` (Geist Regular 14/20), `--text-subtle`.
- Height: 48 with no description (title + tile), 58 with one. Use `min-height`, not height.

## Content per step (from the Cards page)
| Step | Title | Pictogram | Description | Tag |
|---|---|---|---|---|
| 1 | "Add vendors to your template" | vendor | none | none |
| 2 | "Add brands to your template" | brand | check Cards page | none |
| 3 | "Add pricing defaults" | presets | check Cards page | "Optional" |
| 4 | Review title | check Cards page | | |

Step 1 is confirmed from Figma; for 2–4 read the instance when that card's spec is exported.

## Accessibility
- Exactly one H1 per page = this title (code-backlog, Landmarks Rule ID 4).
- Icon tile is decorative.

## Code backlog
- Accessibility: Landmarks + headings (Rule ID 4).
- Global presets card: Tag reads as part of the H1.

## Flags
None.
