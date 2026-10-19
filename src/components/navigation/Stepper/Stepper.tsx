import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { motion } from 'motion/react'
import { useReducedMotionSetting } from '../../../foundations/useReducedMotionSetting'
import './Stepper.css'

export type StepperStep = 1 | 2 | 3 | 4
type StepState = 'complete' | 'in-progress' | 'not-started'

export interface StepperProps {
  /** Noun labels. The stepper names the place; the card title says what to do there. */
  steps?: string[]
  /**
   * The step you're on: its ring. Steps before it are complete, steps after it not started. Going back
   * (Back, Edit) un-completes the later steps: it's a linear process, so you redo from there
   * (stepper review, Will, Oct 19; replaces Figma 02e "Back from review").
   */
  currentStep?: StepperStep
  /** How long the charge-up ("the fuse") runs on Next, ms. 1200 by default (stepper review A). */
  fuseDuration?: number
  /** How long the reverse runs on Back or Edit, ms. 800 by default: quicker, undoing isn't a moment (review G). */
  unfuseDuration?: number
  className?: string
}

const defaultSteps = ['Vendors', 'Brands', 'Presets', 'Review']

/** Step and line states come from currentStep; they're never props. */
function stateOf(step: number, currentStep: number): StepState {
  if (step === currentStep) return 'in-progress'
  if (step < currentStep) return 'complete'
  return 'not-started'
}

/*
  Forward ("the fuse", Next), as fractions of fuseDuration:
  run (0–80%): the old ring resolves and its check draws, the stroke runs the line and wraps the next
    ring; the next label is already bold (weight can't animate) but still upcoming gray.
  settle (80%): the line underneath turns complete, resting glow on, and the bloom swells onto it.
  arrive (90%, the ring closed): the next node's own ring, fill and dot fade in under the fuse's ring;
    its label's color eases to active. The fuse goes once the bloom is done.

  Back ("the reverse", Back or Edit, one step or several), the fuse played backwards, without a bloom:
  run: the completed path from the step you're going to up to the old ring is drawn over the plain
    track, then retracts: it unwinds the old ring counter-clockwise, then pulls back down the line. The
    old step is already a dot underneath, its label easing to gray; each step it passes un-checks.
  arrive (the stroke is gone): the landing step's check undraws and its ring, fill and dot fade in; the
    old label's weight drops last, while it's gray.
*/
type FusePhase = 'run' | 'settle' | 'arrive'

interface Fuse {
  direction: 'forward' | 'back'
  /** The step you left. */
  from: number
  /** The step you're going to. */
  to: number
  id: number
  phase: FusePhase
  /** Back: the steps the retracting stroke has passed (they un-check). */
  passed: number[]
}

/* One easing for line + wrap, so the stroke keeps its momentum and settles as it closes the ring (spec). */
const fuseEase = [0.22, 1, 0.36, 1] as const
/* The reverse: eases out of the ring and into the landing step, a smooth pull back. */
const unfuseEase = [0.65, 0, 0.35, 1] as const

