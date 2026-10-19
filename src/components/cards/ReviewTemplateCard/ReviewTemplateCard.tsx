import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useIsPresent } from 'motion/react'
import type { CalendarDate } from '@internationalized/date'
import type { Brand } from '../../../data/brands'
import { currencyOptions, effectiveDateOf, formatShort, NO_DEFAULT, presetsSetCount, pricingModelOptions, type GlobalPresetsValue } from '../../../data/presets'
import type { Vendor } from '../../../data/vendors'
import { useReducedMotionSetting } from '../../../foundations/useReducedMotionSetting'
import { useScrollEdges } from '../../../foundations/useScrollEdges'
import { duration, ease } from '../../../styles/motion'
import { Pictogram, type PictogramType } from '../../atoms/Pictogram'
import { Button } from '../../molecules/Button'
import { CardHeader } from '../../molecules/CardHeader'
import { PresetReadout } from '../../molecules/PresetReadout'
import { ReviewRow } from '../../molecules/ReviewRow'
import { SummaryStat } from '../../molecules/SummaryStat'
import { ToastRegion, type ToastMessage } from '../../molecules/Toast'
import './ReviewTemplateCard.css'

export type ReviewEditStep = 'vendors' | 'brands' | 'presets'

export interface ReviewTemplateCardProps {
  /** From step 1. Listed in the order given (the app sorts A–Z). */
  vendors: Vendor[]
  /** From step 2. Listed grouped under their vendor, in vendor order. */
  selectedBrands: Brand[]
  /**
   * A brand removed on Review, or put back with Undo (step 4 review R10). Omit for a read-only card.
   * A vendor's last brand can't be removed: every vendor needs a brand.
   */
  onSelectedBrandsChange?: (brands: Brand[]) => void
  /** From step 3. */
  presets: GlobalPresetsValue
  /** For Next month / Next quarter. Stories freeze it. */
  today: CalendarDate
  /** Edit = jump to that step; the wizard carries on from there with every choice kept. */
  onEdit: (step: ReviewEditStep) => void
  className?: string
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`
/* Step 3's wording: "Canadian dollar (CAD)", "Cost plus" (R13). null = Decide later. */
const labelOf = (options: { value: string; label: string; description?: string }[], value: string, withCode = false) => {
  if (value === NO_DEFAULT) return null
  const option = options.find((o) => o.value === value)
  if (!option) return null
  return withCode && option.description ? `${option.label} ${option.description}` : option.label
}

/* "Vendors" + pictogram as an H2, and the Edit button: visible "Edit", named "Edit vendors". */
function SectionHeader({ title, pictogram, editLabel, onEdit }: { title: string; pictogram: PictogramType; editLabel: string; onEdit: () => void }) {
  return (
    <div className="review-card__section-header">
      <div className="review-card__section-title">
        <Pictogram type={pictogram} size={20} className="review-card__pictogram" />
        <h2 className="review-card__h2">{title}</h2>
      </div>
      <Button size="xsmall" hierarchy="tertiary" leadingIcon="edit" aria-label={editLabel} onPress={onEdit}>
        Edit
      </Button>
    </div>
  )
}

/*
  A list box: plum accent edge on top (R11), scrolls past 230, and soft shadows on the edges
  that have more to scroll to (R12). The border, accent and shadows sit on the frame; the list scrolls.
*/
function ScrollBox({ label, focusable, children }: { label: string; focusable?: boolean; children: ReactNode }) {
  const listRef = useRef<HTMLUListElement>(null)
  const edges = useScrollEdges(listRef)
  return (
    <div className="review-card__box" data-more-above={edges.top || undefined} data-more-below={edges.bottom || undefined}>
      {/* Focusable only when nothing inside is, so keyboard users can still scroll it. */}
      <ul ref={listRef} className="review-card__list" tabIndex={focusable ? 0 : undefined} aria-label={label}>
        {children}
      </ul>
    </div>
  )
}

/* One brand row; fades and collapses when removed, the rows below slide up (R10d, refined in the motion pass). */
function BrandItem({ brandId, reduced, children }: { brandId: string; reduced: boolean; children: ReactNode }) {
  const isPresent = useIsPresent()
  return (
    <motion.li
      className="review-card__item"
      data-brand-id={brandId}
      data-exiting={isPresent ? undefined : ''}
      inert={!isPresent}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto', transition: { duration: reduced ? 0 : duration.base, ease: ease.out } }}
      exit={{ opacity: 0, height: 0, transition: reduced ? { duration: duration.fast } : { duration: duration.base, ease: ease.in } }}
    >
      {children}
    </motion.li>
  )
}

/** Step 4: the summary, the vendors and brands side by side, and the presets. Brands can be removed here. */
export function ReviewTemplateCard({ vendors, selectedBrands, onSelectedBrandsChange, presets, today, onEdit, className }: ReviewTemplateCardProps) {
  const groups = vendors.map((vendor) => ({ vendor, brands: selectedBrands.filter((brand) => brand.vendorId === vendor.id) }))
  const brandTotal = groups.reduce((n, group) => n + group.brands.length, 0)
  const setCount = presetsSetCount(presets)
  const effectiveDate = effectiveDateOf(presets.effectiveDate, today)
  const reduced = useReducedMotionSetting()
  const labelIdBase = useId()

  // Removal and Undo, as on step 1: one toast at a time, for the latest removal.
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const toastCount = useRef(0)
  const lastRemoved = useRef<Brand | null>(null)
  const focusAfterChange = useRef<string | null>(null)
  const brandsRef = useRef<HTMLElement>(null)
  // Undo runs from the toast, after other changes may have happened: always start from the latest list.
  const latest = useRef(selectedBrands)
  useLayoutEffect(() => {
    latest.current = selectedBrands
  }, [selectedBrands])

  // After a removal or an Undo, focus the right trash once the list has re-rendered. Found by brand,
  // not position, because a removed row stays in the DOM while it animates out.
  useEffect(() => {
    const target = focusAfterChange.current
    if (target === null) return
    focusAfterChange.current = null
    brandsRef.current?.querySelector<HTMLElement>(`li[data-brand-id="${CSS.escape(target)}"]:not([data-exiting]) .review-row__remove`)?.focus()
  }, [selectedBrands])

  function remove(brand: Brand) {
    if (!onSelectedBrandsChange) return
    const siblings = selectedBrands.filter((b) => b.vendorId === brand.vendorId)
    if (siblings.length <= 1) return
    // The next brand's trash in the same group; the previous one if it was the last.
    const index = siblings.findIndex((b) => b.id === brand.id)
    const remaining = siblings.filter((b) => b.id !== brand.id)
    focusAfterChange.current = remaining[Math.min(index, remaining.length - 1)].id
    lastRemoved.current = brand
    onSelectedBrandsChange(selectedBrands.filter((b) => b.id !== brand.id))
    // The toast's region announces "Cheerios removed" (once).
    toastCount.current += 1
    setToast({ id: toastCount.current, message: `${brand.name} removed`, actionLabel: 'Undo', onAction: undo })
  }

  // Undo the latest removal: the brand goes back under its vendor (rows are A–Z, so its place follows).
  function undo() {
    const removed = lastRemoved.current
    lastRemoved.current = null
    setToast(null)
    if (!removed || !onSelectedBrandsChange) return
    if (latest.current.some((b) => b.id === removed.id)) return
    onSelectedBrandsChange([...latest.current, removed])
    focusAfterChange.current = removed.id
  }

  return (
    <div className={className ? `review-card ${className}` : 'review-card'}>
      <CardHeader
        title="Congrats! Your template is ready for download"
        pictogram="review"
        description="Confirm the scope and defaults for your pricing template."
      />

      {/* Labels follow the count: "1 Vendor" (R3). Presets: "2 of 3", "of 3" smaller (R4, R5). */}
      <div className="review-card__strip">
        <SummaryStat value={String(vendors.length)} label={vendors.length === 1 ? 'Vendor' : 'Vendors'} status="complete" srLabel={`${plural(vendors.length, 'vendor', 'vendors')}, complete`} />
        <SummaryStat value={String(brandTotal)} label={brandTotal === 1 ? 'Brand' : 'Brands'} status="complete" srLabel={`${plural(brandTotal, 'brand', 'brands')}, complete`} />
        <SummaryStat value={String(setCount)} total={3} label="Presets" status="optional" srLabel={`${setCount} of 3 presets set, optional`} />
      </div>

      <div className="review-card__scope">
        <section className="review-card__section">
          <SectionHeader title="Vendors" pictogram="vendor" editLabel="Edit vendors" onEdit={() => onEdit('vendors')} />
          <ScrollBox label={`Vendors, ${vendors.length}`} focusable>
            {groups.map(({ vendor, brands }) => (
              <ReviewRow key={vendor.id} type="vendor" name={vendor.name} brandCount={brands.length} esn={vendor.esn} />
            ))}
          </ScrollBox>
        </section>
        <section className="review-card__section" ref={brandsRef}>
          <SectionHeader title="Brands" pictogram="brand" editLabel="Edit brands" onEdit={() => onEdit('brands')} />
          {/* Grouped under a quiet label per vendor that sticks while its brands scroll by (R9). */}
          <ScrollBox label={`Brands, ${brandTotal}`} focusable={!onSelectedBrandsChange}>
            {groups.map(({ vendor, brands }, index) => {
              const labelId = `${labelIdBase}-group-${index}`
              return (
                <li key={vendor.id} className="review-card__group">
                  <div className="review-card__group-label" id={labelId}>
                    <span className="review-card__group-vendor" title={vendor.name}>{vendor.name}</span>
                    <span className="review-card__group-count type-body-sm">{plural(brands.length, 'brand', 'brands')}</span>
                  </div>
                  <ul className="review-card__group-rows" aria-labelledby={labelId}>
                    <AnimatePresence initial={false}>
                      {brands.map((brand) => (
                        <BrandItem key={brand.id} brandId={brand.id} reduced={reduced}>
                          <ReviewRow
                            as="div"
                            type="brand"
                            name={brand.name}
                            onRemove={onSelectedBrandsChange ? () => remove(brand) : undefined}
                            removeBlockedReason={brands.length === 1 ? 'Each vendor needs a brand' : undefined}
                          />
                        </BrandItem>
                      ))}
                    </AnimatePresence>
                  </ul>
                </li>
              )
            })}
          </ScrollBox>
        </section>
        {/* Undo for the latest removal, over the lists' bottom edge. Its region is polite: "Cheerios removed" is announced there, once. */}
        <ToastRegion toast={toast} onDismiss={() => setToast(null)} className="review-card__toast" />
      </div>

      <section className="review-card__section">
        {/* No Optional tag here: the Presets stat carries it (R6). */}
        <SectionHeader title="Global presets" pictogram="presets" editLabel="Edit presets" onEdit={() => onEdit('presets')} />
        <dl className="review-card__strip review-card__presets">
          <PresetReadout label="Effective date" value={effectiveDate ? formatShort(effectiveDate) : null} />
          <PresetReadout label="Currency" value={labelOf(currencyOptions, presets.currency, true)} />
          <PresetReadout label="Pricing model" value={labelOf(pricingModelOptions, presets.pricingModel)} />
        </dl>
      </section>

    </div>
  )
}
