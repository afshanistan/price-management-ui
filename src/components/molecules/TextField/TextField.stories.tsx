import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextField } from './TextField'
import '../Input/Input.stories.css'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/text-field.md?raw'

const step1 = {
  label: 'Vendor name or ESN',
  placeholder: 'Search by vendor name or ESN',
  helper: 'Results appear as you type. Select a vendor to add it immediately.',
}

const meta = {
  title: 'Molecules/TextField',
  component: TextField,
  args: { ...step1, className: 'field-story__width' },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Text field 672:182).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=672-182' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'TextField — label + Input + helper/error. Error message replaces the helper.\n\n' +
          'A labelled search field with a helper line. When `errorMessage` is set, the field turns red and the message (with an alert icon) replaces the helper. ' +
          'Built on React Aria\'s SearchField: the label, helper (`aria-describedby`) and error (`aria-invalid`) are wired automatically, Esc and Clear empty it. ' +
          'Fills its container (full card width in step 1).',
      },
    },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Step1Vendors: Story = { name: 'Step 1: Vendors' }

export const Filled: Story = { args: { defaultValue: 'Cargill' } }

export const HiddenLabel: Story = { name: 'Hidden label', args: { hideLabel: true } }

export const Error: Story = {
  args: { defaultValue: 'xyz', errorMessage: 'Enter a vendor name or ESN.' },
  parameters: {
    docs: { description: { story: 'Sample copy: no field in the current flow errors yet. Messages say the fix, never "Invalid".' } },
  },
}

export const Disabled: Story = { args: { isDisabled: true } }

export const AllStates: Story = {
  name: 'All states',
  render: (args) => (
    <table className="field-story__table">
      <tbody>
        {(
          [
            ['Default', {}],
            ['Hover', { 'data-state': 'hover' }],
            ['Focus', { 'data-state': 'focus' }],
            ['Filled', { defaultValue: 'Cargill' }],
            ['Disabled', { isDisabled: true }],
            ['Error', { defaultValue: 'xyz', errorMessage: 'Enter a vendor name or ESN.' }],
          ] as const
        ).map(([name, props]) => (
          <tr key={name}>
            <th scope="row" className="type-label-sm field-story__caption">{name}</th>
            <td>
              <TextField {...args} {...props} label={`${step1.label} (${name})`} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'The 6 Figma states. Hover and focus are forced for this story only; in the others they\'re real.' } },
  },
}
