import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CheckboxChecked } from '../../atoms/Checkbox'
import { GroupHeader } from './GroupHeader'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/group-header.md?raw'

const meta = {
  title: 'Molecules/GroupHeader',
  component: GroupHeader,
  args: { vendor: 'General Mills', count: '3 of 19' },
  decorators: [(Story) => <div style={{ width: 524 }}><Story /></div>],
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Group header 758:377).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=758-377' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'GroupHeader — vendor group label in a list: name, "4 of 5", optional tri-state select-all checkbox. Sticky in code.\n\n' +
          'Labels each vendor\'s group of brands in the Brand list. Left: the vendor name and "N of M" selected. Right: a tri-state select all ("Select all", a tab stop named "Select all Cargill brands") and the caret. ' +
          'The whole bar opens and closes the group (the select-all cluster excepted), and the count ticks when it changes. ' +
          'Teal, not plum, because it\'s a control; the dark teal rule keeps it apart from a hovered row. Not a heading. In the list it sticks to the top while its brands scroll.\n\n' +
          '**Redesigned Oct 19 (step 2 design review)**: the spec below is the old Tone=Subtle export; the Figma redesign is queued in docs/figma-sync.md.',
      },
    },
  },
} satisfies Meta<typeof GroupHeader>

export default meta
type Story = StoryObj<typeof meta>

function Interactive({ startOpen, searching }: { startOpen: boolean; searching?: boolean }) {
  const [checked, setChecked] = useState<CheckboxChecked>('mixed')
  const [open, setOpen] = useState(startOpen)
  const count = checked === true ? 19 : checked === 'mixed' ? 3 : 0
  return (
    <GroupHeader
      vendor="General Mills"
      count={`${count} of 19`}
      selectAll={{
        checked,
        label: searching ? 'Select 2 matches' : 'Select all General Mills brands',
        text: searching ? 'Select 2 matches' : 'Select all',
        onChange: () => setChecked(checked === true ? false : true),
      }}
      expand={{ isExpanded: searching || open, onToggle: () => setOpen(!open), isDisabled: searching }}
    />
  )
}

export const Open: Story = {
  render: () => <Interactive startOpen />,
  parameters: { docs: { description: { story: 'Open, some selected (Mixed). Click the bar to close it; click the box or "Select all" to select the vendor, and watch the count tick.' } } },
}

export const Closed: Story = {
  render: () => <Interactive startOpen={false} />,
  parameters: { docs: { description: { story: 'Closed: the caret points right.' } } },
}

export const WhileSearching: Story = {
  name: 'While searching',
  render: () => <Interactive startOpen searching />,
  parameters: { docs: { description: { story: 'Every group with matches is open while searching, so the bar can\'t close. Select all acts on the matches and says so.' } } },
}

export const LongName: Story = {
  name: 'Long name',
  args: { vendor: 'Tillamook County Creamery Association', count: '0 of 5' },
  render: (args) => (
    <GroupHeader {...args} selectAll={{ checked: false, label: `Select all ${args.vendor} brands`, text: 'Select all', onChange: () => {} }} expand={{ isExpanded: false, onToggle: () => {} }} />
  ),
  parameters: { docs: { description: { story: 'The name gives way first (ellipsis); the count and controls never do.' } } },
}

export const OnBrand: Story = {
  name: 'On brand',
  render: () => (
    <div data-mode="on-brand" style={{ background: 'var(--surface-brand)', padding: 'var(--space-16)' }}>
      <Interactive startOpen />
    </div>
  ),
}

export const LabelOnly: Story = { name: 'Label only' }
