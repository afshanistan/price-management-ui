import { StatusMark } from '../../atoms/StatusMark'
import { Tag } from '../Tag'
import './SummaryStat.css'

export type SummaryStatStatus = 'complete' | 'optional'

export interface SummaryStatProps {
  /** "5", "20", "1 of 3". */
  value: string
  /** "Vendors", "Brands", "Presets set". */
  label: string
  /** complete = citron check; optional = the Optional tag (presets always, whatever the count). */
  status: SummaryStatStatus
  /** What screen readers hear instead: "5 vendors, complete" / "1 of 3 presets set, optional". */
  srLabel: string
  className?: string
}

/** A big number for Review's summary strip. Not interactive. */
export function SummaryStat({ value, label, status, srLabel, className }: SummaryStatProps) {
  return (
    <div className={className ? `summary-stat ${className}` : 'summary-stat'}>
      <span className="visually-hidden">{srLabel}</span>
      <span className="summary-stat__value" aria-hidden="true">
        {value}
      </span>
      <span className="summary-stat__meta" aria-hidden="true">
        <span className="summary-stat__label type-body-sm">{label}</span>
        {status === 'complete' ? <StatusMark status="complete" bordered={false} className="summary-stat__check" /> : <Tag>Optional</Tag>}
      </span>
    </div>
  )
}
