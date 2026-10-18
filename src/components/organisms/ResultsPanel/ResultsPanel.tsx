import type { CSSProperties } from 'react'
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
  /** Picking a vendor adds it immediately. Picking one that's already added does nothing. */
  onSelect: (vendor: Vendor) => void
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
export function ResultsPanel({ items, query, selectedKeys, onSelect, className, style, ...rest }: ResultsPanelProps) {
  // Only additions count: re-picking a selected vendor is a no-op (docs/open-questions.md).
  function handleSelectionChange(keys: Selection) {
    if (keys === 'all') return
    const added = items.find((vendor) => keys.has(vendor.id) && !selectedKeys.has(vendor.id))
    if (added) onSelect(added)
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
        {(vendor) => <ResultRow id={vendor.id} name={vendor.name} meta={vendor.esn} query={query} />}
      </ListBox>
    </div>
  )
}
