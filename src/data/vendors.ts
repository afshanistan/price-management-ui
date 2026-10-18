/*
  Sample vendors, shared by the stories and the app.
  Taken from the Final Comps screens 01b (searching) and 01c (selected). Illustrative only.
*/
export interface Vendor {
  id: string
  name: string
  /** Vendor number, e.g. "DEMO-0022". */
  esn: string
  /** Placeholder wordmark for the Vendor logo until real logos exist. */
  wordmark: string
  /** Logo file URLs (mock vendors only): brand colors, and single color when the artwork allows it. */
  logo?: { color: string; mono?: string }
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

/** Live filter: vendor name or ESN contains the query, ignoring case. */
export function matchesVendor(vendor: Vendor, query: string) {
  const q = query.trim().toLowerCase()
  return q === '' || vendor.name.toLowerCase().includes(q) || vendor.esn.toLowerCase().includes(q)
}
