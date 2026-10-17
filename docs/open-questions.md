# Open questions

Conflicts and undecided details found while building. **Claude Code adds entries here instead of deciding.** Will answers, then the answer moves to `decision-log.md` (and `code-backlog.md` if it's behavior).

Format: **Question** · Where · Options · Sources · Status

---

## From the Figma export (Oct 17)
- **XLarge button label text style** · Button XLarge · (a) Geist SemiBold 16/24 with no named style, (b) add a `Button/Label-LG` text style in Figma and re-export · Figma has no style on the XLarge label; code-backlog says "16/24 label" · Open. Will, Oct 17: use (a) for now
- **Disabled Next: native `disabled` vs `aria-disabled`** · Wizard navigation · (a) `isDisabled`, simple, but screen readers may skip it, (b) `aria-disabled="true"`, focusable so the hint is read, presses blocked in code · code-backlog "Open" section · Open (build both stories, Will picks)
- **Stale stepper placeholder in the Focus header** · Main navigation `642:156` Variant=Focus · Delete the "Progress stepper (placeholder)" frame in Figma · decision log (stepper moved to the stage, Oct 16 night) · Don't build it; delete in Figma
- **Default header primary CTA label** · Main navigation Variant=Default · "Upload CSV" (Figma) vs "Upload pricing" (surface-studies plan) · Not in the wizard flow · Open
- **Default header: two Settings icon buttons** · Main navigation Variant=Default · Is one meant to be Help? · Figma · Open
- **Edit icon** · Button XSmall "Edit" on Review · There's no edit icon in the set yet · code-backlog ("edit icon to come") · Open (use `placeholder`)
- **No token for the 1.5px border** · Button Secondary (also Coverage tile status ring) · (a) `1.5px` written in the component CSS with a comment until a token exists, (b) add a `border-width/1.5` variable in Figma and re-export `tokens.css` · Spec and decision log (Oct 16 night) say 1.5px; `tokens.css` has only `--border-width-0/1/2/3` · **Answered Oct 17 (Will): add the token in code.** `--border-width-1-5` lives in `src/styles/tokens-code.css` (not in the generated `tokens.css`); delete it there if Figma gets the variable
- **On brand button contrast: Secondary hover and Tertiary pressed** · Button in `data-mode="on-brand"` · axe (Storybook, Oct 17) flags two label-on-fill pairs below 4.5:1: Secondary **hover** = `--text-on-secondary` Neutral/50 on `--fill-secondary-hover` Plum/500 (#f8f7f9 on #a26db3) **3.65:1**; Tertiary **pressed** = `--text-on-tertiary` Teal/300 on `--fill-tertiary-pressed` Neutral/700 (#a5d1cc on #595263) **4.47:1**. Applies to all three sizes (XLarge 16px SemiBold isn't "large text" either). Options: (a) darker on-brand Secondary hover fill (e.g. Plum/700 range) or a darker label, (b) Tertiary pressed fill Neutral/800 or lighter label (Teal/200), (c) accept as transient states. Light mode passes · Tokens from Figma; code can't fix without a design change · Open (found while building Button)
- **Effective date: typed field vs no typed input** · Global presets (step 3) · code-backlog has both "Effective date: one value, three inputs" (typed field) and "Custom date flow" (no typed input, decided Oct 16) · The later decision is "no typed input" · Confirm before building step 3
