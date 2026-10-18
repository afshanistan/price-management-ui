# Select vendors card (card, step 1)

**Figma:** Select vendors card `689:358`, page → Cards (State × 3: Default `643:1451`, Searching `689:263`, Selected `712:349`)
> SelectVendorsCard — step 1: search vendors, selected vendor cards.
> Props — state (derived from data in code, not a prop): default | searching | selected

Build this **last**, after Card header, Text field, Results panel, Selected item card and Empty selection.

## Props
| Prop | Type | Notes |
|---|---|---|
| `vendors` | `Vendor[]` | All searchable vendors (sample data) |
| `selected` | `Vendor[]` | Controlled from the app (the wizard needs it for Next) |
| `onChange` | `(selected: Vendor[]) => void` | |

`Vendor = { id, name, esn, wordmark }`. State is derived: query + open panel = searching; `selected.length > 0` = selected.

## Element
The card is the page's `<main>` content (the page shell owns `<main>`).

## Anatomy and sizes
- Width `--layout-content-width` (960); column, padding 24, gap 24, radius 16 (`--radius-16`), 1px `--border-structural`, background `--surface-card`.
- Page layout sets the card to a **fixed 644** tall with the body scrolling (`overflow-y: auto`), so the footer never moves (code-backlog, Sizing). The component itself hugs; the shell fixes the height.
- Children, top to bottom:
  1. **Card header**: title "Add vendors to your template", vendor pictogram, **no description**.
  2. **Text field**: label "Vendor name or ESN", search icon, helper "Results appear as you type. Select a vendor to add it immediately." Full width.
  3. **Divider**: 1px `--border-structural`, full width.
  4. **Selected vendors** section, column, gap 12:
     - Heading "Selected vendors (N)": `.type-label-lg` (Geist Medium 14/20), `--text-heading`. Not a heading element (see Accessibility).
     - N = 0 → **Empty selection** stacked, full width.
     - N > 0 → grid of **Selected item cards**, 3 columns, gap 16.
- **Results panel** floats under the input while searching (Figma places it absolutely over the divider and section), same width as the input.

## States
| State | Field | Below |
|---|---|---|
| Default | Text field Default | Empty selection |
| Searching | Text field Focus + Results panel open | (unchanged underneath) |
| Selected | Text field Default | Selected item cards |

## Behavior
- Typing filters by vendor name **or** ESN, live.
- Selecting a result adds it at once (Figma helper text says so), keeps focus in the input and keeps the panel open, so several vendors can be added in a row. The query stays.
- Remove (trash) removes the vendor; when the last one goes, the Empty selection returns.
- Next on the footer is blocked until ≥1 vendor, with the hint "Add at least one vendor to continue." (Wizard navigation, already built).

## Accessibility
- One H1 = the card title. "Selected vendors (3)" is a label for the list, not a heading (code-backlog Landmarks: only panel/section titles are H2, and Figma styles it as a label). Use it as the list's accessible name: `<ul aria-labelledby>`.
- Announcements (polite): result count while typing, "Cargill added", "Cargill removed" (Rule ID 15).
- Page title "Add vendors – Template Builder" is set by the page, not the card.

## Sample data
Cargill (DEMO-0022) and others from the Final Comps screens 01a–01c; Figma notes that sample data is illustrative. Put it in one `src/data/vendors.ts` file shared by stories and the app.

## Code backlog
- Accessibility: Landmarks (Rule ID 4), announcements (Rule ID 15), dismissal (Rule ID 11), Sizing (fixed 644 card).
- Page layout and motion: card transition (React app, not Storybook).

## Flags
1. **"Selected vendors (N)": heading or not?** Figma uses a label style; code-backlog says H2 = "panel / section titles". Build it as a non-heading label and log it in `docs/open-questions.md` for Will.
2. Whether the Results panel closes after each pick isn't drawn. The helper text ("Select a vendor to add it immediately") suggests it stays open; build it that way and log it.
