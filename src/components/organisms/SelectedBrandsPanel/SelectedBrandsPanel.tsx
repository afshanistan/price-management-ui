import { useEffect, useId, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion, useIsPresent } from 'motion/react'
import type { Brand } from '../../../data/brands'
import type { Vendor } from '../../../data/vendors'
import { useReducedMotionSetting } from '../../../foundations/useReducedMotionSetting'
import { duration, ease } from '../../../styles/motion'
import { CountTick } from '../../atoms/CountTick'
import { StatusMark } from '../../atoms/StatusMark'
import { BrandChip } from '../../molecules/BrandChip'
import { EmptySelection } from '../../molecules/EmptySelection'
import { SelectionSummary } from '../../molecules/SelectionSummary'
import { ScrollShadows } from '../../../foundations/ScrollShadows'
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
  /** Pointer over a brand chip (its id) or off it (null): the card highlights the brand's row on the left. */
  onHoverBrand?: (brandId: string | null) => void
  className?: string
}

/*
  The basket: summary, then chips by vendor. Each vendor's line carries its own status: a citron
  complete mark right after its count once it has a brand (step 2 design review, Oct 19: the coverage strip
  is gone). State is derived:
  nothing selected = Empty; some vendor has none = Incomplete; else With selections.

  Motion (decision log, "Step 2 motion"): chips fade and scale in (fast) and the others glide; a removed
  chip fades and shrinks while the rest close the gap. Swaps are fade-throughs, never cross-fades:
  the panel's empty state ↔ the groups, and inside a group: its inline empty ↔ chips ↔ "All N brands".
*/
export function SelectedBrandsPanel({ vendors, brandsByVendor, selectedIds, onRemove, onRemoveVendor, onHoverBrand, className }: SelectedBrandsPanelProps) {
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


      <hr className="selected-brands-panel__divider" />

      {/* The chips scroll inside this frame; shades on the edges with more (R19). */}
      <div className="selected-brands-panel__chips-frame">
      <motion.div ref={chipsRef} layoutScroll className="selected-brands-panel__chips">
        {/* Fade-through: the empty state and the groups never share the screen. */}
        <AnimatePresence initial={false} mode="wait">
          {total === 0 ? (
            <Fade key="empty" className="selected-brands-panel__empty-wrap">
              <EmptySelection
                pictogram="brand"
                message="No brands selected yet"
                helper="Select brands on the left. Each vendor needs at least one."
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
                        <span className="visually-hidden">
                          {selected.length} of {all.length}
                          {selected.length > 0 ? ', complete' : ''}
                        </span>
                        <span aria-hidden="true">
                          <CountTick value={selected.length} /> of {all.length}
                        </span>
                      </span>
                      {/* Complete once the vendor has a brand; nothing before (the empty line says it).
                          It pops in (0.6 → 1, fast, ease-out) and fades out (fast, ease-in); opacity only under reduced motion. */}
                      <AnimatePresence initial={false}>
                        {selected.length > 0 && (
                          <motion.span
                            key="complete"
                            className="selected-brands-panel__vendor-status"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1, transition: { duration: duration.fast, ease: ease.out } }}
                            exit={{ opacity: 0, transition: { duration: duration.fast, ease: ease.in } }}
                          >
                            <StatusMark status="complete" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* The wrapper holds at least one chip's height, so nothing below jumps (not even mid-fade).
                        The empty slot is its own layer: when the first brand lands it fades out while the chip
                        fades in on the same spot, so the slot fills (Oct 19). Emptying stays a fade-through: the
                        slot waits for the chips to leave. Chips ↔ "All N brands" stay fade-throughs too. */}
                    <div className="selected-brands-panel__vendor-content">
                    <AnimatePresence initial={false}>
                      {content === 'empty' && (
                        <Slot key="slot">
                          <EmptySelection layout="inline" pictogram="brand" message="Select a brand to continue" />
                        </Slot>
                      )}
                    </AnimatePresence>
                    <AnimatePresence initial={false} mode="wait">
                      {content === 'empty' ? null : content === 'all' ? (
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
                                <Chip key={brand.id} onHover={(isHovered) => onHoverBrand?.(isHovered ? brand.id : null)}>
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
                    </div>
                  </motion.section>
                )
              })}
            </Fade>
          )}
        </AnimatePresence>
      </motion.div>
      <ScrollShadows scroller=".selected-brands-panel__chips" />
      </div>
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
/* The empty slot's layer: on top of the chips' spot, so the two cross on the same place. */
function Slot({ children }: { children: ReactNode }) {
  const isPresent = useIsPresent()
  return (
    <motion.div
      className="selected-brands-panel__slot"
      inert={!isPresent}
      initial={{ opacity: 0 }}
      // Comes back only after the chips have gone (a fade-through), so it waits one fast beat.
      animate={{ opacity: 1, transition: { duration: duration.base, ease: ease.out, delay: duration.fast } }}
      exit={{ opacity: 0, transition: { duration: duration.fast, ease: ease.in } }}
    >
      {children}
    </motion.div>
  )
}

function Chip({ children, onHover }: { children: ReactNode; onHover?: (isHovered: boolean) => void }) {
  const isPresent = useIsPresent()
  return (
    <motion.li
      onPointerEnter={() => onHover?.(true)}
      onPointerLeave={() => onHover?.(false)}
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
