# Open questions

Conflicts and undecided details found while building. **Claude Code adds entries here instead of deciding.** Will answers, then the answer moves to `decision-log.md` (and `code-backlog.md` if it's behavior).

Format: **Question** · Where · Options · Sources · Status

---

## From the Figma export (Oct 17)
- **XLarge button label text style** · Button XLarge · (a) Geist SemiBold 16/24 with no named style, (b) add a `Button/Label-LG` text style in Figma and re-export · Figma has no style on the XLarge label; code-backlog says "16/24 label" · Open. Will, Oct 17: use (a) for now
- **Disabled Next: native `disabled` vs `aria-disabled`** · Wizard navigation · (a) `isDisabled`, simple, but screen readers may skip it, (b) `aria-disabled="true"`, focusable so the hint is read, presses blocked in code · code-backlog "Open" section · Open: both built (Oct 17). Compare in Storybook, Navigation/WizardNavigation → "Disabled Next: compare" (Tab through it). `blockedNext` is a temporary prop; the losing option and the prop get removed once Will picks
- **Stale stepper placeholder in the Focus header** · Main navigation `642:156` Variant=Focus · Delete the "Progress stepper (placeholder)" frame in Figma · decision log (stepper moved to the stage, Oct 16 night) · Don't build it; delete in Figma
- **Default header primary CTA label** · Main navigation Variant=Default · "Upload CSV" (Figma) vs "Upload pricing" (surface-studies plan) · Not in the wizard flow · **Resolved Oct 17:** "Upload CSV" (decision log, "The Default header button says Upload CSV")
- **Default header: two Settings icon buttons** · Main navigation Variant=Default · Is one meant to be Help? · Figma · **Resolved Oct 17:** yes, the first one is Help: Upload CSV · divider · Help · Settings · Account badge (decision log; `docs/figma-sync.md`)
- **Edit icon** · Button XSmall "Edit" on Review · There's no edit icon in the set yet · code-backlog ("edit icon to come") · Open (use `placeholder`)
- **No token for the 1.5px border** · Button Secondary · Spec and decision log say 1.5px; `tokens.css` had only `--border-width-0/1/2/3` · **Resolved Oct 17:** `border/1-5` added in Figma, `--border-width-1-5` in `tokens.css` v2; stand-in removed (decision log, "Code finds gaps; Figma gets fixed first"; `docs/figma-sync.md`)
- **On brand button contrast: Secondary hover and Tertiary pressed** · Button in `data-mode="on-brand"` · axe (Storybook, Oct 17) flags two label-on-fill pairs below 4.5:1: Secondary **hover** = `--text-on-secondary` Neutral/50 on `--fill-secondary-hover` Plum/500 (#f8f7f9 on #a26db3) **3.65:1**; Tertiary **pressed** = `--text-on-tertiary` Teal/300 on `--fill-tertiary-pressed` Neutral/700 (#a5d1cc on #595263) **4.47:1**. Applies to all three sizes (XLarge 16px SemiBold isn't "large text" either). Options: (a) darker on-brand Secondary hover fill (e.g. Plum/700 range) or a darker label, (b) Tertiary pressed fill Neutral/800 or lighter label (Teal/200), (c) accept as transient states. Light mode passes · Tokens from Figma; code can't fix without a design change · **Resolved Oct 17:** on brand, interaction states get darker: `fill-secondary-hover` → Plum/700, `fill-secondary-pressed` → Plum/800, `fill-tertiary-pressed` → Neutral/1000 (decision log, "On the plum header, interaction states get darker, not lighter"; `tokens.css` v2)
- **Effective date: typed field vs no typed input** · Global presets (step 3) · code-backlog has both "Effective date: one value, three inputs" (typed field) and "Custom date flow" (no typed input, decided Oct 16) · The later decision is "no typed input" · Confirm before building step 3

## From building NavLink (Oct 17)
- **Active nav link on hover and press** · NavLink, `isActive` · (a) stays Active (`--fill-nav-active`, filled icon) with no hover or press change, (b) shows Hover / Pressed fills over Active · The spec's state table has no Active + Hover or Active + Pressed row · **Resolved Oct 17:** (a), for now (decision log, "An active nav link doesn't react to hover or press, for now")
