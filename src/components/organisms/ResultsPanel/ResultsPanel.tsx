import { useId, type CSSProperties } from 'react'
import { ListBox, type Selection } from 'react-aria-components'
import type { Vendor } from '../../../data/vendors'
import { ResultRow } from '../../molecules/ResultRow'
import './ResultsPanel.css'

export interface ResultsPanelProps {
  /** Filtered results. Empty = the No results message. */
  items: Vendor[]
  /** For the No results message and match highlighting. */
  query: string
  /** Vendors already added show as Selected. */
  selectedKeys: Set<string>
  /** Picking a vendor adds it immediately. */
  onSelect: (vendor: Vendor) => void
  /** Picking one that's already added (Will, Oct 18: point at its card instead of doing nothing). */
  onReselect?: (vendor: Vendor) => void
  /** Names the listbox; the field's label. */
  'aria-label': string
  className?: string
  /** For the parent's measured position only. */
  style?: CSSProperties
}

/*
  The floating list under the vendor search. The parent places it under the input
  (same width, over the content below). Inside an Autocomplete, focus stays in the
  search input and rows are reached with aria-activedescendant: arrows move, Enter picks.
*/
export function ResultsPanel({ items, query, selectedKeys, onSelect, onReselect, className, style, ...rest }: ResultsPanelProps) {
  // One shared keyboard highlight per panel: it slides from row to row.
  const highlightId = `${useId()}-highlight`
  // A pick toggles the listbox's selection: a new key is an add; a key that disappears is a re-pick.
  function handleSelectionChange(keys: Selection) {
    if (keys === 'all') return
    const added = items.find((vendor) => keys.has(vendor.id) && !selectedKeys.has(vendor.id))
    if (added) return onSelect(added)
    const repicked = items.find((vendor) => selectedKeys.has(vendor.id) && !keys.has(vendor.id))
    if (repicked) onReselect?.(repicked)
  }

  return (
    <div className={className ? `results-panel ${className}` : 'results-panel'} style={style}>
      <ListBox
        {...rest}
        items={items}
        // React Aria caches rows by item; the query isn't part of an item, so without this
        // a row kept the bold from the first letter typed ("C" of Coca-Cola for "coca cola").
        dependencies={[query]}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        className="results-panel__list"
        renderEmptyState={() => (
          <p className="results-panel__empty">No vendors match “{query.trim()}”.</p>
        )}
      >
        {(vendor) => <ResultRow id={vendor.id} name={vendor.name} meta={vendor.esn} query={query} highlightId={highlightId} />}
      </ListBox>
    </div>
  )
}
