# Icon (atom)

**Figma:** Icons `563:12460`, page → Atoms
> Icon — 24px UI icon. Stroke/Fill drawings switched by the Figma/Icon style mode; color from the Semantic/Icon mode. Code: `<Icon name filled />`, color = currentColor.

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `name` | `'tag' \| 'create' \| 'upload' \| 'messages' \| 'bookmark' \| 'settings' \| 'open-sidebar' \| 'close-sidebar' \| 'arrow-left' \| 'arrow-right' \| 'download' \| 'placeholder' \| 'help' \| 'search' \| 'check-circle' \| 'alert-circle' \| 'trash' \| 'calendar' \| 'chevron-left' \| 'chevron-right' \| 'close'` | — | 21 icons |
| `filled` | `boolean` | `false` | Figma "Icon style" mode: Stroke = false, Fill = true |
| `size` | `14 \| 16 \| 20 \| 24` | `24` | Drawn on a 24 grid; the SVG scales. Sizes used: 14 (XSmall button), 16 (Medium button, nav link), 20 (XLarge button), 24 (icon button) |
| `aria-label` | `string` | — | Only for a meaningful standalone icon. Otherwise the icon is decorative: `aria-hidden="true"` |

## Artwork
`src/assets/icons/<name>.svg` (stroke drawing) and `src/assets/icons/<name>-filled.svg` (fill drawing), exported from the Figma vectors. Every color is `currentColor`, so the icon takes its parent's text color. Some icons look the same in both styles (arrows, chevrons, calendar, download, sidebars); that matches Figma.

## Color
`color: inherit`. Never set an icon color inside the Icon component. The container sets `color`, for example the Button label color. In Figma the Semantic/Icon mode does this job. It maps like this, for reference only:

| Figma Icon mode | Token the container's `color` should use |
|---|---|
| Default | `--icon-default` |
| Primary | `--icon-on-primary` |
| Secondary | `--icon-on-secondary` |
| Tertiary | `--icon-on-tertiary` |
| Disabled | `--icon-disabled` |
| Brand | `--icon-brand` |
| Destructive | `--icon-destructive` |
| Subtle | `--icon-subtle` |

## Accessibility
- Decorative by default (`aria-hidden="true"`, `focusable="false"`). An icon-only control names itself with `aria-label` on the button, not on the icon.

## Code backlog (Global)
- **Icon color = `currentColor`**: drop the Semantic/Icon modes; icons inherit the text color of their container.
- "Filled = pressed/active" is a pattern used by nav links and icon buttons (Foundations → Iconography).

## Flags
- ~~An **edit** icon is still to come (code-backlog, Button XSmall). Use `placeholder` until it exists, and log it in `docs/open-questions.md`.~~ **Closed Oct 19:** `edit` (stroke + filled) exported from Figma and in the set; Review's Edit buttons use it.
- The artwork couldn't be previewed during export. Check the Icon story against Figma (Atoms page) before building on it.
