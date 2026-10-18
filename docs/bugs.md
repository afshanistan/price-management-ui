# Known bugs

Found while reviewing; fix in a bug pass. Newest first.

- [x] **Results panel paints under the Selected vendors area** · Step 1, Select vendors card · Typing "co": the "Selected vendors (0)" label and the empty state show through the open Results panel. **Likely cause:** the page-load animation (Step 1 motion pass, Oct 18). Each staggered group (`.select-vendors-card__search`, divider, `__selected`) gets its own stacking context while `motion-enter` holds its end state (`animation-fill-mode: both`), so the panel's `z-index: 1` only counts inside the search group, and the later selected area paints on top. **Likely fix:** drop the forwards fill (use `backwards`, so the animation releases when it ends), or give the search group a higher stacking order than the groups after it. Will, Oct 18. **Fixed Oct 18:** page-load animations use `backwards` (motion bug pass)
