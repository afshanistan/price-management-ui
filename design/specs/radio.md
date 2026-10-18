# Radio (atom)

**Figma:** Radio `796:2665`, page → Atoms (Checked × State: False / True × Default / Hover)
> Radio — single choice inside Option tile.
> Props — checked: false | true · state (Figma only; in code these are pseudo-classes / ARIA): default | hover

Only used inside **Option tile**. Build it as the visual circle of a React Aria **`Radio`** (which renders a real, visually hidden `<input type="radio">`), not as a standalone control.

## Anatomy and sizes
- Fixed 18×18 circle (`--radius-full`), 1.5px border (`--border-width-1-5`).
- Checked: an 8px dot, `--icon-on-primary`, centered.

## States and tokens
| Checked | Default | Hover |
|---|---|---|
| False | fill `--fill-input`, border `--border-input` | fill `--fill-input-hover`, border `--border-input-hover` |
| True | fill + border `--fill-primary-default`, dot | fill + border `--fill-primary-hover`, dot |

Hover comes from the **tile** being hovered (`[data-hovered]` on the Radio/label), same idea as the checkbox in rows. Pressed on an unchecked tile already shows True + Hover (see `option-tile.md`). Focus: the ring goes on the tile, not the circle. No Disabled state drawn; don't build one.

## Accessibility
Native radio semantics via React Aria; the tile's label is the name. The circle itself is `aria-hidden`.

## Code backlog
- Global presets card: Radio groups.

## Flags
None.
