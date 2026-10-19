import { OverlayArrow, Tooltip, TooltipTrigger } from 'react-aria-components'
import { formatEsn } from '../../../data/vendors'
import { CountTick } from '../../atoms/CountTick'
import { IconButton } from '../IconButton'
import './ReviewRow.css'

export type ReviewRowType = 'vendor' | 'brand'

export interface ReviewRowProps {
  type: ReviewRowType
  /** Vendor or brand name. */
  name: string
  /** Vendor: "4 brands" / "1 brand". */
  brandCount?: number
  /** Vendor: the bare number; shown as "ESN-70441642", like step 1 (step 4 review R7). */
  esn?: string
  /**
   * Brand: removes it from the template, from Review (step 4 review R10). The trash is always
   * visible: quiet at rest, red on hover. Omit for a read-only row.
   */
  onRemove?: () => void
  /**
   * Brand: why it can't be removed ("Each vendor needs a brand", on a vendor's last brand, R10a).
   * The trash looks disabled but stays focusable (aria-disabled, like the blocked Next), so the
   * tooltip shows on hover and keyboard focus and is read as its description.
   */
  removeBlockedReason?: string
  /** 'div' when the list wraps each row in its own (animated) list item. */
  as?: 'li' | 'div'
  className?: string
}

/** A row in Review's lists: vendors read-only; brands with a Remove button. */
export function ReviewRow({ type, name, brandCount = 0, esn, onRemove, removeBlockedReason, as: Element = 'li', className }: ReviewRowProps) {
  const blocked = Boolean(removeBlockedReason)
  const remove = onRemove && (
    <IconButton
      icon="trash"
      tone="destructive"
      className="review-row__remove"
      aria-label={`Remove ${name}`}
      aria-disabled={blocked || undefined}
      onPress={blocked ? undefined : onRemove}
    />
  )

  return (
    <Element className={['review-row', `review-row--${type}`, className].filter(Boolean).join(' ')}>
      <span className="review-row__names">
        {/* One line with an ellipsis; the full name in the tooltip. Rows show no logo tile (R7). */}
        <span className="review-row__name" title={name}>{name}</span>
        {type === 'vendor' && (
          <span className="review-row__count type-body-sm">
            {/* Ticks when a brand is removed on Review (M5). */}
            <CountTick value={brandCount} /> {brandCount === 1 ? 'brand' : 'brands'}
          </span>
        )}
      </span>
      {type === 'vendor' && esn && <span className="review-row__end type-data-sm">{formatEsn(esn)}</span>}
      {remove && blocked ? (
        // Tooltip look is a stand-in until Figma has one (docs/figma-sync.md, "Tooltip").
        <TooltipTrigger delay={300} closeDelay={0}>
          {remove}
          <Tooltip className="review-row__tooltip" placement="top" offset={6}>
            <OverlayArrow className="review-row__tooltip-arrow">
              <svg width={8} height={4} viewBox="0 0 8 4" aria-hidden="true">
                <path d="M0 0 L4 4 L8 0" />
              </svg>
            </OverlayArrow>
            {removeBlockedReason}
          </Tooltip>
        </TooltipTrigger>
      ) : (
        remove
      )}
    </Element>
  )
}
