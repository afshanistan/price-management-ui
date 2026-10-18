import './StatusMark.css'

export type StatusMarkStatus = 'complete' | 'todo'

export interface StatusMarkProps {
  status: StatusMarkStatus
  className?: string
}

/** Complete (citron + check) or to do (dashed ring). Always decorative: the status is in nearby text. */
export function StatusMark({ status, className }: StatusMarkProps) {
  const classes = ['status-mark', `status-mark--${status}`, className].filter(Boolean).join(' ')

  return (
    <span className={classes} aria-hidden="true">
      {status === 'complete' && (
        // Check, 7×5 with a 1.75px stroke (Figma Status mark, Complete). Not one of the 21 icons.
        <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
          <path d="M0.9 2.4 2.8 4.1 6.1 0.9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  )
}
