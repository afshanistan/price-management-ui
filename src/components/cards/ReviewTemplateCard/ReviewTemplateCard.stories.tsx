import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDate } from '@internationalized/date'
import { fn } from 'storybook/test'
import { selectedSample, step2Vendors } from '../../../data/brandSamples'
import { brands, type Brand } from '../../../data/brands'
import { mockBrands } from '../../../data/mockBrands'
import { mockVendors } from '../../../data/mockVendors'
import { initialPresets } from '../../../data/presets'
import { byVendorName } from '../../../data/vendors'
import { ReviewTemplateCard, type ReviewTemplateCardProps } from './ReviewTemplateCard'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/review-template-card.md?raw'

// Stories freeze today at Oct 17, 2026, so Next month = Nov 1, 2026.
const today = new CalendarDate(2026, 10, 17)
const sampleBrands = brands.filter((brand) => selectedSample.has(brand.id))

// The heaviest realistic template (pressure test, Oct 18): 12 vendors, 122 brands, long names, both Coca-Colas.
const heavyPicks: Record<string, number> = {
  pepsico: 18, 'coca-cola': 15, 'coca-cola-consolidated': 6, conagra: 14, 'general-mills': 15, 'kraft-heinz': 14,
  'nestle-usa': 10, mars: 10, cargill: 8, chiquita: 3, treehouse: 4, tillamook: 5,
}
const heavyVendors = Object.keys(heavyPicks).map((id) => mockVendors.find((v) => v.id === id)!).sort(byVendorName)
const heavyBrands = Object.entries(heavyPicks).flatMap(([id, n]) => mockBrands.filter((b) => b.vendorId === id).slice(0, n))

/* Removing a brand works in the stories: the card's picks live in story state, as in the app. */
function Live(args: ReviewTemplateCardProps) {
  const [picked, setPicked] = useState<Brand[]>(args.selectedBrands)
  return <ReviewTemplateCard {...args} selectedBrands={picked} onSelectedBrandsChange={setPicked} />
}

const meta = {
  title: 'Cards/ReviewTemplateCard',
  component: ReviewTemplateCard,
  args: {
    vendors: step2Vendors,
    selectedBrands: sampleBrands,
    // Nov 1, 2026 · USD · No default = 2 of 3.
    presets: { ...initialPresets, effectiveDate: { source: 'next-month', date: null }, currency: 'USD' },
    today,
    onEdit: fn(),
  },
  render: (args) => <Live {...args} />,
  parameters: {
    layout: 'padded',
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Review template card 830:2654).
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=830-2654',
    },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'ReviewTemplateCard — step 4: summary strip, Vendors | Brands scrolling lists, presets strip.\n\n' +
          'Step 4 of the wizard: three big numbers, the chosen vendors and brands side by side, and the three presets. ' +
          'Brands are grouped under a quiet label per vendor that sticks while you scroll; each brand has a trash to remove it (with Undo), except a vendor\'s last brand. ' +
          'Both lists have a plum top edge and scroll past 230px, with a soft shadow on any edge that has more to scroll to. ' +
          'The three **Edit** buttons ("Edit vendors" / "Edit brands" / "Edit presets") jump back to that step with every choice kept. ' +
          'The footer\'s "Download template" finishes the wizard. (Step 4 design review, Oct 19.)',
      },
    },
  },
} satisfies Meta<typeof ReviewTemplateCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'The step 2 sample (Cargill 4, General Mills 9, Kraft Heinz 3 = 16 brands) with Nov 1, 2026 and US dollar set: "2 of 3". Remove a brand to see the Undo toast.' } } },
}

export const LongLists: Story = {
  name: 'Long lists',
  args: { selectedBrands: brands },
  parameters: { docs: { description: { story: 'All 22 sample brands: the Brands list scrolls (shadow at the bottom); the Vendors box stretches so the bottoms align.' } } },
}

export const Heavy: Story = {
  name: 'Heavy: 12 vendors, 122 brands',
  args: {
    vendors: heavyVendors,
    selectedBrands: heavyBrands,
    presets: { effectiveDate: { source: 'next-quarter', date: null }, currency: 'CAD', pricingModel: 'cost-plus' },
  },
  parameters: { docs: { description: { story: 'The pressure test: both lists scroll; vendor labels stick while their brands scroll by. All three presets set: "3 of 3".' } } },
}

export const FewItems: Story = {
  name: 'Few items',
  args: {
    vendors: step2Vendors.slice(0, 1),
    selectedBrands: brands.filter((brand) => brand.name === 'Truvia'),
    presets: initialPresets,
  },
  parameters: { docs: { description: { story: 'One vendor, one brand, no presets: "1 Vendor", "1 Brand", "0 of 3", every preset "Decide later". The last brand\'s trash is blocked, with a tooltip.' } } },
}
