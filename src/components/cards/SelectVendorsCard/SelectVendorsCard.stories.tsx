import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
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
    a11y: {
      // The Results panel scrolls past 6 results; it's reached via arrow keys from the search (aria-activedescendant), which axe can't detect. Answered Oct 18.
      config: { rules: [{ id: 'scrollable-region-focusable', enabled: false }] },
    },
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

/* ---------- Interaction test (runs with npm run test-storybook) ---------- */

export const FlowAddAndRemove: Story = {
  name: 'Flow: add and remove a vendor',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const search = canvas.getByRole('searchbox', { name: 'Vendor name or ESN' })
    // Type, then Enter adds the highlighted match; focus and the query stay.
    await userEvent.click(search)
    await userEvent.keyboard('Cargill')
    await userEvent.keyboard('{Enter}')
    await expect(await canvas.findByRole('button', { name: 'Remove Cargill' })).toBeInTheDocument()
    await expect(canvas.getByRole('status')).toHaveTextContent('Cargill added')
    await expect(search).toHaveFocus()
    // Remove: the empty state returns and focus goes back to the search.
    await userEvent.click(canvas.getByRole('button', { name: 'Remove Cargill' }))
    await expect(await canvas.findByText('No vendors selected yet')).toBeInTheDocument()
    await expect(canvas.getByRole('status')).toHaveTextContent('Cargill removed')
    await expect(search).toHaveFocus()
  },
  parameters: { docs: { description: { story: 'Automated: type "Cargill", Enter to add it, then Remove; checks the announcements and where focus goes.' } } },
}
