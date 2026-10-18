import { useEffect, useId, useLayoutEffect, useRef, useState, type FocusEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useIsPresent, type Transition } from 'motion/react'
import { Autocomplete } from 'react-aria-components'
import type { Vendor } from '../../../data/vendors'
import { searchVendors } from '../../../data/search'
import { useReducedMotionSetting } from '../../../foundations/useReducedMotionSetting'
import { duration, ease } from '../../../styles/motion'
import { CardHeader } from '../../molecules/CardHeader'
import { EmptySelection } from '../../molecules/EmptySelection'
import { SelectedItemCard } from '../../molecules/SelectedItemCard'
import { TextField } from '../../molecules/TextField'
import { ToastRegion, type ToastMessage } from '../../molecules/Toast'
import { ResultsPanel } from '../../organisms/ResultsPanel'
import './SelectVendorsCard.css'

export interface SelectVendorsCardProps {
  /** All searchable vendors. */
  vendors: Vendor[]
  /** Controlled from the app: the wizard needs it to unblock Next. Newest first. */
  selected: Vendor[]
  onChange: (selected: Vendor[]) => void
  className?: string
}

const label = 'Vendor name or ESN'

/*
  Step 1: search vendors and add them. State is derived, never a prop:
  searching = a query while the search has focus; selected = at least one vendor.

  Motion (decision log, "Step 1 motion"): the newest vendor goes first; existing cards glide to their
  new slots together (Motion layout), then the new card fades and scales in, then a highlight fades
  (CSS). Removing fades and shrinks the card while the rest glide into the gap, and offers Undo in a
  toast. The grid's area never changes size; it scrolls inside.
*/
export function SelectVendorsCard({ vendors, selected, onChange, className }: SelectVendorsCardProps) {
  const [query, setQuery] = useState('')
  const [searchHasFocus, setSearchHasFocus] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const [panelTop, setPanelTop] = useState(0)
  const [toast, setToast] = useState<ToastMessage | null>(null)
  // Vendors added (or restored) while on this page get the add highlight; ones already there don't.
  const [addedIds, setAddedIds] = useState<Set<string>>(() => new Set())
  const searchRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  // After a removal or an Undo: the vendor whose Remove gets focus ('search' = the search).
  const focusAfterChange = useRef<string | null>(null)
  // After an add: focus goes back to the search.
  const focusSearchAfterAdd = useRef(false)
  // The latest removal, for Undo: the vendor and where it was.
  const lastRemoved = useRef<{ vendor: Vendor; index: number } | null>(null)
  const toastCount = useRef(0)
  // Each add or restore gets a fresh key, so a card still fading out from a removal finishes where it
  // was instead of being revived and snapped into the new slot.
  const generation = useRef<Record<string, number>>({})
  const nextGeneration = (id: string) => (generation.current[id] = (generation.current[id] ?? 0) + 1)
  const listLabelId = useId()
  const reduced = useReducedMotionSetting()

  const selectedKeys = new Set(selected.map((vendor) => vendor.id))
  // Best match first; ignores accents and punctuation; ESNs match from their first digit.
  const results = searchVendors(vendors, query)
  const isOpen = searchHasFocus && query.trim() !== ''

  // Polite announcements while typing: "7 vendors found" / "No vendors match “xyz”".
  useEffect(() => {
    if (query.trim() === '') return
    const n = results.length
    setAnnouncement(n === 0 ? `No vendors match “${query.trim()}”` : `${n} ${n === 1 ? 'vendor' : 'vendors'} found`)
    // Only the query should trigger this, not every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  // The panel floats 12px under the input (Figma), whatever the label's height.
  useLayoutEffect(() => {
    const input = searchRef.current?.querySelector('.input')
    if (isOpen && input instanceof HTMLElement) setPanelTop(input.offsetTop + input.offsetHeight)
  }, [isOpen])

  // After an add, the search keeps focus. A mouse pick happens on pointer down, and the browser then
  // focuses the clicked row, which the closed results just removed: so wait a frame, then focus the search.
  useEffect(() => {
    if (!focusSearchAfterAdd.current) return
    focusSearchAfterAdd.current = false
    const frame = requestAnimationFrame(() => searchRef.current?.querySelector('input')?.focus())
    return () => cancelAnimationFrame(frame)
  }, [selected])

  // Move focus after a removal or an Undo, once the list has re-rendered. Found by vendor, not by
  // position, because a removed card stays in the DOM while it animates out.
  useEffect(() => {
    const target = focusAfterChange.current
    if (target === null) return
    focusAfterChange.current = null
    const button = listRef.current?.querySelector<HTMLElement>(`li[data-vendor-id="${CSS.escape(target)}"]:not([data-exiting]) .selected-item-card__remove`)
    if (target !== 'search' && button) button.focus()
    else searchRef.current?.querySelector('input')?.focus()
  }, [selected])

  function add(vendor: Vendor) {
    // One pick per search (Will, Oct 18): the search clears, which closes the results; focus stays
    // in the search for the next name. The announcement isn't replaced (an empty query skips it).
    nextGeneration(vendor.id)
    onChange([vendor, ...selected])
    setAddedIds((ids) => new Set(ids).add(vendor.id))
    setQuery('')
    setAnnouncement(`${vendor.name} added`)
    focusSearchAfterAdd.current = true
    // The newest card is top-left: bring it into view if the grid is scrolled.
    listRef.current?.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  function remove(vendor: Vendor) {
    const index = selected.findIndex((v) => v.id === vendor.id)
    const remaining = selected.filter((v) => v.id !== vendor.id)
    // The next card's Remove; the previous one if it was the last; the search if none are left.
    focusAfterChange.current = remaining.length === 0 ? 'search' : remaining[Math.min(index, remaining.length - 1)].id
    lastRemoved.current = { vendor, index }
    onChange(remaining)
    // The toast's region announces "Cargill removed" (once), so the card's region stays quiet here.
    toastCount.current += 1
    setToast({ id: toastCount.current, message: `${vendor.name} removed`, actionLabel: 'Undo', onAction: undo })
  }

  // Undo the latest removal: the vendor goes back to its original slot.
  function undo() {
    const removed = lastRemoved.current
    lastRemoved.current = null
    setToast(null)
    if (!removed) return
    onChangeLatest((current) => {
      if (current.some((v) => v.id === removed.vendor.id)) return current
      const next = [...current]
      next.splice(Math.min(removed.index, next.length), 0, removed.vendor)
      return next
    })
    nextGeneration(removed.vendor.id)
    setAddedIds((ids) => new Set(ids).add(removed.vendor.id))
    setAnnouncement(`${removed.vendor.name} restored`)
    focusAfterChange.current = removed.vendor.id
  }

  // Undo runs from the toast, after other changes may have happened: always start from the latest list.
  const latest = useRef(selected)
  latest.current = selected
  function onChangeLatest(update: (current: Vendor[]) => Vendor[]) {
    onChange(update(latest.current))
  }

  // Click outside and blur close the panel; moving between the input and the panel doesn't.
  function handleBlur(event: FocusEvent) {
    if (!searchRef.current?.contains(event.relatedTarget as Node)) setSearchHasFocus(false)
  }

  const glide: Transition = { duration: duration.layout, ease: ease.inOut }
  const hadCards = selected.length > 1

  return (
    <div className={className ? `select-vendors-card ${className}` : 'select-vendors-card'}>
      <CardHeader title="Add vendors to your template" pictogram="vendor" />

      <div ref={searchRef} className="select-vendors-card__search" onFocus={() => setSearchHasFocus(true)} onBlur={handleBlur}>
        {/* Focus stays in the input; arrows move through results (aria-activedescendant), Enter adds and clears the search, Esc clears. */}
        <Autocomplete inputValue={query} onInputChange={setQuery}>
          <TextField
            label={label}
            placeholder="Search by vendor name or ESN"
            helper="Results appear as you type. Select a vendor to add it immediately."
          />
          {isOpen && (
            <ResultsPanel
              aria-label={label}
              items={results}
              query={query}
              selectedKeys={selectedKeys}
              onSelect={add}
              className="select-vendors-card__results"
              // Inline style: a measured position, not a design value.
              style={{ top: panelTop }}
            />
          )}
        </Autocomplete>
      </div>

      <hr className="select-vendors-card__divider" />

      <section className="select-vendors-card__selected">
        {/* A label for the list, not a heading (docs/open-questions.md). */}
        <span id={listLabelId} className="select-vendors-card__label type-label-lg">
          Selected vendors ({selected.length})
        </span>
        {/* Empty state and grid share one cell, so they cross-fade without the area changing size. */}
        <div className="select-vendors-card__stage">
          <AnimatePresence initial={false}>
            {selected.length === 0 ? (
              <motion.div
                key="empty"
                className="select-vendors-card__empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: duration.base, ease: ease.out } }}
                exit={{ opacity: 0, transition: { duration: duration.base, ease: ease.in } }}
              >
                <EmptySelection
                  pictogram="vendor"
                  message="No vendors selected yet"
                  helper="Search above to add vendors to this template."
                />
              </motion.div>
            ) : (
              <motion.ul
                key="list"
                ref={listRef}
                layoutScroll
                className="select-vendors-card__list"
                aria-labelledby={listLabelId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: duration.base, ease: ease.out } }}
                exit={{ opacity: 0, transition: { duration: duration.base, ease: ease.in } }}
              >
                <AnimatePresence initial={false} mode="popLayout">
                  {selected.map((vendor) => (
                    <SelectedVendorItem
                      key={`${vendor.id}#${generation.current[vendor.id] ?? 0}`}
                      vendorId={vendor.id}
                      // A class, not a state: the highlight runs once when the card mounts and never restarts.
                      className={addedIds.has(vendor.id) ? (hadCards ? 'is-added is-added-after-glide' : 'is-added') : undefined}
                      glide={glide}
                      enter={{ duration: reduced ? duration.fast : duration.base, ease: ease.out, delay: hadCards && !reduced ? duration.layout : 0 }}
                    >
                      <SelectedItemCard name={vendor.name} meta={vendor.esn} logo={vendor.logo} onRemove={() => remove(vendor)} />
                    </SelectedVendorItem>
                  ))}
                </AnimatePresence>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        {/* Undo for the latest removal. Its region is polite: "Cargill removed" is announced there, once. */}
        <ToastRegion toast={toast} onDismiss={() => setToast(null)} className="select-vendors-card__toast" />
      </section>

      {/* Polite live region: result counts, "Cargill added", "Cargill restored". */}
      <div role="status" className="visually-hidden">
        {announcement}
      </div>
    </div>
  )
}

/*
  One card in the grid. It glides to new slots (layout), fades and scales in (the new card waits for the
  others to glide out of its slot), and fades and shrinks out. While leaving it's inert: its Remove
  can't be pressed twice, and focus never lands on it.
*/
function SelectedVendorItem({ vendorId, className, glide, enter, children }: {
  vendorId: string
  className?: string
  glide: Transition
  enter: Transition
  children: ReactNode
}) {
  const isPresent = useIsPresent()
  return (
    <motion.li
      data-vendor-id={vendorId}
      data-exiting={isPresent ? undefined : ''}
      inert={!isPresent}
      className={className}
      layout
      transition={{ layout: glide }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1, transition: enter }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: duration.fast, ease: ease.in } }}
    >
      {children}
    </motion.li>
  )
}
