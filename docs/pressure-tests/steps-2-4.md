# Steps 2–4 pressure test: 12 vendors, 122 brands (Oct 18)

The heaviest realistic template: 12 vendors including the giants (PepsiCo 22 brands, Coca-Cola 20, Conagra 20, General Mills 19, Kraft Heinz 19, Nestlé 15, Mars 15), both Coca-Colas (shared brand names), and small ones (Chiquita 3, TreeHouse 4, Tillamook 5). 160 brands to choose from; 122 selected; all three presets set. Run in the app (`src/data/mockBrands.ts`), screenshots in `step-2-4/`. Findings and options only: the decisions are Will's.

## Fixed during the test

- **Escape in the brand search wiped every selected brand** (24 → 0, no undo). React Aria's list clears its selection on Escape by default. Fixed and covered by a test (`docs/bugs.md`).

## Holds up

- **Step 2 list:** 160 rows with sticky vendor headers; search narrows quickly ("sprite" → 2 rows in 2 groups; "coca" → both Coca-Colas' 30 brands; "haagen" finds Haagen-Dazs; "p.f. chang" finds P.F. Chang's Home Menu).
- **Chips:** no chip name is cut off, even "TreeHouse Private Label Coffee". "All N brands" chips keep big vendors compact.
- **Next** unblocks only when all 12 vendors have a brand.
- **Step 3:** all three presets set; nothing to note at this scale.
- **Review:** the summary reads 12 / 122 / 3 of 3; presets read Jan 1, 2027 · CAD · Cost plus; both lists scroll inside the fixed card.

## Needs a decision

| # | Step | Finding | Evidence | Options |
|---|---|---|---|---|
| 1 | 2 | **The coverage strip doesn't scale.** 12 vendors squeeze into 12 tiles 24px wide: logos vanish and it reads as a row of tick marks. Fine up to about 4. | `s2-12-vendors-empty`, `s2-panel-top` | (a) wrap to rows of 3–4 (the strip grows, the chips get less room), (b) scroll the strip sideways, (c) past ~4 vendors, replace it with one line: "9 of 12 vendors have a brand" (the groups' "N of M" already say which), (d) drop the strip; the group headers and the CountBadge carry it |
| 2 | 2 | **"No Conagra Brands brands yet."** The inline empty copy doubles "Brands" for vendors whose name ends in it (Conagra Brands, Constellation Brands, Utz Brands; Chiquita Brands International reads oddly too). | `s2-search-sprite` (Conagra group) | (a) "No brands from Conagra Brands yet", (b) "Nothing selected yet" (the group header already names the vendor), (c) keep |
| 3 | 2 | **The same brand under two vendors.** "Sprite" appears in The Coca-Cola Company and Coca-Cola Consolidated (real: a brand and its bottler). Rows are told apart only by their group header; screen readers hear "Sprite, The Coca-Cola Company". Chips sit in their vendor's group too. | `s2-search-sprite` | (a) fine as is (grouping does the work), (b) show the vendor beside the brand while searching, (c) treat it as a data question for real vendor data |
| 4 | 4 | **Review's Brands list is a long scroll.** 122 brands in a window that shows about 5 (228 of 4,880px). Checking a big template means scrolling 24 screens of rows. | `s4-review-big`, `s4-review-scrolled` | (a) group brands by vendor with a count, collapsed by default ("PepsiCo · 22 brands"), (b) list vendors with brand counts only and let Edit brands show the detail, (c) a taller list (the card is a fixed 644), (d) keep |
| 5 | 4 | **Review's vendor rows still show the wordmark tile** ("CGL", "KO"), the look the step 1 results dropped as placeholder-like; and their **ESNs are bare numbers**, not "ESN-70441642" like the results and cards. | `s4-review-big` | (a) match step 1: no tile, "ESN-" format, (b) keep the tile on Review only |
| 6 | 4 | **Long vendor names cut off in Review's Brands list.** The vendor column is mono and narrow: "Tillamook County Creamery Association" truncates. | `s4-review-big` (scroll to Tillamook) | (a) ellipsis + full name on hover (as now), (b) drop the vendor column when brands are grouped (see 4a) |

## Decided

- **#1 (Oct 19, Will): drop the strip** (option d). Each vendor line in the panel shows a citron complete mark after its count instead.
- **#2 (Oct 19, Will):** every empty vendor reads "Select a brand to continue".
- **#3 (Oct 19, Will): (a) keep as is, and (c) a data question for real vendor data.** A real edge case; the stronger teal group headers, vendor-grouped chips and chip-hover-lights-its-row now carry it. If real users pick the wrong one, (b) vendor beside the brand while searching is a small change.

## Noted, not now

- Review's header pictogram and the Edit buttons still use the placeholder triangle (existing open questions).
- Download shows a placeholder toast ("Download isn't built yet"), as agreed.
- Review lists vendors A–Z (open question "Review order").
