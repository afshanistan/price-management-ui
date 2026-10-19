/*
  Sample vendors, shared by the stories and the app.
  Taken from the Final Comps screens 01b (searching) and 01c (selected). Illustrative only.
*/
import { searchVendors } from './search'

export interface Vendor {
  id: string
  name: string
  /** Vendor number, e.g. "DEMO-0022". */
  esn: string
  /** Placeholder wordmark for the Vendor logo until real logos exist. */
  wordmark: string
  /** Logo file URLs (mock vendors only): brand colors, and single color when the artwork allows it. */
  logo?: VendorLogoFiles
}

/** Tall and square logos read as small stamps; the Selected item card and the coverage tile leave them out (decision log, Oct 18). */
export const MIN_LOGO_RATIO = 1.5

export interface VendorLogoFiles {
  /** Brand colors, as published. */
  color: string
  /** Single color, drawn in currentColor. Missing when the artwork has no one-color reading. */
  mono?: string
  /** The logo's shape: ink width ÷ height. The Selected item card hides logos under 1.5 (tall or square). */
  ratio?: number
}

export const vendors: Vendor[] = [
  { id: 'cargill', name: 'Cargill', esn: 'DEMO-0022', wordmark: 'CGL' },
  { id: 'campbells', name: "Campbell's", esn: 'DEMO-0015', wordmark: 'CPB' },
  { id: 'carlsberg', name: 'Carlsberg Group', esn: 'DEMO-0010', wordmark: 'CARL' },
  { id: 'mccormick', name: 'McCormick & Company', esn: 'DEMO-0017', wordmark: 'MKC' },
  { id: 'coca-cola', name: 'Coca-Cola Company', esn: 'DEMO-0003', wordmark: 'KO' },
  { id: 'general-mills', name: 'General Mills', esn: 'DEMO-0006', wordmark: 'GIS' },
  { id: 'kraft-heinz', name: 'Kraft Heinz', esn: 'DEMO-0005', wordmark: 'KHC' },
]

/** How an ESN reads everywhere it's shown: "ESN-70441642" (Will, Oct 18). The data keeps the bare number. */
export const ESN_PREFIX = 'ESN-'
export function formatEsn(esn: string) {
  return `${ESN_PREFIX}${esn}`
}

/** Vendors A–Z by name, ignoring a leading "The" (The Coca-Cola Company files under C), as step 2 lists them. */
export function byVendorName(a: Vendor, b: Vendor) {
  const key = (v: Vendor) => v.name.replace(/^the\s+/i, '')
  return key(a).localeCompare(key(b), undefined, { sensitivity: 'base' })
}

/** Live filter by name or ESN, ignoring accents and punctuation (src/data/search.ts). */
export function matchesVendor(vendor: Vendor, query: string) {
  return searchVendors([vendor], query).length > 0
}
