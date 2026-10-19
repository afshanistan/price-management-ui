import { useEffect, useId, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion, useIsPresent } from 'motion/react'
import type { Brand } from '../../../data/brands'
import type { Vendor } from '../../../data/vendors'
import { useReducedMotionSetting } from '../../../foundations/useReducedMotionSetting'
import { duration, ease } from '../../../styles/motion'
import { CountTick } from '../../atoms/CountTick'
import { BrandChip } from '../../molecules/BrandChip'
import { EmptySelection } from '../../molecules/EmptySelection'
import { SelectionSummary } from '../../molecules/SelectionSummary'
import { VendorCoverageTile } from '../../molecules/VendorCoverageTile'
import './SelectedBrandsPanel.css'

export interface SelectedBrandsPanelProps {
  /** A–Z (the card sorts them). */
  vendors: Vendor[]
  /** All brands per vendor, in list order (for "N of M" and "All N brands"). */
  brandsByVendor: Record<string, Brand[]>
  selectedIds: Set<string>
  /** A brand chip's ×. */
  onRemove: (brandId: string) => void
  /** The "All N brands" chip's ×. */
  onRemoveVendor: (vendorId: string) => void
  className?: string
}

/*
  The basket: summary, coverage strip, chips by vendor. State is derived:
  nothing selected = Empty; some vendor has none = Incomplete; else With selections.

  Motion (decision log, "Step 2 motion"): chips fade and scale in (fast) and the others glide; a removed
  chip fades and shrinks while the rest close the gap. Swaps are fade-throughs, never cross-fades:
  the panel's empty state ↔ the groups, and inside a group: its inline empty ↔ chips ↔ "All N brands".
*/
export function SelectedBrandsPanel({ vendors, brandsByVendor, selectedIds, onRemove, onRemoveVendor, className }: SelectedBrandsPanelProps) {
  const titleId = useId()
  const chipsRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotionSetting()
  // After a removal: where focus goes once the chips re-render.
  const focusAfterRemove = useRef<{ vendorId: string; index: number } | null>(null)
  const previousIds = useRef(selectedIds)

  const perVendor = vendors.map((vendor) => {
    const all = brandsByVendor[vendor.id] ?? []
    return { vendor, all, selected: all.filter((brand) => selectedIds.has(brand.id)) }
  })
  const total = perVendor.reduce((sum, v) => sum + v.selected.length, 0)
  const isComplete = perVendor.every((v) => v.selected.length > 0)

  // Next chip's ×, else the previous one, else the vendor's H3 (not specified in Figma; docs/open-questions.md).
  // Leaving chips are skipped: they stay in the DOM while they animate out.
  useEffect(() => {
    const target = focusAfterRemove.current
    if (!target) return
    focusAfterRemove.current = null
    const group = chipsRef.current?.querySelector<HTMLElement>(`[data-vendor="${CSS.escape(target.vendorId)}"]`)
    const buttons = group?.querySelectorAll<HTMLElement>('li:not([data-exiting]) .brand-chip__remove')
    const next = buttons?.[target.index] ?? buttons?.[target.index - 1]
    if (next) next.focus()
    else group?.querySelector<HTMLElement>('h3')?.focus()
  }, [selectedIds])

  // A new chip in a scrolled panel: bring its group into view (nearest, not the top: the order is A–Z).
  useEffect(() => {
    const added = [...selectedIds].find((id) => !previousIds.current.has(id))
    previousIds.current = selectedIds
    if (!added) return
    const vendorId = vendors.find((vendor) => brandsByVendor[vendor.id]?.some((brand) => brand.id === added))?.id
    if (!vendorId) return
    const frame = requestAnimationFrame(() =>
      chipsRef.current
        ?.querySelector<HTMLElement>(`[data-vendor="${CSS.escape(vendorId)}"]`)
        ?.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' }),
    )
    return () => cancelAnimationFrame(frame)
  }, [selectedIds, vendors, brandsByVendor, reduced])

  function removeChip(vendorId: string, index: number, remove: () => void) {
    focusAfterRemove.current = { vendorId, index }
    remove()
  }

  return (
    <aside aria-labelledby={titleId} className={className ? `selected-brands-panel ${className}` : 'selected-brands-panel'}>
      <SelectionSummary title="Selected brands" titleId={titleId} count={total} status={isComplete ? 'complete' : 'todo'} />

      <ul className="selected-brands-panel__coverage" aria-label="Brand coverage">
        {perVendor.map(({ vendor, all, selected }) => (
          <li key={vendor.id}>
            <VendorCoverageTile vendorName={vendor.name} wordmark={vendor.wordmark} logo={vendor.logo} selectedCount={selected.length} totalCount={all.length} />
          </li>
        ))}
      </ul>

      <hr className="selected-brands-panel__divider" />

      <motion.div ref={chipsRef} layoutScroll className="selected-brands-panel__chips">
        {/* Fade-through: the empty state and the groups never share the screen. */}
        <AnimatePresence initial={false} mode="wait">
          {total === 0 ? (
            <Fade key="empty" className="selected-brands-panel__empty-wrap">
              <EmptySelection
                pictogram="brand"
                message="No brands selected yet"
                helper="Check brands on the left. Each vendor needs at least one."
                className="selected-brands-panel__empty"
              />
            </Fade>
          ) : (
            <Fade key="groups" className="selected-brands-panel__groups">
              {perVendor.map(({ vendor, all, selected }) => {
                // Every brand selected (and more than one): one "All N brands" chip instead.
                const showAll = selected.length === all.length && all.length > 1
                const content = selected.length === 0 ? 'empty' : showAll ? 'all' : 'chips'
                return (
                  <motion.section
                    key={vendor.id}
                    layout="position"
                    transition={{ layout: { duration: duration.layout, ease: ease.inOut } }}
                    data-vendor={vendor.id}
                    className="selected-brands-panel__vendor"
                  >
                    <div className="selected-brands-panel__vendor-label">
                      {/* An H3, styled small; focus lands here when its last chip goes. */}
                      <h3 tabIndex={-1} className="selected-brands-panel__vendor-name">{vendor.name}</h3>
                      <span className="selected-brands-panel__vendor-count">
                        <span className="visually-hidden">{selected.length} of {all.length}</span>
                        <span aria-hidden="true">
                          <CountTick value={selected.length} /> of {all.length}
                        </span>
                      </span>
                    </div>
                    {/* Fade-through inside the group: inline empty ↔ chips ↔ "All N brands". */}
                    <AnimatePresence initial={false} mode="wait">
                      {content === 'empty' ? (
                        <Fade key="empty">
                          <EmptySelection layout="inline" pictogram="brand" message={`No ${vendor.name} brands yet`} />
                        </Fade>
                      ) : content === 'all' ? (
                        <Fade key="all" leave="shrink">
                          <ul className="selected-brands-panel__chip-list">
                            <li className="selected-brands-panel__chip-all">
                              <BrandChip
                                type="all"
                                label={`All ${all.length} brands`}
                                removeLabel={`Remove all ${vendor.name} brands`}
                                onRemove={() => removeChip(vendor.id, 0, () => onRemoveVendor(vendor.id))}
                              />
                            </li>
                          </ul>
                        </Fade>
                      ) : (
                        <Fade key="chips" leave="shrink">
                          <ul className="selected-brands-panel__chip-list">
                            <AnimatePresence initial={false} mode="popLayout">
                              {selected.map((brand, index) => (
                                <Chip key={brand.id}>
                                  <BrandChip
                                    label={brand.name}
                                    removeLabel={`Remove ${brand.name}`}
                                    onRemove={() => removeChip(vendor.id, index, () => onRemove(brand.id))}
                                  />
                                </Chip>
                              ))}
                            </AnimatePresence>
                          </ul>
                        </Fade>
                      )}
                    </AnimatePresence>
                  </motion.section>
                )
              })}
            </Fade>
          )}
        </AnimatePresence>
      </motion.div>
    </aside>
  )
}

