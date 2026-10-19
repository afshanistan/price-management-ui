# Price Management 2.0 — Decision log

A running record of the forks in the road: what we decided, what else was on the table, and why. Written for Monday's interview prep, so each entry is a story beat. Newest entries go at the bottom of each day.

Format: **Decision** · Options considered · Why

---

## The arc (for the interview)
Management consultant (systems, trade-offs, stakeholders) → designer (craft) → builder (carrying a decision all the way into code). This project shows one decision traced end to end: a Figma variable → a component variant with documented states → a Storybook story → a working React screen, with the same names at every step.

Will, on why the details matter: the app will "sing" not in the overall navigation but in the little touches, like how icons look when you hover over them. Attention to detail in the early reusable components pays dividends later, because every detail is multiplied everywhere the component is reused.

---

## Oct 13–14 · Foundations

**V5 surface direction wins: neutral page, plum header only, teal actions.**
Options: plum page (too pink), teal or plum tinted pages, Neutral/50 page (too flat). Why: "enough plum without being pink." Plum carries brand identity in one place; teal is reserved for anything you can act on.

**Build components in the working Screens file, extract to a DS file later.**
Options: separate DS file from day one. Why: structure was still changing daily; extraction is mechanical once it settles (variables first, then main components).

**Exposed nested instances instead of instance-swap properties for icons.**
Why: instance-swap couldn't reach variants inside the Icons set; exposing the nested icon surfaces its own Type/Style dropdowns in the Button panel.

**Button hierarchy from visual weight inside one action color, no plum in Secondary.**
Primary solid teal, Secondary white with teal border, Tertiary teal text only. Why: rule 2 (actions are teal) and rule 3 (plum is never interactive). *(Secondary reworked Oct 16 night — tonal fill + 1.5px border.)*

**Components declare identity; containers declare context.**
Buttons set their icon mode (Primary, Secondary…) but never a color mode; the header sets On brand and everything inside adapts with zero overrides. Maps directly to code: a `data-mode` attribute on the header redefines CSS variables.

---

## Oct 15 · Tokens and naming

**Group semantic tokens by property, not by object.**
Options: object-first (action/primary/fill-hover). Why: engineers are the primary user; mature systems (Atlassian, Primer) group by property; it's cheap to rename before code exists and expensive after.

**Leaf names are full, searchable names that equal the CSS variable.**
`fill/fill-primary-hover` → `--fill-primary-hover`. Order is always property, role, state. Why: searching "hover" or "border-secondary" in Figma's picker returns unambiguous results; design and code use the same words.

**Modes are for places, tokens are for things.**
A new surface (Light, On brand, later Dark) is a mode; a new role (error, selected, disabled) is a token. Why: places are few and roles are many, so the mode count stays around 2–4 even as tokens grow. Dark mode later = "On brand light / On brand dark," 2 themes × 2 surfaces.

**Test before converting: named icon tokens lost their color on icon swap.**
Options: bind icons directly to named tokens. Result: Figma drops color overrides when an icon's Type is swapped. Kept the Semantic/Icon modes as Figma's stand-in for CSS `currentColor`, pointing at the named tokens. Lesson: verify the risky part on one variant before converting everything.

**Engineers are the primary user of the system.**
Best-in-class choices that don't make anyone's life hell: names that match code, properties that read like React props, Figma workarounds documented so code doesn't reproduce them (icon modes → currentColor, focus-ring frame → outline).

**Build components opportunistically, driven by real screens.**
The header needed a button, so the Button got built; the card needed a field, so the Text field got built. Nothing designed in the abstract.

---

## Oct 15 · Header details (where the craft lives)

**Icon button is its own component set, not a Button variant.**
Why: different structure (square, no label); a variant would double the Button set and show irrelevant properties. Matches code (IconButton is separate in most systems).

**Icon buttons fill on hover, stay filled on press.**
Why: more expressive than a gray square; pressing continues hovering, so reverting would flicker.

**Stroke/Fill moved from icon variants to an "Icon style" mode.**
Problem: in prototypes, Figma drops an icon swap when states use different components (hover showed Placeholder). Fix: one component per icon holding both drawings, a Stroke/Fill variable mode switches them. Tested on two icons in a prototype before converting the set. Bonus: matches code (`<Icon name filled />`).

**Lesson: clearing a mode override on an instance doesn't remove it.** It sets it to Auto and blocks the main component's mode. Replace the instance instead.

**Utility icons in the header stay teal.**
Options: neutral gray. Why: they're actions; gray at rest risks reading as disabled.

**Account badge: hover thickens the rim to teal, focus uses the standard offset ring.**
Why: if hover and focus were both a 2px teal ring, keyboard users couldn't tell them apart.

**Motion: 150ms ease-out everywhere, no springs on color.**
Found by measuring a screen recording frame by frame: the spring overshot colors, so the rim "grew" a pixel. Springs suit movement, not color.

**Dropped the hover rim and the trailing-icon nudge.**
Why: the rim caused the flicker; the nudge grew the gap 67% and meant nothing for non-arrow icons. Hover became a pure color change.

**Figma vs. code: the remaining 1px shift is Figma's renderer.**
Resting states measured identical; the shift only happened mid-transition (Smart Animate unsnaps pixels). Left it for CSS. Lesson: check the resting states before chasing a transition glitch.

**Nav links reserve the icon slot in every state.**
Problem: an icon appearing on hover would reflow the nav. Will's solution: keep the pill and icon space in all states and change only visibility. Icon fades in (no slide), fills on press and stays filled when active.

**Active nav link is fully neutral.**
Iterated through teal pill (muddy on plum: 1.2:1 between dark teal and plum), plum label (too close to the inactive neutral labels, and breaks "plum is never interactive"), to neutral. Will: "I'm trying to color everything."

**Secondary on the header mirrors Primary: teal outline, teal label.**
Options: V5's neutral outline. Why: keeps actionability; same language as Secondary on light pages. Dark teal hover/pressed, not the nav's plum, because Secondary also appears at the bottom of pages.

**Logo: two-tone "produce bars" mark, filled vectors, token-bound.**
Six concepts sketched as SVG; produce-from-bar-chart chosen (data + fresh food). Filled shapes so it scales to 16px (a stroked concept visibly broke at 32px). Two layers bound to logo tokens so a neutral version is a token change.

**Header layout: full-width surface, content wrapper 1024–1440 (1392 content).**
Will's Framer pattern: parent owns surface and vertical spacing, wrapper owns width and gutters. Layout tokens shared with the page body so edges align. Below 1024 the page scrolls (desktop-only tool).

**Focus mode is a variant of the header, called "Variant," not "Mode."**
Why: "mode" already means variable modes in this file. Focus keeps identity, task title, "Draft saved," Help and Exit. Autosave as Draft means Exit needs no confirmation unless something would be lost.

