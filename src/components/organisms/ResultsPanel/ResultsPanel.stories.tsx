import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { matchesVendor, vendors } from '../../../data/vendors'
import { ResultsPanel } from './ResultsPanel'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/results-panel.md?raw'

const meta = {
  title: 'Organisms/ResultsPanel',
  component: ResultsPanel,
  args: {
    'aria-label': 'Vendor name or ESN',
    query: 'ca',
    items: vendors.filter((v) => matchesVendor(v, 'ca')),
    selectedKeys: new Set(['cargill']),
    onSelect: fn(),
  },
  decorators: [(Story) => <div style={{ width: 640 }}><Story /></div>],
  parameters: {
    a11y: {
      // The Results panel scrolls past 6 results; it's reached via arrow keys from the search (aria-activedescendant), which axe can't detect. Answered Oct 18.
      config: { rules: [{ id: 'scrollable-region-focusable', enabled: false }] },
    },
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Results panel 688:249).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=688-249' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'ResultsPanel — floating listbox under the vendor search (Elevation/2). Esc / click outside / blur close it.\n\n' +
          'The list of matching vendors that floats under the search field, same width as the input. Six rows show, then it scrolls inside. ' +
          'Picking a vendor adds it at once; vendors already added show as Selected, and picking one again does nothing. ' +
          'In the Select vendors card it sits in an Autocomplete, so focus stays in the search and arrows plus Enter pick rows. Closing (Esc, click outside, blur) is the card\'s job.',
      },
    },
  },
} satisfies Meta<typeof ResultsPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Results: Story = {}

export const NoResults: Story = {
  name: 'No results',
  args: { query: 'xyz', items: [] },
}

export const Scrolling: Story = {
  args: { query: '', items: vendors },
  parameters: { docs: { description: { story: 'All seven sample vendors: six show, the list scrolls inside.' } } },
}

export const TryIt: Story = {
  name: 'Try it',
  render: (args) => {
    const [selected, setSelected] = useState(new Set<string>())
    return (
      <ResultsPanel
        {...args}
        query=""
        items={vendors}
        selectedKeys={selected}
        onSelect={(vendor) => setSelected((prev) => new Set(prev).add(vendor.id))}
      />
    )
  },
  parameters: { docs: { description: { story: 'Click rows (or Tab in and use arrows + Enter) to add vendors. Clicking an added one does nothing.' } } },
}
