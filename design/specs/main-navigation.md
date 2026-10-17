# Main navigation (header)

**Figma:** Main-Navigation `642:156`, page → Navigation & wayfinding
> MainNavigation — plum header (data-mode="on-brand"). Default = full product nav; Focus = logo, "Template Builder", Save and exit.
> Props — variant: default | focus

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'default' \| 'focus'` | `'default'` | The wizard uses `focus` |
| `title` | `string` | `'Template Builder'` (focus) | App or task name, beside the logo |
| `onExit` | `() => void` | — | Focus: "Save and exit" |

## Element and mode
`<header data-mode="on-brand">`. The container declares context; nothing inside sets a color mode. "Template Builder" is the app name, **not a heading** (the card title is the page's only H1).

## Anatomy and sizes (both variants)
- Outer: full width, background `--surface-brand`, `min-height` 56, `min-width` 1024 (`--layout-min-width`). Bottom border 1px `--surface-brand` (same color as the fill, so invisible; keep it for parity or drop it).
- Content wrapper: centered, `max-width` 1440 (`--layout-max-width`), side padding 24 (`--layout-gutter`), horizontal, `justify-content: space-between`, items centered.
- **App identity** (left), gap 12:
  - Logo frame 36×36, padding 2 → Logo (32), bars citron because of on-brand
  - Divider 1×24, `--border-structural` (Plum/700 on brand)
  - Title, Heading/XS (Bricolage SemiBold 16/22), `--text-default` (Neutral/50 on brand)

### Variant = Focus (the wizard)
- Right: **Focus actions**, gap 12 → Button Medium **Secondary** "Save and exit", no icons → renders as the plum header control (Plum/600 fill, Plum/500 1.5px border, Neutral/50 label).
- Title: "Template Builder".
- Hidden layer "Save status / Draft saved" (Body/SM, `--text-subtle`). Removed by decision ("Draft saved" was overkill), so don't build it.

### Variant = Default (product header)
- Title: "Price Management Portal".
- Center: **Nav links**, gap 4 → Nav link ×3: Templates (Active), Submissions, Messages.
- Right, gap 12: Button Medium Primary (label "Upload CSV", trailing icon) · divider 1×24 · Icon button ×2 (Settings) · Account badge.

## Accessibility
- `<header>` is the banner landmark. The logo is decorative beside the visible title, or give the logo link the name "Template Builder".
- Tab order: Save and exit is the only stop in the Focus header.
- Contrast is checked in the Oct 17 review: Neutral/50 on Plum/900 is 12.5:1, and the Save and exit edge is Plum/500 at 3.4:1.

## Code backlog
- Global: containers declare context (`data-mode="on-brand"`).
- Accessibility: Landmarks + headings (Rule ID 4).

## Flags
1. **Stale placeholder in the Focus variant.** The Figma component still contains a frame "Progress stepper (placeholder)" (960×40, dashed) inside the Focus header content. The stepper moved to the plum stage below the header (decision log, Oct 16 night), so **don't build it here**. Suggest deleting it in Figma.
2. **Default variant CTA label** is "Upload CSV" in Figma; the surface-studies plan says "Upload pricing". Copy only, and not in the wizard flow. Use the Figma label and log it.
3. **Default variant has two "Settings" icon buttons.** Probably one should be Help. Ask Will before building the Default header.
