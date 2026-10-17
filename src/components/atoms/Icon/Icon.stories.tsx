import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './Icon'
import { iconNames, type IconSize } from './iconNames'
import './Icon.stories.css'

const sizes: IconSize[] = [14, 16, 20, 24]

// Containers set the color; the icon follows with currentColor.
const containerColors = ['--icon-default', '--icon-subtle', '--icon-brand', '--icon-destructive']

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  args: {
    name: 'tag',
    filled: false,
    size: 24,
  },
  argTypes: {
    name: { control: 'select', options: iconNames },
    size: { control: 'inline-radio', options: sizes },
  },
  parameters: {
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'Icon — 24px UI icon. Stroke/Fill drawings switched by the Figma/Icon style mode; color from the Semantic/Icon mode. Code: `<Icon name filled />`, color = currentColor.\n\n' +
          '24px UI icon drawn on a 24 grid. `filled` switches between the Stroke and Fill drawings (Figma "Icon style" mode). ' +
          'Color is always `currentColor`: the container sets `color` (for example a button label), never the icon. ' +
          'Decorative by default (`aria-hidden`); give it an `aria-label` only when it stands alone and means something. ' +
          'Icon-only controls name themselves with `aria-label` on the button, not on the icon.',
      },
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Filled: Story = {
  args: { filled: true },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="icon-story__row">
      {sizes.map((size) => (
        <figure key={size} className="icon-story__cell">
          <Icon {...args} size={size} />
          <figcaption className="type-data-sm icon-story__caption">{size}</figcaption>
        </figure>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '14 = XSmall button · 16 = Medium button, nav link · 20 = XLarge button · 24 = icon button.',
      },
    },
  },
}

export const AllIcons: Story = {
  name: 'All icons',
  render: (args) => (
    <table className="icon-story__table">
      <thead>
        <tr className="type-label-sm icon-story__caption">
          <th scope="col">Name</th>
          <th scope="col">Stroke</th>
          <th scope="col">Filled</th>
        </tr>
      </thead>
      <tbody>
        {iconNames.map((name) => (
          <tr key={name}>
            <th scope="row" className="type-data-sm">{name}</th>
            <td><Icon name={name} size={args.size} /></td>
            <td><Icon name={name} size={args.size} filled /></td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
  parameters: {
    controls: { include: ['size'] },
    docs: {
      description: {
        story:
          'Every icon in both styles. Some look the same in both (arrows, chevrons, calendar, download, sidebars); that matches Figma.',
      },
    },
  },
}

export const ColorFromContainer: Story = {
  name: 'Color from container',
  render: (args) => (
    <div className="icon-story__row">
      {containerColors.map((token) => (
        <figure key={token} className="icon-story__cell" style={{ color: `var(${token})` }}>
          <Icon {...args} />
          <figcaption className="type-data-sm icon-story__caption">{token}</figcaption>
        </figure>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The wrapper sets `color` to an icon token; the icon inherits it. This replaces the Figma Semantic/Icon modes.',
      },
    },
  },
}
