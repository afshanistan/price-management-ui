import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pictogram, pictogramTypes, type PictogramSize } from './Pictogram'
import './Pictogram.stories.css'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/pictogram.md?raw'

const sizes: PictogramSize[] = [24, 40]

const meta = {
  title: 'Atoms/Pictogram',
  component: Pictogram,
  args: {
    type: 'vendor',
    size: 40,
  },
  argTypes: {
    type: { control: 'inline-radio', options: pictogramTypes },
    size: { control: 'inline-radio', options: sizes },
  },
  // Containers set the color; the pictogram follows with currentColor.
  decorators: [(Story) => <div style={{ color: 'var(--icon-brand)' }}><Story /></div>],
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Pictograms 650:15).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=650-15' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'Pictogram — filled identity illustration for cards and empty states (icons are for function, pictograms for identity).\n\n' +
          'Names what a card or empty state is about: vendor, brand, presets. Separate from Icon: one drawing, always filled, no `filled` prop. ' +
          'Drawn on a 20 grid; 24 in Empty selection and the small Icon tile, 40 in the Card header. ' +
          'Color is `currentColor` from the container (`--icon-brand` in the Icon tile, `--icon-subtle` in Empty selection). Always decorative.',
      },
    },
  },
} satisfies Meta<typeof Pictogram>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllPictograms: Story = {
  name: 'All pictograms',
  render: () => (
    <div className="pictogram-story__row">
      {pictogramTypes.map((type) =>
        sizes.map((size) => (
          <figure key={type + size} className="pictogram-story__cell">
            <Pictogram type={type} size={size} />
            <figcaption className="type-data-sm pictogram-story__caption">{type} · {size}</figcaption>
          </figure>
        )),
      )}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'The four Figma types at both sizes. Compare with the Atoms page in Figma (Design tab).' } },
  },
}

export const ColorFromContainer: Story = {
  name: 'Color from container',
  render: (args) => (
    <div className="pictogram-story__row">
      {['--icon-brand', '--icon-subtle'].map((token) => (
        <figure key={token} className="pictogram-story__cell" style={{ color: `var(${token})` }}>
          <Pictogram {...args} />
          <figcaption className="type-data-sm pictogram-story__caption">{token}</figcaption>
        </figure>
      ))}
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Icon tile sets `--icon-brand`; Empty selection sets `--icon-subtle`. This replaces the Figma Icon modes.' } },
  },
}
