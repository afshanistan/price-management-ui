import { useRef, useState, type SyntheticEvent } from 'react'
import { Header, ListBox, ListBoxSection, type Selection } from 'react-aria-components'
import type { Brand } from '../../../data/brands'
import type { Vendor } from '../../../data/vendors'
import { Checkbox, type CheckboxChecked } from '../../atoms/Checkbox'
import { GroupHeader } from '../../molecules/GroupHeader'
import { ResultRow } from '../../molecules/ResultRow'
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
  className?: string
}

/*
  A multi-select listbox of brands grouped by vendor. Inside the card's Autocomplete,
  focus stays in the search input: arrows move the active row, Enter toggles it.
  Each group's select-all checkbox is a separate tab stop.
*/
/*
  A listbox may only contain groups and options, so the real select-all checkboxes can't sit in
  the section headers (axe aria-required-children). They render just before the listbox, visually
  hidden but in the Tab order (search → select alls → panel); each header shows the box only,
  clickable, with the focus ring when its real checkbox has keyboard focus
  (docs/open-questions.md, "Checkbox inside the Brand list").
  The header's pointer events are kept from the listbox, or a click on the box would also
  move the listbox's focus.
*/
const isolate = (event: SyntheticEvent) => event.stopPropagation()

export function BrandList({ groups, query, selectedIds, onSelectionChange, onSelectAll, className }: BrandListProps) {
  const isSearching = query.trim() !== ''
  const [focusedVendor, setFocusedVendor] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const selectAllOf = (group: BrandListGroup) => {
    const visibleSelected = group.brands.filter((brand) => selectedIds.has(brand.id)).length
    const checked: CheckboxChecked = visibleSelected === 0 ? false : visibleSelected === group.brands.length ? true : 'mixed'
    const label = isSearching
      ? `Select ${group.brands.length} ${group.brands.length === 1 ? 'match' : 'matches'}`
      : `Select all ${group.vendor.name} brands`
    return { checked, label }
  }

  // Keyboard focus on a real checkbox: bring its group's header into view.
  function showGroup(vendorId: string) {
    setFocusedVendor(vendorId)
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
          const { checked, label } = selectAllOf(group)
          return (
            <Checkbox
              key={group.vendor.id}
              aria-label={label}
              isSelected={checked === true}
              isIndeterminate={checked === 'mixed'}
              onChange={() => onSelectAll(group.vendor.id)}
              onFocusChange={(isFocused) => (isFocused ? showGroup(group.vendor.id) : setFocusedVendor(null))}
            />
          )
        })}
      </div>
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
      renderEmptyState={() => <p className="brand-list__empty">No brands match “{query.trim()}”.</p>}
    >
      {groups.map((group) => {
        const { vendor, brands, selectedCount, totalCount } = group
        const { checked, label } = selectAllOf(group)

        return (
          <ListBoxSection
            key={vendor.id}
            id={vendor.id}
            // "Cargill, 4 of 5 brands selected".
            aria-label={`${vendor.name}, ${selectedCount} of ${totalCount} brands selected`}
            className="brand-list__group"
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
                  onChange: () => onSelectAll(vendor.id),
                  visualOnly: true,
                  isFocusVisible: focusedVendor === vendor.id,
                }}
              />
              </div>
            </Header>
            {brands.map((brand) => (
              <ResultRow key={brand.id} id={brand.id} select="multi" name={brand.name} vendor={vendor.name} skuCount={brand.skuCount} query={query} />
            ))}
          </ListBoxSection>
        )
      })}
    </ListBox>
    </div>
  )
}