/*
  The stepper. On Next, the fuse (design/specs/stepper.md, revised Oct 19); on Back or Edit, the reverse.
  Never blocks input; a step change mid-animation jumps to the new end state (and plays the new one).
  Reduced motion: no fuse, an instant swap.
*/
export function Stepper({ steps = defaultSteps, currentStep = 1, fuseDuration = 1200, unfuseDuration = 800, className }: StepperProps) {
  const reduced = useReducedMotionSetting()

  // What the stepper last showed, to tell Next from Back (React's "adjust state during render" pattern).
  const [seen, setSeen] = useState({ current: currentStep, changes: 0 })
  const [fuse, setFuse] = useState<Fuse | null>(null)
  if (seen.current !== currentStep) {
    const changes = seen.changes + 1
    const direction = currentStep === seen.current + 1 ? 'forward' : currentStep < seen.current ? 'back' : null
    setSeen({ current: currentStep, changes })
    setFuse(direction && !reduced ? { direction, from: seen.current, to: currentStep, id: changes, phase: 'run', passed: [] } : null)
  }

  const classes = ['stepper', className].filter(Boolean).join(' ')
  const listRef = useRef<HTMLOListElement>(null)
  const update = (id: number, change: Partial<Fuse>) => setFuse((f) => (f && f.id === id ? { ...f, ...change } : f))

  return (
    // It only ever sits on the plum stage, so it sets On brand mode itself (as every Figma variant does).
    <nav
      data-mode="on-brand"
      aria-label="Progress"
      className={classes}
      style={{ '--fuse-duration': `${fuseDuration}ms` } as CSSProperties}
    >
      <ol ref={listRef} className="stepper__list">
        {steps.map((label, index) => {
          const step = index + 1
          const state = stateOf(step, currentStep)
          const look = lookOf(step, state, currentStep, fuse)

          return (
            <li
              key={label}
              className="stepper__step"
              data-state={look.state}
              data-line={step === 1 ? undefined : look.lineComplete ? 'complete' : 'not-started'}
              data-check-draw={(fuse?.direction === 'forward' && fuse.from === step) || undefined}
              aria-current={state === 'in-progress' ? 'step' : undefined}
            >
              <StepNode state={look.state} undraw={look.undraw} />
              {/* A label, not a heading. */}
              <span className={`stepper__label ${look.bold ? 'type-stepper-active' : 'type-stepper-inactive'}`}>
                {label}
                {state === 'complete' && <span className="visually-hidden">, completed</span>}
              </span>
            </li>
          )
        })}
      </ol>
      {fuse?.direction === 'forward' && (
        <FuseLayer key={fuse.id} fuse={fuse} duration={fuseDuration} listRef={listRef} onPhase={(phase) => update(fuse.id, { phase })} onDone={() => setFuse(null)} />
      )}
      {fuse?.direction === 'back' && (
        <UnfuseLayer
          key={fuse.id}
          fuse={fuse}
          duration={unfuseDuration}
          listRef={listRef}
          onPass={(passed) => update(fuse.id, { passed })}
          onArrive={() => update(fuse.id, { phase: 'arrive' })}
          onDone={() => setFuse(null)}
        />
      )}
    </nav>
  )
}

/*
  What a step looks like right now: its resting state, or a moment in the fuse or the reverse.
  Screen readers always get the resting state (aria-current, ", completed").
*/
function lookOf(step: number, state: StepState, currentStep: number, fuse: Fuse | null) {
  const resting = { state, lineComplete: step > 1 && step <= currentStep, bold: state === 'in-progress', undraw: false }
  if (!fuse) return resting

  if (fuse.direction === 'forward') {
    if (step !== fuse.to) return resting
    // The step it's heading to looks upcoming (a dot, the plain track) until the ring has closed.
    return {
      state: fuse.phase === 'arrive' ? state : ('not-started' as StepState),
      lineComplete: fuse.phase !== 'run',
      bold: true,
      undraw: false,
    }
  }

  // Back: everything from the landing step up to the old one shows the plain track; the stroke covers it.
  const { from, to, passed, phase } = fuse
  const lineComplete = step > 1 && step <= to
  if (step === to) {
    // Still complete until the stroke has pulled back to it; then its check undraws and its ring fades in.
    return { state: phase === 'arrive' ? state : ('complete' as StepState), lineComplete, bold: true, undraw: phase === 'arrive' }
  }
  if (step > to && step < from) {
    const reverted = passed.includes(step)
    return { state: reverted ? ('not-started' as StepState) : ('complete' as StepState), lineComplete, bold: false, undraw: reverted }
  }
  if (step === from) {
    // Already a dot under the unwinding ring; its label eases to gray, and drops its weight last.
    return { state: 'not-started' as StepState, lineComplete, bold: phase !== 'arrive', undraw: false }
  }
  return { ...resting, lineComplete }
}

