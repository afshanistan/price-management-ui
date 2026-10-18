import { CountBadge, type CountBadgeStatus } from '../CountBadge'
import './SelectionSummary.css'

export interface SelectionSummaryProps {
  /** "Selected brands". */
  title: string
  count: number
  /** Passed in: the card computes it ("every vendor has ≥1 brand"), not count > 0. */
  status: CountBadgeStatus
  /** Id for the H2, so the panel can be labelled by it. */
  titleId?: string
  className?: string
}

/** The panel title (an H2) and its CountBadge. */
export function SelectionSummary({ title, count, status, titleId, className }: SelectionSummaryProps) {
  return (
    <div className={className ? `selection-summary ${className}` : 'selection-summary'}>
      <h2 id={titleId} className="selection-summary__title">
        {title}
      </h2>
      <CountBadge status={status} aria-label={`${count} ${count === 1 ? 'brand' : 'brands'} selected`}>
        {count}
      </CountBadge>
    </div>
  )
}
