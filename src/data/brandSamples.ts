/*
  Sample selections for the step 2 stories (from select-brands-card.md).
  Selected: Cargill 4 of 5 (all but Honeysuckle White), General Mills 9 of 9, Kraft Heinz 3 of 8.
  Incomplete: the same with Kraft Heinz at 0.
*/
import { brands } from './brands'
import { vendors } from './vendors'

export const step2Vendors = ['cargill', 'general-mills', 'kraft-heinz'].map((id) => vendors.find((v) => v.id === id)!)

const ids = (vendorId: string, names?: string[]) =>
  brands.filter((b) => b.vendorId === vendorId && (!names || names.includes(b.name))).map((b) => b.id)

export const selectedSample = new Set([
  ...ids('cargill').filter((id) => id !== 'cargill--honeysuckle-white'),
  ...ids('general-mills'),
  ...ids('kraft-heinz', ['Heinz', 'Kraft', 'Philadelphia']),
])

export const incompleteSample = new Set([...selectedSample].filter((id) => !id.startsWith('kraft-heinz--')))

export const brandsByVendor = Object.fromEntries(step2Vendors.map((v) => [v.id, brands.filter((b) => b.vendorId === v.id)]))
