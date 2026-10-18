# Figma sync queue

Gaps code found that Figma has to fix first (decision log, "Code finds gaps; Figma gets fixed first"). Tokens flow one way: Figma → `tokens.css` → components.

**How it works:** Claude Code adds an entry here and, if a token is needed to keep building, a stand-in in `src/styles/tokens.pending.css`. Will applies the queue in Figma in batches, then re-exports `tokens.css`. Then the stand-in is deleted and the entry ticked.

Format: **Token name** · Collection · Light value · On brand value · Used by (component) · What to bind in Figma · Stand-in (in `tokens.pending.css`, or none) · Found while (date)

---

- [x] **`--border-width-1-5`** (Figma `border/1-5`) · Primitives/Dimension · Light 1.5px · On brand 1.5px (dimensions have no modes) · Button, Secondary hierarchy · Bind as the stroke weight of the 15 Secondary button variants · Stand-in removed · Button (Oct 17). **Done Oct 17:** in `tokens.css` v2.

- [ ] **`--layout-content-width`** (Figma `layout/content-width`) · Primitives/Dimension · Light 960px · On brand 960px (dimensions have no modes) · Wizard navigation (and later the card, stepper and page shell: the 960 content column) · Bind as the width of Wizard navigation `853:184`, the card and the Stepper `879:293` · Stand-in in `tokens.pending.css` · Wizard navigation (Oct 17)

## Components

Format: **Item** · Where in Figma · What to set · Used by · Found while (date)

- [x] **Nav link icons in the Default header** · Main-Navigation `642:156`, Variant=Default → the three Nav link `624:108` instances · Nothing to change: Figma already has Templates = `tag`, Submissions = `upload`, Messages = `messages`; code now matches (decision log, "Nav link icons follow Figma") · NavLink, On brand story · NavLink (Oct 17). **Closed Oct 17:** no Figma change needed.
- [ ] **Help icon button layer name in the Default header** · Main-Navigation `642:156`, Variant=Default → the first of the two Icon button `603:52` instances · Icon is already `help` (Figma screenshot, Oct 17); only rename the layer "Button-Settings" (`615:26`) to "Button-Help" · MainNavigation, Default story · MainNavigation (Oct 17)
