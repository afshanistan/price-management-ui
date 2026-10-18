# A11y checklist: Storybook stage (Oct 18)

Run the **Storybook column** of Will's A11y checklist (Google Sheet "A11y checks", column G) against the components, and write the results to `docs/a11y-storybook-results.md`. Claude (chat) reads that file and fills in the sheet's Storybook status and notes, so **report evidence, not opinions**.

## Ground rules
- Same as the overnight polish: **don't change design values, copy, or open questions.** Code bugs that break a check: fix them, rerun the tests, commit per fix ("A11y rule N: …"). Anything that needs a design decision: log it in `docs/open-questions.md` and mark the row "Fix later".
- Use real browser evidence (Playwright / vitest browser / Storybook test runner). Screenshots go in `docs/a11y-evidence/` (rule number in the filename).
- Don't call a row Pass without saying how you checked it.

## Status values (use exactly these)
**Pass** (checked, nothing wrong) · **Fixed** (was wrong, fixed in code today, commit named) · **Fix later** (logged, not fixed) · **Needs Will** (needs a human to look; say what to look at) · **N/A**

## The 20 rows (Storybook check per rule)
1. **Readable text (1.4.3).** `tokens.css` values match Figma (it's v4 from today's Figma sync, so confirm no hand edits since). axe `color-contrast` on every story in **both modes** (Light and On brand). List any story that only passes because of a known exception.
2. **Controls stand out (1.4.11).** Borders render at the intended color and width in every state story, including the **1.5px Secondary** border (check computed `border-width`). Input, checkbox, radio outlines; selected tile borders; Result row keyboard-active outline.
3. **Not color alone (1.4.1).** Screenshot each state story (Status mark, Count badge, Option tile, Stepper, Result row, Text field Error, Vendor coverage tile) with **grayscale** and **deuteranopia/protanopia** emulation (CDP `Emulation.setEmulatedVisionDeficiency`). Mark **Needs Will** and list the screenshots for him to judge.
4. **Structure (1.3.1).** Components use semantic elements: button, fieldset + legend (preset columns), `ol` for the Stepper, listbox for result lists and the brand list (with groups). List any `div` doing a button's job.
5. **Labels and instructions (3.3.2).** Every input is labelled (for/id or aria-labelledby); helper text via `aria-describedby`; Wizard navigation's disabled-Next hint is tied to Next with `aria-describedby`.
6. **Text grows (1.4.4, 1.4.12).** Apply the WCAG text-spacing styles (line-height 1.5, paragraph spacing 2em, letter 0.12em, word 0.16em) to every story, plus 200% font size. Report clipping or overlap (compare `scrollHeight` vs `clientHeight` on text containers, plus screenshots of anything suspicious). Known: Calendar day's two-digit number overflows its 36 circle slightly.
7. **Reflow (1.4.10).** Organisms and cards in narrow containers (e.g. 480px wide): they wrap rather than overflow horizontally. Desktop-only 1024 minimum is an accepted exception at page level; this is about components.
8. **Focus visible (2.4.7).** The Focus rings test covers it: confirm it still passes, that it includes the **On brand** controls (header), and every interactive component's states. Also: sticky Group header never covers the active row (today's fix).
9. **Focus order (2.4.3).** Inside composites: Date picker (grid → OK/Cancel, focus returns to the trigger), Brand list (search → select alls → chips), radio groups (one Tab stop, arrows inside). Write the actual order observed.
10. **Keyboard (2.1.1, 2.1.2).** Every story operable by keyboard alone, no traps (Tab in and back out of each).
11. **Popovers (1.4.13).** Date picker and Results panel: Esc closes, stays open while hovered/focused, click outside dismisses.
12. **Target size (2.5.8).** Measure rendered sizes of every interactive element: ≥24×24, or spacing so a 24px circle doesn't hit a neighbour. Check Input Clear, Brand chip ×, Icon button Small, Button XSmall, Calendar day, Checkbox / Group header select all, trash buttons. Compare to Figma (Clear 24, chip × 24, day 36).
13. **Names (4.1.2).** Every icon button's accessible name matches the annotation: "Clear search", "Remove Truvia", "Remove all General Mills brands", "Choose custom date", "Previous month"/"Next month", "Select all Cargill brands", "Edit vendors/brands/presets", "Remove Cargill", day "Wednesday, October 28, 2026".
14. **Consistency (3.2.3).** One component per pattern: list any one-off duplicates (e.g. a second button or chip implementation).
15. **Announcements (4.1.3).** Live regions exist and fire once per change: CountBadge, chip removed, vendor added/removed, select all. (There's no toast component; say so.)
16. **Errors explained (3.3.1).** Text field Error: message present, `aria-invalid="true"`, `aria-describedby` → message. Disabled Next: hint present and linked.
17. **Motion off.** With reduced motion (system emulation via `emulateMedia({ reducedMotion: 'reduce' })` and the toolbar Motion = Reduced): press scale, checkbox draw, badge pop all become instant.
18. **Forced colors.** `emulateMedia({ forcedColors: 'active' })`: borders, focus rings and icons (currentColor) stay visible. Screenshot the Result row keyboard-active, Calendar day selected, Option tile selected, Checkbox checked, Count badge complete, Nav link active. Flag any state that disappears.
19. **Screen sizes.** Viewport addon (or set viewport) on organism/card stories at 1024, 1280, 1440 wide: nothing clips or overlaps.
20. **Page titles and language.** Not checkable in Storybook (page-level). Mark **N/A**.

## Output: `docs/a11y-storybook-results.md`
One section per rule, in this shape:

```
## Rule N · <test name>
Status: Pass | Fixed | Fix later | Needs Will | N/A
How checked: <tool / test / stories>
Findings: <specifics, or "none">
Fixed: <commit message, or "—">
Logged: <open-questions entry, or "—">
```

End with a short summary: counts by status, the commits made, and the **Needs Will** list in one place. Run `npm run test-storybook` last and include the result. Commit the results file and evidence folder: "A11y: Storybook stage checklist results".
