import { useId } from 'react'
import type { IconName } from '../../atoms/Icon'
import { Button } from '../../molecules/Button'
import './WizardNavigation.css'

/** TEMPORARY until Will picks (docs/open-questions.md, "Disabled Next"). Remove the losing option. */
export type BlockedNext = 'disabled' | 'aria-disabled'

export interface WizardNavigationProps {
  /** Omit on step 1. The left slot stays, so Next never moves. */
  back?: { label: string; onPress: () => void }
  /** Label names the destination. `icon` defaults to arrow-right; step 4 uses download. */
  next: { label: string; icon?: IconName; onPress: () => void }
  /** Derived from the step's data in the app. False blocks Next and shows the hint. */
  canContinue: boolean
  /** Shown beside the blocked Next: "Add at least one vendor to continue." */
  hint?: string
  /**
   * TEMPORARY. How a blocked Next is disabled:
   * - 'disabled': native disabled. Simple, but screen readers may skip it and its hint.
   * - 'aria-disabled': stays focusable so the hint is read; presses are ignored.
   */
  blockedNext?: BlockedNext
}

export function WizardNavigation({ back, next, canContinue, hint, blockedNext = 'aria-disabled' }: WizardNavigationProps) {
  const hintId = useId()
  const blocked = !canContinue
  const showHint = blocked && Boolean(hint)

  const blockedProps =
    !blocked ? {}
    : blockedNext === 'disabled' ? { isDisabled: true }
    : { 'aria-disabled': true as const }

  return (
    // Rendered outside <main>.
    <footer className="wizard-navigation">
      {/* The left slot is always there, so Next stays on the right edge. */}
      <div className="wizard-navigation__left">
        {back && (
          <Button size="xlarge" hierarchy="secondary" leadingIcon="arrow-left" onPress={back.onPress}>
            {back.label}
          </Button>
        )}
      </div>
      <div className="wizard-navigation__right">
        {showHint && (
          <p id={hintId} className="wizard-navigation__hint">
            {hint}
          </p>
        )}
        <Button
          size="xlarge"
          hierarchy="primary"
          trailingIcon={next.icon ?? 'arrow-right'}
          aria-describedby={showHint ? hintId : undefined}
          // Blocked presses do nothing, whichever way Next is disabled.
          onPress={blocked ? undefined : next.onPress}
          {...blockedProps}
        >
          {next.label}
        </Button>
      </div>
    </footer>
  )
}
