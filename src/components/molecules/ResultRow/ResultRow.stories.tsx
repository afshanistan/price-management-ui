import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListBox } from 'react-aria-components'
import { ResultRow } from './ResultRow'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/result-row.md?raw'

const meta = {
  title: 'Molecules/ResultRow',
  component: ResultRow,
  args: { id: 'cargill', name: 'Cargill', meta: 'DEMO-0022', wordmark: 'CGL', select: 'single' },
  argTypes: { select: { control: 'inline-radio', options: ['single', 'multi'] } },
  // A row is an option, so it always sits in a listbox.
  render: (args) => (
    <ListBox aria-label="Vendors" selectionMode="multiple" style={{ width: 600 }}>
      <ResultRow {...args} />
    </ListBox>
  ),
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Result row 678:174).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=678-174' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'ResultRow — option in a listbox (vendor search single, brand list multi). Keyboard active = fill + 2px inset focus outline; mouse hover = fill only.\n\n' +
          'A vendor in the search results: logo, name and ESN. Hover, keyboard highlight and press share one light fill; only the keyboard highlight adds the inset ring. ' +
          'Pressing turns the logo teal; once added, the row shows "Selected" instead of the ESN. Its accessible name is "Cargill, DEMO-0022". ' +
          '**Multi** (step 2 brand list) swaps the logo for a decorative checkbox and the ESN for the SKU count, read as "Truvia, 4 SKUs".',
      },
    },
  },
} satisfies Meta<typeof ResultRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MatchHighlight: Story = {
  name: 'Match highlight',
  args: { query: 'car', name: 'Carlsberg Group', id: 'carlsberg', meta: 'DEMO-0010', wordmark: 'CARL' },
  parameters: { docs: { description: { story: 'The matched part of the name is bold (not drawn in Figma; the spec asks for it).' } } },
}

export const LongName: Story = {
  name: 'Long name',
  args: { name: 'McCormick & Company International Flavor Ingredients Division', id: 'long', meta: 'DEMO-0017', wordmark: 'MKC' },
  parameters: { docs: { description: { story: 'One line with an ellipsis; the full name shows on hover (title).' } } },
}

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <ListBox aria-label="Vendors (all states)" selectionMode="multiple" defaultSelectedKeys={['selected']} style={{ width: 600 }}>
      <ResultRow id="default" name="Cargill (default)" meta="DEMO-0022" wordmark="CGL" />
      <ResultRow id="hover" name="Cargill (hover)" meta="DEMO-0022" wordmark="CGL" data-state="hover" />
      <ResultRow id="keyboard" name="Cargill (keyboard active)" meta="DEMO-0022" wordmark="CGL" data-state="keyboard" />
      <ResultRow id="pressed" name="Cargill (pressed)" meta="DEMO-0022" wordmark="CGL" data-state="pressed" />
      <ResultRow id="selected" name="Cargill (selected)" meta="DEMO-0022" wordmark="CGL" />
    </ListBox>
  ),
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'The 5 Single variants. Hover, keyboard active and pressed are forced for this story only.' } },
  },
}

/* ---------- Multi (brand list, step 2) ---------- */

export const Multi: Story = {
  args: { select: 'multi', id: 'truvia', name: 'Truvia', skuCount: 4, meta: undefined, wordmark: undefined },
  parameters: { docs: { description: { story: 'A brand in the Brand list: decorative checkbox, name, "SKUs: 4". Read as "Truvia, 4 SKUs". Click to toggle.' } } },
}

export const MultiAllStates: Story = {
  name: 'All states (Multi)',
  render: () => (
    <ListBox
      aria-label="Brands (all states)"
      selectionMode="multiple"
      defaultSelectedKeys={['selected', 'selected-hover', 'selected-keyboard']}
      style={{ width: 524 }}
    >
      <ResultRow select="multi" id="default" name="Clear Valley (default)" skuCount={7} />
      <ResultRow select="multi" id="hover" name="Clear Valley (highlighted)" skuCount={7} data-state="hover" />
      <ResultRow select="multi" id="keyboard" name="Clear Valley (keyboard active)" skuCount={7} data-state="keyboard" />
      <ResultRow select="multi" id="pressed" name="Clear Valley (pressed)" skuCount={7} data-state="pressed" />
      <ResultRow select="multi" id="selected" name="Clear Valley (selected)" skuCount={7} />
      <ResultRow select="multi" id="selected-hover" name="Clear Valley (selected hover)" skuCount={7} data-state="hover" />
      <ResultRow select="multi" id="selected-keyboard" name="Clear Valley (selected keyboard active)" skuCount={7} data-state="keyboard" />
    </ListBox>
  ),
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'The 7 Multi variants. The checkbox\'s hover look follows the row. Square corners until Will answers the radius question.' } },
  },
}
