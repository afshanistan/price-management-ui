import type { Meta, StoryObj } from '@storybook/react-vite'
import { iconNames } from '../../atoms/Icon'
import { Button, type ButtonHierarchy, type ButtonSize } from './Button'
import './Button.stories.css'

const sizes: ButtonSize[] = ['xsmall', 'medium', 'xlarge']
const hierarchies: ButtonHierarchy[] = ['primary', 'secondary', 'tertiary']
const states = ['default', 'hover', 'pressed', 'focus', 'disabled'] as const
const sizeNames: Record<ButtonSize, string> = { xsmall: 'XSmall', medium: 'Medium', xlarge: 'XLarge' }

const meta = {
  title: 'Molecules/Button',
  component: Button,
  args: {
    children: 'Label',
    size: 'medium',
    hierarchy: 'primary',
    isDisabled: false,
  },
  argTypes: {
    size: { control: 'inline-radio', options: sizes },
    hierarchy: { control: 'inline-radio', options: hierarchies },
    leadingIcon: { control: 'select', options: [undefined, ...iconNames] },
    trailingIcon: { control: 'select', options: [undefined, ...iconNames] },
  },
  parameters: {
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'Button — the one action control. Primary = forward, Secondary = tonal teal (plum on brand), Tertiary = text. Min width 64; min-height, not height.\n\n' +
          'The one action control. **Primary** = forward, **Secondary** = tonal teal (plum "Save and exit" on brand), **Tertiary** = text. ' +
          'Sizes: XSmall 24, Medium 32, XLarge 56 (min-height, so text can grow). Icons are always the filled drawing and share the label color. ' +
          'The accessible name is the visible label; when it needs more ("Edit" → "Edit vendors"), `aria-label` starts with the label. ' +
          'A disabled Primary is exempt from contrast AA; always pair it with visible hint text.',
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/* ---------- One story per size × hierarchy ---------- */

export const PrimaryXSmall: Story = { name: 'Primary / XSmall', args: { hierarchy: 'primary', size: 'xsmall' } }
export const PrimaryMedium: Story = { name: 'Primary / Medium', args: { hierarchy: 'primary', size: 'medium' } }
export const PrimaryXLarge: Story = { name: 'Primary / XLarge', args: { hierarchy: 'primary', size: 'xlarge' } }
export const SecondaryXSmall: Story = { name: 'Secondary / XSmall', args: { hierarchy: 'secondary', size: 'xsmall' } }
export const SecondaryMedium: Story = { name: 'Secondary / Medium', args: { hierarchy: 'secondary', size: 'medium' } }
export const SecondaryXLarge: Story = { name: 'Secondary / XLarge', args: { hierarchy: 'secondary', size: 'xlarge' } }
export const TertiaryXSmall: Story = { name: 'Tertiary / XSmall', args: { hierarchy: 'tertiary', size: 'xsmall' } }
export const TertiaryMedium: Story = { name: 'Tertiary / Medium', args: { hierarchy: 'tertiary', size: 'medium' } }
export const TertiaryXLarge: Story = { name: 'Tertiary / XLarge', args: { hierarchy: 'tertiary', size: 'xlarge' } }

/* ---------- Icons ---------- */

export const WithIcons: Story = {
  name: 'With icons',
  render: (args) => (
    <div className="button-story__row">
      <Button {...args} leadingIcon="upload">Upload CSV</Button>
      <Button {...args} trailingIcon="arrow-right">Select brands</Button>
      <Button {...args} leadingIcon="arrow-left" hierarchy="secondary">Edit vendors</Button>
      <Button {...args} leadingIcon="download">Download template</Button>
    </div>
  ),
  args: { size: 'xlarge' },
  parameters: {
    docs: {
      description: {
        story: 'Footer buttons: the arrow is an icon, so the accessible name is the label without it ("Select brands").',
      },
    },
  },
}

export const EditButton: Story = {
  name: 'Edit (Review)',
  args: {
    size: 'xsmall',
    hierarchy: 'tertiary',
    leadingIcon: 'placeholder',
    children: 'Edit',
    'aria-label': 'Edit vendors',
  },
  parameters: {
    docs: {
      description: {
        story:
          'XSmall Tertiary with a leading icon. Visible "Edit", accessible name "Edit vendors". ' +
          'Uses the placeholder icon until the edit icon exists (docs/open-questions.md).',
      },
    },
  },
}

/* ---------- All states: forced with data-state, this story only ---------- */

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div className="button-story__states">
      {sizes.map((size) => (
        <table key={size} className="button-story__table">
          <caption className="type-label-md button-story__caption">{sizeNames[size]}</caption>
          <thead>
            <tr className="type-label-sm button-story__caption">
              <th scope="col">Hierarchy</th>
              {states.map((state) => (
                <th key={state} scope="col">{state}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hierarchies.map((hierarchy) => (
              <tr key={hierarchy}>
                <th scope="row" className="type-label-sm button-story__caption">{hierarchy}</th>
                {states.map((state) => (
                  <td key={state}>
                    <Button
                      size={size}
                      hierarchy={hierarchy}
                      leadingIcon="placeholder"
                      isDisabled={state === 'disabled'}
                      data-state={state === 'disabled' || state === 'default' ? undefined : state}
                    >
                      Label
                    </Button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'The 45 Figma variants. Hover, pressed and focus are forced for this story only; in every other story they are real (hover, click, Tab).',
      },
    },
  },
}

/* ---------- On brand ---------- */

export const OnBrand: Story = {
  name: 'On brand',
  render: (args) => (
    <div data-mode="on-brand" className="button-story__on-brand">
      <Button {...args} hierarchy="secondary">Save and exit</Button>
      <Button {...args} hierarchy="primary">Primary</Button>
      <Button {...args} hierarchy="tertiary">Tertiary</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Same component, no props: inside `data-mode="on-brand"` the tokens resolve to the header colors.',
      },
    },
  },
}
