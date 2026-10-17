# Component specs (exported from Figma, Oct 17)

One file per component, read straight from the Figma main components (file `Iz1cbfAMKHnHopr6wgXZCa`). Each spec has the same sections:

- **Figma**: node ID and the description written on the component in Figma
- **Props**: the React API, matching the Figma properties
- **Anatomy and sizes**: layout, padding, gaps, radii, from Figma auto layout
- **States and tokens**: which semantic token each part uses in each state
- **Accessibility**: from the Oct 17 design review and the annotations page
- **Code backlog**: behavior decided in Figma that only exists in code (copied from `docs/code-backlog.md`)
- **Flags**: anything where Figma and the docs disagree. **Don't resolve these yourself. Ask Will.**

Build order for the first organism (header + wizard footer):
1. `icon.md`, `logo.md` (atoms)
2. `button.md`, `icon-button.md`, `nav-link.md`, `account-badge.md` (molecules)
3. `main-navigation.md`, `wizard-navigation.md` (navigation & wayfinding)

Figma-only machinery you must **not** reproduce in code:
- The **Semantic/Icon** and **Figma/Icon style** variable modes. In code, icons use `currentColor` and a `filled` prop.
- The **"Focus ring" frame** inside components. In code, use `outline` + `outline-offset`.
- The **State** variant property (Default, Hover, Pressed, Focus, Disabled). In code these are pseudo-classes and ARIA, or React Aria's `data-hovered`, `data-pressed`, `data-focus-visible` and `data-disabled` attributes, never a prop.