**Exit is a quiet action, labeled "Exit."**
Not Primary (that's for moving forward); "builder" is our word, not the vendor's.

**Buttons get a 64px minimum width.** Short labels like "Exit" read as icon buttons otherwise.

---

## Oct 15 · Step 1: Select vendors

**Atomic levels: organisms can contain organisms; the next level is "Layouts," not "Templates."**
Why: "template" already means a pricing template in this product.

**Icon tiles are plum, not teal.**
Why: they're decorative labels, not actions. Rule 2 originally listed icon tiles as teal; corrected to match rule 3.

**Pictograms are a separate set from Icons.**
Why: different job (identity vs. function), always filled, more detail. Mirrors IBM Carbon's icons vs. pictograms split.

**Body text styles switched from Medium to Regular.**
Why: supporting text under headings reads calmer and lets titles stand out.

**Input is an atom; Text field (label + input + helper) is a molecule.**
Why: Frost's own example; bundling label and helper gives every field the same spacing and accessibility wiring.

**Input states include Filled.**
Why: without it, an entered value looks like placeholder text. Clicking into an input *is* focus (unlike buttons, where only keyboard focus shows the ring).

**Input hover: Teal/50 wash with a Teal/600 border.**
Iterated from a barely visible border change → Neutral/100 → Teal/100 → Teal/50 plus teal border. Leads naturally into the teal focus state.

**Search is single pick: choosing a vendor closes the list and adds it.**
Result row states: Default, Highlighted (hover and keyboard share one look), Pressed (Teal/100, logo tile lights up teal), Selected (tinted, teal tile, check, no border).

**Results panel floats over the card instead of pushing it down.**
Why: with single pick, push would jump the page twice per vendor and the new vendor would land in a moving list. Overlay keeps the page still so each choice visibly lands. Panel border stays neutral; focus never leaves the input. Will liked the depth it adds.

**Every interactive component gets a prototype frame beside it.**
So each state can be tested in Present mode right where it's built.

**Destructive is a Tone of the Icon button, not a new component.**
Will's idea: the trash is filled teal at rest, then turns crimson over a light crimson circle on hover. Built as `Tone=Destructive` (circle shape) on the existing Icon button, so in code it's `<IconButton tone="destructive" />`. Iterated: tried a teal circle at rest, removed it; the circle only appears on hover.

**One selected-item card, two layouts: only the identity wrapper flips.**
Vendors use Stacked (larger logo on top, trash top-right); Brands use Inline (no logo). The card stays a row of identity + remove; the identity wrapper switches between horizontal and vertical. In code: one prop that flips one flex-direction.

**The empty state is a full-width dashed placeholder, deliberately not clickable.**
No plus, no link, nothing teal; the helper text points back up to the search field. Same height as a vendor card so nothing jumps when the first vendor lands. Reuses the Vendor pictogram without its tile.

**Hold off on screen comps until the page layout exists.**
Comps of each card state would duplicate the component's variants and need redoing once the stepper and footer land.

---

## Oct 15 · Step 2: Choose brands

**Brands is its own organism, not a configuration of the vendor card.**
Initial plan was one generalized "Search & select card." Will's wireframe changed it: Brands is multi-select, the results are a persistent list, there are two columns, and the selected side is a scrollable list grouped by vendor. Forcing both into one component would fill it with switches that only apply to one use. Reuse happens one level down instead: card surface, Card header, Text field, Empty selection, Result row (plus a no-logo option and multi-select), Selected item card Inline, destructive Icon button.

**The card header became a molecule as the second card needed it.**
Extracted from the vendor card and swapped back into all three of its states, so both cards share one header.

**Vendor scope shown as helper text, not a new component.** *(Superseded that evening — see below.)*
"3 vendors in scope: Cargill · General Mills · Kraft Heinz" under the search, plus vendor group headers in the selected panel, answers "which vendors am I searching within?"

---

## Oct 15 (evening) · Step 2: Select brands

**Vendor scope moves from helper text to logos in the card header.**
Options: keep the text line under the search; logo row top-right (informational); logo filter chips above the results; overlapping avatar stack. Why: the logos are what the vendor just picked on step 1, so carrying them forward makes the wizard feel continuous, a small moment of delight instead of a gray sentence. Top-right of the header says "this whole step is scoped to these," which is truer than "your search is limited to these." Informational, not filters: interactive logos would need teal states and would compete with the search.

**No "Change" link next to the logos.**
Tried it; it took more room than expected. Going back to change vendors is the wizard's Back button's job.

**The card is "Select brands," the field is "Search by brand," and the helper text is gone.**
Title, label and helper were saying the same thing three times. Matches "Select vendors."

**Brand rows are a Select=Multi variant of the existing Result row, not a new component.**
Cloned from the vendor variants so height, padding, highlight bar and tints carry over and the two searches feel like one experience. Only the leading slot changes: checkbox instead of logo. In code: `<ResultRow multiple />`. The ESN property became "Meta": ESN for vendors, SKU count for brands ("12 SKUs").

**Click anywhere on the row to toggle.** Bigger target, same as the vendor row.

**Selected hover looks exactly like unselected hover; only the checkbox differs.**
Will: hovering a selected row should get the same gray treatment, so the difference between selected and unselected is only the checked box. Hover = "you can act on this," the same for every row.

**Selected rows keep their teal tint at rest.**
Will: so you can scroll a long list and count the teal rows. At rest the tint shows state; on hover the row shows interactivity. Each state does one job.

**Checkbox press-scale and check draw-in are code-only.**
Built the scale in Figma (Pressed checkbox at 20px in a fixed 24px slot); it looked wrong, so it was reverted. Figma can't draw a stroke in anyway. Code: scale on press, `stroke-dashoffset` draw over 150ms, both off under reduced motion. Note the checkbox scales up on press while buttons press down to 0.97 — deliberate, it says "got it."

**Brand results are grouped by vendor under a Group header.**
Once the second line became the SKU count, nothing in a row said whose brand it was. Group headers restore that without repeating the vendor on every row, follow the same order as the header logos, and drop out when a vendor has no matches. One Group header molecule serves both columns (results and selections), so the two sides mirror each other.

**Group header: small logo, vendor name, count right-aligned, sticky in code.**
The logo ties each group to the logos in the card header. Count in Label/SM: weight without competing with the vendor name.

**Square corners on brand rows; vendor rows keep rounded.**
In a bordered, scrolling list the rounded hover looked like a floating pill. Flush rows read as a list.

**Group header went from light to dark plum (Plum/700) in On brand mode.**
Iterated: no fill → Plum/50 → Plum/700. With light teal (selected), light plum (headers) and light gray (hover) all at the same lightness, the list looked muddled; the eye couldn't rank them. Options: darken selected (rejected: 20 dark-teal rows becomes a wall of teal and starts to look like buttons) or darken the headers. Dark headers create a ladder: header > selected > hover. Plum is allowed because a group header is a label, not a control (rule 3), and it echoes the Plum/900 nav. The header sets On brand mode so its text adapts automatically; the logo tile opts back into Light so it stays light with a dark wordmark. One token, `fill/fill-group-header`, controls the shade.

**Search results get elevation wherever they appear.**
The brand list sits in the page rather than floating, which bends rule 10 (only floating layers get elevation). Kept Elevation/2 anyway so it reads as the same kind of object as the vendor Results panel.

**Brand list No results hugs its message,** like the vendor panel, with matching wording: No brands match "query".

---

## Oct 15 (night) · Accent color

**Add a third hue, Citron, as an accent for moments of delight.** *(Role changed Oct 16 — see "Citron means complete" below.)*
Problem: with plum as atmosphere and teal as action, the UI read as duotone and lacked pop. Options: Citron (yellow-green), Marigold (golden yellow, the classic purple complement), Cornflower (blue-violet between teal and plum). Coral, teal's obvious complement, was ruled out up front: it's essentially Vermilion/400 and would read as an error. Why Citron: it's the near-complement of plum, so it pops hardest on the Plum/900 header; it echoes the fresh produce in the logo; and it sits in the one real gap on the warm side of the wheel, about 45° from both Amber (warning) and Lime (success). Marigold sat too close to Amber; Cornflower was safe but harmonized rather than popped.

**Citron ramp: hue drifts greener in the darks, hero step at 300.** *(Lightness targets superseded by the rebalance below.)*
Hue drifts slightly greener toward the dark end (108° → 125°) so the darks read as deep olive-green, not khaki. Citron/300 (#d1d832) is nudged lighter than its siblings to keep the pop; it's the hero step.

**Contrast that sets the usage rules.**
Citron/300 on Plum/900 is where it's strongest. Citron/1000 label on Citron/300, the same pattern as "Primary on dark" (Teal/1000 on Teal/300). Citron/300 on white is only about 1.55:1, so on light pages it needs a border or a dark label and works best small. Citron as text needs 600 or darker.

**New color rule: the accent is for delight only.** *(Superseded Oct 16.)*
Pictograms, highlights, badges, the logo, data. Never interactive (teal owns that, rule 2) and never status (rule 5). Keep it away from Lime success states so a citron badge never reads as "done."

**Rebalance: every hue hits the same lightness at the same step number.**
Will noticed Teal and Plum 500s looked darker than Lime, Amber and Vermilion 500s. Measured with OKLCH lightness (0 = black, 1 = white): Lime and Amber 500 sit light (~0.80) because yellows and greens are anchored to their pure color, so they're a misleading reference; Vermilion, Neutral and Teal all sit at ~0.62, the true middle; Plum/500 sat at 0.50, a full step darker, with a cliff from 400 to 500 and compressed darks, so Plum/500–700 felt alike. Citron inherited part of that because it was built from the Teal–Plum average. Why fix it: if the same step means the same lightness in every hue, contrast rules transfer ("700 and up passes as text") and engineers can trust the numbers. Fix: target lightness per step = average of Teal, Neutral and Vermilion; Plum keeps its own hue and saturation per step and is re-lit to those targets; Citron rebuilt to the same targets (300 kept as the bright hero). Lime and Amber left as-is (status, and their light anchoring is normal for those hues).
New Plum: 50 #fbf5fc · 100 #f6e7f9 · 200 #efcff1 · 300 #e0b3e2 · 400 #ca90ce · 500 #a26db3 · 600 #885a98 · 700 #6f487d · 800 #563761 · 900 #3c2745 · 1000 #25172a. (Old: 500 #7e4b8e, 700 #5b3568, 900 #311c39.)
New Citron: 50 #f9fadf · 100 #f1f1bb · 200 #e1e379 · 300 #d1d832 · 400 #a7b201 · 500 #808f01 · 600 #687901 · 700 #516303 · 800 #3c4d09 · 900 #29360d · 1000 #19200d.
Checked every real Plum usage after: header text Neutral/50 on Plum/900 12.5:1 (was 14.5), Teal/300 CTA on header 8.0:1, Citron/300 on header 8.7:1, group-header text on Plum/700 6.8:1, Plum/700 icons on white 7.2:1, Plum/600 logo on white 5.3:1 — all pass. The header stays deep plum; group headers read a touch brighter and more clearly purple. Plum/800 nav hover vs Plum/900 is 1.35:1 (slightly more visible than before). Watch: the light plums (100–300) are lighter and could drift toward pink; check the icon tiles and logo on light pages in the color pass.

Will on the screens: Citron felt more neon on his phone and "dirtier" on his monitor. Phones show a wider, more saturated gamut; most monitors don't, and the users are on laptops. Mid-dark yellow-green inevitably goes olive; the pop lives at 200–300. Good enough for now; final judgment in the end-of-build color pass.

---

## Oct 15 (late) · Step 2: Selected brands panel

**The panel is mostly reuse; one new molecule.**
No new atoms. Selected item card got a third layout (Row: flat 40px list row, no logo or ID); Group header reused; Selection summary is new (big count + label + Clear all). Dropped the wireframe's all-caps "SELECTED BRANDS" eyebrow: the big number already says what this is. Clear all gets an undo toast in code, not a confirm dialog. Scrolls; no "Show all" link. *(Header reworked Oct 16.)*

**Trash icons always visible, but quiet.**
Options: always visible in teal (20 teal icons is noise), reveal on row hover (calm but hides the affordance). Chosen: always visible in neutral, red circle on hover. Built as a new Icon button tone, Quiet destructive, so in code it's the destructive icon button with a `quiet` flag.

**First pass looked like a copy of the search list — so the right side became a tray.**
Will: "too much like a copy of the open search results panel"; the headings were too heavy. Diagnosis: both columns used identical vocabulary (dark plum headers, bordered list, white rows), but they do different jobs: the left is the catalog you browse, the right is your basket. Options for the tray: neutral surface or Plum/50 (more personality, but pink risk after the rebalance). Chosen: neutral tray (new token `surface/surface-tray` → Neutral/100) with a border, the summary inside it, and rows sitting directly on the tray. Group header became a set: Tone=Strong (the dark plum one, still on the left) and Tone=Subtle (no fill, divider only) for the tray.

**Then it read "monochromatic and wireframey" — add color with purpose.**
Options: plum label + rule on the Subtle headers; Citron pill on the count; Plum/50 tray; teal trash at rest. Chosen: the first two together. Subtle group header vendor name in Plum/700 with a Plum/500 rule (new tokens `text/text-brand`, `border/border-brand`) ties each group to the plum headers on the left without their weight; plum is fine because headers are labels (rule 3). The count "20" sits in a Citron/300 pill with a Citron/1000 label (new tokens `fill/fill-accent`, `text/text-on-accent`): Citron's first appearance, exactly the moment of delight it was reserved for, since the number ticks up as brands land in the basket. Tray stays neutral so the plum and Citron read clearly. Lesson: neutral-first gets the structure right, then color is added where it means something.

**Border-only panel, then a 3px plum top edge.**
Will preferred a border-only panel to the Neutral/100 tray fill (his reference showed a white panel inside a bordered card), so the panel lost its fill and `surface/surface-tray` went unused. Options for giving the container more identity: plum-tinted shadow (bends rule 10, competes with the left list's shadow), a 3px plum top edge, or a light plum outline (pink risk). Chosen: the 3px plum top edge — flat, strongest identity for the least weight, ties to the plum group labels. In code: `border-top: 3px solid var(--border-brand-strong)`.

---

## Oct 16 · Finishing Select brands

**Panel header: the title leads, the count describes it.**
Will: the biggest thing should be "Selected brands." The title moved to Heading/SM (the same size as the card title) with the count badge right beside it; the badge describes the title, so separating them would make it read as an unrelated control. Clear all removed: it competed with the count, and one trash click per brand is fine for now (a quieter version can come back if people select many).

**Group headers in the panel: "Cargill (4)", no logo.**
Once the name came first, the logo just repeated it. Name + count side by side follows the same pattern as the panel title. "brands" dropped; announce "Cargill, 4 brands" for screen readers.

**Selected rows: 48px, SKU count beside the name, smaller trash.**
48px matches the brand rows on the left, so the columns line up. "SKUs: 12" in Data/SM sits next to the brand name (a receipt reads name-then-detail). The trash was the loudest repeated element; Will didn't want to hide it (deleting should stay obvious), so it shrank to 24px with an 18px icon via a new Icon button **Size** (Medium 32 / Small 24; Small exists for Quiet destructive only). 24px still meets the WCAG 2.2 minimum target size.

**One SKU format everywhere: "SKUs: N" in Data/SM.**
Will likes Data/SM for data like this. Both columns switched. Lesson: a text property's default is shared by every variant, so changing the brand placeholder also changed the vendor "DEMO-0022." Fix: brand rows got their own SKU count property, separate from the vendor ESN — cleaner in code too (`skuCount` vs `esn`).

**Brand pictogram (tag) added to Pictograms;** the card's icon tile and the panel's empty state use it.

**Card states: Default, Selected, No results.**
Sample data aligned so the left checks match the right panel exactly (brands missing from the list were added). The brand list stays open on load: brands are a short, known list scoped to the chosen vendors, so browsing beats guessing names (vendors stay type-to-open). The prototype advances states by clicking the search field, which overrides the field's own hover/focus — accepted, because the real conditional logic (type to filter, check to add to the panel) belongs in code, not elaborate Figma machinery.

**Citron means complete.** *(Replaces "accent for delight only.")*
Will: results are either complete or incomplete — zero brands is "to do," and the first brand checked should show "you've done it"; the stepper will use the same signal. Options: a general "result"/highlight color, a status color, or keep it as delight only. "Status" alone risked colliding with real success/warning colors; "complete" is a clear binary. Rules: citron is a fill with dark text, never text color, never interactive, never color alone (always with a number or a check); to do is neutral, not an alarm. Tokens built now so tomorrow's tokens.css export carries them: `fill/fill-status-todo`, `text/text-on-status-todo`, `fill/fill-status-complete`, `text/text-on-status-complete`; the in-progress pair waits for the stepper. The count badge component waits for Storybook (`<CountBadge>`, status derived from count > 0). Nice consequence: checking the first brand turns the badge citron and marks step 2 complete in the stepper — the same event.

**The dark plum group headers came off the brand list.**
Will: "too loud." Options: Subtle (no fill, plum name, rule — same as the panel), a faint neutral band, or light plum (tried already, muddy). Chosen: Subtle, so both columns use one header style.

**Rows: from four signals to two fills.**
The brand row was sending dark plum headers, a teal bar, a teal press wash and a teal selected tint at once. Will: "too many shades." Final: white at rest whether checked or not; light teal on hover, keyboard highlight and press; no accent bar. Selection is carried by the checkbox (plus the SKU text turning Teal/700) for brands and by the dark teal logo + "Selected" mark for vendors — vendors were unified to match. Gray hover dropped: a neutral doing an action color's job; teal hover fits rule 2. `fill-row-highlight` was repointed to teal rather than reusing the "selected" token, so names still say what they do. Teal/50 was too faint on laptop screens, so the highlight is Teal/100. Along the way Will kept the teal selected tint, then dropped it once the panel took over the "count what's selected" job.

**Vendor logo hover: decide in code.**
Proposed: mirror the button pair — hover = white tile, teal border, teal logo ink (like Secondary); selected = teal fill, white ink (like Primary). Works because vendors supply monochrome logos, rendered with `currentColor`. Logged in the code backlog.

**A Figma → code backlog.**
Started `claude/code-backlog.md`: everything decided in Figma that has to be built in code (motion, sync between columns, keyboard, sticky headers, CountBadge, accessibility text, plurals). Checked component by component in Storybook.

**Library structure: building levels for small parts, purpose pages for big ones.**
Pages: Atoms · Molecules · Organisms · Navigation & wayfinding · Cards · Layouts (Foundations later, once foundations settle). Rule: atoms and molecules stay on their level pages even if one card uses them; organisms that only one card uses live with that card (Cards page, one section per step); shared organisms (the type-to-search Results panel, later toasts and modals) live on Organisms. Every interactive component has a prototype beside it, registered as a flow named after the component, so presenting a page gives a picker of its components — a lightweight Storybook inside Figma. Organism-level prototypes test parts in context (a row in its list), which is where problems like the loud headers showed up; molecule prototypes stay for tuning. Test Bed removed (this replaces it). Why the names matter: the same page names become the Storybook sidebar and the `src/components/` folders.

**Input moved from Atoms to Molecules.** *(Reverses Oct 15's "Input is an atom.")*
Will's call while reorganizing the library: the Input already combines parts (icon, field, states) and sits right above the Text field that wraps it, so it lives with the molecules.

---

## Oct 16 (afternoon) · Step 3: Global presets

**Making a form interesting without making it distracting.**
Will's challenge: the step is essentially a date picker and two dropdowns. Approach: interest comes from showing consequences and not hiding few options in dropdowns — not decoration.

**Visible choices instead of dropdowns; a segmented control was tried and rejected.**
Built a Segment/Segmented control for currency; Will: "that's for tabs." Switched to vertical radio lists, then to option tiles (below). Lesson: a control's familiar meaning matters more than its compactness.

**Copy pattern: title = what the box is, instruction = what you do.**
Iterated through action titles ("Set a default effective date") and helper-less boxes to Will's rule. Final: "Effective date / Choose when prices take effect." · "Currency / Choose which currency to use." · "Pricing model / Choose how prices are calculated." "Default" dropped from titles — the card header already says these are optional defaults.

**Type hierarchy: 16 → 14 → 12.**
Titles, options and descriptions were nearly the same size, so the eye couldn't rank them. Added Heading/XS (16 semibold) and Body/XS (12 regular). Option labels are all semibold; the selected one turns teal (only the color changes on select, so nothing shifts).

**The calendar went through five shapes before landing as a popover.**
Two-month inline → one-month inline with a typed field → restyled per Will's references (month top-left, chevrons right, circular days) → rendered side-by-side mockups: always-open calendar in an inset well vs. a popover. The always-open calendar fought the radios for space and kept dominating the step; Will chose the popover. Lesson: when one box keeps resisting, it's trying to be a different kind of thing from its neighbors — make it the same kind of thing (a list of choices) and push the special tool behind one of the choices.

**Three equal columns in one row.**
With the calendar out of the way, Effective date, Currency and Pricing model sit side by side at 960 wide — the step reads as three parallel questions instead of "four cards to fill out," and the card dropped from ~750 to ~455px.

**Option tiles instead of radio rows; same height everywhere.**
The radio version read "colored wireframe": everything the same weight, selection marked by an 18px dot. Rendered chips vs. option tiles; tiles won — the whole tile lights up (teal border + Teal/50), explanations stay visible for comparison, and chips read as filters. Every tile is a fixed 56px so all columns end together (Will: "I do not want column ends at different heights"). Boxes, dividers and placeholder icon tiles removed; each column is a 3px plum rule + title + instruction + four tiles.

**Content edits by subtraction.**
No descriptions for "No default" or the pricing models; currencies and date presets inline ("Next month · Nov 1, 2026"). An inline $ markup / % margin field on Cost plus and Target margin was built and removed: pricing model is a setting (how prices are calculated), not the calculation itself.

**Custom date: the tile opens a date picker the width of the tile.**
Like the search field and its results panel. Explicit OK / Cancel (Will wanted an explicit close); "Pick a date" until confirmed, then the date; a calendar button in the tile reopens it; Cancel reverts if no date was ever confirmed; the custom date is remembered when switching away. Everything loads on "No default."

**Prototype honesty.**
Figma can't position an overlay under an element via its API, so the Effective date column became a three-state component (Closed / Open / Confirmed) to demo the flow. The real logic (one value, exclusivity, remembering dates) is code — logged in the code backlog rather than faked in Figma.

## Oct 16 (evening) · Step 4: Review template, and the page layout

**No "Ready to download" banner.** You can only reach review when the template is complete, so the banner restated a fact the flow already guarantees. The stepper, the enabled Download button and the title carry it. (Will later titled the card "Congrats! Your template is ready for download.")

**Summary strip earns its place.** It confirms the big ideas (5 vendors, 20 brands, 1 of 3 presets) before the details. Citron check only where a required step is complete (Vendors, Brands); Presets gets the gray Optional tag — never a check or warning. Check sits after the label.

**Edit = go back and walk forward.** Edit jumps to that step; Next carries you through the rest to review. No return-to-review shortcut, no mismatch errors on review, all earlier choices kept. Next on Select brands is blocked until every vendor has at least one brand. Workflow logic lives in code.

**Separate Vendors and Brands sections, side by side.** Separate because each Edit maps to one step. Side by side because stacked it was 949 tall; two equal columns + a 3-cell presets strip brought it to 666. Lists scroll inside their borders (no "Show all"); columns stretch to match. Vendor ID and the brand's vendor name right-aligned in the mono Data font — the most distinct type we have.

**First new button size: XSmall (24px).** Edit is XSmall Tertiary with an icon. 24px is the WCAG 2.5.8 minimum target.

**Page layout.** 1440×900 baseline, check 1280×800, 1024 minimum. Content column fixed 960, centered. **One card height for every step (700)** with Back/Next pinned 24px below the card, aligned to its edges — Next never moves between steps or as content grows. Stepper moves **into the Focus header center** (frees 80px, keeps the card centered); header title becomes **"Template Builder"**; "Draft saved" moves to the wizard footer. *(Stepper later moved to the stage and the card to 644 — see Oct 16 night.)*

**Header Exit: plum, not primary.** Will wanted Exit more salient. Primary rejected — two solid teal buttons pointing opposite ways (finish vs leave). Chose a plum fill (Plum/600, hover 500, pressed 700, light text), label "Save and exit". **Rule bend, scoped:** teal = actions in the work area; controls in the dark header take the header's own plum. Implemented as the On brand mode values of the secondary tokens, so any secondary button inside an on-brand container becomes a plum header control.

**Plum stage (Oct 16, late).** Page surface back to Neutral/50; the header's plum continues 250px down as a "stage" and the card (with a plum-tinted shadow, Elevation/Stage card) rises out of it. Chosen over a flat Neutral/50 page and a heavier borderless shadow. Navigation tried on the plum above the card and as side tabs tucked under the card ("too cute") — both rejected; Back/Next stay 24px below the card.

**Fixed card height kept.** Tried a fluid card (grows with content, buttons pinned to the bottom): buttons looked orphaned ~315px below a short card, and growth rarely shows (vendors sit three across). Delight comes from content animating in, not from height.

**Footer: XLarge 56px buttons, destination labels.** "Select brands →", "← Edit vendors", etc.; the left button behaves like Review's Edit. "Draft saved" removed (overkill for a two-selection task). "Save and exit" stays in the header — leaving is needed from anywhere, and on step 1 a left-side exit would read as Back. Help icon removed.

**Logo on dark: citron bars.** `logo/logo-primary` On brand = Citron/300 (light mode keeps Teal/500; citron on white is ~1.5:1). Brand mark, not UI state — and it echoes the citron "complete" steps the stepper will show.

**Typography and polish deferred to two final passes** once layouts are assembled. Mono Data font reads distinct; headings and body don't separate enough.

---

## Oct 16 (night) · The progress stepper

**Research first: a mini pattern scan.** 15 examples from Mobbin and Refero on a dedicated Figma page (04.3), grouped into six patterns (inline nodes, track with labels below, progress bar, header chips, compact/edge lines, tabs with status). Findings that shaped the design: steps usually live between identity and exit in focused flows; a check replacing the number on done steps is near-universal; dark-surface steppers are rare (contrast is on us).

**Zillow's anatomy, not Xero's or Wise's.** Will disliked Xero (inline labels read like a sentence, every step competes). Wise was tempting but only shows positions on a line — no per-step check, which breaks "citron is never color alone." Zillow: a track with labels below, future steps as small dots, a ring on the current node.

**On the stage, not in the header.** Rendered both. In the 56px header it cost no height but was cramped (12px labels, competing with the title and Save and exit) and read as chrome. On an 80px band of the plum stage it aligns to the card, has room for 20px nodes, and leaves the header as identity + exit. Cost: the card shrank from 700 to 644 to keep 1440×900. "Template Builder" stays left beside the logo — it's identity, not wayfinding.

**Node: three states; line: two.** Complete = Citron/300 + Citron/1000 check. In progress = citron ring + dot (Will: let in progress be citron too — shape, not color, separates it from complete). Not started = small neutral dot. Line: completed 4px citron, not started 2px Plum/700 (Will's call — the heavier line reads as "walked this far").

**Labels are nouns.** Vendors · Brands · Presets · Review. Will: the stepper names the place and the card title says what to do there, so "Brands" sits above "Select brands" without repeating it.

**Soft glow on completed progress; the charge-up rides the transition.** Options: soft glow, neon core, charge-up pulse. Chosen: soft glow (effect style Glow/Complete — Citron/300 at 50%, blur 10) on the completed line and done nodes, never on the in-progress ring. The charge-up pulse (ring → check, pulse fills the line, next node lights) runs together with the card transition in code, first completions only. Figma gotcha: binding a variable to a shadow color forces 100% alpha, so the style uses a raw color.

**A real component, then every screen.** Stepper = Step (3 states) × Line (2 states) × Current step 1–4, with nested overrides for the "back from review" case. All 12 screens (core + two edge states) laid out in a row for the typography pass; card masters set to 960 and lists made to fill the fixed card along the way. Will: "I don't know how we did it, but this is starting to look pretty cool."

## Oct 16 (night) · Secondary button

**Tonal fill + 1.5px border.** Will: the outline secondary "just is not reading." Diagnosis: a white body on the Neutral/50 page (≈1.05:1), so only a hairline carried it. Rendered the current button plus four options in every state beside the primary: thicker 2px border (still a ghost, and heavy), tonal fill (the only one with a visible body), lifted white with elevation (too subtle at rest), Teal/50 tint + outline (Teal/50 is almost exactly the page's lightness — no body). Will leaned tonal + thicker border; rendered 1.5px vs 2px — 2px competed with the primary and blurred into the focus ring. Chosen: Teal/100 → 200 → 300 fills, Teal/800 label and icon, 1.5px Teal/700 border in every state. Light mode tokens only; the plum "Save and exit" (On brand) and the white Disabled state are unchanged. Lesson: when a component disappears, check the contrast between its body and the surface before thickening the edge.

## Oct 16 (night) · Typography

**The heading font was the "basic" problem, not the body or labels.** Will: "we dropped the ball on the header font." Diagnosis: Geist was doing double duty — headings and body in one family, so hierarchy rested on size and weight alone. Body (Geist) and data (JetBrains Mono) stay.

**All-sans, Bricolage Grotesque.** Rendered six candidates on the Review screen (only the Heading styles swapped): serifs Fraunces, Newsreader, Instrument Serif; sans Bricolage Grotesque, Space Grotesk, Epilogue (Archivo was planned but its Expanded width isn't in Figma). Claude leaned Fraunces; Will preferred not to mix serif and sans and liked Bricolage, Space Grotesk and Epilogue. Bricolage chosen: real character that grows with size, 8 weights (Space Grotesk has only 4 and no SemiBold; Will wants many weights). Instrument Serif was out regardless — one weight, spindly at our sizes.

**The scale was the bigger problem than the face.** Diagnosis: steps too small (20 → 16 → 14 → 13, ratios below 1.2 stop reading as levels); nearly everything SemiBold, so weight signaled nothing and labels competed with section titles; the header title, card title and panel title all shared 20px; display sizes set with body tracking. Rendered three directions on Review + Select brands: 1 Size only (proved size alone isn't enough), 2 Size + weight (clearest ladder), 3 Expressive (Bricolage's personality shows; long titles get loud).

**Hybrid committed: "Size + weight" as the system, one display moment.** Heading/LG Bold 28 −1.5% (card titles), Heading/SM SemiBold 18 (section, panel, column titles), Heading/XS SemiBold 16 (header title — chrome stays quiet), Labels drop to Geist Medium so section titles finally separate, and a new Display/Number (ExtraBold 40, −2%) only for the Review summary numbers — the same "you did it" spot where citron lives. Implemented as text-style changes plus six rebinds in the masters, so all 12 screens updated at once; the Review lists shrank to 230 so the card still fits 644. Studies kept on page 04.1 for posterity.

---

## Oct 17 · Select brands, final pass

**The "ugh" was two copies of the same list.** Will's gut reaction to step 2: the least interesting screen in the flow. Diagnosis: the Selected brands panel drew its contents exactly like the catalog on the left — same rows, same height, same name + SKU — so the eye saw ~16 near-identical rows twice with nothing to land on. Every other step has a distinct shape (vendor cards, three tile columns, a summary strip); this one was two lists. The two sides answer different questions: the left is "what's available, matching what I typed" (changes as you search); the right is "what have I got" (the stable total). Different jobs deserve different shapes.

**Select all per vendor, tri-state, in the group header.** Clicking brands one by one was the main functional gap. Options: next to the vendor name, or above the SKU column. Chosen: a checkbox in the group header directly above the row checkboxes — it lines up with the column it controls (the Gmail/table pattern). Three states: none, some (dash), all. Header count became "4 of 5" so the checkbox and the number tell the same story. During a search, select all acts on the visible matches only and says so ("Select 2 matches"). New Checkbox variant: Checked=Mixed.

**Search clear button, on both steps.** A Close (×) icon at the end of the Input's Filled state — the only other way back to the full list was deleting text. Will: "we need that in the vendor as well" — it's one Input, so both steps got it at once.

**Basket: three options rendered, the coverage strip won.** A · Chip basket (status + "4 of 5" headers, chips), B · Vendor cards (each vendor a mini card), C · Coverage strip (vendor logos with status badges + "4 of 5" across the top, chips below). Claude first leaned A, because it kept the logos in the card header and only changed the panel. Then weighed where the logos should live: in the header, a completion badge appears ~600px from the checkbox you just clicked; in the panel, cause and effect sit side by side. What tipped it to C: the **empty state** — three dashed tiles reading "0 of 5 · 0 of 9 · 0 of 8" are a ready-made checklist of the task, far more useful than a pictogram and a sentence, and they explain a blocked Next before anyone tries it. The logos left the card header (it now matches steps 1 and 3: title + instruction), and the panel stretches to the full card height. Rule kept: status badges live in one place only.

**"All N brands" chip instead of 100 chips.** Will: select all shouldn't pour every brand into the basket. When a vendor is fully selected its chips collapse into one full-width "All 9 brands" chip (Plum/50 fill, plum label — a label, not an action or a status); the coverage tile reads "All 9." It's a different kind of choice, so it gets a different shape. Its × clears the vendor with an undo toast. **"All" is a snapshot** of today's brands, not "include future brands" — predictable and auditable for a pricing template; the dynamic version is logged as a business question. *(Restyled to the teal chip later the same morning — see below.)*

**The count badge measures the whole step.** All three studies exposed it: a citron "12" while Kraft Heinz still had zero brands — "complete" while the step wasn't. Now the badge stays neutral until every vendor has at least one brand, then turns citron — the same moment the stepper marks step 2 complete. Per-vendor completeness lives on the coverage tiles.

**New parts, all reuse-first.** Atoms: Status mark (Complete = citron + check / To do = dashed neutral ring), Close icon, Checkbox Mixed. Molecules: Brand chip (Type = Brand | All brands × Default | Hover, × turns quiet-destructive on hover), Vendor coverage tile (Complete | To do). Group header gained a Show checkbox property. New Select brands card state: **Incomplete** (Kraft Heinz at 0, Next blocked — used by 02d). Tokens: `fill/fill-chip`, `border/border-chip`, `fill/fill-chip-all`, `border/border-chip-all`, `text/text-on-chip-all`, `border/border-status-todo`, `icon/icon-on-status-complete`.

**Parked for real data:** collapsible vendor groups and a "Show N more" overflow for large partial selections — both depend on how many brands a big vendor really carries.

**Chips join the teal family; no red on remove.** Will: style the chips like the Secondary button. Exact Secondary copies would make 16 things look like the "Edit vendors" button below them, so the chips took Secondary's tonal body (Teal/100, Teal/800 label) with a lighter 1px Teal/300 edge. The × hover stays teal (Teal/300 circle, Teal/800 ×) — Will: two tones in a pill looked odd, and removing a chip is low-stakes and reversible. Red stays for the vendor-card trash. "All N brands" became the same pill at full width (the plum version and its three tokens were deleted).

**Coverage tiles: counts out, Icon tile styling in.** Counts moved beside the vendor labels above the chips ("Cargill 4 of 5"), so the tile is just the logo + status. Tile takes the section Icon tile pattern (light plum, dark plum mark) via token aliases. Checking contrast on the lighter plum: the citron badge edge fell to 1.3:1 and the dashed to-do ring to 1.9:1 — fixed with a 1.5px Citron/500 ring and Neutral/500 dashes (both ~3:1). Placeholder until real monochrome logo vectors arrive.

**Brand pictogram empty states, two layouts.** Empty selection became a set: Stacked (nothing selected — tag pictogram over message + helper) and Inline (one vendor still at zero — "No Kraft Heinz brands yet"). Tag rather than the vendor building: the empty state should match the step it's on.

**One headline per card instead of title + description.** "Select brands" over a panel titled "Selected brands" read as an echo. Options rendered as voices: plain verbs, "…to price," and "…to your template." Chosen: the template voice — Add vendors to your template · Add brands to your template · Add pricing defaults (Optional tag kept) — with descriptions hidden via a new Card header `Show description` property. Review keeps "Congrats! Your template is ready for download." plus its instruction. The panel stays "Selected brands": the headline is the ask, the panel title confirms it's done. Measured before building: the longest (Brands) is 375px of 462 available.

---

## Oct 17 (afternoon) · Accessibility design review and fixes

**Four review stages, triaged by one test: does Storybook copy it from Figma, or does it only exist in code?** Tokens, anatomy and sizes were fixed in Figma now; focus, keys, tab order, popovers, announcements and forced colors wait for code. Rule IDs 2, 4, 5, 6, 12, 13, 16, 20 Fixed; 7 Accepted; 8, 9, 10, 11, 15, 18, 19 Fix later.

**Keyboard-active row = highlight fill + 2px inset focus outline.** The Teal/100 highlight vs white is 1.16:1, the only cue for the keyboard-active option. Options: bring back the accent bar for every hover; a darker fill; an outline only for the keyboard case. Chosen: the outline (Teal/700, 5.8:1 on Teal/100), only on the row `aria-activedescendant` points at — mouse hover stays fill-only, so "Rows: from four signals to two fills" still holds at rest and hover and focus look different.

**Annotations on their own page, four representative screens.** "→ Annotations · Accessibility" holds 01b, 02b, 03b and 04 with headings, landmarks, names and tab order, plus an "Applies to every step" panel. Rejected: annotating all 12 (repetition) and annotations under the comps (clutters the screens people present).

**Page titles change only between steps, with no step number.** "Add brands – Template Builder." Sub-states and edge states keep their step's title; the stepper carries position.

**The blocked-Next hint is built into Wizard navigation.** A Hint text property beside the disabled Next ("Add at least one brand for every vendor to continue."), linked with `aria-describedby`, rather than a loose text layer on each screen.

**Errors replace the helper.** Text field Error shows an AlertCircle (cloned from CheckCircle, so it matches the set's drawing style in Stroke and Fill) plus a message that says the fix, never "Invalid."

**Min-height everywhere text lives.** Buttons, inputs, rows, tiles, headers and footers hug with a min height equal to their old fixed height — identical at rest, room to grow at 200% text. Icon-only squares stay fixed; the card stays 644 and its body scrolls.

**Reflow at 320px: an accepted exception.** Desktop-only internal tool, 1024 minimum. A single-column stack is cheap in CSS grid, so it's a React check, not a Figma task.

**Sample data stays illustrative.** Not aligned across the 12 screens in Figma; real fixtures and logos arrive in code. A note above the screens says so.

## Oct 17 (afternoon) · Housekeeping before Storybook

**The library holds only what the finished comps use.** Audit of the 12 screens (recursively through nested instances and every variant of kept components). Retired components (Vendor scope, Radio row) moved to "→ Archive · Retired components" in the exploration section — archived, not deleted, so exploration pages never show "missing component". Unused variants deleted: Selected item card Inline and Row, Icon button Quiet destructive (Medium and Small), Group header Strong, Review row Preset, plus the dead hidden Highlight bars. Every state variant kept even when no screen shows it.

**Stepper moved off primitives onto semantic tokens.** It was the only component bound straight to primitives. New tokens: `border/border-stepper-track`, `border/border-status-in-progress`, `fill/fill-status-in-progress`, `text/text-stepper-upcoming`, `fill/fill-stepper-upcoming`; done nodes and the completed line reuse the complete status tokens. The Stepper, Stepper step and Stepper line variants set On brand mode themselves, because they only ever sit on the plum stage. Renders identically.

**Unused tokens and styles deleted.** `fill-accent`, `text-on-accent`, `surface-tray`, `fill-row-pressed`, `icon-placeholder`, `fill-group-header`, and the six plum/teal-tinted elevation styles. Primitive ramps and the full text scale stay complete (Lime and Amber reserved for status; Heading/XL and /MD kept for scale).

**Components describe themselves like React props.** Every set has a one-line purpose, its props (state marked as pseudo-classes or derived from data) and its code-backlog section — the handoff an engineer reads in Dev Mode.

**Foundations page with a Principles block per foundation.** Built from the live variables and styles so it can't drift. Each foundation pairs the reference with 3–5 rules written as Rule · Why · Rejected — the rules that flow from the decisions in this log, not every decision.

---

## Oct 17 (evening) · Storybook setup

**XLarge button = 56px, confirmed.** Figma, this log and Foundations said 56; one line in code-backlog said 48 (with 20px padding). Will confirmed 56; the backlog line now follows Figma (56 tall, 24px side padding).

**On the plum header, interaction states get darker, not lighter.** Storybook's axe check found two On brand contrast failures: Secondary hover (Neutral/50 on Plum/500, 3.66:1 — "Save and exit", on every screen) and Tertiary pressed (Teal/300 on Neutral/700, 4.48:1 — no on-brand Tertiary text button exists yet). Cause: on the dark header the labels are light, so lightening the fill on hover/press moves it toward the label. Fix, one rule for both: `fill-secondary-hover` → Plum/700 (6.78:1), `fill-secondary-pressed` → Plum/800 (9.30:1), `fill-tertiary-pressed` → Neutral/1000 (10.48:1); On brand only, Light unchanged. Trade-off: the darker hover sits closer to the stage (1.85:1), so the cue becomes "border lights up (Plum/400, 5.35:1 vs stage), body sinks in." Options rejected: border-only hover on a Plum/600 body (passes at 4.96 but faint); accepting the Tertiary miss because it's unused (the same rule fixes it for free). *Reverses Oct 16's "Plum/600, hover 500, pressed 700."*

**Code finds gaps; Figma gets fixed first.** Will: do the right thing, not the quick one. Tokens flow one way, Figma → tokens.css → components. When code needs something Figma lacks, Claude Code logs it in `docs/figma-sync.md`, uses a stand-in in `tokens.pending.css`, and the queue is applied in Figma in batches with Will's approval, then tokens.css is re-exported. First case: the Secondary button's 1.5px border was a raw value in Figma — now `border/1-5` (Primitives/Dimension, `--border-width-1-5`), bound to all 15 Secondary variants. Figma doesn't allow dots in variable names, hence `1-5`.

**An active nav link doesn't react to hover or press, for now.** The NavLink spec had no Active + Hover or Active + Pressed row. Options: (a) stay Active (`--fill-nav-active`, filled icon), (b) show the Hover / Pressed fills over Active. Will chose (a), for now.

**Nav link icons follow Figma: Templates = `tag`, Submissions = `upload`, Messages = `messages`.** The Main navigation spec export named the links but not their icons, so code briefly used Will's pick of `create` for Templates. Checking Figma (Main-Navigation `642:156`, Variant=Default) showed the icons were already set there, with `tag` for Templates. Will kept Figma's `tag`.

**The Default header button says "Upload CSV."** Figma said "Upload CSV"; the surface-studies plan said "Upload pricing." Will kept Figma's label.

**The Default header's first Settings icon button is Help.** Figma names both icon button layers "Button-Settings", though the first already shows the help icon. Will confirmed: the first one is Help, so the order is Upload CSV · divider · Help · Settings · Account badge. Figma gets the layer rename (`docs/figma-sync.md`).

**A blocked Next is `aria-disabled`, not natively disabled.** Options: (a) native `disabled` (React Aria `isDisabled`): simple, but it leaves the Tab order, so screen reader users may never hear the hint that says why they can't continue; (b) `aria-disabled="true"`: Next stays focusable, the hint is read through `aria-describedby`, and presses are ignored in code. Will compared both in Storybook and chose (b). Both look the same; Button styles `[aria-disabled="true"]` like `[data-disabled]`.


## Oct 18 · React app: page shell

**WizardLayout's Design tab links to Final Comps 01a.** The Layouts page in Figma is empty, so there's no page-shell component to link. Will kept the screen (`879:4657`) rather than building a Layouts component just for the link.

**Step 1: the empty box fills the card, as in Figma.** In the fixed 644 card, the Selected vendors section takes the rest of the height and the Empty selection stretches to fill it (Figma: the section and the empty box are both fill). Rejected: keeping it at its 126 minimum, which left blank card below it.

**Step 1: only the selected vendors grid scrolls.** The card title, the search and the "Selected vendors (N)" label stay put; the grid of vendor cards scrolls under the label once it outgrows the card. Rejected: scrolling the whole card (the title and search scroll away) and scrolling the section with its label (the count leaves view). The shell's own scroll on the card stays only as a fallback, e.g. at 200% text.

## Oct 18 · Mock vendor data for the design review

**A 60-vendor mock set beside the Final Comps set.** Will's review pattern after each build: look at the data, build mock data if it's too kind, pressure-test, then commit. The 7 comp vendors stay in `vendors.ts` (stories keep the comp data); `mockVendors.ts` holds 60 real food and beverage suppliers to a US grocer, with near-duplicates on purpose (Coca-Cola / Coca-Cola Consolidated, Del Monte Foods / Fresh Del Monte, Kellanova / WK Kellogg) and long legal-style names.

**ESNs in the mock set are 8-digit numbers.** Will's assumption until the real format is known. The comps still show "DEMO-0022".

**Real logos, two versions each: brand color and single color.** Chosen over wordmark tiles only and over fictional brands; the trademark question is set aside for now (Will). Single color is generated (filter + mask, `currentColor`), so it takes the color of its place, like icons. Vendors with no usable logo keep the wordmark tile, which is now a real state to design for. Where each version appears in the UI is for the design review. Sources and adjustments: `docs/vendor-logo-sources.md`.

## Oct 18 · Step 1 pressure test: decisions

From the 60-vendor test (`docs/pressure-tests/step-1.md`). Will chose the recommended option unless noted.

**Vendor search ignores accents, punctuation and hyphens.** "nestle" finds Nestlé, "campbells" finds Campbell's, "coca cola" finds Coca-Cola. Rejected: exact matching (users don't type é, ' or .).

**Results are ordered by best match.** Names starting with the query, then names with a word starting with it, then matches anywhere. Rejected: A–Z, and the vendor master's order (put PepsiCo above "Co…" names for "co").

**An ESN matches from its first digit, and the matched digits are bold.** Rejected: digits anywhere ("0" matched 32 of 60) and bold-only.

**A quiet result count in the Results panel** ("17 vendors"), so people know to keep typing. New UI, designed in Figma first. Rejected: relying on the scrollbar.

**Long vendor names wrap to two lines in the Selected item card**, then an ellipsis. Figma first. Rejected: one line with a hover-only tooltip.

**Big templates keep the card layout for now.** Revisit with real usage (25 vendors = 9 rows of cards). Rejected for now: a compact layout past a threshold.

**The Results panel's scroll check is accepted, as for the Brand list.** Keyboard users reach every row with arrows from the search (`aria-activedescendant`). Rejected: an extra Tab stop.

**Logos: single color in the results, brand color in the selected cards.** Will's own option, chosen over single color everywhere and brand color on white in the results. In the results the logo is single color (ink on white; white on teal for a vendor already added). In the Selected item card the logo is in its brand colors, so the tile becomes white with a thin border instead of teal: inside "Selected vendors" the teal tile wasn't signaling anything the list doesn't, and the brand colors confirm the right company. Brand color stays contained to one place. Vendors with no logo, or no single-color version (Sun-Maid, Blue Bell), show the wordmark there. Figma first. *Changes the Oct 17 Vendor logo Selected state for the Selected item card.*

## Oct 18 · Vendor logo: Content = Wordmark | Mono logo | Brand logo

**Built to Figma's Vendor logo set (`989:98`).** Mono logo: the vendor's single-color logo in the tile's ink (text-subtle on fill-vendor-logo; text-on-primary on teal when selected or pressed). Brand logo: the brand-color logo, only on a white surface-card tile with a 1px border-structural. Wordmark: the fallback when a vendor has no file for the content asked for. Logos scale to fit inside the tile padding (object-fit: contain), never stretched.

**Result row: Mono logo, 56×36, padding 2/4. Selected item card: Brand logo, 128×48, padding 8/16, white tile.** The card's teal tile is gone (it existed for continuity with the selected result row); its wordmark fallback is text-subtle on white.

**Brand-color logos are content, not UI color roles.** A red logo doesn't mean error; a green one doesn't mean complete.

**Vendor logo hover: dropped.** The row hover already covers it. *Closes the Oct 17 proposal (white tile, teal border, teal ink).*

**Follow-ups, not blocking (Will):** cap the logo height (~24px) in the card tile so plain wordmarks like Mars feel less loud; give the Figma Vendor logo a Size (sm/lg) property so the padding travels with it (code already has `size`). Wide logos are listed for editing in `docs/vendor-logo-sources.md`.

## Oct 18 · Selected item card: name first, logo below

**Name and ESN on top beside Remove; the brand-color logo below.** The name moved to a new text style, Body/LG Strong (Geist SemiBold 16/24, Body/LG's size, line height and tracking), so the vendor reads first. The logo sits in an invisible frame (no fill, border or padding), at most 128 wide × 28 high, contained and left-aligned with the name. A vendor with no logo keeps the 28px empty so cards stay the same height; no wordmark there, because the name already says it. Card: 110 tall (was 126). *Supersedes this morning's "brand logo on a 128×48 white tile" for the card.* Mono, brand and wordmark rules for the Vendor logo are unchanged; the 128×48 large tile was removed from code (nothing uses it).

**The app runs on the 60 mock vendors**, through one entry point (`src/data/appData.ts`). Realistic data keeps the experience honest; Storybook's comp stories keep the Final Comps vendors. When a vendor API exists, only `appData.ts` changes.

## Oct 18 · Logos only in the cards, not in the rows

**Result rows (and Review rows) show the wordmark tile, no logos.** Will's call after seeing real logos in the results: at 56×36 the mix of vector and raster sources, badges forced into one color and very wide marks looked sloppy, and a list where some logos are crisp and some muddy reads worse than no logos. Scanning the results is about text (bold match + ESN). Logos stay in the Selected item card, where there's room and the brand color confirms the right company; a missing logo there already reads as intentional. Built in code first, Figma to follow (`figma-sync.md`). *Supersedes "Result row: Mono logo" from earlier today.* Rejected: logos everywhere with hard curation (real vendor data would undo it), and no logos at all (loses the confirmation moment).

**Tall and square logos are left out of the card.** Under 1.5:1 (ink width ÷ height) they read as small stamps at 28px tall, so the card hides them and the space stays empty, like a vendor with no logo: 14 of the 60 (Chiquita, Sun-Maid, Unilever, Nestlé, Utz, King Arthur, Blue Bell, McCormick, both Del Montes, TreeHouse, Conagra, Post, Dole). Wide logos look right and use the 128 width. The ratio is measured per logo and stored with the files; without one (real data later), the card uses the image's own shape. Rejected: letting tall logos grow taller, and hunting for wide lockups first. See the "All 60 vendors, tallest logo first" story.

## Oct 18 · Results: no tile, "ESN-" numbers, one pick per search

**Result rows lose the Vendor logo tile.** With logos gone from the rows, the wordmark tile read as a placeholder. A row is now the vendor name and its ESN; hover, keyboard highlight and the "Selected" check are unchanged. Review rows (step 4) keep their tile for now (not decided).

**ESNs read "ESN-70441642" in the results and the cards.** One identifier, one format; the data keeps the bare number. Search accepts "ESN-0561", "esn0561" or "0561", and bolds the matched digits.

**One pick per search.** Picking a result (click or Enter) adds the vendor, clears the search and closes the results; focus stays in the search for the next name. *Reverses the original step 1 behavior, where focus and the query stayed so several vendors could be added from one search.* Why: the results aren't a multi-select; adding another vendor means typing another name.

## Oct 18 · Step 1 motion: functional and calm

**People are here to do a job, so motion only shows cause and effect.** No bounce, no springs on color, nothing that loops. One set of timings (fast 150, base 200, layout 225, highlight 1000; stagger 35) and three curves (ease-out `0.2,0,0,1` for entrances and state changes, now the system standard; ease-in for exits; ease-in-out for layout moves), shared by CSS and the Motion library. CSS does what it can (color, focus, page load, the highlight); Motion only does what CSS can't (grid glides and exits).

**The newest vendor goes first.** Added vendors appear top-left and the rest shift one slot along, so each choice visibly lands where the eye already is. *Changes the order from oldest-first.*

**Removing offers Undo in a toast instead of asking first.** Five seconds, paused on hover and focus, one at a time; Undo puts the vendor back in its slot. The toast's look and placement wait for Figma.

**Next eases into its enabled state; the hint fades.** Colors only, no scale or pulse: the change is information, not celebration.

**Reduced motion keeps fades.** Under the OS setting (or Storybook's toolbar) movement goes, short opacity fades stay, so state changes are still visible. *Refines the Oct 17 rule "everything that moves turns off".*

**Kept from earlier today: one pick per search.** The motion prompt assumed the panel stays open after a pick; Will kept the newer behavior (the pick clears the search and closes the results).

## Oct 18 · Motion bug pass

**The search focus halo is dropped; the ring keeps its ease-in.** The Teal/500 20% halo added about 4px around a ring that already reads clearly (5.8:1), crowded the Results panel 12px below, and no other focus ring in the system has one. What worked was the easing, which stays. Rejected: tinting the gap between field and ring (softer, same footprint), for consistency with the other rings.

**Page-load animations let go when they end.** Holding their end state kept each staggered group on its own layer, so the Selected vendors area painted over the search's Results panel (docs/bugs.md).

## Oct 18 · Step 1: helper text dropped, small interactions that explain

**The helper text under the vendor search is gone.** It said what type-ahead already shows, the empty state repeated it, and the results panel covered it the moment it applied. Rejected: moving it between the label and the field (GOV.UK hint style), and shortening it.

**Seven small interactions, each showing cause and effect:** the pick flies from its results row to its card; re-picking an added vendor points at its card instead of doing nothing; the results panel fades open and closed; the toast shows a countdown that pauses with its timer; the count ticks; the keyboard highlight slides between rows; the Clear × fades in. All under 300ms except the 5s countdown, nothing loops or flashes, and each has a reduced-motion fallback (fade or nothing). Skipped on purpose: a glow or pulse on Next (information, not celebration), a shake on No results (nothing went wrong), and animating logos inside new cards (too many moving parts). *Answers the Oct 17 open question "Picking an already-added vendor": it now points at the card.*

## Oct 18 · Text fields: the border is the focus state

**A focused input's own border goes 2px teal; no ring around it.** Will: the ring outside the border read as a double outline. Inputs are large and obviously the active thing, so the field itself can carry focus; rings stay for small controls (buttons, chips, checkboxes, calendar days) where the control alone doesn't show it well. Teal/700 is 5.8:1 on white, and 1px grey → 2px teal is a clear change. The extra pixel is drawn inside the 1px border, so the field doesn't change size or shift its text; it eases in (fast). Errors thicken the same way in the error color. Forced colors (which drop box-shadow) get a 2px system outline. *An exception to the Oct 17 rule "focus ring = outline + offset on every component"; Figma's Input Focus ring frame goes.*

## Oct 18 · Empty state fades through; the label stays black

**Removing the last vendor is a fade-through, not a cross-fade.** The cross-fade overlapped a mostly solid card with a mostly solid dashed box for about 150ms (opposite curves made it worse). Now the last card leaves exactly like any other removal, then the empty state fades in: about 420ms in all, never both on screen.

**The text field label no longer turns teal on focus.** The field's 2px teal border already shows focus; a teal label added color without information. *Changes Figma's Text field Focus state (label `text-label-focus`).*

## Oct 18 · Step 2 in the app, and how step 1's motion carries over

**Step 2 shows only the brands of the vendors picked on step 1, and vendors are edited only on step 1.** Going back, removing a vendor and returning drops that vendor's brand picks. Picks are kept across Next and Back.

**Step 2 lists vendors A–Z**, in the brand list and the Selected brands panel (Will's hybrid: step 1 stays newest first, where order means "what I just did"; step 2 is a reference list, where A–Z is easier to scan). A leading "The" is ignored, so The Coca-Cola Company files under C.

**Brand data: real brands for all 60 mock vendors** (551), with invented SKU counts. Some brands appear under two vendors on purpose (Coca-Cola and its bottler), as real data does.

**Step 1's rules, adapted for a multi-select:** chips enter, glide and leave like vendor cards, but in A–Z order, faster (smaller items), and without the highlight tint (several picks in a row would tint everything), the flight (tiring by the tenth brand) or the re-pick pointer (a checked brand just unchecks). Undo only for big removals (the "All N brands" ×); a single chip's checkbox is right beside it. Swaps are fade-throughs, like step 1's empty state. The summary's CountBadge keeps its Oct 17 pop rather than also ticking. The step-to-step transition is still deferred.
## Oct 19 · Group header: a teal bar that opens and closes

From the step 2 design review. Will: the header blends into the list, and the select all reads as "a big check mark next to General Mills." Explored in Storybook (`Scratch/Group header explorations`: four fills, two name sizes × two colors, four select-all placements, then three orders).

**Keep the one search at the top.** Will floated a search in each vendor's header instead. Kept the top search: people often know the brand, not who owns it (Sprite, Häagen-Dazs), the top search already matches vendor names ("coca" → both Coca-Colas), and twelve header searches would mean twelve more tab stops and a jumpy sticky header. The real problem was getting to a vendor in a long list, so: collapsible groups.

**The bar is teal now, with a dark teal rule.** It opens and closes, so it's a control: teal, not plum (rule 3). Fill Teal/100 (`--fill-group-header`), hover Teal/200, 1px Teal/700 rule (`--border-group-header`). Rejected: Teal/100 alone (a hovered row looks exactly like a header; the rule is the one thing a row never has), Teal/50 (too faint to fix "blending in"), the white bar with the plum rule (the one being replaced). *Teal/100 is also the row hover; the rule is what tells them apart.*

**The name is bigger than the rows it labels.** Body/LG Strong (16 semibold), `text-heading`. It was Label/MD 13, smaller than the 14px rows. Rejected: Label/LG 14 (same size as the rows), dark teal (reads as a link on a teal bar), plum (a second color back in the pane), Bricolage (reserved for headings; these aren't).

**Layout: name + count on the left; ☐ Select all, then the caret, on the right.** Will's order, so the checkbox and the caret are never side by side. "Select all" is visible now (Label/MD, `text-default`; "Select 2 matches" while searching). Rejected: the checkbox on the left with no label (the old layout), select all as the first row inside the open group (can't select a closed vendor), "Select all ☐ count" and "count ☐ Select all" by the caret. *Supersedes Oct 17 "Select all per vendor … in the group header directly above the row checkboxes."* The count ticks when it changes, the confirmation that the click landed.

**Behavior, built as previewed** (Claude's proposal in the review; Will chose the layout and asked to commit it): the whole bar opens and closes the group, except the select-all cluster, so a near-miss on the box never closes it. The first vendor with nothing selected starts open, the rest closed. While searching, every group with matches opens (and can't close); clearing the search returns to how you left them. *Answers the parked code-backlog item "Collapsible vendor groups": real vendors carry 15–22 brands.*

**Not changed:** the Selected brands panel's vendor labels (plain text, not controls), so the two columns no longer share one header style, on purpose.

---

## Build plan
Figma done Friday → Storybook Saturday → React app Sunday → buffer Monday (interview prep and this story). Component-first, screen-driven, one repo for app and Storybook. Storybook before the app because components built inside an app absorb its assumptions and rarely get extracted cleanly.
