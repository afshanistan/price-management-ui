import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListBox } from 'react-aria-components'
import { ResultRow } from './ResultRow'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/result-row.md?raw'

const meta = {
  title: 'Molecules/ResultRow',
  component: ResultRow,
  args: { id: 'cargill', name: 'Cargill', meta: 'DEMO-0022', wordmark: 'CGL', select: 'single' },
  argTypes: { select: { control: 'inline-radio', options: ['single'] } },
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
          '**Single only for now**: Multi (brand list, with a checkbox) comes with the step 2 specs.',
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
