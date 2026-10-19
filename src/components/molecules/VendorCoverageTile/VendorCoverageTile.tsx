import { AnimatePresence, motion } from 'motion/react'
import { duration, ease } from '../../../styles/motion'
import { StatusMark } from '../../atoms/StatusMark'
import { MonoLogo } from '../../atoms/VendorLogo'
import type { VendorLogoFiles } from '../../../data/vendors'
import './VendorCoverageTile.css'

export interface VendorCoverageTileProps {
  /** "Cargill", for the hidden text. */
  vendorName: string
  /** Wordmark ("CGL"): the fallback when there's no single-color logo. */
  wordmark: string
  /** The vendor's logo files. The tile shows the single-color logo (ink: docs/open-questions.md, "Coverage tile logo"). */
  logo?: VendorLogoFiles
  /** For the hidden text; > 0 means complete. */
  selectedCount: number
  totalCount: number
  className?: string
}

/** Informational only: not a button, not a filter. Status is derived from selectedCount. */
export function VendorCoverageTile({ vendorName, wordmark, logo, selectedCount, totalCount, className }: VendorCoverageTileProps) {
  const status = selectedCount > 0 ? 'complete' : 'todo'

  return (
    <div className={className ? `vendor-coverage-tile ${className}` : 'vendor-coverage-tile'} data-status={status}>
      {logo?.mono ? (
        <MonoLogo src={logo.mono} className="vendor-coverage-tile__logo" />
      ) : (
        <span className="vendor-coverage-tile__wordmark type-label-sm" aria-hidden="true">
          {wordmark}
        </span>
      )}
      {/* To do ↔ complete: a quick fade in place (fast), no draw-in or glow. */}
      <AnimatePresence initial={false}>
        <motion.span
          key={status}
          className="vendor-coverage-tile__mark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: duration.fast, ease: ease.out } }}
          exit={{ opacity: 0, transition: { duration: duration.fast, ease: ease.in } }}
        >
          <StatusMark status={status} />
        </motion.span>
      </AnimatePresence>
      <span className="visually-hidden">
        {`${vendorName}, ${selectedCount} of ${totalCount} ${totalCount === 1 ? 'brand' : 'brands'} selected, ${status === 'complete' ? 'complete' : 'to do'}`}
      </span>
    </div>
  )
}
