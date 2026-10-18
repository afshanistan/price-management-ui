import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDate } from '@internationalized/date'
import { fn } from 'storybook/test'
import { selectedSample, step2Vendors } from '../../../data/brandSamples'
import { brands } from '../../../data/brands'
import { initialPresets } from '../../../data/presets'
import { ReviewTemplateCard } from './ReviewTemplateCard'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/review-template-card.md?raw'

// Stories freeze today at Oct 17, 2026, so Next month = Nov 1, 2026.
const today = new CalendarDate(2026, 10, 17)
const sampleBrands = brands.filter((brand) => selectedSample.has(brand.id))

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
          'Step 4 of the wizard: three big numbers, the chosen vendors and brands side by side (each list scrolls past 230px and is a Tab stop so keyboard users can scroll it), and the three presets. ' +
          'Everything is read-only except the three **Edit** buttons ("Edit vendors" / "Edit brands" / "Edit presets"), which jump back to that step with every choice kept. ' +
          'The footer\'s "Download template" finishes the wizard.',
      },
    },
  },
} satisfies Meta<typeof ReviewTemplateCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'The step 2 sample (Cargill 4, General Mills 9, Kraft Heinz 3 = 16 brands) with Nov 1, 2026 and USD set.' } } },
}

export const LongLists: Story = {
  name: 'Long lists',
  args: { selectedBrands: brands },
  parameters: { docs: { description: { story: 'All 22 sample brands: the Brands list scrolls; the Vendors box stretches so the bottoms align.' } } },
}

export const FewItems: Story = {
  name: 'Few items',
  args: {
    vendors: step2Vendors.slice(0, 1),
    selectedBrands: brands.filter((brand) => brand.name === 'Truvia'),
    presets: initialPresets,
  },
  parameters: { docs: { description: { story: 'One vendor, one brand, no presets ("0 of 3", all "No default"): the lists shrink.' } } },
}
