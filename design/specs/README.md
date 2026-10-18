# Component specs (exported from Figma, Oct 17)

Batch 1 (afternoon): header + wizard footer. Batch 2 (evening): Stepper + step 1 (Add vendors). Batches 3 and 4 (night): steps 2, 3 and 4.

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

Batch 2 build order (stepper + step 1):
4. `stepper.md` (Stepper, Stepper step, Stepper line in one file)
5. `pictogram.md`, `vendor-logo.md` (atoms; pictogram SVGs in `src/assets/pictograms/`)
6. `icon-tile.md`, `tag.md`, `card-header.md`
7. `input.md`, `text-field.md`
8. `result-row.md` (**Single only**; Multi waits for the Checkbox spec in step 2), `results-panel.md`
9. `selected-item-card.md`, `empty-selection.md`
10. `select-vendors-card.md` (combines 6–9)

Batch 3 build order (step 2, Add brands):
11. `status-mark.md`, `checkbox.md` (atoms)
12. `brand-chip.md`, `vendor-coverage-tile.md`, `group-header.md`, `selection-summary.md` (CountBadge + SelectionSummary)
13. `result-row.md`: the **Multi** section (Single is already built)
14. `brand-list.md`, `selected-brands-panel.md`
15. `select-brands-card.md` (combines 11–14; adds `src/data/brands.ts`)

Batch 4 build order (steps 3 and 4):
16. `radio.md`, `calendar-day.md` (atoms)
17. `option-tile.md`, `date-picker.md`
18. `preset-fieldset.md` (Currency + Pricing model), `dates-preset.md`
19. `global-presets-card.md`
20. `summary-stat.md`, `review-row.md`, `preset-readout.md`
21. `review-template-card.md`

That's every component in the 12 Final Comps. Next comes the React app (page shell, routing between steps, the stepper charge-up).

**Flags in batches 3–4 are already logged** in `docs/open-questions.md` under "From the step 2–4 spec export". Where a spec says "log it", update that entry's status instead of adding a new one.

Figma-only machinery you must **not** reproduce in code:
- The **Semantic/Icon** and **Figma/Icon style** variable modes. In code, icons use `currentColor` and a `filled` prop.
- The **"Focus ring" frame** inside components. In code, use `outline` + `outline-offset`.
- The **State** variant property (Default, Hover, Pressed, Focus, Disabled). In code these are pseudo-classes and ARIA, or React Aria's `data-hovered`, `data-pressed`, `data-focus-visible` and `data-disabled` attributes, never a prop.
