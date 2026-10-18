import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup } from 'react-aria-components'
import { IconButton } from '../IconButton'
import { OptionTile } from './OptionTile'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/option-tile.md?raw'

const meta = {
  title: 'Molecules/OptionTile',
  component: OptionTile,
  args: { value: 'next-month', label: 'Next month', description: 'Nov 1, 2026', layout: 'inline' },
  argTypes: { layout: { control: 'inline-radio', options: ['stacked', 'inline'] } },
  // A tile is one radio in a group.
  render: (args) => (
    <RadioGroup aria-label="Effective date" defaultValue="none" style={{ display: 'grid', gap: 'var(--space-8)', width: 282 }}>
      <OptionTile value="none" label="No default" />
      <OptionTile {...args} />
    </RadioGroup>
  ),
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Option tile 816:419).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=816-419' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'OptionTile — radio choice as a full tile (min-height 56); whole tile is the label.\n\n' +
          'One choice in a step 3 preset: the whole tile is the radio\'s label, so clicking anywhere selects it. ' +
          '**Stacked** puts the description under the label, **Inline** beside it. Selected tiles turn soft teal with a thicker border. ' +
          'Arrow keys move the selection within the group (one Tab stop per group). An optional action button (Custom date\'s calendar) sits beside the radio as its own Tab stop.',
      },
    },
  },
} satisfies Meta<typeof OptionTile>

export default meta
type Story = StoryObj<typeof meta>

export const Inline: Story = {}
export const Stacked: Story = { args: { value: 'usd', label: 'Next quarter', description: 'Jan 1, 2027', layout: 'stacked' } }

export const WithAction: Story = {
  name: 'With action',
  args: {
    value: 'custom',
    label: 'Custom date',
    description: 'Pick a date',
    action: <IconButton icon="calendar" aria-label="Choose custom date" />,
  },
  parameters: { docs: { description: { story: 'Custom date: the calendar button is a sibling of the radio with its own name and Tab stop.' } } },
}

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 282px)', gap: 'var(--space-16) var(--space-24)' }}>
      {(['stacked', 'inline'] as const).map((layout) => (
        <div key={layout} style={{ display: 'grid', gap: 'var(--space-8)' }}>
          <RadioGroup aria-label={`${layout}: default, hover, pressed`} style={{ display: 'grid', gap: 'var(--space-8)' }}>
            <OptionTile value="a" layout={layout} label="Default" description="Nov 1, 2026" />
            <OptionTile value="b" layout={layout} label="Hover" description="Nov 1, 2026" data-state="hover" />
            <OptionTile value="c" layout={layout} label="Pressed" description="Nov 1, 2026" data-state="pressed" />
          </RadioGroup>
          <RadioGroup aria-label={`${layout}: selected`} defaultValue="d">
            <OptionTile value="d" layout={layout} label="Selected" description="Nov 1, 2026" />
          </RadioGroup>
          <RadioGroup aria-label={`${layout}: selected hover`} defaultValue="e">
            <OptionTile value="e" layout={layout} label="Selected hover" description="Nov 1, 2026" data-state="hover" />
          </RadioGroup>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'The 10 Figma variants: Stacked and Inline × Default, Hover, Pressed, Selected, Selected hover (hover and pressed forced for this story only).' } },
  },
}
