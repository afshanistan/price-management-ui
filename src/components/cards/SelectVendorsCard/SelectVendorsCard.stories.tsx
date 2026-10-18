import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'
import { vendors, type Vendor } from '../../../data/vendors'
import { SelectVendorsCard } from './SelectVendorsCard'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/select-vendors-card.md?raw'

const byId = (...ids: string[]) => ids.map((id) => vendors.find((v) => v.id === id)!)

const meta = {
  title: 'Cards/SelectVendorsCard',
  component: SelectVendorsCard,
  args: {
    vendors,
    selected: [],
    onChange: () => {},
  },
  // The card is controlled; each story keeps the selection in local state so it's fully interactive.
  render: function Render(args) {
    const [selected, setSelected] = useState<Vendor[]>(args.selected)
    return <SelectVendorsCard {...args} selected={selected} onChange={setSelected} />
  },
  parameters: {
    layout: 'padded',
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Select vendors card 689:358).
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=689-358',
    },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'SelectVendorsCard — step 1: search vendors, selected vendor cards.\n\n' +
          'Step 1 of the wizard. Type a vendor name or ESN; matches appear as you type in a panel under the field. ' +
          'Pick one (click, or arrows + Enter) to add it at once: focus and the query stay, so you can add several in a row. ' +
          'Added vendors show below, three across, each with a Remove button; with none, an empty state shows. ' +
          'Screen readers hear result counts and "Cargill added" / "Cargill removed". The state (default, searching, selected) comes from the data, never a prop.',
      },
    },
  },
} satisfies Meta<typeof SelectVendorsCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Figma State=Default (screen 01a). Click in the search and type.' } } },
}

export const Searching: Story = {
  args: { selected: byId('cargill') },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('searchbox', { name: 'Vendor name or ESN' })
    await userEvent.click(input)
    await userEvent.type(input, 'ca')
  },
  parameters: {
    docs: { description: { story: 'Figma State=Searching (screen 01b): "ca" typed, Cargill already added. Arrows move through the results; Enter adds; Esc clears.' } },
  },
}

export const Selected: Story = {
  args: { selected: byId('cargill', 'general-mills', 'kraft-heinz') },
  parameters: { docs: { description: { story: 'Figma State=Selected (screen 01c). Remove a vendor: focus moves to the next Remove, or back to the search when none are left.' } } },
}
