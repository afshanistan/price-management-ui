# Step 2 (brands) design review — Will, Oct 19

Running list from Will's review. Ideas are collected first and built in a batch at the end, unless Will says to build one now. Order of the review: brands page (design, then motion) → presets → review page → the stepper on its own.

| # | Item | Status |
|---|---|---|
| 1 | Results list: a search in each vendor header instead of the top search | **Dropped.** Kept the top search (decision log, Oct 19) |
| 2 | Group header: collapsible, caret on the right | **Built Oct 19** (in item 7) |
| 3 | Group header: select all needs a label, and where it goes | **Built Oct 19** (in item 7) |
| 4 | Group header: stronger hierarchy for the vendor name | **Built Oct 19** (in item 7) |
| 5 | Group header: the bar blends into the list | **Built Oct 19**: Teal/100 + dark teal rule (in item 7) |
| 6 | Group header: name size and color | **Built Oct 19**: Label/XL (15/22 medium; 16 semibold was "a tick too big", 16 medium looked the same), `text-heading` (in item 7) |
| 7 | Group header layout: name + count left; ☐ Select all + caret right | **Built and committed Oct 19** at Will's request. Decision log "Group header: a teal bar that opens and closes"; Figma queue in `docs/figma-sync.md` |
| 8 | Brand rows a scooch too tall (−20%) | **Built Oct 19**: 40px (Brand list only; step 1 stays 48) |
| 9 | Rows blend together: every other row Neutral/100 | **Built Oct 19 as hairline dividers** (stripes rejected: hover vanished on Neutral/100) |
| 10 | Open/close is instant: ease it | **Built Oct 19**: open 225ms ease-out, close 150ms ease-in; search and reduced motion instant |
| 11 | Teal accent edge on the Brand list, like the panel's plum edge | **Built Oct 19**: 3px `--border-action-strong` (Teal/700) |
| 12 | Coverage tiles: full-color logos in an invisible frame | **Tried, then dropped** (logos too small or replaced by names in a 75px cell) |
| 13 | Coverage strip as a 4-column wrapping grid | **Dropped with 12**: the strip is gone (answers pressure-test #1) |
| 14 | Selected brands: vendor name one tick bigger and bolder than the chips, complete mark after the count | **Built Oct 19**: Label/LG plum; citron check after "N of M" once the vendor has a brand. Mark motion: later |
| 15 | One empty line for every vendor | **Built Oct 19**: "Select a brand to continue" (answers pressure-test #2); panel helper "Select brands on the left…" |
| 16 | Vendors below jump when a vendor empties | **Built Oct 19**: the placeholder is a 34px chip-shaped slot (pill); each vendor holds ≥34px |
| 17 | Count badge citron once every vendor has a brand | **Already built** (Oct 17) |
| 18 | Vendor names in the panel: not plum | **Built Oct 19**: `text-heading`, like the Brand list |

| 19 | Motion pass: page-load stagger, slot fills into the chip, check pops in, "step done" as one moment, chip hover lights its row, opened group scrolls into view | **Built Oct 19** (decision log "Step 2 motion pass"). Dropped: vendor name as a link |

Pressure-test #3 (Sprite under two vendors): **kept as is** (Will, Oct 19); logged as a data question for real vendor data. No toast on step 2 (Will, Oct 19): clearing "All N brands" is undone with Select all. Step 2 review done. The step-to-step transition waits for the stepper review.

Explorations kept for reference: Storybook → `Scratch/Group header explorations` (`src/scratch/`).

Next: pressure-test #3, then the presets page (step 3).