/* The node is decorative: the label and its hidden text carry the meaning. */
function StepNode({ state, undraw }: { state: StepState; undraw?: boolean }) {
  return (
    <span className="stepper__node" aria-hidden="true">
      {(state === 'complete' || undraw) && (
        // Check mark, 10×7 with a 2.4px stroke (Figma Stepper step, Complete). pathLength lets it draw on and off.
        <svg className={undraw ? 'stepper__check stepper__check--undraw' : 'stepper__check'} width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path d="M1 3.5 3.8 6 9 1" pathLength={1} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  )
}

/*
  The path the fuse runs and the reverse retracts: from the lower step's node edge, along the line, then
  clockwise around the higher step's node from 9 o'clock (ring radius 9: a 2px stroke inside the 20px
  node). Measured from the nodes' centers. Also: where along it (0–1) each step in between sits.
*/
function measurePath(list: HTMLOListElement, low: number, high: number) {
  const nodes = list.querySelectorAll<HTMLElement>('.stepper__node')
  const box = list.getBoundingClientRect()
  const center = (i: number) => {
    const r = nodes[i - 1].getBoundingClientRect()
    return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top }
  }
  const a = center(low)
  const b = center(high)
  const radius = 9
  const start = a.x + 10
  const lineLength = b.x - radius - start
  const total = lineLength + 2 * Math.PI * radius
  const stops: Record<number, number> = {}
  for (let step = low + 1; step < high; step++) stops[step] = (center(step).x - start) / total
  return {
    d: `M ${start} ${b.y} L ${b.x - radius} ${b.y} A ${radius} ${radius} 0 1 1 ${b.x + radius} ${b.y} A ${radius} ${radius} 0 1 1 ${b.x - radius} ${b.y}`,
    width: box.width,
    stops,
  }
}

type Measured = ReturnType<typeof measurePath>

/* The fuse: a decorative SVG over the stepper that plays once and unmounts. */
function FuseLayer({ fuse, duration, listRef, onPhase, onDone }: { fuse: Fuse; duration: number; listRef: React.RefObject<HTMLOListElement | null>; onPhase: (phase: FusePhase) => void; onDone: () => void }) {
  const [path, setPath] = useState<Measured | null>(null)

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
    if (listRef.current) setPath(measurePath(listRef.current, fuse.from, fuse.to))
  }, [fuse.from, fuse.to, listRef])

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

/*
  The reverse: the completed path, at full length over the plain track with its resting glow, retracts
  in one pull over 80% of the duration (one step back or several). As it passes a step, that step
  un-checks; when it's gone, the landing step arrives, and the layer unmounts once that has faded in.
*/
function UnfuseLayer({
  fuse,
  duration,
  listRef,
  onPass,
  onArrive,
  onDone,
}: {
  fuse: Fuse
  duration: number
  listRef: React.RefObject<HTMLOListElement | null>
  onPass: (passed: number[]) => void
  onArrive: () => void
  onDone: () => void
}) {
  const [path, setPath] = useState<Measured | null>(null)
  const passed = useRef<number[]>([])

  useLayoutEffect(() => {
    if (listRef.current) setPath(measurePath(listRef.current, fuse.to, fuse.from))
  }, [fuse.from, fuse.to, listRef])

  if (!path) return null
  const s = duration / 1000
  const pull = { duration: s * 0.8, ease: unfuseEase }

  const arrive = () => {
    onArrive()
    // Long enough for the landing ring and the label colors to fade in (base).
    window.setTimeout(onDone, Math.max(200, duration * 0.2))
  }

  return (
    <svg className="stepper__fuse" width={path.width} height={20} aria-hidden="true" focusable="false">
      <defs>
        <filter id={`unfuse-glow-${fuse.id}`} x="-10%" y="-200%" width="120%" height="500%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      {/* The glow dims with the line: it retracts with the stroke. No bloom: going back isn't a moment. */}
      <motion.path
        d={path.d}
        className="stepper__fuse-glow"
        filter={`url(#unfuse-glow-${fuse.id})`}
        initial={{ pathLength: 1 }}
        animate={{ pathLength: 0 }}
        transition={pull}
      />
      <motion.path
        d={path.d}
        className="stepper__fuse-stroke"
        initial={{ pathLength: 1 }}
        animate={{ pathLength: 0 }}
        transition={pull}
        onUpdate={(latest) => {
          const length = Number(latest.pathLength)
          const now = Object.entries(path.stops)
            .filter(([, at]) => length <= at)
            .map(([step]) => Number(step))
          if (now.length !== passed.current.length) {
            passed.current = now
            onPass(now)
          }
        }}
        onAnimationComplete={arrive}
      />
    </svg>
  )
}
