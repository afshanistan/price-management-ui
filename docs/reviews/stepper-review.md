# Stepper and step transition review — Will, Oct 19

What was built before: resting states only (nodes, lines, glow), no motion; states derived from the current step alone. Spec: `design/specs/stepper.md` ("the fuse", revised Oct 19); code-backlog "Charge-up on Next", "Step-to-step card transition". Will: today's page transitions feel too fast (200ms, 35ms stagger, no exit).

| # | Item | Status |
|---|---|---|
| A | Fuse duration: build 1200ms and 2000ms, a Storybook toggle to compare; default 1200 (2s on every Next gets long) | **Built**, not committed |
| B | Card timing beside the fuse: old content exits ~200ms toward the past, new content enters ~300ms from the travel side, ~60ms stagger inside; done in ~550ms while the fuse keeps running. Back / Edit reverse | **Built**, not committed |
| C | Fuse weight: one 2px stroke. *Changed (Will, testing): the 2 → 4 thickening at the end flickered (the fuse vanished while the line eased plum → citron) and added little, so a complete line is now 2px citron + glow, the same as the stroke that draws it; nothing swaps. Rejected: two segments that really grow, a crossfade. Then a flicker at the very end: the bloom flashed up and back to nothing before the resting glow eased in (bright, gone, back). Fixed: the line underneath turns complete, resting glow on, as the bloom starts, so the bloom fades back onto it (as the spec says). Rejected: dropping the bloom* | **Built**, Will testing |
| D | Step 3's shorter (hugging) card: the card surface eases between heights during the swap; the footer never moves | **Built**, not committed |
| E | Current step label: Bold, as Figma (closes open question "Current step label weight") | Kept as built |
| F | Download finale (the pulse runs the whole line once): held while Download is a placeholder | Held |

**Back from review (Figma 02e, checked Oct 19):** the current step is the ring; every other step reached shows complete; every line up to the furthest step reached is citron. Built: the app tracks the furthest step reached (`reachedStep`).

**Built:** the fuse (`Stepper.tsx`, "Charge-up" story with a 1200/2000 toggle; "Back from review" story); the card surface drawn once by the layout, content exits and enters by direction (`WizardLayout.tsx`); step arrivals fade groups in 60ms apart over 300ms (`motion.css`); focus moves to the new heading once it has arrived (it used to fire before the old card left). 178 tests pass.

**Fuse ending, tuned with Will (Oct 19):** the end read as a flicker. Will's rule: fade what's already there instead of switching it on (switched on, it starts at full and drops). The bloom and the resting glow already worked that way, but three things changed in the last frame: a 180ms bloom flash (0 → 100% → 0), the label turning bold (weight can't animate; the word shifts), and the fuse's ring swapping for the node's own. Now, in phases:
- **Run (0–80%):** check draws, stroke runs and wraps; the next label is already bold, still gray.
- **Settle (80%):** the line underneath turns complete with its resting glow; the bloom swells to 70% over a third of the fuse (~400ms at 1200) and settles onto it.
- **Arrive (90%):** the node's own ring, fill and dot fade in under the fuse's ring; the label's color eases to active. The fuse goes once the bloom ends.
- **Slow motion:** the Charge-up story's fuseDuration has 6000 to see each phase.

## Going back un-completes (Will, Oct 19)

Going back (Back, Edit) takes you to an earlier step of a linear process, so you redo from there: the later steps go back to not started, and walking forward replays the fuse on each Next. **Replaces Figma 02e "Back from review"** (later steps stayed complete) and the code-backlog rule "Stepper keeps later steps complete". Picks are still kept; only the stepper resets.

| # | Item | Status |
|---|---|---|
| G | The reverse runs **800ms**, quicker than the fuse: undoing isn't a moment | **Built**, not committed |
| H | Jumping back several steps (Edit vendors from Review): **one continuous pull back** in the same 800ms | **Built**, not committed |
| I | The footer's Back (one step) uses the same reverse | **Built**, not committed |

The reverse, the fuse played backwards without a bloom: the completed path (from the landing step to the old ring) is drawn over the plain track with its resting glow, then retracts: it unwinds the old ring counter-clockwise, then pulls back down the line; each step it passes un-checks; when it's gone, the landing step's check undraws and its ring fades in. The old step is a dot from the start, its label easing to gray and dropping its weight last. Charge-up story: Back, "Back to Vendors", unfuseDuration 800 / 1200 / 4000 (slow motion). Test: "Flow: forward and back".

**Fix (Will):** going back, the landing node's dot sat low for a split second, then jumped to center. The undrawing check and the dot were stacked in the node's grid (two rows); now they share one centered cell.
