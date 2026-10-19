import { useEffect, useRef, useState, type SyntheticEvent } from 'react'
import { Button, Header, ListBox, ListBoxSection, type Selection } from 'react-aria-components'
import type { Brand } from '../../../data/brands'
import type { Vendor } from '../../../data/vendors'
import { useReducedMotionSetting } from '../../../foundations/useReducedMotionSetting'
import { duration } from '../../../styles/motion'
import { Checkbox, type CheckboxChecked } from '../../atoms/Checkbox'
import { GroupHeader } from '../../molecules/GroupHeader'
import { ResultRow } from '../../molecules/ResultRow'
import { ScrollShadows } from '../../../foundations/ScrollShadows'
import './BrandList.css'

export interface BrandListGroup {
  vendor: Vendor
  /** The vendor's brands that match the query (all of them with no query). */
  brands: Brand[]
  /** For "4 of 5": selected and total across all the vendor's brands, not just the matches. */
  selectedCount: number
  totalCount: number
}

export interface BrandListProps {
  /** Already filtered, in step 1 vendor order. Groups with no matches are left out. */
  groups: BrandListGroup[]
  /** For match highlighting and the No results message. */
  query: string
  selectedIds: Set<string>
  onSelectionChange: (ids: Set<string>) => void
  /** The group header's select all: acts on the visible matches. */
  onSelectAll: (vendorId: string) => void
  /** A brand whose chip is hovered in the Selected brands panel: its row shows the hover fill. */
  linkedBrandId?: string | null
  className?: string
}

/*
  A multi-select listbox of brands grouped by vendor. Inside the card's Autocomplete,
  focus stays in the search input: arrows move the active row, Enter toggles it.
  Each group opens and closes (a tab stop), and has a select-all checkbox (another tab stop).
  The first vendor with nothing selected starts open, the rest closed: you land where the work is.
  While searching, every group with matches is open; clearing the search returns to how you left them.
  (Step 2 design review, Oct 19; decision log "Group header: a teal bar that opens and closes".)
*/
/*
  A listbox may only contain groups and options, so the real select-all checkboxes can't sit in
  the section headers (axe aria-required-children). They render just before the listbox, visually
  hidden but in the Tab order (search → each vendor's toggle and select all → panel); each header
  shows the box and caret only, clickable, with the focus ring when its real control has keyboard focus
  (docs/open-questions.md, "Checkbox inside the Brand list").
  The header's pointer events are kept from the listbox, or a click on the box would also
  move the listbox's focus.
*/
const isolate = (event: SyntheticEvent) => event.stopPropagation()

