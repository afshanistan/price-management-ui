import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { SelectionSummary } from './SelectionSummary'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/selection-summary.md?raw'

const meta = {
  title: 'Molecules/SelectionSummary',
  component: SelectionSummary,
  args: { title: 'Selected brands', count: 16, status: 'complete' },
  argTypes: { status: { control: 'inline-radio', options: ['todo', 'complete'] } },
  decorators: [(Story) => <div style={{ width: 328 }}><Story /></div>],
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Selection summary 756:394).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=756-394' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'SelectionSummary — panel title (H2) + CountBadge. Badge is to-do until every vendor has ≥1 brand.\n\n' +
          'The Selected brands panel\'s title (an H2) with a **CountBadge**: neutral (to do) until every vendor has at least one brand, then citron (complete). ' +
          'The status comes from that rule, not from the count. The badge pops slightly when the number changes.',
      },
    },
  },
} satisfies Meta<typeof SelectionSummary>

export default meta
type Story = StoryObj<typeof meta>

export const WithSelections: Story = { name: 'With selections (complete)' }
export const Incomplete: Story = { args: { count: 13, status: 'todo' } }
export const Empty: Story = { args: { count: 0, status: 'todo' } }

export const Pop: Story = {
  render: (args) => {
    const [count, setCount] = useState(13)
    return (
      <div style={{ display: 'grid', gap: 'var(--space-16)' }}>
        <SelectionSummary {...args} count={count} status="todo" />
        <Button size="xsmall" hierarchy="secondary" onPress={() => setCount((n) => n + 1)}>Add one</Button>
      </div>
    )
  },
  parameters: { controls: { disable: true }, docs: { description: { story: 'Press "Add one" to see the badge pop (off with reduced motion).' } } },
}
