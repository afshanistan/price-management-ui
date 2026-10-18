import './Stepper.css'

export type StepperStep = 1 | 2 | 3 | 4
type StepState = 'complete' | 'in-progress' | 'not-started'

export interface StepperProps {
  /** Noun labels. The stepper names the place; the card title says what to do there. */
  steps?: string[]
  /** Steps before it are complete, steps after it not started. */
  currentStep?: StepperStep
  className?: string
}

const defaultSteps = ['Vendors', 'Brands', 'Presets', 'Review']

/** Step and line states come from currentStep; they're never props. */
function stateOf(step: number, currentStep: number): StepState {
  if (step < currentStep) return 'complete'
  if (step === currentStep) return 'in-progress'
  return 'not-started'
}

export function Stepper({ steps = defaultSteps, currentStep = 1, className }: StepperProps) {
  const classes = ['stepper', className].filter(Boolean).join(' ')

  return (
    // It only ever sits on the plum stage, so it sets On brand mode itself (as every Figma variant does).
    <nav data-mode="on-brand" aria-label="Progress" className={classes}>
      <ol className="stepper__list">
        {steps.map((label, index) => {
          const step = index + 1
          const state = stateOf(step, currentStep)
          // The line to this step's left is complete once the step before it is done.
          const lineComplete = step > 1 && currentStep >= step

          return (
            <li
              key={label}
              className="stepper__step"
              data-state={state}
              data-line={step === 1 ? undefined : lineComplete ? 'complete' : 'not-started'}
              aria-current={state === 'in-progress' ? 'step' : undefined}
            >
              <StepNode state={state} />
              {/* A label, not a heading. */}
              <span className={`stepper__label ${state === 'in-progress' ? 'type-stepper-active' : 'type-stepper-inactive'}`}>
                {label}
                {state === 'complete' && <span className="visually-hidden">, completed</span>}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/* The node is decorative: the label and its hidden text carry the meaning. */
function StepNode({ state }: { state: StepState }) {
  return (
    <span className="stepper__node" aria-hidden="true">
      {state === 'complete' && (
        // Check mark, 10×7 with a 2.4px stroke (Figma Stepper step, Complete).
        <svg className="stepper__check" width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path d="M1 3.5 3.8 6 9 1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  )
}
