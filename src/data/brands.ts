/*
  Sample brands, shared by the stories and the app.
  From Figma's step 2 Brand list (illustrative only). Numbers are SKU counts.
*/
import { findMatch } from './search'
import type { Vendor } from './vendors'

export interface Brand {
  id: string
  name: string
  vendorId: string
  skuCount: number
}

const sample: Record<string, [name: string, skuCount: number][]> = {
  cargill: [['Clear Valley', 7], ['Diamond Crystal', 9], ['Honeysuckle White', 31], ['Sterling Silver', 14], ['Truvia', 4]],
  'general-mills': [
    ["Annie's", 11], ['Betty Crocker', 42], ['Cheerios', 12], ['Lucky Charms', 6], ['Nature Valley', 27],
    ['Old El Paso', 19], ['Pillsbury', 35], ['Progresso', 24], ["Totino's", 8],
  ],
  'kraft-heinz': [
    ['Heinz', 21], ['Jell-O', 16], ['Kool-Aid', 10], ['Kraft', 33], ['Lunchables', 13],
    ['Oscar Mayer', 23], ['Philadelphia', 18], ['Velveeta', 6],
  ],
}

const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const brands: Brand[] = Object.entries(sample).flatMap(([vendorId, list]) =>
  list.map(([name, skuCount]) => ({ id: `${vendorId}--${slug(name)}`, name, vendorId, skuCount })),
)

/** Step 2's rule, shared by the card and the wizard: every vendor has at least one selected brand. */
export function isBrandStepComplete(vendors: Vendor[], brandList: Brand[], selectedIds: Set<string>) {
  return vendors.every((vendor) => brandList.some((brand) => brand.vendorId === vendor.id && selectedIds.has(brand.id)))
}

/** Live filter: the brand name matches, or the vendor name matches (then all its brands show).
    Ignores accents and punctuation, like the vendor search (src/data/search.ts). */
export function matchesBrand(brand: Brand, vendor: Vendor, query: string) {
  if (query.trim() === '') return true
  return Boolean(findMatch(brand.name, query) || findMatch(vendor.name, query))
}
