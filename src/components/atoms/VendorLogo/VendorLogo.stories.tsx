import type { Meta, StoryObj } from '@storybook/react-vite'
import { mockVendors } from '../../../data/mockVendors'
import { VendorLogo } from './VendorLogo'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/vendor-logo.md?raw'

const byId = (id: string) => mockVendors.find((v) => v.id === id)!
const cargill = byId('cargill')
const row = { display: 'flex', gap: 'var(--space-16)', alignItems: 'center', flexWrap: 'wrap' } as const

const meta = {
  title: 'Atoms/VendorLogo',
  component: VendorLogo,
  args: {
    vendor: cargill.name,
    wordmark: cargill.wordmark,
    logo: cargill.logo,
    content: 'mono',
    size: 'sm',
    isSelected: false,
    isStandalone: true,
  },
  argTypes: {
    content: { control: 'inline-radio', options: ['wordmark', 'mono', 'brand'] },
    size: { control: 'inline-radio', options: ['sm', 'lg'] },
    logo: { control: false },
  },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the component set in Figma (Vendor logo 989:98).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=989-98' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'Vendor identity tile. Content=Mono logo: single-color logo (override the Shape image fill with the vendor’s logo; recolor via the Ink layer — text-subtle by default, text-on-primary on teal). ' +
          'Content=Brand logo: brand-color logo, only on white surface-card tiles (override the Logo image fill). Content=Wordmark: fallback for vendors with no logo. ' +
          'Logos are image fills set to Fit, matching object-fit: contain in code, so the tile can be resized freely.\n\n' +
          'Result rows use the mono logo in the small tile (56×36), white on teal when selected. Selected item cards use the brand logo in the large white tile (128×48). ' +
          'Any content falls back to the wordmark when the vendor has no file for it. Brand colors are content, not UI color roles: a red logo doesn\'t mean error. ' +
          'Decorative inside a row or card that names the vendor; standing alone (`isStandalone`) it takes the vendor name as its accessible name.',
      },
    },
  },
} satisfies Meta<typeof VendorLogo>

export default meta
type Story = StoryObj<typeof meta>

export const MonoLogo: Story = { name: 'Mono logo' }
export const MonoLogoSelected: Story = { name: 'Mono logo, selected', args: { isSelected: true } }
export const BrandLogo: Story = { name: 'Brand logo', args: { content: 'brand', size: 'lg' } }
export const Wordmark: Story = { args: { content: 'wordmark' } }

export const AllStates: Story = {
  name: 'All states',
  render: () => {
    const blueDiamond = byId('blue-diamond')
    return (
      <div style={{ display: 'grid', gap: 'var(--space-16)' }}>
        <div style={row}>
          <VendorLogo vendor={cargill.name} wordmark={cargill.wordmark} logo={cargill.logo} content="mono" isStandalone />
          <VendorLogo vendor={cargill.name} wordmark={cargill.wordmark} logo={cargill.logo} content="mono" isSelected isStandalone />
          <VendorLogo vendor={cargill.name} wordmark={cargill.wordmark} logo={cargill.logo} content="brand" size="lg" isStandalone />
        </div>
        <div style={row}>
          <VendorLogo vendor={blueDiamond.name} wordmark={blueDiamond.wordmark} content="mono" isStandalone />
          <VendorLogo vendor={blueDiamond.name} wordmark={blueDiamond.wordmark} content="mono" isSelected isStandalone />
          <VendorLogo vendor={blueDiamond.name} wordmark={blueDiamond.wordmark} content="brand" size="lg" isStandalone />
        </div>
      </div>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Top: Cargill as Mono logo (default, selected) and Brand logo. Bottom: Blue Diamond has no logo, so each falls back to the wordmark; the brand tile stays white. No hover (dropped Oct 18: the row hover covers it).',
      },
    },
  },
}

export const MockLogos: Story = {
  name: 'Mock vendors: all logos',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-12)' }}>
      {mockVendors.map((v) => (
        <div key={v.id} style={row}>
          <VendorLogo vendor={v.name} wordmark={v.wordmark} logo={v.logo} content="mono" isStandalone />
          <VendorLogo vendor={v.name} wordmark={v.wordmark} logo={v.logo} content="brand" size="lg" isStandalone />
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'The 60 mock vendors: Mono logo (Result row tile) and Brand logo (Selected item card tile). For spotting logos that are too wide for the tiles.' } },
  },
}
