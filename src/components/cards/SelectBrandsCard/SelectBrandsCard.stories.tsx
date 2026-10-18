import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'
import { incompleteSample, selectedSample, step2Vendors } from '../../../data/brandSamples'
import { brands } from '../../../data/brands'
import { SelectBrandsCard } from './SelectBrandsCard'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/select-brands-card.md?raw'

const step2Brands = brands.filter((brand) => step2Vendors.some((vendor) => vendor.id === brand.vendorId))

const meta = {
  title: 'Cards/SelectBrandsCard',
  component: SelectBrandsCard,
  args: { vendors: step2Vendors, brands: step2Brands, selectedIds: new Set<string>(), onChange: () => {} },
  // Controlled card; each story keeps the selection in local state. The frame is the shell's fixed 644.
  render: function Render(args) {
    const [selected, setSelected] = useState(args.selectedIds)
    return (
      <div style={{ height: 644 }}>
        <SelectBrandsCard {...args} selectedIds={selected} onChange={setSelected} />
      </div>
    )
  },
  parameters: {
    layout: 'padded',
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Select brands card 772:2750).
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=772-2750',
    },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'SelectBrandsCard — step 2: brand list (left) + Selected brands panel (right, full height).\n\n' +
          'Step 2 of the wizard. Search by brand (or vendor) name; check brands in the list (click, or arrows + Enter from the search), or use each vendor\'s select all. ' +
          'Checked brands appear as chips on the right, grouped by vendor; a chip\'s × unchecks it. ' +
          'Next unblocks once every vendor has at least one brand (`isBrandStepComplete`). Shown in the shell\'s fixed 644 frame: the list and the chips scroll inside themselves.',
      },
    },
  },
} satisfies Meta<typeof SelectBrandsCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    // Known exception: Brand list scroll region isn't a Tab stop (docs/open-questions.md). Reported, not failed.
    a11y: { test: 'todo' },
    docs: { description: { story: 'Figma State=Default (02a): nothing checked.' } },
  },
}

export const Selected: Story = {
  args: { selectedIds: selectedSample },
  parameters: {
    // Known exception: Brand list scroll region isn't a Tab stop (docs/open-questions.md). Reported, not failed.
    a11y: { test: 'todo' },
    docs: { description: { story: 'Figma State=Selected (02b): Cargill 4 of 5, General Mills all 9, Kraft Heinz 3 of 8.' } },
  },
}

export const Incomplete: Story = {
  args: { selectedIds: incompleteSample },
  parameters: {
    // Known exception: Brand list scroll region isn't a Tab stop (docs/open-questions.md). Reported, not failed.
    a11y: { test: 'todo' },
    docs: { description: { story: 'Figma State=Incomplete (02d/02e): Kraft Heinz has none, so the badge stays to-do.' } },
  },
}

export const NoResults: Story = {
  name: 'No results',
  args: { selectedIds: selectedSample },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('searchbox', { name: 'Search by brand' })
    await userEvent.type(input, 'xyz')
  },
  parameters: { docs: { description: { story: 'Figma State=No results (02c): "xyz" typed.' } } },
}
