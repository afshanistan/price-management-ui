import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { motion } from 'motion/react'
import { useReducedMotionSetting } from '../../../foundations/useReducedMotionSetting'
import './Stepper.css'

export type StepperStep = 1 | 2 | 3 | 4
type StepState = 'complete' | 'in-progress' | 'not-started'

export interface StepperProps {
  /** Noun labels. The stepper names the place; the card title says what to do there. */
  steps?: string[]
  /** The step you're on: its ring. */
  currentStep?: StepperStep
  /**
   * The furthest step reached so far. Steps up to it stay complete when Back or Edit go to an
   * earlier step (Figma 02e "Back from review"). Defaults to currentStep.
   */
  reachedStep?: StepperStep
  /** How long the charge-up ("the fuse") runs, ms. A tuning variable: 1200 (default) or 2000 (stepper review A). */
  fuseDuration?: number
  className?: string
}

const defaultSteps = ['Vendors', 'Brands', 'Presets', 'Review']

/** Step and line states come from currentStep and reachedStep; they're never props. */
function stateOf(step: number, currentStep: number, reached: number): StepState {
  if (step === currentStep) return 'in-progress'
  if (step < currentStep || step <= reached) return 'complete'
  return 'not-started'
}

/*
  The fuse's phases, as fractions of fuseDuration:
  run (0–80%): the check draws, the stroke runs the line and wraps the ring; the next label is already
    bold (it can't animate weight, so it doesn't jump at the end) but still upcoming gray.
  settle (80%): the line underneath turns complete, resting glow on, and the bloom swells onto it.
  arrive (90%, the ring closed): the next node's own ring, fill and dot fade in under the fuse's ring,
    and its label's color eases to active. The fuse goes once the bloom is done.
*/
type FusePhase = 'run' | 'settle' | 'arrive'

interface Fuse {
  from: number
  to: number
  id: number
  phase: FusePhase
}

/* One easing for line + wrap, so the stroke keeps its momentum and settles as it closes the ring (spec). */
const fuseEase = [0.22, 1, 0.36, 1] as const

/*
  The charge-up, "the fuse" (design/specs/stepper.md, revised Oct 19). On a first-time Next, one citron
  stroke leaves the step just finished, runs down the line and wraps clockwise around the next node.
  Timeline, as fractions of fuseDuration: the old ring resolves and its check draws (0–12.5%), the stroke
  runs line + wrap on one curve (12.5–90%), then the tip fades and the glow blooms once (85–100%), and the
  resting state takes over. Never blocks input; a step change mid-fuse jumps to the end. Going Back, or
  Next into a step already reached, just moves the ring. Reduced motion: no fuse, an instant swap.
*/
export function Stepper({ steps = defaultSteps, currentStep = 1, reachedStep, fuseDuration = 1200, className }: StepperProps) {
  const reached = Math.max(currentStep, reachedStep ?? currentStep)
  const reduced = useReducedMotionSetting()

  // What the stepper last showed, to tell a first-time Next from Back or a revisit
  // (React's "adjust state during render" pattern, as in CountTick).
  const [seen, setSeen] = useState({ current: currentStep, reached, changes: 0 })
  const [fuse, setFuse] = useState<Fuse | null>(null)
  if (seen.current !== currentStep || seen.reached !== reached) {
    const firstTime = currentStep === seen.current + 1 && currentStep > seen.reached
    const changes = seen.changes + 1
    setSeen({ current: currentStep, reached, changes })
    setFuse(firstTime && !reduced ? { from: seen.current, to: currentStep, id: changes, phase: 'run' } : null)
  }

  const classes = ['stepper', className].filter(Boolean).join(' ')
  const listRef = useRef<HTMLOListElement>(null)

  return (
    // It only ever sits on the plum stage, so it sets On brand mode itself (as every Figma variant does).
    <nav data-mode="on-brand" aria-label="Progress" className={classes} style={{ '--fuse-duration': `${fuseDuration}ms` } as CSSProperties}>
      <ol ref={listRef} className="stepper__list">
        {steps.map((label, index) => {
          const step = index + 1
          const state = stateOf(step, currentStep, reached)
          // While the fuse runs, the step it's heading to still looks upcoming (a dot, the plain track
          // to its left); the fuse draws its ring, then the resting state takes over.
          const arriving = fuse?.to === step
          const shown: StepState = arriving && fuse.phase !== 'arrive' ? 'not-started' : state
          const lineComplete = step > 1 && step <= reached && (!arriving || fuse.phase !== 'run')
          const bold = shown === 'in-progress' || arriving

          return (
            <li
              key={label}
              className="stepper__step"
              data-state={shown}
              data-line={step === 1 ? undefined : lineComplete ? 'complete' : 'not-started'}
              data-check-draw={fuse?.from === step || undefined}
              aria-current={state === 'in-progress' ? 'step' : undefined}
            >
              <StepNode state={shown} />
              {/* A label, not a heading. */}
              <span className={`stepper__label ${bold ? 'type-stepper-active' : 'type-stepper-inactive'}`}>
                {label}
                {state === 'complete' && <span className="visually-hidden">, completed</span>}
              </span>
            </li>
          )
        })}
      </ol>
      {fuse && (
        <FuseLayer
          key={fuse.id}
          fuse={fuse}
          duration={fuseDuration}
          listRef={listRef}
          onPhase={(phase) => setFuse((f) => (f && f.id === fuse.id ? { ...f, phase } : f))}
          onDone={() => setFuse(null)}
        />
      )}
    </nav>
  )
}

