# Price Management 2.0 — component library (Storybook) and Template Builder app

## Who you're working with
Will Norris, an experience design leader. He designed everything here in Figma and is **new to code, React, Storybook and component libraries**. He's learning as we go:
- Before each step, say in one or two plain sentences what you're about to do and why. After it, say what changed.
- Prefer small, reviewable steps. Commit after each component (`git commit`), with a clear message.
- When something needs his decision, stop and ask. Don't pick for him.

## The golden rule: build from decisions, don't re-decide
The design is **finished and decided**. Your job is to carry those decisions into code faithfully, with the same names at every step (Figma variable → token → component prop → story).

Sources of truth, in this order:
1. `design/specs/*.md`: per-component specs exported from Figma (sizes, states, tokens, props, flags)
2. `docs/code-backlog.md`: everything decided in Figma that only exists in code (motion, keyboard, ARIA, behavior). **Check its sections for every component you build.**
3. `docs/decision-log.md`: why each decision was made, and what was rejected
4. `docs/handoff.md`: project status, node IDs, working agreements
5. `src/styles/tokens.css`: generated from Figma. **Never edit it by hand.**

**If sources conflict, or something isn't decided:** don't resolve it yourself and don't invent a design. Add an entry to `docs/open-questions.md` (what, where, the options, which source says what), tell Will, and use the most recent decision as a placeholder only if he says to continue. Rejected options in the decision log stay rejected.

## Stack
- React + TypeScript + Vite
- Storybook (React-Vite) with `@storybook/addon-a11y`, which runs axe on every story
- **React Aria Components** (`react-aria-components`) for behavior and accessibility: buttons, links, checkboxes, radios, listbox, combobox, date picker, popovers. Style them with plain CSS using their `data-*` state attributes (`[data-hovered]`, `[data-pressed]`, `[data-focus-visible]`, `[data-disabled]`, `[data-selected]`).
- Plain CSS with CSS custom properties: one `.css` file per component next to it. No Tailwind, no CSS-in-JS, no UI kit.
- Fonts via Fontsource: Bricolage Grotesque (headings), Geist (body, labels), JetBrains Mono (data)

## Folder structure (mirrors the Figma library pages)
```
src/
  styles/        tokens.css (generated), tokens.pending.css (stand-ins until Figma has them), fonts.css, global.css
  assets/        icons/*.svg (stroke + -filled), logo.svg
  components/
    atoms/       Icon, Logo, Checkbox, Radio, StatusMark, ...
    molecules/   Button, IconButton, NavLink, AccountBadge, Input, TextField, ...
    organisms/   ResultsPanel, DatePicker
    navigation/  MainNavigation, WizardNavigation, Stepper
    cards/       SelectVendorsCard, SelectBrandsCard, ...
    layouts/     page shells
```
Each component gets its own folder: `Button/Button.tsx`, `Button/Button.css`, `Button/Button.stories.tsx`, `Button/index.ts`. Storybook titles match: `Molecules/Button`.

## Token rules
- Components use **semantic tokens only** (`--fill-primary-default`, `--text-subtle`, `--border-structural`…). Never primitives (`--color-teal-700`), never hex values.
- Spacing, sizes and radii use the dimension tokens (`--space-12`, `--size-32`, `--radius-4`, `--border-width-1`, `--focus-width-2`, `--focus-offset-2`).
- Text uses the text-style shorthands: `font: var(--type-label-lg); letter-spacing: var(--type-label-lg-tracking);` (or the `.type-*` classes).
- **Modes are places:** a container sets `data-mode="on-brand"` (header, plum stage), and every token inside re-resolves. Components never set a mode, and never take a "dark" or "on-brand" prop. `data-mode="light"` opts a nested element back out.
- **Figma is the source of truth for tokens and components.** Never add tokens to `tokens.css` by hand. When code needs something Figma doesn't have:
  1. Log it in `docs/figma-sync.md`: collection, token name, Light and On brand values, which component uses it, and what to bind in Figma.
  2. Put a stand-in in `src/styles/tokens.pending.css` (imported after `tokens.css`), with a comment pointing to the sync entry. Never hardcode the value in a component.
  3. Tell Will, and keep going.

  Will applies the queue in Figma and re-exports `tokens.css`; then delete the stand-in and tick the entry.

## Component rules (from the decision log and code backlog)
- Props read like the Figma properties (`size`, `hierarchy`, `tone`, `leadingIcon`). Figma's **State** property is never a prop. States are pseudo-classes or React Aria data attributes.
- **Icons:** `<Icon name filled />`, color = `currentColor`. Never set an icon's color inside Icon; the container sets `color`. The Figma Semantic/Icon and Icon style modes don't exist in code.
- **Focus:** `outline: var(--focus-width-2) solid var(--focus-ring); outline-offset: var(--focus-offset-2);` on `[data-focus-visible]` only. No extra ring elements.
- **Min-height, never height,** on anything with text. Icon-only squares stay a fixed size.
- **Motion:** `transition: <props> var(--motion-duration) var(--motion-ease)` (150ms ease-out). No springs on color. Button press `scale(0.97)`. Everything that moves turns off under `prefers-reduced-motion`.
- **Accessible names** start with the visible label. Icon-only controls need `aria-label` naming action + object ("Remove Cargill"). See code-backlog → Accessibility for the full list.
- Color roles: Teal = actions · Plum = structure and labels (never interactive, except header controls on brand) · Neutral = content · Vermilion = error/destructive · Citron = "complete" status (never interactive, never text color, never color alone).

## Stories
For every component (autodocs is on globally in `.storybook/preview.tsx`, so each gets a Docs page):
- One story per meaningful variant (each size × hierarchy, each tone), plus an **"All states"** story that shows the states side by side. Force a state with a static wrapper or a `data-*` attribute only in that story; real hover and press must still work in the others.
- A story **on brand**: wrap it in `<div data-mode="on-brand" style="background: var(--surface-brand)">`, or use the toolbar's Mode switch.
- The a11y panel must show **no violations**. If one can't be fixed without a design change, log it in `docs/open-questions.md`.
- `parameters.docs.description.component` starts with the Figma component description from the spec (the `>` line under **Figma:**), verbatim, then a short summary from the spec (what it is, when to use it).

## Workflow per component
1. Read its spec in `design/specs/` and its sections in `docs/code-backlog.md`.
2. Say in two or three lines what you'll build, plus any flags from the spec. Wait for Will's go-ahead if there's an open flag.
3. Build component + CSS + stories. Run `npm run storybook` if it isn't already running, and check the a11y panel.
4. Commit. Tell Will what to look at in Storybook.

## Commands
- `npm run storybook`: Storybook at http://localhost:6006
- `npm run dev`: the app (later)
- `npm run build-storybook`: static build

## Specs not exported yet
Only the first organism's components have specs (header + wizard footer). For anything else, ask Will before building, so the spec can be exported from Figma first (file `Iz1cbfAMKHnHopr6wgXZCa`). Don't guess from screenshots.
