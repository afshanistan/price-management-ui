# Open questions

Conflicts and undecided details found while building. **Claude Code adds entries here instead of deciding.** Will answers, then the answer moves to `decision-log.md` (and `code-backlog.md` if it's behavior).

Format: **Question** · Where · Options · Sources · Status

---

## From the Figma export (Oct 17)
- **XLarge button label text style** · Button XLarge · (a) Geist SemiBold 16/24 with no named style, (b) add a `Button/Label-LG` text style in Figma and re-export · Figma has no style on the XLarge label; code-backlog says "16/24 label" · Open (use (a) until answered)
- **Disabled Next: native `disabled` vs `aria-disabled`** · Wizard navigation · (a) `isDisabled`, simple, but screen readers may skip it, (b) `aria-disabled="true"`, focusable so the hint is read, presses blocked in code · code-backlog "Open" section · Open (build both stories, Will picks)
- **Stale stepper placeholder in the Focus header** · Main navigation `642:156` Variant=Focus · Delete the "Progress stepper (placeholder)" frame in Figma · decision log (stepper moved to the stage, Oct 16 night) · Don't build it; delete in Figma
- **Default header primary CTA label** · Main navigation Variant=Default · "Upload CSV" (Figma) vs "Upload pricing" (surface-studies plan) · Not in the wizard flow · Open
- **Default header: two Settings icon buttons** · Main navigation Variant=Default · Is one meant to be Help? · Figma · Open
- **Edit icon** · Button XSmall "Edit" on Review · There's no edit icon in the set yet · code-backlog ("edit icon to come") · Open (use `placeholder`)
- **Effective date: typed field vs no typed input** · Global presets (step 3) · code-backlog has both "Effective date: one value, three inputs" (typed field) and "Custom date flow" (no typed input, decided Oct 16) · The later decision is "no typed input" · Confirm before building step 3
