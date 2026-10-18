# Open questions

Conflicts and undecided details found while building. **Claude Code adds entries here instead of deciding.** Will answers, then the answer moves to `decision-log.md` (and `code-backlog.md` if it's behavior).

Format: **Question** · Where · Options · Sources · Status

---

## From the Figma export (Oct 17)
- **XLarge button label text style** · Button XLarge · (a) Geist SemiBold 16/24 with no named style, (b) add a `Button/Label-LG` text style in Figma and re-export · Figma has no style on the XLarge label; code-backlog says "16/24 label" · Open. Will, Oct 17: use (a) for now
- **Disabled Next: native `disabled` vs `aria-disabled`** · Wizard navigation · (a) `isDisabled`, simple, but screen readers may skip it, (b) `aria-disabled="true"`, focusable so the hint is read, presses blocked in code · code-backlog "Open" section · **Resolved Oct 17:** (b) `aria-disabled`, after comparing both in Storybook (decision log, "A blocked Next is aria-disabled")
- **Stale stepper placeholder in the Focus header** · Main navigation `642:156` Variant=Focus · Delete the "Progress stepper (placeholder)" frame in Figma · decision log (stepper moved to the stage, Oct 16 night) · **Resolved Oct 17:** not built; deleted in Figma
- **Default header primary CTA label** · Main navigation Variant=Default · "Upload CSV" (Figma) vs "Upload pricing" (surface-studies plan) · Not in the wizard flow · **Resolved Oct 17:** "Upload CSV" (decision log, "The Default header button says Upload CSV")
- **Default header: two Settings icon buttons** · Main navigation Variant=Default · Is one meant to be Help? · Figma · **Resolved Oct 17:** yes, the first one is Help: Upload CSV · divider · Help · Settings · Account badge (decision log; `docs/figma-sync.md`)
- **Edit icon** · Button XSmall "Edit" on Review · There's no edit icon in the set yet · code-backlog ("edit icon to come") · Open (use `placeholder`)
- **No token for the 1.5px border** · Button Secondary · Spec and decision log say 1.5px; `tokens.css` had only `--border-width-0/1/2/3` · **Resolved Oct 17:** `border/1-5` added in Figma, `--border-width-1-5` in `tokens.css` v2; stand-in removed (decision log, "Code finds gaps; Figma gets fixed first"; `docs/figma-sync.md`)
- **On brand button contrast: Secondary hover and Tertiary pressed** · Button in `data-mode="on-brand"` · axe (Storybook, Oct 17) flags two label-on-fill pairs below 4.5:1: Secondary **hover** = `--text-on-secondary` Neutral/50 on `--fill-secondary-hover` Plum/500 (#f8f7f9 on #a26db3) **3.65:1**; Tertiary **pressed** = `--text-on-tertiary` Teal/300 on `--fill-tertiary-pressed` Neutral/700 (#a5d1cc on #595263) **4.47:1**. Applies to all three sizes (XLarge 16px SemiBold isn't "large text" either). Options: (a) darker on-brand Secondary hover fill (e.g. Plum/700 range) or a darker label, (b) Tertiary pressed fill Neutral/800 or lighter label (Teal/200), (c) accept as transient states. Light mode passes · Tokens from Figma; code can't fix without a design change · **Resolved Oct 17:** on brand, interaction states get darker: `fill-secondary-hover` → Plum/700, `fill-secondary-pressed` → Plum/800, `fill-tertiary-pressed` → Neutral/1000 (decision log, "On the plum header, interaction states get darker, not lighter"; `tokens.css` v2)
- **Effective date: typed field vs no typed input** · Global presets (step 3) · code-backlog has both "Effective date: one value, three inputs" (typed field) and "Custom date flow" (no typed input, decided Oct 16) · The later decision is "no typed input" · Confirm before building step 3

## From building NavLink (Oct 17)
- **Active nav link on hover and press** · NavLink, `isActive` · (a) stays Active (`--fill-nav-active`, filled icon) with no hover or press change, (b) shows Hover / Pressed fills over Active · The spec's state table has no Active + Hover or Active + Pressed row · **Resolved Oct 17:** (a), for now (decision log, "An active nav link doesn't react to hover or press, for now")

## From building the Stepper (Oct 17)
- **Current step label weight** · Stepper, in-progress label · (a) Geist **Bold** 700, Figma's `Stepper/Active` text style, (b) **SemiBold** 600, code-backlog "Progress stepper" ("current Neutral/50 semibold") · Spec says build with the Figma style · Open. Built with (a) `.type-stepper-active`; if (b), change the text style in Figma and re-export

## From building step 1 (Oct 17)
- **Vendor logo wordmark on the teal tile** · Vendor logo, Selected (set by Result row / Selected item card) · Figma doesn't bind the wordmark color in that state · Spec says use `--text-on-primary` · Open. Built with `--text-on-primary`; bind it in Figma if that's right
- **Vendor logo hover** · Vendor logo · white tile + teal border + teal ink on hover (proposed in code-backlog) · Not decided · Open. Not built
- **Input Clear hover circle** · Input, Clear button · Figma doesn't draw it; the spec says pick a neutral hover token · Open. Built with `--fill-tertiary-hover`; no new token added
- **Disabled helper text contrast** · Text field, Disabled · axe flags the helper: `--text-disabled` on the page background is 3.38:1 (needs 4.5:1). WCAG exempts text that's part of a disabled control, and axe already exempts the label, but it can't tell the helper belongs to the field · (a) accept the exemption and turn the check off for disabled Text field stories, (b) keep the helper `--text-subtle` when disabled (a Figma change) · Open. Storybook shows the violation on the Disabled and All states stories until Will picks
- **Picking an already-added vendor** · Results panel · (a) does nothing, (b) removes it (toggle) · Figma only shows it as Selected · Open. Built as (a), a no-op; removing is the trash on its card
- **Multi Result rows have no corner radius** · Result row, Select=Multi (step 2) · Single rows have radius 6; Multi rows have none in Figma · Probably unintended; the batch 3 spec notes multi rows sit edge to edge inside the Brand list's border, so square corners may be intended · Open. Built with radius 0 (Oct 17)
- **Focus after removing a vendor** · Select vendors card, Remove · Not in Figma or the annotations · Open. Built as the spec suggests: the next card's Remove (the previous one if it was the last), or the search when none are left; announced "Cargill removed"
- **"Selected vendors (N)": heading or not?** · Select vendors card · (a) a label for the list (Figma's label style), (b) an H2 (code-backlog: "H2 = panel / section titles") · Spec says build (a) · Open. Built as (a): `.type-label-lg`, names the `<ul>` with `aria-labelledby`
- **Results panel after a pick** · Select vendors card · (a) stays open so several vendors can be added in a row, (b) closes after each pick · Not drawn; the helper text ("Select a vendor to add it immediately") suggests (a) · Open. Built as (a): query and focus stay

## From the step 2–4 spec export (Oct 17, night)
*Logged by the spec export so Claude Code doesn't have to. Each spec says what to build until Will answers. Multi Result row radius and Effective date typed field are already above.*

**Step 2 (Select brands)**
- **Brand list shadow** · Brand list `744:777` · Figma has `Elevation/2 – floating` on a list that sits inline in the card · Probably left from when it was a dropdown · Open. Build without the shadow (`brand-list.md`)
- **Incomplete vendor: note or empty state** · Selected brands panel, Incomplete · code-backlog: a "Sysco needs at least one brand." note; Figma: inline Empty selection "No Kraft Heinz brands yet", no note · Open. Build Figma's (`selected-brands-panel.md`)
- **Undo toast for "All N brands" ×** · Select brands card · code-backlog asks for an undo toast; there's no Toast component in Figma · Open. Build the clear + a live-region announcement, no toast (`select-brands-card.md`)
- **Focus after removing a chip** · Selected brands panel · Not in Figma or the annotations (same question as step 1's vendor remove) · Open. Build: next chip's ×, else previous, else the vendor's H3 (`selected-brands-panel.md`)
- **General Mills wordmark** · Vendor logo / coverage tile · `vendors.ts` (step 1) "GIS"; Figma step 2 coverage tile "GMI" · Open. Keep `vendors.ts` as the one source
- **Status mark To do center** · Status mark · Figma fills it white (`--surface-card`); code-backlog suggests transparent once real logos exist · Open. Build Figma's

**Step 3 (Global presets)**
- **Option tile label weight** · Option tile · code-backlog "Radio labels": always 600; Figma Label/LG = 500 in every state · Open. Build 500 (`option-tile.md`)
- **Preset grid** · Global presets card · code-backlog "Grid": 2 columns, Dates spans both; Figma: 3 equal columns, gap 32, Effective date first · Figma is later · Open. Build Figma's (`global-presets-card.md`)
- **Is today selectable?** · Date picker · "past days disabled" vs "Choose a date after today" · Open. Build with today disabled (`date-picker.md`)
- **Today + Selected day** · Calendar day · Not drawn · Open. Keep the today dot, in `--text-on-primary` (`calendar-day.md`)

**Step 4 (Review)**
- **Review card pictogram** · Review template card header · Figma uses Pictograms Type=Placeholder; there's no review pictogram · Open. Build `placeholder`
- **Scrolling list max height** · Review template card, Vendors | Brands lists · code-backlog ~266px (6½ brand rows); Figma lists are now 230, which fits the fixed 644 card · Open. Build 230
