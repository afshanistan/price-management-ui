import type { Meta, StoryObj } from '@storybook/react-vite'
import { VendorLogo } from './VendorLogo'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/vendor-logo.md?raw'

const meta = {
  title: 'Atoms/VendorLogo',
  component: VendorLogo,
  args: {
    vendor: 'Cargill',
    wordmark: 'CGL',
    size: 'sm',
    isSelected: false,
    isStandalone: true,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'lg'] },
  },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Vendor logo 677:34).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=677-34' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'VendorLogo — placeholder wordmark tile; real monochrome SVGs rendered with currentColor in code.\n\n' +
          'A fixed tile with the vendor\'s wordmark: small (56×36) in Result rows, large (80×48) in Selected item cards. ' +
          'The parent row or card turns it teal when pressed or selected. Inside a row or card that already names the vendor it\'s decorative; ' +
          'standing alone (`isStandalone`) it takes the vendor name as its accessible name.',
      },
    },
  },
} satisfies Meta<typeof VendorLogo>

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = {}
export const Large: Story = { args: { size: 'lg' } }

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center' }}>
      <VendorLogo vendor="Cargill" wordmark="CGL" size="sm" isStandalone />
      <VendorLogo vendor="Cargill" wordmark="CGL" size="sm" isSelected isStandalone />
      <VendorLogo vendor="Cargill" wordmark="CGL" size="lg" isStandalone />
      <VendorLogo vendor="Cargill" wordmark="CGL" size="lg" isSelected isStandalone />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'sm and lg, Default and Selected. Figma defines only Default; Selected (teal) comes from the Result row and Selected item card overrides. No hover yet (not decided).',
      },
    },
  },
}