/* One part of a fade-through: fades in (base, ease-out); fades out (fast, ease-in), shrinking toward its
   start edge when it holds chips, so the last chip leaves like any other. Inert while it leaves. */
function Fade({ className, leave, children }: { className?: string; leave?: 'shrink'; children: ReactNode }) {
  const isPresent = useIsPresent()
  return (
    <motion.div
      className={className}
      inert={!isPresent}
      style={{ transformOrigin: 'left center' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: duration.base, ease: ease.out } }}
      exit={{ opacity: 0, scale: leave === 'shrink' ? 0.96 : 1, transition: { duration: duration.fast, ease: ease.in } }}
    >
      {children}
    </motion.div>
  )
}

/* One brand chip: fades and scales in (fast), glides when others come and go, fades and shrinks out.
   Inert while it leaves, so its × can't be pressed twice and focus skips it. */
function Chip({ children }: { children: ReactNode }) {
  const isPresent = useIsPresent()
  return (
    <motion.li
      data-exiting={isPresent ? undefined : ''}
      inert={!isPresent}
      layout
      transition={{ layout: { duration: duration.layout, ease: ease.inOut } }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: duration.fast, ease: ease.out } }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: duration.fast, ease: ease.in } }}
    >
      {children}
    </motion.li>
  )
}
