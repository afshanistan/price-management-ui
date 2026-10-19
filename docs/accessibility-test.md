# Accessibility test — React stage (Oct 19)

Will's checklist: Google Sheet "Accessibility Checklist", tab "A11y checks", column J (React: what to check). Column K holds the status below. Run on the app (`npm run dev`) at 1440×900, keyboard only, with axe-core loaded into each screen (WCAG 2.0/2.1/2.2 A and AA + best practice). The prototype won't get context-of-use testing, so those items are Fix later.

| # | Rule | Status | Evidence |
|---|---|---|---|
| 1 | Text contrast | Pass | axe color-contrast clean on every screen and state: step 1 (empty, results open, two vendors, Undo toast), step 2 (empty, all selected), step 3 (default, calendar open), step 4 (review, removal toast, blocked trash, Download toast). New plum toast included. |
| 2 | Controls stand out | Pass | Measured: trash at rest 3.62:1 on white; stepper complete line (2px citron) 8.66:1 on plum; plum list edge 7.24:1. List borders are container edges, not controls. |
| 3 | Not color alone | Fix later | Grayscale: stepper (check / ring / dot), summary checks, selection marks all readable. Count badge (step 2) to do vs complete still differs by color only: a design change (e.g. a check in the complete badge). |
| 4 | Structure | Pass | One h1 per step; H2s Vendors / Brands / Global presets on Review; landmarks present; axe clean. With the calendar open, React Aria hides the page behind the modal (axe best-practice notes only, expected). |
| 5 | Labels | Pass | axe label checks clean; blocked Next tied to its hint ("Add at least one vendor / brand for every vendor to continue."). |
| 6 | Text can grow | **Fixed** | The locked Review card (R18) would have clipped its presets when text grows. Now it stays locked at normal size and scrolls when its content is really taller than the frame. Tested: text-spacing (fits, uses the 16px of room); forced 62px taller (scrolls, presets reachable). |
| 7 | Reflow | Accepted | Desktop-only decision: the page keeps its 1024 minimum, nothing clipped at narrow widths. |
| 8 | Focus visible, never covered | **Fixed** | Review's sticky vendor labels could cover a focused trash when moving up. Added scroll-padding (32px, the label height), like the step 2 Brand list. All 18 trash buttons checked both directions: in view, clear of the labels. Rings teal on every surface. |
| 9 | Focus order | Pass | Header → content → footer on every step; focus on the new card's heading after Next / Back / Edit; Esc in the calendar returns focus and selection to the previous tile; Undo returns focus to the restored card. |
| 10 | Keyboard only | Pass | Full run without a mouse: add vendors (type + Enter), remove + Undo, Select all per vendor, presets (arrows), calendar (Enter, Esc), Review trash (Enter), Download. |
| 11 | Popovers | Pass | Results panel and calendar stay inside the card (calendar bottom 505, footer top 804); Esc closes; no traps. |
| 12 | Targets | Pass | Review trash 32 in 40px rows; calendar days 36; chip × 24; Button XSmall 24. |
| 13 | Names out of context | **Fixed** | Review trash said "Remove Sprite" while the same brand can sit under two vendors. Now "Remove Sprite, Coca-Cola Consolidated", like step 2's rows. Buttons list per screen reviewed. |
| 14 | Consistency | Pass | Footer and stepper identical on every step; Next never moves (fixed 644 frame, also on step 3). |
| 15 | Announcements once per change | **Fixed** | Vendor and brand search counts were announced on every keystroke. Now once, 500ms after typing pauses ("10 brands match" for "coca": one announcement). Removals, restores and step changes announce once. |
| 16 | Blocks explained | **Fixed** | A vendor's last brand: its trash became blocked while focused and pressing it did nothing, with no explanation. Now the reason is the button's description, and pressing it shows the tooltip "Each vendor needs a brand". Blocked Next hints present on steps 1 and 2. |
| 17 | Motion off | Pass | Reduced motion: no fuse, no movement on step change (content transform none), a short fade only. |
| 18 | Forced colors | Fix later | Not emulated (needs DevTools). Known fill-only states: count badge, selected calendar day, active nav link. |
| 19 | Screen sizes | Fix later | 1440×900 fits (footer ends at 860); 1024 wide fits (no sideways scroll); 1280×800: Next sits below the fold (page 884 tall): a layout decision for context of use. |
| 20 | Title and language | Pass | `lang="en"`; title per step ("Add brands – Template Builder", …). |

Test-only notes: the browser used for testing ran without animation frames, so CSS fades froze mid-way; contrast was checked with transitions off (one false flag on the just-enabled Next cleared that way).
