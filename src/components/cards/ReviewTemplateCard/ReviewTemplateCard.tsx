import type { CalendarDate } from '@internationalized/date'
import type { Brand } from '../../../data/brands'
import { currencyOptions, effectiveDateOf, formatShort, NO_DEFAULT, presetsSetCount, pricingModelOptions, type GlobalPresetsValue } from '../../../data/presets'
import type { Vendor } from '../../../data/vendors'
import { Pictogram, type PictogramType } from '../../atoms/Pictogram'
import { Button } from '../../molecules/Button'
import { CardHeader } from '../../molecules/CardHeader'
import { PresetReadout } from '../../molecules/PresetReadout'
import { ReviewRow } from '../../molecules/ReviewRow'
import { SummaryStat } from '../../molecules/SummaryStat'
import { Tag } from '../../molecules/Tag'
import './ReviewTemplateCard.css'

export type ReviewEditStep = 'vendors' | 'brands' | 'presets'

export interface ReviewTemplateCardProps {
  /** From step 1, in that order. */
  vendors: Vendor[]
  /** From step 2. Listed grouped by vendor, in step 1 order. */
  selectedBrands: Brand[]
  /** From step 3. */
  presets: GlobalPresetsValue
  /** For Next month / Next quarter. Stories freeze it. */
  today: CalendarDate
  /** Edit = jump to that step; the wizard carries on from there with every choice kept. */
  onEdit: (step: ReviewEditStep) => void
  className?: string
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`
const labelOf = (options: { value: string; label: string }[], value: string) =>
  value === NO_DEFAULT ? null : (options.find((option) => option.value === value)?.label ?? null)

/* "Vendors" + pictogram as an H2, and the Edit button: visible "Edit", named "Edit vendors". */
function SectionHeader({ title, pictogram, editLabel, optional, onEdit }: { title: string; pictogram: PictogramType; editLabel: string; optional?: boolean; onEdit: () => void }) {
  return (
    <div className="review-card__section-header">
      <div className="review-card__section-title">
        <Pictogram type={pictogram} size={20} className="review-card__pictogram" />
        <h2 className="review-card__h2">{title}</h2>
        {optional && <Tag>Optional</Tag>}
      </div>
      {/* No edit icon yet: the placeholder (docs/open-questions.md, "Edit icon"). */}
      <Button size="xsmall" hierarchy="tertiary" leadingIcon="placeholder" aria-label={editLabel} onPress={onEdit}>
        Edit
      </Button>
    </div>
  )
}

/** Step 4: the summary, the vendors and brands side by side, and the presets. Read-only, plus three Edit buttons. */
export function ReviewTemplateCard({ vendors, selectedBrands, presets, today, onEdit, className }: ReviewTemplateCardProps) {
  const brandsInOrder = vendors.flatMap((vendor) => selectedBrands.filter((brand) => brand.vendorId === vendor.id))
  const brandCountOf = (vendorId: string) => selectedBrands.filter((brand) => brand.vendorId === vendorId).length
  const vendorNameOf = (vendorId: string) => vendors.find((vendor) => vendor.id === vendorId)?.name ?? ''
  const setCount = presetsSetCount(presets)
  const effectiveDate = effectiveDateOf(presets.effectiveDate, today)

  return (
    <div className={className ? `review-card ${className}` : 'review-card'}>
      {/* No review pictogram exists: Figma uses Placeholder (docs/open-questions.md). */}
      <CardHeader
        title="Congrats! Your template is ready for download"
        pictogram="placeholder"
        description="Confirm the scope and defaults for your pricing template."
      />

      <div className="review-card__strip">
        <SummaryStat value={String(vendors.length)} label="Vendors" status="complete" srLabel={`${plural(vendors.length, 'vendor', 'vendors')}, complete`} />
        <SummaryStat value={String(brandsInOrder.length)} label="Brands" status="complete" srLabel={`${plural(brandsInOrder.length, 'brand', 'brands')}, complete`} />
        <SummaryStat value={`${setCount} of 3`} label="Presets set" status="optional" srLabel={`${setCount} of 3 presets set, optional`} />
      </div>

      <div className="review-card__scope">
        <section className="review-card__section">
          <SectionHeader title="Vendors" pictogram="vendor" editLabel="Edit vendors" onEdit={() => onEdit('vendors')} />
          {/* Focusable so keyboard users can scroll it. */}
          <ul className="review-card__list" tabIndex={0} aria-label={`Vendors, ${vendors.length}`}>
            {vendors.map((vendor) => (
              <ReviewRow key={vendor.id} type="vendor" name={vendor.name} wordmark={vendor.wordmark} logo={vendor.logo} brandCount={brandCountOf(vendor.id)} esn={vendor.esn} />
            ))}
          </ul>
        </section>
        <section className="review-card__section">
          <SectionHeader title="Brands" pictogram="brand" editLabel="Edit brands" onEdit={() => onEdit('brands')} />
          <ul className="review-card__list" tabIndex={0} aria-label={`Brands, ${brandsInOrder.length}`}>
            {brandsInOrder.map((brand) => (
              <ReviewRow key={brand.id} type="brand" name={brand.name} vendorName={vendorNameOf(brand.vendorId)} />
            ))}
          </ul>
        </section>
      </div>

      <section className="review-card__section">
        <SectionHeader title="Global presets" pictogram="presets" editLabel="Edit presets" optional onEdit={() => onEdit('presets')} />
        <dl className="review-card__strip review-card__presets">
          <PresetReadout label="Effective date" value={effectiveDate ? formatShort(effectiveDate) : null} />
          <PresetReadout label="Currency" value={labelOf(currencyOptions, presets.currency)} />
          <PresetReadout label="Pricing model" value={labelOf(pricingModelOptions, presets.pricingModel)} />
        </dl>
      </section>
    </div>
  )
}
