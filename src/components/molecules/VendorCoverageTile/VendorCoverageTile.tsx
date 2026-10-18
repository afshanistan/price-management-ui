import { StatusMark } from '../../atoms/StatusMark'
import './VendorCoverageTile.css'

export interface VendorCoverageTileProps {
  /** "Cargill", for the hidden text. */
  vendorName: string
  /** Placeholder wordmark ("CGL"), from vendors.ts. */
  wordmark: string
  /** For the hidden text; > 0 means complete. */
  selectedCount: number
  totalCount: number
  className?: string
}

/** Informational only: not a button, not a filter. Status is derived from selectedCount. */
export function VendorCoverageTile({ vendorName, wordmark, selectedCount, totalCount, className }: VendorCoverageTileProps) {
  const status = selectedCount > 0 ? 'complete' : 'todo'

  return (
    <div className={className ? `vendor-coverage-tile ${className}` : 'vendor-coverage-tile'} data-status={status}>
      <span className="vendor-coverage-tile__wordmark type-label-sm" aria-hidden="true">
        {wordmark}
      </span>
      <StatusMark status={status} className="vendor-coverage-tile__mark" />
      <span className="visually-hidden">
        {`${vendorName}, ${selectedCount} of ${totalCount} ${totalCount === 1 ? 'brand' : 'brands'} selected, ${status === 'complete' ? 'complete' : 'to do'}`}
      </span>
    </div>
  )
}
