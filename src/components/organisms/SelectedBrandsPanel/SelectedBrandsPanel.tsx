import { useEffect, useId, useRef } from 'react'
import type { Brand } from '../../../data/brands'
import type { Vendor } from '../../../data/vendors'
import { BrandChip } from '../../molecules/BrandChip'
import { EmptySelection } from '../../molecules/EmptySelection'
import { SelectionSummary } from '../../molecules/SelectionSummary'
import { VendorCoverageTile } from '../../molecules/VendorCoverageTile'
import './SelectedBrandsPanel.css'

export interface SelectedBrandsPanelProps {
  /** Step 1 order. */
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
*/
export function SelectedBrandsPanel({ vendors, brandsByVendor, selectedIds, onRemove, onRemoveVendor, className }: SelectedBrandsPanelProps) {
  const titleId = useId()
  const chipsRef = useRef<HTMLDivElement>(null)
  // After a removal: where focus goes once the chips re-render.
  const focusAfterRemove = useRef<{ vendorId: string; index: number } | null>(null)

  const perVendor = vendors.map((vendor) => {
    const all = brandsByVendor[vendor.id] ?? []
    return { vendor, all, selected: all.filter((brand) => selectedIds.has(brand.id)) }
  })
  const total = perVendor.reduce((sum, v) => sum + v.selected.length, 0)
  const isComplete = perVendor.every((v) => v.selected.length > 0)

  // Next chip's ×, else the previous one, else the vendor's H3 (not specified in Figma; docs/open-questions.md).
  useEffect(() => {
    const target = focusAfterRemove.current
    if (!target) return
    focusAfterRemove.current = null
    const group = chipsRef.current?.querySelector<HTMLElement>(`[data-vendor="${target.vendorId}"]`)
    const buttons = group?.querySelectorAll<HTMLElement>('.brand-chip__remove')
    const next = buttons?.[target.index] ?? buttons?.[target.index - 1]
    if (next) next.focus()
    else group?.querySelector<HTMLElement>('h3')?.focus()
  }, [selectedIds])

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
            <VendorCoverageTile vendorName={vendor.name} wordmark={vendor.wordmark} selectedCount={selected.length} totalCount={all.length} />
          </li>
        ))}
      </ul>

      <hr className="selected-brands-panel__divider" />

      <div ref={chipsRef} className="selected-brands-panel__chips">
        {total === 0 ? (
          <EmptySelection
            pictogram="brand"
            message="No brands selected yet"
            helper="Check brands on the left. Each vendor needs at least one."
            className="selected-brands-panel__empty"
          />
        ) : (
          perVendor.map(({ vendor, all, selected }) => {
            // Every brand selected (and more than one): one "All N brands" chip instead.
            const showAll = selected.length === all.length && all.length > 1
            return (
              <section key={vendor.id} data-vendor={vendor.id} className="selected-brands-panel__vendor">
                <div className="selected-brands-panel__vendor-label">
                  {/* An H3, styled small; focus lands here when its last chip goes. */}
                  <h3 tabIndex={-1} className="selected-brands-panel__vendor-name">{vendor.name}</h3>
                  <span className="selected-brands-panel__vendor-count">
                    {selected.length} of {all.length}
                  </span>
                </div>
                {selected.length === 0 ? (
                  <EmptySelection layout="inline" pictogram="brand" message={`No ${vendor.name} brands yet`} />
                ) : (
                  <ul className="selected-brands-panel__chip-list">
                    {showAll ? (
                      <li className="selected-brands-panel__chip-all">
                        <BrandChip
                          type="all"
                          label={`All ${all.length} brands`}
                          removeLabel={`Remove all ${vendor.name} brands`}
                          onRemove={() => removeChip(vendor.id, 0, () => onRemoveVendor(vendor.id))}
                        />
                      </li>
                    ) : (
                      selected.map((brand, index) => (
                        <li key={brand.id}>
                          <BrandChip
                            label={brand.name}
                            removeLabel={`Remove ${brand.name}`}
                            onRemove={() => removeChip(vendor.id, index, () => onRemove(brand.id))}
                          />
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </section>
            )
          })
        )}
      </div>
    </aside>
  )
}
