import { CountTick } from '../../atoms/CountTick'
import { StatusMark } from '../../atoms/StatusMark'
import { Tag } from '../Tag'
import './SummaryStat.css'

export type SummaryStatStatus = 'complete' | 'optional'

export interface SummaryStatProps {
  /** 5, 20, 2. A number ticks when it changes (a brand removed on Review, M5). */
  value: number | string
  /** Presets: "of 3" after the value, smaller and subtle, so the number leads (step 4 review R5). */
  total?: number
  /** "Vendor" / "Vendors", "Brands", "Presets": the card matches it to the count (R3, R4). */
  label: string
  /** complete = citron check; optional = the Optional tag (presets always, whatever the count). */
  status: SummaryStatStatus
  /** What screen readers hear instead: "5 vendors, complete" / "2 of 3 presets set, optional". */
  srLabel: string
  className?: string
}

/** A big number for Review's summary strip. Not interactive. */
export function SummaryStat({ value, total, label, status, srLabel, className }: SummaryStatProps) {
  return (
    <div className={className ? `summary-stat ${className}` : 'summary-stat'}>
      <span className="visually-hidden">{srLabel}</span>
      <span className="summary-stat__value" aria-hidden="true">
        {typeof value === 'number' ? <CountTick value={value} /> : value}
        {total !== undefined && <span className="summary-stat__total"> of {total}</span>}
      </span>
      <span className="summary-stat__meta" aria-hidden="true">
        <span className="summary-stat__label type-body-sm">{label}</span>
        {status === 'complete' ? <StatusMark status="complete" bordered={false} className="summary-stat__check" /> : <Tag>Optional</Tag>}
      </span>
    </div>
  )
}
