# Overnight polish (Oct 17 → 18)

Will is asleep. Work through this list on your own, after batch 4 is finished and committed. **Don't wait for answers:** where something needs a decision, log it in `docs/open-questions.md`, take the default the spec gives, and keep going.

## Ground rules
- **Don't change design values** (colors, sizes, type, spacing, copy). Figma is the source; gaps go to `docs/figma-sync.md` the usual way.
- **Don't resolve open questions.** Build to each spec's stated default.
- Commit after each section below, so a bad step can be undone. Don't push.
- If a step fails twice the same way, log it in the report and move on.

## 1. Motion (code-backlog "Global" + "Select brands card")
- One global rule: **150ms ease-out** on `background-color`, `border-color`, `color`, `box-shadow`, `outline-color` for every interactive component. No springs on color. Put it in one place (a shared CSS file or token like `--motion-duration-fast` / `--motion-ease-out`), not per component.
- **Button and Icon button press:** `transform: scale(0.97)` on `[data-pressed]`.
- **Checkbox press:** slight scale-up (`scale(1.08)`) on press; **check draws in** with `stroke-dasharray` / `stroke-dashoffset` over 150ms ease-out after the box fills. Same for the Mixed dash.
- **CountBadge pop** when the number changes (1 → 1.1 → 1, 150ms).
- **Reduced motion:** under `@media (prefers-reduced-motion: reduce)` turn off every scale, draw and pop. Color changes may stay instant.
- **Not tonight:** stepper charge-up, card step transitions, card height animation. Those need the React app.
- Add a Storybook story or note per component showing the motion, and a way to check reduced motion (Storybook's toolbar or a decorator that sets the media emulation, if easy; otherwise a note in the report).

## 2. Accessibility sweep
- Run the a11y checks on **every story** (Storybook test runner with axe, or the a11y addon in a headless run, whichever the repo already supports; add the test runner if it's quick).
- Fix every violation that's a code bug (missing name, wrong role, focus not visible, contrast caused by code using the wrong token).
- Violations caused by a **design value** (contrast of a Figma token pair, etc.): don't change the token. Log in `docs/open-questions.md` with the numbers, and mark the story's known exception if the repo has a pattern for that.
- Check that **every interactive element has a visible focus ring** (Rule ID 8): one global `:focus-visible` rule, round rings on chip ×, calendar day and the input clear button.
- Check **min-height not height** on every text-bearing component (Rule ID 6). Fix any `height` on those.
- If quick, add **play (interaction) tests** for the main flows: add/remove a vendor; check a brand, select all, remove a chip; pick a preset, open and cancel the date picker, confirm a date. Keyboard where possible (Tab, arrows, Enter, Esc).

## 3. Report and checkpoint
- Write `docs/overnight-report.md` for Will, in plain words, short:
  - what you changed (motion, a11y fixes), by component
  - a11y result: stories passing / with known exceptions (list them)
  - anything you logged in open questions tonight
  - anything you couldn't do and why
  - **what Will should look at first in the morning** (the 5 or so things most worth his eyes)
- Final commit: "Polish checkpoint: motion + a11y sweep (pre-review)". **Don't call the components done.** That's after Will's visual pass.