export function BrandList({ groups, query, selectedIds, onSelectionChange, onSelectAll, linkedBrandId, className }: BrandListProps) {
  const isSearching = query.trim() !== ''
  const [focused, setFocused] = useState<{ vendorId: string; control: 'toggle' | 'selectAll' } | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  // Which groups are open. Starts with the first vendor that has nothing selected yet.
  const [open, setOpen] = useState<Set<string>>(() => {
    const first = groups.find((group) => group.selectedCount === 0) ?? groups[0]
    return new Set(first ? [first.vendor.id] : [])
  })
  // Opening and closing ease (Oct 19): open = layout duration, ease-out; close = fast, ease-in, and the
  // rows stay mounted until they've shrunk away. Search opens groups instantly (it changes on every
  // keystroke), and reduced motion skips it. The caret and aria-expanded flip at once.
  const reduced = useReducedMotionSetting()
  const [moving, setMoving] = useState<Record<string, 'opening' | 'closing'>>({})
  const timers = useRef(new Map<string, number>())
  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((timer) => window.clearTimeout(timer))
  }, [])
  const isOpen = (vendorId: string) => isSearching || open.has(vendorId)
  const isExpanded = (vendorId: string) => isSearching || (open.has(vendorId) && moving[vendorId] !== 'closing')
  // Every group closed (and no search): the list holds no options, only closed headers. Screen readers
  // get those from the real toggles above (name, count, collapsed), so the empty listbox is hidden from
  // them: a listbox with no options fails axe aria-required-children.
  const allClosed = !isSearching && groups.every((group) => !open.has(group.vendor.id))
  function settle(vendorId: string, after: number, then?: () => void) {
    window.clearTimeout(timers.current.get(vendorId))
    timers.current.set(
      vendorId,
      window.setTimeout(() => {
        timers.current.delete(vendorId)
        then?.()
        setMoving((prev) => {
          const next = { ...prev }
          delete next[vendorId]
          return next
        })
      }, after),
    )
  }

  function toggle(vendorId: string) {
    const closing = isExpanded(vendorId)
    const close = () =>
      setOpen((prev) => {
        const next = new Set(prev)
        next.delete(vendorId)
        return next
      })
    if (reduced) {
      if (closing) close()
      else setOpen((prev) => new Set(prev).add(vendorId))
      return
    }
    if (closing) {
      setMoving((prev) => ({ ...prev, [vendorId]: 'closing' }))
      settle(vendorId, duration.fast * 1000, close)
    } else {
      setOpen((prev) => new Set(prev).add(vendorId))
      setMoving((prev) => ({ ...prev, [vendorId]: 'opening' }))
      settle(vendorId, duration.layout * 1000)
    }
    if (!closing) requestAnimationFrame(() => revealGroup(vendorId))
  }

  // A group opened low in the list scrolls up just enough to show its rows (or as many as fit), never
  // past its own header. Smooth, or instant under reduced motion (Oct 19).
  function revealGroup(vendorId: string) {
    const list = listRef.current
    const header = list?.querySelector(`[data-vendor-header="${vendorId}"]`)
    const group = groups.find((g) => g.vendor.id === vendorId)
    if (!list || !header || !group) return
    const listBox = list.getBoundingClientRect()
    const headerBox = header.getBoundingClientRect()
    // Brand rows and group headers are both 40px (--size-40), so the header's height measures a row.
    const rowsHeight = group.brands.length * headerBox.height
    const needed = Math.min(rowsHeight, list.clientHeight - headerBox.height)
    const available = listBox.bottom - headerBox.bottom
    if (available >= needed) return
    const toHeaderTop = headerBox.top - listBox.top - list.clientTop
    list.scrollBy({ top: Math.min(needed - available, toHeaderTop), behavior: reduced ? 'auto' : 'smooth' })
  }

  const selectAllOf = (group: BrandListGroup) => {
    const visibleSelected = group.brands.filter((brand) => selectedIds.has(brand.id)).length
    const checked: CheckboxChecked = visibleSelected === 0 ? false : visibleSelected === group.brands.length ? true : 'mixed'
    const text = isSearching ? `Select ${group.brands.length} ${group.brands.length === 1 ? 'match' : 'matches'}` : 'Select all'
    const label = isSearching ? text : `Select all ${group.vendor.name} brands`
    return { checked, label, text }
  }

  // Keyboard focus on a real control: bring its group's header into view.
  function showGroup(vendorId: string, control: 'toggle' | 'selectAll') {
    setFocused({ vendorId, control })
    listRef.current?.querySelector(`[data-vendor-header="${vendorId}"]`)?.scrollIntoView({ block: 'nearest' })
  }

  function handleSelectionChange(keys: Selection) {
    if (keys === 'all') return
    onSelectionChange(new Set([...keys].map(String)))
  }

  return (
    <div className={className ? `brand-list ${className}` : 'brand-list'}>
      <div className="visually-hidden">
        {groups.map((group) => {
          const { vendor, selectedCount, totalCount } = group
          const { checked, label } = selectAllOf(group)
          return (
            <div key={vendor.id}>
              {/* Disabled while searching: every group with matches is open then. */}
              <Button
                aria-expanded={isExpanded(vendor.id)}
                isDisabled={isSearching}
                onPress={() => toggle(vendor.id)}
                onFocusChange={(isFocused) => (isFocused ? showGroup(vendor.id, 'toggle') : setFocused(null))}
              >
                {`${vendor.name}, ${selectedCount} of ${totalCount} brands selected`}
              </Button>
              <Checkbox
                aria-label={label}
                isSelected={checked === true}
                isIndeterminate={checked === 'mixed'}
                onChange={() => onSelectAll(vendor.id)}
                onFocusChange={(isFocused) => (isFocused ? showGroup(vendor.id, 'selectAll') : setFocused(null))}
              />
            </div>
          )
        })}
      </div>
    <div className="brand-list__frame" aria-hidden={allClosed || undefined}>
    <ListBox
      ref={listRef}
      aria-label="Brands"
      selectionMode="multiple"
      // Escape belongs to the search (it clears the query). React Aria's default would also clear
      // every selected brand, with no undo (found in the Oct 18 pressure test).
      escapeKeyBehavior="none"
      selectedKeys={selectedIds}
      onSelectionChange={handleSelectionChange}
      className="brand-list__list"
      // Only a search can come up empty; with no query, every group closed is just closed headers.
      renderEmptyState={isSearching ? () => <p className="brand-list__empty">No brands match “{query.trim()}”.</p> : undefined}
    >
      {groups.map((group) => {
        const { vendor, brands, selectedCount, totalCount } = group
        const { checked, label, text } = selectAllOf(group)
        const expanded = isExpanded(vendor.id)
        // Rows render while open or still closing; the class drives the ease.
        const showRows = isOpen(vendor.id)
        const motionState = isSearching ? undefined : moving[vendor.id]
        const isFocused = (control: 'toggle' | 'selectAll') => focused?.vendorId === vendor.id && focused.control === control

        return (
          <ListBoxSection
            key={vendor.id}
            id={vendor.id}
            // "Cargill, 4 of 5 brands selected".
            aria-label={`${vendor.name}, ${selectedCount} of ${totalCount} brands selected`}
            className={motionState ? `brand-list__group brand-list__group--${motionState}` : 'brand-list__group'}
          >
            <Header className="brand-list__header">
              <div
                data-vendor-header={vendor.id}
                onPointerDown={isolate}
                onPointerUp={isolate}
                onMouseDown={isolate}
                onClick={isolate}
              >
              <GroupHeader
                vendor={vendor.name}
                count={`${selectedCount} of ${totalCount}`}
                selectAll={{
                  checked,
                  label,
                  text,
                  onChange: () => onSelectAll(vendor.id),
                  visualOnly: true,
                  isFocusVisible: isFocused('selectAll'),
                }}
                expand={{
                  isExpanded: expanded,
                  onToggle: () => toggle(vendor.id),
                  isDisabled: isSearching,
                  visualOnly: true,
                  isFocusVisible: isFocused('toggle'),
                }}
              />
              </div>
            </Header>
            {showRows && brands.map((brand) => (
              <ResultRow key={brand.id} id={brand.id} select="multi" name={brand.name} vendor={vendor.name} skuCount={brand.skuCount} query={query} isLinkedHover={brand.id === linkedBrandId} />
            ))}
          </ListBoxSection>
        )
      })}
    </ListBox>
    {/* Shades on the list's edges while there's more to scroll (R19). */}
    <ScrollShadows scroller=".brand-list__list" />
    </div>
    </div>
  )
}
