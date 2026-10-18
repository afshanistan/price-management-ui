import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CheckboxChecked } from '../../atoms/Checkbox'
import { GroupHeader } from './GroupHeader'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/group-header.md?raw'

const meta = {
  title: 'Molecules/GroupHeader',
  component: GroupHeader,
  args: { vendor: 'Cargill', count: '4 of 5' },
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
          'Labels each vendor\'s group of brands in the Brand list, with "N of M" selected and a tri-state select-all checkbox (a tab stop: "Select all Cargill brands"). ' +
          'Not a heading. In the list it sticks to the top while its brands scroll.',
      },
    },
  },
} satisfies Meta<typeof GroupHeader>

export default meta
type Story = StoryObj<typeof meta>

export const WithSelectAll: Story = {
  name: 'With select all',
  render: (args) => {
    const [checked, setChecked] = useState<CheckboxChecked>('mixed')
    return (
      <GroupHeader
        {...args}
        selectAll={{ checked, label: 'Select all Cargill brands', onChange: () => setChecked(checked === true ? false : true) }}
      />
    )
  },
  parameters: { docs: { description: { story: 'Mixed (some selected). Click: Mixed or unchecked selects all; checked clears.' } } },
}

export const LabelOnly: Story = { name: 'Label only' }
