import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox, CheckboxBox } from './Checkbox'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/checkbox.md?raw'

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  args: { 'aria-label': 'Select all Cargill brands', isIndeterminate: false },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Checkbox 728:38).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=728-38' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'Checkbox — tri-state (mixed = some selected). Press scale-up + check draw-in are code-only.\n\n' +
          'An 18px tri-state box: empty, checked, or mixed (a dash, when some of a vendor\'s brands are selected). It has two uses: ' +
          '**Checkbox** is the real, focusable "select all" in a Group header (React Aria, `aria-checked="mixed"` when partial); ' +
          '**CheckboxBox** is the same look as decoration inside a multi Result row, where the row itself is the option. ' +
          'Press scales it up slightly and the check draws in; both are off with reduced motion.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const SelectAll: Story = { name: 'Select all (interactive)' }

export const Mixed: Story = { args: { isIndeterminate: true } }

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr className="type-label-sm" style={{ color: 'var(--text-subtle)' }}>
          <th style={{ padding: 'var(--space-8) var(--space-16)', fontWeight: 'inherit' }}>Checked</th>
          <th style={{ padding: 'var(--space-8) var(--space-16)', fontWeight: 'inherit' }}>Default</th>
          <th style={{ padding: 'var(--space-8) var(--space-16)', fontWeight: 'inherit' }}>Hover</th>
        </tr>
      </thead>
      <tbody>
        {([false, true, 'mixed'] as const).map((checked) => (
          <tr key={String(checked)}>
            <th scope="row" className="type-label-sm" style={{ padding: 'var(--space-8) var(--space-16)', color: 'var(--text-subtle)', fontWeight: 'inherit' }}>
              {String(checked)}
            </th>
            <td style={{ padding: 'var(--space-8) var(--space-16)' }}><CheckboxBox checked={checked} /></td>
            <td style={{ padding: 'var(--space-8) var(--space-16)' }}><CheckboxBox checked={checked} data-state="hover" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'The 6 Figma variants (CheckboxBox; hover forced for this story only). Tab to the interactive stories for the focus ring.' } },
  },
}
