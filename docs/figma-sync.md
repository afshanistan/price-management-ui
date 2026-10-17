# Figma sync queue

Gaps code found that Figma has to fix first (decision log, "Code finds gaps; Figma gets fixed first"). Tokens flow one way: Figma → `tokens.css` → components.

**How it works:** Claude Code adds an entry here and, if a token is needed to keep building, a stand-in in `src/styles/tokens.pending.css`. Will applies the queue in Figma in batches, then re-exports `tokens.css`. Then the stand-in is deleted and the entry ticked.

Format: **Token name** · Collection · Light value · On brand value · Used by (component) · What to bind in Figma · Stand-in (in `tokens.pending.css`, or none) · Found while (date)

---

- [x] **`--border-width-1-5`** (Figma `border/1-5`) · Primitives/Dimension · Light 1.5px · On brand 1.5px (dimensions have no modes) · Button, Secondary hierarchy · Bind as the stroke weight of the 15 Secondary button variants · Stand-in removed · Button (Oct 17). **Done Oct 17:** in `tokens.css` v2.

