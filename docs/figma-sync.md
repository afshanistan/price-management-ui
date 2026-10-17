# Figma sync queue

Gaps code found that Figma has to fix first (decision log, "Code finds gaps; Figma gets fixed first"). Tokens flow one way: Figma → `tokens.css` → components.

**How it works:** Claude Code adds an entry here and, if a token is needed to keep building, a stand-in in `src/styles/tokens.pending.css`. Will applies the queue in Figma in batches, then re-exports `tokens.css`. Then the stand-in is deleted and the entry ticked.

Format: **Item** · What Figma needs · Stand-in · Found while

---

- [x] **1.5px border token** · `border/1-5` (Primitives/Dimension) → `--border-width-1-5`, bound to the 15 Secondary button variants · was `--border-width-1-5` in a stand-in file, now removed · Button (Oct 17). **Done Oct 17:** in `tokens.css` v2.