/* The node is decorative: the label and its hidden text carry the meaning. */
function StepNode({ state }: { state: StepState }) {
  return (
    <span className="stepper__node" aria-hidden="true">
      {state === 'complete' && (
        // Check mark, 10×7 with a 2.4px stroke (Figma Stepper step, Complete). pathLength lets it draw on.
        <svg className="stepper__check" width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path d="M1 3.5 3.8 6 9 1" pathLength={1} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  )
}

/*
  The fuse: a decorative SVG over the stepper that plays once and unmounts. The path is measured from
  the two nodes' centers: from the finished node's edge, along the line, then clockwise around the next
  node from 9 o'clock (ring radius 9: a 2px stroke inside the 20px node).
*/
function FuseLayer({ fuse, duration, listRef, onPhase, onDone }: { fuse: Fuse; duration: number; listRef: React.RefObject<HTMLOListElement | null>; onPhase: (phase: FusePhase) => void; onDone: () => void }) {
  const [path, setPath] = useState<{ d: string; width: number } | null>(null)

  // Settle at 80%: the resting line and glow switch on under the bloom (one rise, no dip; spec: "blooms
  // once and eases back to the resting glow"). Arrive at 90%: the node's own ring fades in under the
  // fuse's, which stays until the bloom ends, so the handover never shows a gap.
  useEffect(() => {
    const settle = window.setTimeout(() => onPhase('settle'), duration * 0.8)
    const arrive = window.setTimeout(() => onPhase('arrive'), duration * 0.9)
    return () => {
      window.clearTimeout(settle)
      window.clearTimeout(arrive)
    }
    // Once per fuse.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const nodes = list.querySelectorAll<HTMLElement>('.stepper__node')
    const box = list.getBoundingClientRect()
    const center = (i: number) => {
      const r = nodes[i - 1].getBoundingClientRect()
      return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top }
    }
    const a = center(fuse.from)
    const b = center(fuse.to)
    const radius = 9
    setPath({
      d: `M ${a.x + 10} ${b.y} L ${b.x - radius} ${b.y} A ${radius} ${radius} 0 1 1 ${b.x + radius} ${b.y} A ${radius} ${radius} 0 1 1 ${b.x - radius} ${b.y}`,
      width: box.width,
    })
  }, [fuse, listRef])

  if (!path) return null
  const s = duration / 1000
  const stroke = { delay: s * 0.125, duration: s * 0.775, ease: fuseEase }

  return (
    <svg className="stepper__fuse" width={path.width} height={20} aria-hidden="true" focusable="false">
      <defs>
        <filter id={`fuse-glow-${fuse.id}`} x="-10%" y="-200%" width="120%" height="500%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      {/* The glow blooms once as the ring closes, then fades back onto the resting glow already under it. */}
      <motion.path
        d={path.d}
        className="stepper__fuse-bloom"
        filter={`url(#fuse-glow-${fuse.id})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        // Swells over a third of the fuse (~400ms at 1200), peaks at 70%, settles onto the resting glow.
        transition={{ delay: s * 0.8, duration: s / 3, times: [0, 0.4, 1], ease: 'easeInOut' }}
        onAnimationComplete={onDone}
      />
      {/* The stroke: 2px end to end, the same as the complete line it hands over to. */}
      <motion.path d={path.d} className="stepper__fuse-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={stroke} />
      {/* The bright tip (Citron/100) leads the stroke, then fades as it settles. */}
      <motion.path
        d={path.d}
        className="stepper__fuse-tip"
        initial={{ pathLength: 0.05, pathOffset: 0, opacity: 0 }}
        animate={{ pathOffset: 0.95, opacity: [1, 1, 0] }}
        transition={{ pathOffset: stroke, opacity: { delay: s * 0.125, duration: s * 0.875, times: [0, 0.85, 1] } }}
      />
    </svg>
  )
}
