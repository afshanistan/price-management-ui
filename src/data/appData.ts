/*
  The data the app runs on: the one place to swap the source. Components never import a data set
  directly; App does, from here. Today it's the 60 mock vendors (realistic names, ESNs and logos).
  When a real vendor API exists, only this file changes. Storybook keeps the Final Comps set
  (vendors.ts) so the comp stories stay exact.
*/
import { mockVendors } from './mockVendors'
import type { Vendor } from './vendors'

export const appVendors: Vendor[] = mockVendors
