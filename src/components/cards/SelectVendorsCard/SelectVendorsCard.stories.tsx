import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { vendors, type Vendor } from '../../../data/vendors'
import { mockVendors } from '../../../data/mockVendors'
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
          'Pick one (click, or arrows + Enter) to add it at once: the search clears and the results close, with focus still in the search for the next name. ' +
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
    // Two polite regions: the card's (results, added, restored) and the toast's (removed).
    const cardStatus = () => canvasElement.querySelector('.select-vendors-card > [role="status"]')!
    const toastStatus = () => canvasElement.querySelector('.toast-region')!
    const order = () => [...canvasElement.querySelectorAll('.select-vendors-card__list > li:not([data-exiting])')].map((li) => li.getAttribute('data-vendor-id'))

    // Type, then Enter adds the highlighted match; the search clears, the results close, focus stays.
    await userEvent.click(search)
    await userEvent.keyboard('Cargill')
    await userEvent.keyboard('{Enter}')
    await expect(await canvas.findByRole('button', { name: 'Remove Cargill' })).toBeInTheDocument()
    await expect(cardStatus()).toHaveTextContent('Cargill added')
    await expect(search).toHaveValue('')
    await expect(canvas.queryByRole('listbox')).not.toBeInTheDocument()
    await expect(search).toHaveFocus()

    // A mouse pick does the same, and the newest vendor goes first.
    await userEvent.keyboard('General')
    await userEvent.click(await canvas.findByRole('option', { name: /^General Mills/ }))
    await expect(await canvas.findByRole('button', { name: 'Remove General Mills' })).toBeInTheDocument()
    await expect(search).toHaveFocus()
    await expect(order()).toEqual(['general-mills', 'cargill'])

    // Remove: the toast says so (once) and offers Undo; focus moves to the next card's Remove.
    await userEvent.click(canvas.getByRole('button', { name: 'Remove General Mills' }))
    await expect(toastStatus()).toHaveTextContent('General Mills removed')
    await expect(canvas.getByRole('button', { name: 'Remove Cargill' })).toHaveFocus()

    // Undo puts it back in its original slot and focuses its Remove.
    await userEvent.click(canvas.getByRole('button', { name: 'Undo' }))
    await expect(await canvas.findByRole('button', { name: 'Remove General Mills' })).toHaveFocus()
    await expect(order()).toEqual(['general-mills', 'cargill'])
    await expect(cardStatus()).toHaveTextContent('General Mills restored')

    // Remove both: the empty state returns and focus goes back to the search.
    await userEvent.click(canvas.getByRole('button', { name: 'Remove General Mills' }))
    await userEvent.click(canvas.getByRole('button', { name: 'Remove Cargill' }))
    await expect(await canvas.findByText('No vendors selected yet')).toBeInTheDocument()
    await expect(toastStatus()).toHaveTextContent('Cargill removed')
    await expect(search).toHaveFocus()
    // Let the fades finish before the a11y check: half-faded text would fail contrast.
    await new Promise((resolve) => setTimeout(resolve, 1300))
  },
  parameters: {
    docs: { description: { story: 'Automated: add with Enter and with a click (newest first), remove, Undo back to the same slot, remove all; checks announcements and where focus goes.' } },
  },
}

/* ---------- Motion (Step 1 motion pass) ---------- */

export const MotionDemo: Story = {
  name: 'Motion: add and remove',
  args: { vendors: mockVendors, selected: mockVendors.slice(0, 5) },
  render: function Render(args) {
    const [selected, setSelected] = useState<Vendor[]>(args.selected)
    return (
      <div style={{ height: 644, display: 'flex' }}>
        <SelectVendorsCard {...args} selected={selected} onChange={setSelected} className="motion-demo-card" />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'In the fixed 644 frame, with the 60 mock vendors. Add one: the others glide one slot along, the new card fades in top-left, then its highlight fades. ' +
          'Remove one (trash): it fades and shrinks, the rest glide into the gap, and a toast offers Undo for 5 seconds (paused while hovered or focused). ' +
          'Remove all five for the cross-fade to the empty state. Switch the toolbar\'s Motion to Reduced: fades only.',
      },
    },
  },
}
