# Step 4 (review) design review — Will, Oct 19

Same routine as steps 2 and 3: Will clicks through top to bottom, notes are logged here, then built as one batch when Will says go. Open items from the handoff are questions A–I (in the session); answers get logged here as they come.

| # | Item | Status |
|---|---|---|
| R1 | Card header pictogram: replace the placeholder triangle with a real Review pictogram | **Built Oct 19** (Will exported `review`; card header uses it) |
| R2 | Edit buttons (Vendors, Brands, Global presets): replace the placeholder triangle with a real edit icon (answers question G) | **Built Oct 19** (Will exported `edit`; the stroke file holds the solid drawing, open question) |
| R3 | Summary strip labels follow the count: "1 Vendor" / "2 Vendors", "1 Brand" / "16 Brands" (was always plural) | **Built** |
| R4 | Summary strip: "Presets set" → **"Presets"**, so it reads Vendors · Brands · Presets. Keep the count ("2 of 3"); "Defaults set" rejected | **Built** |
| R5 | Summary strip: in "2 of 3", "of 3" drops smaller and subtle; the number stays display size (Will OK'd Claude's pick) | **Built** |
| R6 | One "Optional" on the page: drop the Tag from the Global presets section header; the Presets stat keeps its Tag | **Built** |
| — | The summary strip's thirds don't line up with the Vendors \| Brands halves below | **Kept as is** (Will: fine) |
| R7 | Vendor rows match step 1: no wordmark tile, ESN as "ESN-70441642" (pressure-test #5 (a); supersedes "Review rows show the wordmark tile", Oct 18) | **Built** |
| R8 | Lists stay A–Z, like step 2 (open question "Review order" (a)) | **Kept as built** |
| R9 | Brands box grouped by vendor, open: a quiet read-only label per vendor ("Cargill · 8 brands") that sticks while its brands scroll by; no vendor column (pressure-test #4 (a) open, answers #6). Explored in `Scratch/Review brands explorations`, option 2. Label look is a stand-in (neutral, not teal: it isn't interactive) | **Built** (Figma queue) |
| R10 | Remove a brand on Review: a trash icon button on every brand row, the step 1 pattern ("Remove Cheerios"). Counts follow (group label, Vendors list, summary). Vendors can't be removed here (Edit vendors). Changes the spec ("rows are read-only") | **Built** |
| R10a | A vendor's last brand: the trash shows **disabled**, with a tooltip "Each vendor needs a brand" (O (b)) | **Built** |
| R10b | Undo toast after a removal, like step 1 (P (a)) | **Built** |
| R10c | Trash always visible on every row, quiet, red on hover (Q (a)) | **Built** |
| R10d | Motion: the removed row fades and collapses (base timing), rows below slide up; refined in the motion pass (R) | **Built** |
| R11 | Plum accent edge on top of both Review lists (Vendors and Brands), like the Selected brands panel: plum = "what you've got"; teal rejected (reads as a list to act on) | **Built** (Figma queue) |
| R12 | Scroll shadows on Review's lists: a soft inset shadow at the bottom while there's more below, at the top once scrolled; each disappears at its end. Fade, cut-off row and always-on scrollbars rejected. No exploration needed (Will) | **Built** (stand-in `--scroll-shadow`, Figma queue) |
| R13 | Presets wording matches step 3: "Decide later" (was "No default"), "Canadian dollar (CAD)" (was "CAD"). Closes open question "Review's preset wording" (E) | **Built** |
| R14 | Effective date shows the date only ("Nov 1, 2026"), not step 3's "Next month" description (S) | **Kept as built** |
| R15 | "Decide later" carries "Fill in per row" under it, as on step 3 (T (b)); depends on the open product question on what it means downstream | **Built** |
| R16 | Preset readout hierarchy: label stays quiet (Body/SM, subtle); a set value goes **Body/LG Strong** (Geist SemiBold 16, `text-heading`); "Decide later" stays regular, subtle. Labels in mono rejected (mono is for data: IDs, ESNs, SKUs); values in mono rejected (words read as code) | **Built** (Figma queue) |
| R17 | Fit the 644 card: "Decide later · Fill in per row" on one line, like step 3's inline tile (replaces "under it" in R15); readout padding 12 → 10 top and bottom | **Built** (Figma queue) |

Visual review done (Will, Oct 19). Batch built Oct 19, not committed: Will looks first. 176 of 176 tests pass.

**Fit (R17), Oct 19:** with R15 and R16 the card was 666 at its fullest, 22 over the fixed 644, so it would have scrolled in the app. Will picked (a). Rejected: shrinking both lists to 208. Now 644 exactly (Long lists and Heavy). Motion pass next.
