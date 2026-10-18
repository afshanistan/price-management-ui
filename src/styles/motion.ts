/*
  Motion values for the Motion library (motion/react), the same as the CSS custom properties
  (--motion-duration-*, --motion-ease-*, in tokens.pending.css until Figma has them).
  CSS handles color, focus, page load and the highlight; Motion handles layout glides and exits.
  Seconds here, because Motion takes seconds.
*/
export const duration = {
  fast: 0.15,
  base: 0.2,
  layout: 0.225,
  highlight: 1,
} as const

export const stagger = 0.035

export const ease = {
  /** Entrances and state changes: the system standard. */
  out: [0.2, 0, 0, 1],
  /** Exits. */
  in: [0.4, 0, 1, 1],
  /** Layout moves. */
  inOut: [0.4, 0, 0.2, 1],
} as const satisfies Record<string, [number, number, number, number]>

/** A Motion ease as a CSS easing string, for the Web Animations API: "cubic-bezier(0.2, 0, 0, 1)". */
export function cssEase(curve: readonly [number, number, number, number]) {
  return `cubic-bezier(${curve.join(', ')})`
}
