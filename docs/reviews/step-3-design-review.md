# Step 3 (presets) design review — Will, Oct 19

Same routine as step 2 (`step-2-design-review.md`): ideas collected, then built as one batch. Will: it's a prototype, keep it tight.

| # | Item | Status |
|---|---|---|
| P1 | Clicking the Custom date tile always opens the calendar, also when coming back to a remembered date | **Built** |
| P2 | Placeholder "Select a date" (was "Pick a date"); the tile shows the latest confirmed date after that. No Clear button: Cancel / OK only ("Decide later" is how you remove a date) | **Built** |
| P3 | The date leads ("Nov 1, 2026", described "Next month"); relative while building, fixed once picked (saved in the value) | **Built** |
| P4 | Calendar opens with a fade + 4px move (base, ease-out), closes with a fade (fast, ease-in) | **Built** |
| P5 | "Select a date" → the chosen date fades in on the tile | **Built** |
| P6 | The radio dot grows in when a tile is picked | **Built** |
| P7 | Currency: the name leads, the code follows ("US dollar (USD)") | **Built** (Review still shows the code) |
| P8 | "Add pricing defaults (optional)": "(optional)" in the title line, regular weight, subtle; the Optional tag is gone from step 3 | **Built** |
| P9 | Step 3's card hugs its content; the 644 frame stays, so the footer never moves | **Built** |
| P10 | The calendar opens upward, above the Custom date tile, inside the card (it covers the header; accepted: better than covering the footer) | **Built** |
| P11 | Page load: card, then header, then the three columns, one stagger apart | **Built** |
| P12 | Arrowing onto Custom date only selects it; click, Enter or Space opens the calendar (WCAG 3.2.2) | **Built** |
| P13 | Cancel with no custom date ever confirmed: selection and focus go back to the previous tile | **Built** |
| P14 | "No default" → "Decide later · Fill in per row" in all three presets (fits the tile: 162 of ~224px) | **Built** (meaning assumed: the column is left to fill per row in the file) |
| P15 | Pickable calendar days 14 medium, near-black; disabled days unchanged | **Built**. Lighter disabled days (new token) held: check first |

Open, not built: a reopened saved template whose relative date has drifted (→ show it as Custom date), Review's currency and "Decide later" wording, whether today is selectable, and what "Decide later" really means downstream.
