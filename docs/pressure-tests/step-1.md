# Step 1 pressure test: 60 real vendors (Oct 18)

Step 1 (Select vendors) in the page shell, run against `src/data/mockVendors.ts`: 60 real grocery suppliers, 8-digit ESNs, near-duplicates and long names. Screenshots in `step-1/` (Playwright, 1440×900). Replay in Storybook: **Layouts → WizardLayout → "Mock: …"** stories.

## Holds up

- **Heavy searches.** "co" finds 17: the panel shows 6 rows and scrolls; arrowing to the 17th keeps the active row in view (`search-co`, `search-co-arrowed-to-end`).
- **Near-duplicates.** Del Monte Foods and Fresh Del Monte Produce are told apart by the name and the ESN (`search-del-monte`).
- **Long names.** One line with an ellipsis and the full name as a tooltip, in the results and the cards: "Tillamook County Creamery Asso…" (`added-near-duplicates-and-long-name`).
- **A crowded template.** 25 vendors: the grid scrolls under its label, the count stays visible, the footer doesn't move; the cut-off row hints there's more (`crowded-25`, `crowded-25-scrolled`).
- **4-letter wordmarks** (MDLZ, TCCA, MNST) fit the tiles.
- **No match** reads cleanly: "No vendors match “nestle”." (`search-nestle`).

## Needs a decision

| # | Finding | Evidence | Options |
|---|---|---|---|
| 1 | **Accents and punctuation break search.** "nestle", "mondelez", "campbells", "coca cola", "jm smucker", "land o lakes" all find nothing. | `search-nestle` | (a) ignore accents, punctuation and hyphens when matching (code only), (b) keep exact matching |
| 2 | **Results are in list order, not best match.** "co" puts PepsiCo (a mid-word match) above names that start with "Co". | `search-co` | (a) names starting with the query first, then words starting with it, then anywhere, (b) A–Z, (c) keep list order |
| 3 | **ESN matching is noisy and invisible.** "0" matches 32 vendors (a digit anywhere in 8), and the matched digits aren't bolded, so you can't see why a row matched. | `search-esn-0` | (a) ESN matches from its first digit only, and bold the matched digits, (b) bold only, (c) keep |
| 4 | **No visible result count.** 17 results show as 6 rows; only a screen reader hears "17 vendors found". | `search-co` | (a) a quiet count in the panel ("17 vendors"), (b) keep (the scrollbar is the cue) |
| 5 | **Long names cut off in the cards.** The full name is a hover tooltip only. | `added-near-duplicates-and-long-name` | (a) wrap to two lines in the Selected item card, (b) keep the ellipsis |
| 6 | **Big templates are slow to scan.** At 126px per card, 25 vendors is 9 rows and about 2 are visible at a time. | `crowded-25` | (a) a compact layout past a threshold (the Row layout was retired in the Oct 17 audit because no comp used it, not rejected), (b) keep cards |
| 7 | **The Results panel fails axe when it scrolls** (more than 6 results): `scrollable-region-focusable`, the same rule you accepted for the Brand list this morning. The comp data never scrolled it. | `search-co` | (a) accept as for the Brand list, (b) make the list a Tab stop |
| 8 | **Logos aren't shown yet.** The tiles still show wordmarks. Where do brand color and single color go (result row 56×36, card 80×48, white vs teal tile)? Same-badge near-duplicates (both Del Montes) and very wide logos (The Coca-Cola Company) need a look. | `docs/vendor-logo-sources.md` | Design review |

## Noted, not now

- **Brand names.** "kellogg" finds WK Kellogg Co but not Kellanova (owner of the Kellogg's brand). Searching by brand would need brand data on vendors; real-data question.
- **Single-letter wordmark.** Kellanova's ticker is "K"; fine as a fallback, and it has a real logo.
- The first result is highlighted as you type, so Enter adds it. My first script assumed otherwise and added the wrong Del Monte; the card is right.

## Outcome (Oct 18)

Will's decisions are in the decision log ("Step 1 pressure test: decisions").

**Built:**
- #1–3: `src/data/search.ts`. Matching ignores accents, punctuation, hyphens and spaces; results are ordered by best match; ESNs match from their first digit, and the matched digits are bold. See `after-search-co`, `after-search-nestle`, `after-search-coca-cola`, `after-search-esn`. Side effect: the comp vendors' ESNs are "DEMO-0022", so on the comp data an ESN search now has to start with "DEMO".
- #7: the Results panel's scroll check is accepted (rule off in the WizardLayout, SelectVendorsCard and ResultsPanel stories, with the reason). No known exceptions are left in Storybook.

**Two existing bugs the test exposed, fixed:**
- **Bold stuck on the first letter.** React Aria caches each result row, so a row kept the bold from the first letter typed ("**C**oca-Cola" for "co"). The Results panel now redraws its rows when the query changes (`dependencies`).
- Not a bug: typed fast, the input's `aria-activedescendant` briefly points at a row the new query dropped. React Aria waits 500 ms before moving it, so screen readers finish announcing the typed letter, then it settles on a real row. The "Mock: search" stories now wait for that before axe runs.

**Waiting on Figma** (`figma-sync.md`): #4 result count, #5 two-line names, #8 logos. **Parked:** #6 big templates.
