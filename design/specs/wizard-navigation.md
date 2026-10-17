# Wizard navigation (footer)

**Figma:** Wizard navigation `853:184`, page → Navigation & wayfinding
> WizardNavigation — footer outside `<main>`: Back (Secondary XLarge) / Next (Primary XLarge) with a hint beside a blocked Next.
> Props — showBack: boolean · hint: string · state (derived from data in code, not a prop): next-disabled | next-enabled

## Props
| Prop | Type | Notes |
|---|---|---|
| `back` | `{ label: string; onPress: () => void } \| undefined` | Omit on step 1 (Figma "Show back") |
| `next` | `{ label: string; icon?: IconName; onPress: () => void }` | `icon` defaults to `arrow-right`; step 4 uses `download` |
| `canContinue` | `boolean` | Derived from the step's data in the app; drives the disabled Next |
| `hint` | `string` | Shown only when `canContinue` is false |

## Element
`<footer>`, rendered **outside `<main>`**.

## Anatomy and sizes
- Row, width 960 (the card column), `min-height` 56, gap 8, items centered.
- **Left** group: Back = Button **XLarge Secondary** with a leading `arrow-left`. Hidden on step 1 while the right group keeps its place, so Next never moves.
- **Right** group: right-aligned, gap 16 → hint text (only when blocked) + Next = Button **XLarge Primary** with a trailing `arrow-right`.
- Hint: Body/MD (Geist Regular 14/20), `--text-subtle`.
- Page layout: pinned 24px below the 644px card.

## States
| State | Next | Hint |
|---|---|---|
| Next enabled | Primary, Default | hidden |
| Next disabled | Primary, Disabled (`--fill-disabled`, 1px `--border-disabled`, `--text-disabled`) | visible |

## Labels (destination names, from code-backlog)
| Step | Back | Next |
|---|---|---|
| 1 Vendors | — | "Select brands →" |
| 2 Brands | "← Edit vendors" | "Set presets →" |
| 3 Presets | "← Edit brands" | "Review template →" |
| 4 Review | "← Edit presets" | "Download template" (download icon) |

Arrows are icons, not text. Hints: step 1 "Add at least one vendor to continue."; step 2 "Add at least one brand for every vendor to continue."

## Accessibility
- Hint linked with `aria-describedby` from Next.
- Disabled Next: prefer **`aria-disabled="true"`** (stays focusable, so the hint is read) with presses blocked in code. React Aria's `isDisabled` sets native `disabled`. See flags.
- Accessible names = visible labels without the arrows.

## Code backlog
- Accessibility: Wizard navigation hint (Rule ID 5), Disabled primary.
- Review: Wizard footer (labels, Back hidden on step 1, Next never moves).
- Open: native `disabled` vs `aria-disabled`.

## Flags
1. **`disabled` vs `aria-disabled` is still open** in code-backlog. Build the Storybook story both ways and ask Will to pick.
2. Figma's "Show back" hides the Back button, and in the Next-disabled variant the Left group hugs. In code, keep the left slot so Next stays on the right edge either way.
