import { useEffect, useMemo, useRef, useState } from 'react'
import { Autocomplete } from 'react-aria-components'
import { matchesBrand, type Brand } from '../../../data/brands'
import { byVendorName, type Vendor } from '../../../data/vendors'
import { CardHeader } from '../../molecules/CardHeader'
import { TextField } from '../../molecules/TextField'
import { ToastRegion, type ToastMessage } from '../../molecules/Toast'
import { BrandList, type BrandListGroup } from '../../organisms/BrandList'
import { SelectedBrandsPanel } from '../../organisms/SelectedBrandsPanel'
import './SelectBrandsCard.css'

export interface SelectBrandsCardProps {
  /** The vendors picked on step 1. Step 2 lists them A–Z (Will, Oct 18), in the list and the panel. */
  vendors: Vendor[]
  /** All brands of those vendors. */
  brands: Brand[]
  /** Controlled by the app: the wizard needs it for Next and Review. */
  selectedIds: Set<string>
  onChange: (ids: Set<string>) => void
  className?: string
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

/*
  Step 2: the brand list (left) and the Selected brands panel (right).
  State is derived from the data, never a prop. Whether the step is complete is
  isBrandStepComplete() in src/data/brands.ts, shared with the wizard.
*/
export function SelectBrandsCard({ vendors: picked, brands, selectedIds, onChange, className }: SelectBrandsCardProps) {
  // A–Z by vendor (ignoring a leading "The"), in the brand list and the Selected brands panel.
  const vendors = useMemo(() => [...picked].sort(byVendorName), [picked])
  const [query, setQuery] = useState('')
  const [announcement, setAnnouncement] = useState('')
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const toastCount = useRef(0)
  // Undo starts from the latest selection, whatever happened since the removal.
  const latestIds = useRef(selectedIds)
  latestIds.current = selectedIds

  const brandsByVendor = useMemo(
    () => Object.fromEntries(vendors.map((vendor) => [vendor.id, brands.filter((brand) => brand.vendorId === vendor.id)])),
    [vendors, brands],
  )
  const nameOf = (id: string) => brands.find((brand) => brand.id === id)?.name ?? ''

  const groups: BrandListGroup[] = vendors
    .map((vendor) => {
      const all = brandsByVendor[vendor.id]
      return {
        vendor,
        brands: all.filter((brand) => matchesBrand(brand, vendor, query)),
        selectedCount: all.filter((brand) => selectedIds.has(brand.id)).length,
        totalCount: all.length,
      }
    })
    // Groups with no matches drop out entirely.
    .filter((group) => group.brands.length > 0)

  // Polite count while typing: "12 brands match" / "No brands match “xyz”".
  const matchCount = groups.reduce((sum, group) => sum + group.brands.length, 0)
  useEffect(() => {
    if (query.trim() === '') return
    setAnnouncement(matchCount === 0 ? `No brands match “${query.trim()}”` : `${plural(matchCount, 'brand', 'brands')} match`)
    // Only the query should trigger this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  // A row toggled in the list (click or Enter): one message per change.
  function handleListChange(next: Set<string>) {
    const added = [...next].filter((id) => !selectedIds.has(id))
    const removed = [...selectedIds].filter((id) => !next.has(id))
    if (added.length === 1 && removed.length === 0) setAnnouncement(`${nameOf(added[0])} added`)
    if (removed.length === 1 && added.length === 0) setAnnouncement(`${nameOf(removed[0])} removed`)
    onChange(next)
  }

  // Select all: acts on the visible matches. Mixed or unchecked selects them; checked clears them.
  function handleSelectAll(vendorId: string) {
    const group = groups.find((g) => g.vendor.id === vendorId)
    if (!group) return
    const visible = group.brands.map((brand) => brand.id)
    const allOn = visible.every((id) => selectedIds.has(id))
    const next = new Set(selectedIds)
    visible.forEach((id) => (allOn ? next.delete(id) : next.add(id)))
    const isWholeVendor = visible.length === brandsByVendor[vendorId].length
    const what = isWholeVendor ? `All ${group.vendor.name} brands` : plural(visible.length, `${group.vendor.name} brand`, `${group.vendor.name} brands`)
    setAnnouncement(`${what} ${allOn ? 'removed' : 'selected'}`)
    onChange(next)
  }

  function removeBrand(id: string) {
    const next = new Set(selectedIds)
    next.delete(id)
    setAnnouncement(`${nameOf(id)} removed`)
    onChange(next)
  }

  // "All N brands" ×: clears the vendor, and offers Undo in a toast (a big removal; a single chip's ×
  // doesn't need one, its checkbox is right beside it). The toast announces it, so the card stays quiet.
  function removeVendor(vendorId: string) {
    const vendor = vendors.find((v) => v.id === vendorId)
    const removed = brandsByVendor[vendorId].map((brand) => brand.id).filter((id) => selectedIds.has(id))
    onChange(new Set([...selectedIds].filter((id) => !removed.includes(id))))
    toastCount.current += 1
    setToast({
      id: toastCount.current,
      message: `All ${vendor?.name} brands removed`,
      actionLabel: 'Undo',
      onAction: () => {
        setToast(null)
        onChange(new Set([...latestIds.current, ...removed]))
        setAnnouncement(`All ${vendor?.name} brands restored`)
      },
    })
  }

  return (
    <div className={className ? `select-brands-card ${className}` : 'select-brands-card'}>
      <div className="select-brands-card__main">
        <CardHeader title="Add brands to your template" pictogram="brand" />
        <div className="select-brands-card__directory">
          {/* Focus stays in the search; arrows move through the list, Enter toggles, Esc clears. */}
          <Autocomplete inputValue={query} onInputChange={setQuery}>
            <TextField label="Search by brand" placeholder="Search brands" />
            <BrandList
              groups={groups}
              query={query}
              selectedIds={selectedIds}
              onSelectionChange={handleListChange}
              onSelectAll={handleSelectAll}
            />
          </Autocomplete>
        </div>
      </div>
      <SelectedBrandsPanel
        vendors={vendors}
        brandsByVendor={brandsByVendor}
        selectedIds={selectedIds}
        onRemove={removeBrand}
        onRemoveVendor={removeVendor}
      />
      {/* Undo for removing a whole vendor's brands; its region announces the removal. */}
      <ToastRegion toast={toast} onDismiss={() => setToast(null)} className="select-brands-card__toast" />
      {/* Polite live region, owned by the card. */}
      <div role="status" className="visually-hidden">
        {announcement}
      </div>
    </div>
  )
}
