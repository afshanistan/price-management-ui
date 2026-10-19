# Motion options for steps 3 and 4 (Oct 18)

For Will to choose from; nothing here is built. Same rules as steps 1–2: functional and calm, motion only shows cause and effect, under 300ms, nothing loops or flashes, a reduced-motion fallback for each. Already in place on every step: the shared color and focus easing, Next easing between blocked and enabled, the toast.

## Step 3 · Global presets

| Option | What it shows | Recommendation |
|---|---|---|
| **Picking an option tile:** the radio dot scales in (fast) as the tile's fill and border ease | Which option you just chose | Yes: small, and the tile's colors already ease |
| **The date picker opens and closes** with a fade and a 4px drop, like the vendor Results panel | It belongs to the Custom date tile | Yes, for consistency with step 1's panel |
| **"Pick a date" → "Oct 28, 2026"** cross-fades in the Custom date tile when a date is confirmed | The choice landed | Yes (fade only) |
| **Next month / Next quarter dates** tick when "today" rolls over | — | No: it never happens while someone is on the page |

## Step 4 · Review

| Option | What it shows | Recommendation |
|---|---|---|
| **The summary numbers count up once** on arrival (0 → 12, 0 → 122, ~400ms, ease-out) | "Here's what you built": the one celebratory moment the design already reserves (Display/Number and citron live here, decision log Oct 17) | Maybe: the one place a little celebration fits; skip if it feels like a dashboard gimmick |
| **The three sections stagger in** (summary → lists → presets), like step 1's page load | Reading order | Yes, if step-to-step transitions come in too; otherwise it only plays on arrival |
| **Download:** the stepper's line charges across once (the code-backlog "finale") | Done | Later, with the stepper charge-up (step-to-step motion is deferred) |
| **Edit buttons:** none beyond the button's own state | — | Nothing extra |

## Still deferred

- The step-to-step transition (stepper charge-up, card slide) for all steps: `TODO(step-transition)`.
