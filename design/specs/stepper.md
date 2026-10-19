# Stepper (navigation & wayfinding)

Covers three Figma components that only make sense together: **Stepper** (the organism), **Stepper step** (node + label) and **Stepper line** (connector). Build them as one `Stepper` file with two internal parts; only `Stepper` is exported.

**Figma:** Stepper `879:293` (Current step = 1–4), Stepper step `879:185` (State × 3), Stepper line `879:190` (State × 2), page → Navigation & wayfinding
> Stepper — `<ol>` progress on the plum stage (On brand mode set on the component); citron = complete. Charge-up motion in code.
> Props — currentStep: 1 | 2 | 3 | 4

> StepperStep — node + noun label; complete / in progress / not started (`aria-current="step"`).
> Props — label: string · state (derived from data in code, not a prop): complete | in-progress | not-started

> StepperLine — connector between nodes: 4px citron when complete, 2px border-stepper-track when not.
> Props — state (derived from data in code, not a prop): complete | not-started

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `steps` | `string[]` | `['Vendors', 'Brands', 'Presets', 'Review']` | Noun labels. The stepper names the place; the card title says what to do |
| `currentStep` | `1 \| 2 \| 3 \| 4` | `1` | Steps before it are complete, after it not started |

Step and line states are **derived** from `currentStep`, never props. (Figma's per-variant `State` property is Figma-only.)

## Element
```
<nav aria-label="Progress">
  <ol>
    <li> node + label </li> ×4   (current step: aria-current="step")
  </ol>
</nav>
```
Sits on the plum stage, so the container sets `data-mode="on-brand"` (every Figma variant sets On brand mode itself). Lines are decorative (`aria-hidden`).

## Anatomy and sizes
- Width `--layout-content-width` (960), aligned to the card. `min-height` 46.
- Four **equal columns** of 240 (CSS grid `repeat(4, 1fr)`); each column is a vertical stack, centered, gap 6: **node** (20×20) then **label**.
- Node centers sit at the column centers: x = 120, 360, 600, 840.
- **Lines** run node center → node center (240 long), drawn behind the nodes. Figma places them absolutely at y = 8 in a 4px box, so both line weights are centered on the node centerline (y = 10):
  - Complete: 4px tall.
  - Not started: 2px tall, inside the same 4px box (offset 1px).
  - Square ends (radius 0).
- Simplest build: each `<li>` draws the line to its **left** with a `::before` (skip on step 1), `z-index` below the node.

### Node (20×20), by state
| State | Drawing |
|---|---|
| Complete | 20px circle `--fill-status-complete`, glow `--glow-complete`; check mark 10×7, 2.4px stroke, `--icon-on-status-complete`, centered |
| In progress | 20px circle filled `--surface-brand` with a **2px** `--border-status-in-progress` ring; 8px center dot `--fill-status-in-progress`. **No glow** |
| Not started | 8px dot `--fill-stepper-upcoming`, centered in the 20px box |

### Label, by state
| State | Text style | Color |
|---|---|---|
| Complete | `.type-stepper-inactive` (Geist Regular 14/20) | `--text-subtle` (Neutral/300 on brand) |
| In progress | `.type-stepper-active` (Geist **Bold** 14/20) | `--text-default` |
| Not started | `.type-stepper-inactive` | `--text-stepper-upcoming` |

All color tokens resolve through On brand mode (e.g. `--border-stepper-track` = Plum/500 there).

### Line, by state
| State | Height | Color | Effect |
|---|---|---|---|
| Complete (both ends' left step done) | 4px | `--fill-status-complete` | `--glow-complete` |
| Not started | 2px | `--border-stepper-track` | none |

Line *n* (between step *n* and step *n+1*) is complete when **`currentStep > n`**. Figma check: Current step 2 → Line 1 complete, Lines 2–3 not started.

## Variants to reproduce as stories
| Story | currentStep | Complete | In progress | Not started |
|---|---|---|---|---|
| Step 1 | 1 | — | Vendors | Brands, Presets, Review |
| Step 2 | 2 | Vendors | Brands | Presets, Review |
| Step 3 | 3 | Vendors, Brands | Presets | Review |
| Step 4 | 4 | Vendors, Brands, Presets | Review | — |

Stories need the plum stage behind them (`--surface-brand` background, `data-mode="on-brand"`).

## Accessibility
- `<nav aria-label="Progress">` + `<ol>`; current `<li>` gets `aria-current="step"`.
- Completed steps get visually hidden text: "Vendors, completed" (e.g. `<span class="visually-hidden">, completed</span>`).
- Labels are **not headings**.
- Nodes, checks, lines and glow are decorative: `aria-hidden`.
- Not interactive: the stepper isn't a way to jump between steps (Back/Edit do that).
- Contrast: not-started track Plum/500 on Plum/900 is 3.4:1 (Rule ID 2, fixed Oct 17).

## Motion
- Resting glow on complete nodes and lines only, never on the in-progress ring.
- **Charge-up on Next: the "fuse"** (revised Oct 19, replaces the < 500ms version). One citron stroke leaves the step just finished, runs down the line, and wraps around the next node.
  1. **Close the old step** (0–250ms): its in-progress ring resolves to the complete node; the check draws on (`pathLength` 0→1).
  2. **Line** (≈250–1400ms): a citron stroke draws from the finished node's edge toward the next node, over the 2px track. A short bright tip (Citron/100, the "neon core") leads it.
  3. **Wrap** (≈1400–1800ms): the same stroke continues around the next node, clockwise from 9 o'clock (the side the line arrives on), closing the ring.
  4. **Settle** (≈1800–2000ms): the tip fades; the glow blooms once and eases back to the resting glow; the label goes upcoming → active (bold, `--text-default`). Hand off to the resting state.
  - **One continuous path, one easing curve** for line + wrap, so the stroke keeps its momentum and only settles as it closes the ring (no stall at the node). Default easing: an ease-out such as `[0.22, 1, 0.36, 1]`.
  - **Weight:** the fuse is drawn at 2px end to end; the 4px complete line + its glow fade in underneath behind the fuse's leading edge (or as the fuse finishes). Alternative to compare: two segments (4px line, then 2px ring) with hand-matched easings.
  - **Duration is a tuning variable,** default 2000ms, tested against ~1200ms in Storybook. Not locked yet.
  - **Never blocks input.** Plays alongside the card transition. If `currentStep` changes mid-animation, jump to the end state immediately.
  - **Only first-time completions** play the fuse (track the furthest step reached). Going Back, or Next into a step already reached, just moves the ring.
- **Build:** resting states stay plain CSS. The fuse is a separate decorative SVG layer (`aria-hidden`) over the stepper, absolutely positioned and sized to the 960 × node-row box, that plays and then unmounts. Path computed from node centers (x = 120, 360, 600, 840; y = 10; ring radius 9 for a 2px stroke inside the 20px node). Motion (`motion/react`, already installed) for the sequence. Glow animates the opacity of a blurred copy, not a `filter` value.
- **Reduced motion** (`useReducedMotion`): no fuse layer; instant swap to the resting state, static glow.

## Code backlog
- Progress stepper (Oct 16, evening): placement, node states, line states, resting glow, charge-up, in-progress token pair.
- Accessibility: Stepper not-started track (Rule ID 2); Sizing: Stepper `min-height` 46 (Rule ID 6); Landmarks (Rule ID 4).

## Flags
1. **Current label weight.** code-backlog says "current Neutral/50 **semibold**"; Figma's `Stepper/Active` text style is Geist **Bold** (700). Build with the Figma style (`.type-stepper-active`), and log it in `docs/open-questions.md` for Will to confirm.
2. **The "neon core"** (optional 1px Citron/100 line down the center) isn't in Figma. Skip it.
