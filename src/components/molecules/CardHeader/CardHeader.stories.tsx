import type { Meta, StoryObj } from '@storybook/react-vite'
import { pictogramTypes } from '../../atoms/Pictogram'
import { CardHeader } from './CardHeader'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/card-header.md?raw'

const meta = {
  title: 'Molecules/CardHeader',
  component: CardHeader,
  args: {
    title: 'Add vendors to your template',
    pictogram: 'vendor',
  },
  argTypes: {
    pictogram: { control: 'inline-radio', options: pictogramTypes },
  },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Card header 713:406).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=713-406' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'CardHeader — icon tile + H1 title (+ optional Tag) + optional description.\n\n' +
          'The top of every wizard card: a 48 Icon tile and the page\'s only H1, with an optional description below and an optional Tag beside the title. ' +
          'A Tag reads as part of the heading ("Add pricing defaults, optional").',
      },
    },
  },
} satisfies Meta<typeof CardHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Step1Vendors: Story = { name: 'Step 1: Vendors' }

export const WithDescription: Story = {
  name: 'With description',
  args: {
    title: 'Add brands to your template',
    pictogram: 'brand',
    description: 'Placeholder description: step 2\'s copy comes with its spec.',
  },
}

export const WithTag: Story = {
  name: 'With tag',
  args: {
    title: 'Add pricing defaults',
    pictogram: 'presets',
    tag: 'Optional',
  },
}
