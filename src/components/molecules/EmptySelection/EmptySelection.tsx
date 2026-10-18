import { Pictogram, type PictogramType } from '../../atoms/Pictogram'
import './EmptySelection.css'

export type EmptySelectionLayout = 'stacked' | 'inline'

export interface EmptySelectionProps {
  /** Stacked fills a whole panel (step 1); inline is one vendor without brands (step 2). */
  layout?: EmptySelectionLayout
  pictogram?: PictogramType
  /** "No vendors selected yet". */
  message: string
  /** Stacked only: "Search above to add vendors to this template." */
  helper?: string
  className?: string
}

/** A non-interactive placeholder. Plain text; the pictogram is decorative. */
export function EmptySelection({ layout = 'stacked', pictogram = 'vendor', message, helper, className }: EmptySelectionProps) {
  const classes = ['empty-selection', `empty-selection--${layout}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Pictogram type={pictogram} size={24} />
      <p className="empty-selection__message">{message}</p>
      {layout === 'stacked' && helper && <p className="empty-selection__helper">{helper}</p>}
    </div>
  )
}
