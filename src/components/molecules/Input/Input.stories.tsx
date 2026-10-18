import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchField, type SearchFieldProps } from 'react-aria-components'
import { Input } from './Input'
import './Input.stories.css'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/input.md?raw'

const placeholder = 'Search by vendor name or ESN'

/* Input is the visual part of a field, so every story puts it inside a labelled SearchField. */
function Field(props: SearchFieldProps & { children: React.ReactNode }) {
  return <SearchField aria-label="Vendor name or ESN" className="field-story__width" {...props} />
}

const states = [
  { name: 'Default', field: {}, state: undefined },
  { name: 'Hover', field: {}, state: 'hover' },
  { name: 'Focus', field: {}, state: 'focus' },
  { name: 'Filled', field: { defaultValue: 'Cargill' }, state: undefined },
  { name: 'Disabled', field: { isDisabled: true }, state: undefined },
  { name: 'Error', field: { isInvalid: true, defaultValue: 'xyz' }, state: undefined },
] as const

const meta = {
  title: 'Molecules/Input',
  component: Input,
  args: { placeholder, leadingIcon: 'search', isClearable: true },
  decorators: [(Story) => <Field><Story /></Field>],
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Input 661:56).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=661-56' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'Input — the field itself (icon + value + clear button when filled). Clicking in is focus.\n\n' +
          'The 40px field: search icon, one line of text with an ellipsis, and a round Clear button once it has a value. ' +
          'It\'s the visual part of a React Aria field, so it always sits inside one (usually Text field), which supplies the label, value, and invalid and disabled states. ' +
          'Clear empties the field and keeps focus in it; Esc does the same.',
      },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Filled: Story = {
  decorators: [(Story) => <Field defaultValue="Cargill"><Story /></Field>],
}

export const AllStates: Story = {
  name: 'All states',
  decorators: [(Story) => <Story />],
  render: () => (
    <table className="field-story__table">
      <tbody>
        {states.map(({ name, field, state }) => (
          <tr key={name}>
            <th scope="row" className="type-label-sm field-story__caption">{name}</th>
            <td>
              <Field {...field} aria-label={`Vendor name or ESN (${name})`}>
                <Input placeholder={placeholder} data-state={state} />
              </Field>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'The 6 Figma states. Hover and focus are forced for this story only; in the others they\'re real (hover, click in). Filled shows Clear.',
      },
    },
  },
}
