import { VendorLogo } from '../../atoms/VendorLogo'
import './ReviewRow.css'

export type ReviewRowType = 'vendor' | 'brand'

export interface ReviewRowProps {
  type: ReviewRowType
  /** Vendor or brand name. */
  name: string
  /** Vendor: the wordmark in the Vendor logo tile. Rows show no logos (decision log, Oct 18). */
  wordmark?: string
  /** Vendor: "4 brands" / "1 brand". */
  brandCount?: number
  /** Vendor: "DEMO-0022". */
  esn?: string
  /** Brand: its vendor's name. */
  vendorName?: string
  className?: string
}

/** A read-only row in Review's lists: a list item with no hover and no focus stop. */
export function ReviewRow({ type, name, wordmark = '', brandCount = 0, esn, vendorName, className }: ReviewRowProps) {
  return (
    <li className={['review-row', `review-row--${type}`, className].filter(Boolean).join(' ')}>
      <span className="review-row__start">
        {type === 'vendor' && <VendorLogo vendor={name} wordmark={wordmark} />}
        <span className="review-row__names">
          {/* One line with an ellipsis; the full name in the tooltip. */}
          <span className="review-row__name" title={name}>{name}</span>
          {type === 'vendor' && (
            <span className="review-row__count type-body-sm">
              {brandCount} {brandCount === 1 ? 'brand' : 'brands'}
            </span>
          )}
        </span>
      </span>
      <span className="review-row__end type-data-sm">{type === 'vendor' ? esn : vendorName}</span>
    </li>
  )
}
