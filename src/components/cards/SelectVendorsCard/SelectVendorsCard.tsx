import { useEffect, useId, useLayoutEffect, useRef, useState, type FocusEvent } from 'react'
import { Autocomplete } from 'react-aria-components'
import type { Vendor } from '../../../data/vendors'
import { searchVendors } from '../../../data/search'
import { CardHeader } from '../../molecules/CardHeader'
import { EmptySelection } from '../../molecules/EmptySelection'
import { SelectedItemCard } from '../../molecules/SelectedItemCard'
import { TextField } from '../../molecules/TextField'
import { ResultsPanel } from '../../organisms/ResultsPanel'
import './SelectVendorsCard.css'

export interface SelectVendorsCardProps {
  /** All searchable vendors. */
  vendors: Vendor[]
  /** Controlled from the app: the wizard needs it to unblock Next. */
  selected: Vendor[]
  onChange: (selected: Vendor[]) => void
  className?: string
}

const label = 'Vendor name or ESN'

/*
  Step 1: search vendors and add them. State is derived, never a prop:
  searching = a query while the search has focus; selected = at least one vendor.
*/
export function SelectVendorsCard({ vendors, selected, onChange, className }: SelectVendorsCardProps) {
  const [query, setQuery] = useState('')
  const [searchHasFocus, setSearchHasFocus] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const [panelTop, setPanelTop] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  // After a removal: which card's Remove gets focus next (-1 = the search).
  const focusAfterRemove = useRef<number | null>(null)
  const listLabelId = useId()

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

  // Move focus after a removal, once the list has re-rendered.
  useEffect(() => {
    const index = focusAfterRemove.current
    if (index === null) return
    focusAfterRemove.current = null
    const removeButtons = listRef.current?.querySelectorAll<HTMLElement>('.selected-item-card__remove')
    if (index >= 0 && removeButtons?.[index]) removeButtons[index].focus()
    else searchRef.current?.querySelector('input')?.focus()
  }, [selected])

  function add(vendor: Vendor) {
    // Focus and the query stay put, so several vendors can be added in a row.
    onChange([...selected, vendor])
    setAnnouncement(`${vendor.name} added`)
  }

  function remove(vendor: Vendor) {
    const index = selected.findIndex((v) => v.id === vendor.id)
    const remaining = selected.filter((v) => v.id !== vendor.id)
    // The next card's Remove; the previous one if it was the last; the search if none are left.
    focusAfterRemove.current = remaining.length === 0 ? -1 : Math.min(index, remaining.length - 1)
    onChange(remaining)
    setAnnouncement(`${vendor.name} removed`)
  }

  // Click outside and blur close the panel; moving between the input and the panel doesn't.
  function handleBlur(event: FocusEvent) {
    if (!searchRef.current?.contains(event.relatedTarget as Node)) setSearchHasFocus(false)
  }

  return (
    <div className={className ? `select-vendors-card ${className}` : 'select-vendors-card'}>
      <CardHeader title="Add vendors to your template" pictogram="vendor" />

      <div ref={searchRef} className="select-vendors-card__search" onFocus={() => setSearchHasFocus(true)} onBlur={handleBlur}>
        {/* Focus stays in the input; arrows move through results (aria-activedescendant), Enter adds, Esc clears. */}
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
        {selected.length === 0 ? (
          <EmptySelection
            pictogram="vendor"
            message="No vendors selected yet"
            helper="Search above to add vendors to this template."
          />
        ) : (
          <ul ref={listRef} className="select-vendors-card__list" aria-labelledby={listLabelId}>
            {selected.map((vendor) => (
              <li key={vendor.id}>
                <SelectedItemCard name={vendor.name} meta={vendor.esn} logo={vendor.logo} onRemove={() => remove(vendor)} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Polite live region: result counts, "Cargill added", "Cargill removed". */}
      <div role="status" className="visually-hidden">
        {announcement}
      </div>
    </div>
  )
}
