import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Autocomplete } from 'react-aria-components'
import { TextField } from '../../molecules/TextField'
import { brandsByVendor, selectedSample, step2Vendors } from '../../../data/brandSamples'
import { matchesBrand } from '../../../data/brands'
import { BrandList, type BrandListGroup } from './BrandList'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/brand-list.md?raw'

/* The card does this filtering; the stories repeat it so the list can be tried alone. */
function groupsFor(query: string, selected: Set<string>): BrandListGroup[] {
  return step2Vendors
    .map((vendor) => {
      const all = brandsByVendor[vendor.id]
      return {
        vendor,
        brands: all.filter((brand) => matchesBrand(brand, vendor, query)),
        selectedCount: all.filter((brand) => selected.has(brand.id)).length,
        totalCount: all.length,
      }
    })
    .filter((group) => group.brands.length > 0)
}

/* As in the card: the list sits under a search in an Autocomplete, so focus stays in the search. */
function Interactive({ query: initialQuery, initial }: { query: string; initial: Set<string> }) {
  const [selected, setSelected] = useState(initial)
  const [query, setQuery] = useState(initialQuery)
  const groups = groupsFor(query, selected)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)', width: 524, height: 520 }}>
      <Autocomplete inputValue={query} onInputChange={setQuery}>
      <TextField label="Search by brand" placeholder="Search brands" />
      <BrandList
        groups={groups}
        query={query}
        selectedIds={selected}
        onSelectionChange={setSelected}
        onSelectAll={(vendorId) => {
          const visible = groups.find((g) => g.vendor.id === vendorId)!.brands.map((b) => b.id)
          const allOn = visible.every((id) => selected.has(id))
          const next = new Set(selected)
          visible.forEach((id) => (allOn ? next.delete(id) : next.add(id)))
          setSelected(next)
        }}
      />
      </Autocomplete>
    </div>
  )
}

const meta = {
  title: 'Organisms/BrandList',
  component: BrandList,
  parameters: {
    a11y: {
      // List is reached via arrow keys from the search (aria-activedescendant); axe can't detect this. Answered Oct 18.
      config: { rules: [{ id: 'scrollable-region-focusable', enabled: false }] },
    },
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Brand list 744:777).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=744-777' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'BrandList — multi-select listbox of brands grouped by vendor.\n\n' +
          'Every brand of the vendors picked on step 1, grouped by vendor under a sticky Group header with "N of M" and a tri-state select all. ' +
          'Rows are multi Result rows; click (or arrows + Enter from the card\'s search) to check them. ' +
          'In the card it fills the space under the search and scrolls inside itself; groups with no matches drop out. These stories include the search, as in the card.',
      },
    },
  },
} satisfies Meta<typeof BrandList>

export default meta
type Story = StoryObj<typeof meta>

const placeholderArgs = { groups: [], query: '', selectedIds: new Set<string>(), onSelectionChange: () => {}, onSelectAll: () => {} }

export const Default: Story = {
  args: placeholderArgs,
  render: () => <Interactive query="" initial={new Set()} />,
  parameters: {
    docs: { description: { story: 'Nothing checked. Scroll: the group headers stick.' } },
  },
}

export const Selected: Story = {
  args: placeholderArgs,
  render: () => <Interactive query="" initial={selectedSample} />,
  parameters: {
    docs: { description: { story: 'Cargill 4 of 5 (Mixed), General Mills 9 of 9, Kraft Heinz 3 of 8.' } },
  },
}

export const Searching: Story = {
  args: placeholderArgs,
  render: () => <Interactive query="cr" initial={selectedSample} />,
  parameters: { docs: { description: { story: '"cr": matches are bold; select all acts on the visible matches ("Select 2 matches").' } } },
}

export const NoResults: Story = {
  name: 'No results',
  args: placeholderArgs,
  render: () => <Interactive query="xyz" initial={selectedSample} />,
}
