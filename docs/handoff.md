# Handoff — Price Management 2.0 (as of Sat Oct 17, ~6pm)

Read this first in a new chat. Decisions and the why behind them live in `claude/decision-log.md`. Everything decided in Figma that has to be built in code lives in **`claude/code-backlog.md`** — check it when building each component in Storybook and each screen in React. The Foundations page in Figma summarizes the rules that came out of the log.

## Latest (Oct 17 evening) — Storybook setup started
- **Exported from Figma** (read-only, 11 calls): `src/styles/tokens.css` (83 semantic tokens, Light as `:root`, On brand as `[data-mode="on-brand"]`, plus a `[data-mode="light"]` opt-out; primitives, dimensions, text styles as `--type-*` shorthands and `.type-*` classes, elevation and glow), 21 icons × stroke/filled SVGs with `currentColor`, the logo SVG with `--logo-primary` / `--logo-accent`, and specs for Icon, Logo, Button, Icon button, Nav link, Account badge, Main navigation, Wizard navigation (`design/specs/`). Semantic/Icon and Figma/Icon style excluded.
- **XLarge button = 56px** (Will confirmed). code-backlog corrected: 56 tall, 24px side padding (was 48 / 20).
- Repo: `~/Documents/Claude Projects/price-management-ui` — Vite + React + TypeScript, Storybook with the a11y addon, React Aria Components, fonts via Fontsource. `CLAUDE.md` tells Claude Code to build from the docs and flag conflicts in `docs/open-questions.md` instead of re-deciding.
- Will installed Claude Code (v2.1.302, Opus 5.5, Pro) and Node v24 on Oct 17.
- **Flags from the export** (in the specs): XLarge label has no text style in Figma (use Geist SemiBold 16/24, ask about `Button/Label-LG`); the Focus header still contains a stale "Progress stepper (placeholder)" frame (delete in Figma; don't build); Default header CTA says "Upload CSV" vs "Upload pricing"; Default header has two Settings icon buttons; disabled Next `disabled` vs `aria-disabled` still open.

## Previous (Oct 17 afternoon) — accessibility fixes + housekeeping. Figma is done.
**Accessibility (design stage):** sheet `1a2Z2-VVXDkgxyF0ZLfVeH-8hLfEfHPI4A0RepaMROuQ`, tab A11y checks, column E: Rule IDs 2, 4, 5, 6, 12, 13, 16, 20 = Fixed · 7 = Accepted (reflow, desktop-only, React check) · 8, 9, 10, 11, 15, 18, 19 = Fix later (code).
- Result row: new `Keyboard active` states (`911:612` Single, `911:620` Multi, `911:628` Multi Selected keyboard active) = highlight fill + 2px inset `focus/focus-ring`.
- On brand Secondary border → Plum/500 (hover Plum/400). Disabled primary: `fill/fill-disabled` Light → Neutral/100 + 1px `border/border-disabled`.
- Input Clear `891:644` 24×24, 1.5px ×; input text single line with ellipsis. Brand chip Remove 24×24, chips +4px.
- Wizard navigation `853:184` Next disabled has a **Hint** text property (`Hint#918:0`).
- **AlertCircle** `921:12` in Icons; Text field Error `672:164` has an "Error message" row (property `Error message#921:0`) replacing the helper.
- Min-height (not fixed height) on every text-bearing component; icon squares stay fixed.
- **Annotations page** "→ Annotations · Accessibility" `913:2`: 01b `913:42`, 02b `913:51`, 03b `913:60`, 04 `913:69`.

**Housekeeping (unattended run, ~2–4pm):**
- **Audit** of the 12 Final Comps (recursive) → library = only what the comps use.
- **Archive page** "→ Archive · Retired components" `926:617` (exploration section, right above COMPONENT LIBRARY): Vendor scope `725:315`, Radio row `796:2701` + its prototype `796:2708` (flow removed).
- **Deleted variants:** Selected item card Layout=Inline + Row (set now Stacked only), Icon button Tone=Quiet destructive ×10 (Size property now Medium only), Group header Tone=Strong (Subtle only), Review row Type=Preset, 12 dead hidden "Highlight bar" layers in Result row, and the Selected item card prototype row that demoed Inline.
- **New semantic tokens** (both modes): `border/border-stepper-track` `928:240` (Light Neutral/300, On brand Plum/500) · `border/border-status-in-progress` `928:241` (Citron/300) · `fill/fill-status-in-progress` `928:242` (Citron/300) · `text/text-stepper-upcoming` `928:243` (Light Neutral/600, On brand Neutral/400) · `fill/fill-stepper-upcoming` `928:244` (Neutral/500).
- **Stepper rebound** off primitives: Stepper, Stepper step, Stepper line now use semantic tokens and each variant sets **On brand** mode itself (it only ever sits on the stage). Done node/line → `fill-status-complete`, check → `icon-on-status-complete`, labels → `text-default` / `text-subtle` / `text-stepper-upcoming`, backgrounds → `surface-brand`. Renders identically. No primitives are bound anywhere on the 12 screens now.
- **Deleted tokens:** `fill/fill-accent`, `text/text-on-accent`, `surface/surface-tray`, `fill/fill-row-pressed`, `icon/icon-placeholder`, `fill/fill-group-header`. (`fill/fill-row-selected` is **still used** — Option tile Selected.)
- **Deleted effect styles:** the six Plum/Teal-tinted Elevation styles. Kept: Elevation/1–3 (neutral), Elevation/Stage card, Glow/Complete.
- Calendar day Empty text: raw black fill → `text/text-default`.
- **Library pages tidied:** one column, 80px gaps, prototypes top-aligned 80px to the right (Result row stacks its two). Cards keeps its four step sections. All 19 flows still start on their prototypes. Atoms: icon-authoring scaffolding (.IconGrids, .IconTemplate, Icon Staging) moved to the bottom under a label.
- **Descriptions** on every component set / standalone component: purpose · props written like React props (state marked "Figma only — pseudo-classes / ARIA" or "derived from data") · code-backlog section.
- **Final Comps** holds only the 12-screen section + a note "Sample data is illustrative…" `930:11150`. Study boards Secondary button `880:5948` and Basket study `888:5756` moved to 04.1 under "Moved from Final Comps · Oct 17".
- **Foundations page** "→ Foundations" `931:2` (first page under COMPONENT LIBRARY), built from live variables/styles: Title `931:3` · Color `931:6` · Typography `932:2` · Spacing, radius and sizing `932:144` · Elevation `933:49` · Surfaces and modes `933:90` · Iconography `933:186` · Layout `934:272` · Motion `934:323` · Accessibility `934:367` — each with a Principles block (Rule · Why · Rejected).

## Earlier (Oct 17 morning) — Select brands final pass
- Basket = **coverage strip** (study C). Study board now on 04.1 (`888:5756`).
- **Select brands card `772:2750`**: Body (H) → Main (Card header + Directory) + Selected brands panel (full height). Variants Default · Selected · **Incomplete `893:2623`** · No results.
- **Selected brands panel `756:1494`**: With selections `756:1243` · Incomplete `892:3029` · Empty `756:1474`. Count badge is to-do until every vendor has ≥1 brand.
- Group header (Subtle) has **Show checkbox** with a tri-state Select all; counts read "4 of 5".
- New: Status mark `890:3037`, Close icon `890:3027`, Checkbox Mixed, Brand chip `891:629` (soft teal, × hover Teal/300), Vendor coverage tile `891:643` (Icon-tile styling, Status mark top-right; counts beside vendor labels), Empty selection set `903:616` (Stacked / Inline), Card header `Show description`. Headlines: "Add vendors / brands to your template", "Add pricing defaults".
- "All N brands" is a snapshot. Select all during search = visible matches only.

## Earlier (Oct 16 night)
- Typography: headings **Bricolage Grotesque**, body/labels Geist (Labels Medium), data **JetBrains Mono**; Display/Number only on Review.
- Secondary button = tonal Teal/100–300 + 1.5px Teal/700 border (Light).
- Layout: Focus header 56 → stepper band 80 on the plum stage → card fixed 644 → 24 → Wizard navigation. 12 screens in Final Comps section `879:4387`: 01a `879:4657` · 01b `879:5128` · 01c `879:5539` · 02a `879:5908` · 02b `879:6185` · 02c `879:6998` · 02d `879:7545` · 02e `879:8237` · 03a `879:8957` · 03b `879:9534` · 03c `879:10170` · 04 `879:10662`.

## Setup
- Figma file (Screens): https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment — fileKey `Iz1cbfAMKHnHopr6wgXZCa`
- Claude edits through the Figma connector (`use_figma`); load the figma-use skill first. If calls fail with empty errors, ask Will to reopen the file. Gotchas: text in a freshly cloned frame doesn't report `textStyleId` in the same call; `isExposedInstance` only works once the instance is inside its component; switch page once per call; the cloud workspace can't download Figma screenshot URLs; `use_figma` returns are capped at 20KB, so split big reads.
- Page order: FILE COVER · DESIGN EXPLORATION (01 … 04.3, **→ Archive · Retired components `926:617`**) · COMPONENT LIBRARY (**→ Foundations `931:2`**, → Atoms `558:10471`, → Molecules `558:10464`, → Organisms `558:10459`, → Navigation & wayfinding `787:2205`, → Cards `787:2206`, → Layouts `787:2207` empty) · SCREENS (→ Wireframes, → Final Comps `558:10472`, → Annotations · Accessibility `913:2`).
- **Where things go:** atoms and molecules on their level pages; organisms used by one card on Cards in that step's section; shared organisms on Organisms; nav, stepper, wizard footer on Navigation & wayfinding; page shells on Layouts. Retired components → Archive.
- **Prototypes = Present-mode picker:** "<Name> prototype (test)" directly right of its component, flow named after the component.
- Schedule: Figma done → Storybook (Sat/Sun) → React app → buffer/interview prep Mon. Deadline Tue Oct 20.

## Working agreements
- Teaching mode: talk through options first when Will asks; build when he says go. Render options side by side for visual decisions. Will is new to Storybook and component libraries — explain each step briefly.
- Figma prototypes show look and feel; real conditional logic is code — log it in the code backlog.
- Engineers are the primary user: token leaf names = CSS variables; property-first grouping; modes for places (Light, On brand), tokens for things.
- Motion: 150ms ease-out, no springs on color.
- Build from what's decided (Figma + these docs); flag conflicts, don't re-decide.
- Color roles: Teal = actions; Plum = structure and labels; Neutral = content; Vermilion = error/destructive; Citron = status: complete (never interactive, never alone).

## Variable collections
- Primitives/Color `VariableCollectionId:533:2` — Teal, Neutral, Plum, Citron, Vermilion, Lime, Amber (status, reserved), Base (White, Black, Transparent), Infographics.
- Primitives/Dimension `533:124` (space, radius, size, border, layout, focus width) · Primitives/Typography `533:165`.
- Semantic/Color `VariableCollectionId:566:2` — modes Light `566:0`, On brand `597:0`. 83 tokens.
- Figma-only (excluded from CSS): Semantic/Icon `588:28` · Figma/Icon style `611:118`.
- Effect styles: Elevation/1 – subtle, /2 – floating, /3 – overlay (neutral), Elevation/Stage card, Glow/Complete.

## Components (node IDs)
Atoms — Icons `563:12460` (21 icons); Logo `637:25`; Pictograms `650:15`; Vendor logo `677:34`; Checkbox `728:38`; Radio `796:2665`; Calendar day `801:24`; Status mark `890:3037`.
Molecules — Button `580:26` (XSmall 24 / Medium 32 / XLarge 56 × Primary/Secondary/Tertiary × 5 states); Icon button `603:52`; Account-Badge `617:107`; Nav link `624:108`; Icon tile `649:119`; Input `661:56`; Text field `672:182`; Result row `678:174`; Selected item card `707:717`; Empty selection `903:616`; Card header `713:406`; Selection summary `756:394`; Group header `758:377`; Tag `791:2608`; Option tile `816:419`; Brand chip `891:629`; Vendor coverage tile `891:643`.
Organisms — Results panel `688:249`; Date picker `815:3262`.
Navigation & wayfinding — Main-Navigation `642:156` (Default / Focus); Wizard navigation `853:184`; Stepper `879:293`; Stepper step `879:185`; Stepper line `879:190`.
Cards — Select vendors card `689:358`; Select brands card `772:2750`; Brand list `744:777`; Selected brands panel `756:1494`; Global presets card `791:2631`; Review template card `830:2654`.

## Status in Storybook (Oct 17, late evening)
- **Batch 1 built:** Icon, Logo, Button, Icon button, Nav link, Account badge, Main navigation (Default + Focus), Wizard navigation (blocked Next = `aria-disabled`, decided).
- **Batch 2 built:** Stepper; Pictogram, Vendor logo; Icon tile, Tag, Card header; Input, Text field; Result row (Single), Results panel; Selected item card, Empty selection; **Select vendors card** (step 1, fully interactive). Sample vendors in `src/data/vendors.ts`.
- **Batch 3 built:** Status mark, Checkbox; Brand chip, Vendor coverage tile, Group header, CountBadge + Selection summary; Result row **Multi**; Brand list, Selected brands panel; **Select brands card** (step 2, fully interactive). Sample brands in `src/data/brands.ts` (with `isBrandStepComplete`, shared with the wizard) and story selections in `src/data/brandSamples.ts`.
- **Batch 4 specs are exported** (steps 3–4) but not built yet.
- Every story links its Figma component (Design tab) and shows its spec at the bottom of its Docs page. Storybook's Project section shows `docs/open-questions.md` and `docs/figma-sync.md` live.
- **Waiting on Will:** open questions in `docs/open-questions.md`; Figma queue in `docs/figma-sync.md` (four dimension tokens, filled-icon re-export).

## Next
1. Will: answer the open questions (steps 1–2); apply the Figma queue and re-export `tokens.css` + the three filled icons.
2. Build batch 4 in the README's order (steps 3–4: Radio, Calendar day, Option tile, Date picker, Preset fieldset, Dates preset, Global presets card, Summary stat, Review row, Preset readout, Review template card).
3. React app: page shell (Focus header → stepper stage → 644 card → wizard footer), routing between steps, the stepper charge-up.

## Later / open
- Plugin: add a fourth "Layout" level.
- Color pass: plum vs teal contrast, lighter plums drifting pink.
- Glow token: `--glow-complete` exported from the raw-color style; confirm the look in Storybook.
