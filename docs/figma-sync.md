# Figma sync queue

Gaps code found that Figma has to fix first (decision log, "Code finds gaps; Figma gets fixed first"). Tokens flow one way: Figma → `tokens.css` → components.

**How it works:** Claude Code adds an entry here and, if a token is needed to keep building, a stand-in in `src/styles/tokens.pending.css`. Will applies the queue in Figma in batches, then re-exports `tokens.css`. Then the stand-in is deleted and the entry ticked.

Format: **Token name** · Collection · Light value · On brand value · Used by (component) · What to bind in Figma · Stand-in (in `tokens.pending.css`, or none) · Found while (date)

---

- [x] **`--border-width-1-5`** (Figma `border/1-5`) · Primitives/Dimension · Light 1.5px · On brand 1.5px (dimensions have no modes) · Button, Secondary hierarchy · Bind as the stroke weight of the 15 Secondary button variants · Stand-in removed · Button (Oct 17). **Done Oct 17:** in `tokens.css` v2.

- [x] **`--layout-content-width`** (Figma `layout/content-width`) · Primitives/Dimension · Light 960px · On brand 960px (dimensions have no modes) · Wizard navigation (and later the card, stepper and page shell: the 960 content column) · Bind as the width of Wizard navigation `853:184`, the card and the Stepper `879:293` · Stand-in removed · Wizard navigation (Oct 17). **Done Oct 17:** in `tokens.css` v3, bound in Figma.

- [ ] **`--space-10`** (Figma `space/10`) · Primitives/Dimension · 10px (no modes) · Empty selection, Inline layout (padding 10 / 12) · Bind as the vertical padding of Empty selection `903:616` Layout=Inline · Stand-in in `tokens.pending.css` · Empty selection (Oct 17)
- [ ] **`--size-80`** (Figma `size/80`) · Primitives/Dimension · 80px (no modes) · Vendor logo lg (80×48, Selected item card) · Bind as the width of the lg Vendor logo `677:34` instance in Selected item card `707:717` · Stand-in in `tokens.pending.css` · Vendor logo (Oct 17)
- [ ] **`--focus-offset-4`** (Figma `focus/offset-4`) · Primitives/Dimension · 4px (no modes) · Input focus ring (sits 4px outside the field) · Bind as the offset of the Input `661:56` Focus ring frame · Stand-in in `tokens.pending.css` · Input (Oct 17)
- [ ] **`--size-126`** (Figma `size/126`) · Primitives/Dimension · 126px (no modes) · Empty selection, Stacked min height (the same height as a Selected item card, so the section doesn't jump when the last vendor is removed) · Bind as the min height of Empty selection `903:616` Layout=Stacked · Stand-in in `tokens.pending.css` · Empty selection (Oct 17)

## Components

Format: **Item** · Where in Figma · What to set · Used by · Found while (date)

- [x] **Nav link icons in the Default header** · Main-Navigation `642:156`, Variant=Default → the three Nav link `624:108` instances · Nothing to change: Figma already has Templates = `tag`, Submissions = `upload`, Messages = `messages`; code now matches (decision log, "Nav link icons follow Figma") · NavLink, On brand story · NavLink (Oct 17). **Closed Oct 17:** no Figma change needed.
- [x] **Help icon button layer name in the Default header** · Main-Navigation `642:156`, Variant=Default → the first of the two Icon button `603:52` instances · Icon is already `help` (Figma screenshot, Oct 17); only rename the layer "Button-Settings" (`615:26`) to "Button-Help" · MainNavigation, Default story · MainNavigation (Oct 17). **Done Oct 17:** layer renamed in Figma.
- [ ] **Filled icons export with a stroke over their cutouts** · Icons `563:12460` → `check-circle`, `help`, `trash`, Style=Fill · The exported SVGs have `stroke="currentColor" stroke-width="1"` on top of the fill, which closes the evenodd cutouts (the check inside check-circle reads as a solid dot at 16px, e.g. Result row "Selected"). Figma draws them correctly. Remove the stroke from the Fill variants (or export fills only), then re-export the three SVGs to `src/assets/icons/` · Icon, Result row, Icon button (trash), Main navigation (help) · Result row (Oct 17)
