import type { Meta, StoryObj } from '@storybook/react-vite'
import './Tokens.css'

// A few semantic color tokens. Each re-resolves inside data-mode="on-brand".
const colorTokens = [
  '--surface-page',
  '--surface-card',
  '--surface-brand',
  '--text-default',
  '--text-subtle',
  '--text-heading',
  '--border-structural',
  '--fill-primary-default',
  '--fill-secondary-default',
  '--focus-ring',
]

// Text styles from tokens.css: [class suffix, Figma name, sample]
const textStyles = [
  ['display-number', 'Display/Number', '1,284'],
  ['heading-xl', 'Heading/XL', 'Price Management'],
  ['heading-lg', 'Heading/LG', 'Price Management'],
  ['heading-md', 'Heading/MD', 'Price Management'],
  ['heading-sm', 'Heading/SM', 'Price Management'],
  ['heading-xs', 'Heading/XS', 'Price Management'],
  ['body-lg', 'Body/LG', 'Select the vendors this template applies to.'],
  ['body-md', 'Body/MD', 'Select the vendors this template applies to.'],
  ['body-sm', 'Body/SM', 'Select the vendors this template applies to.'],
  ['body-xs', 'Body/XS', 'Select the vendors this template applies to.'],
  ['label-lg', 'Label/LG', 'Effective date'],
  ['label-md', 'Label/MD', 'Effective date'],
  ['label-sm', 'Label/SM', 'Effective date'],
  ['label-xs', 'Label/XS', 'Effective date'],
  ['button-label', 'Button/Label', 'Save template'],
  ['data-lg', 'Data/LG', '$12.49 · SKU 004521'],
  ['data-md', 'Data/MD', '$12.49 · SKU 004521'],
  ['data-sm', 'Data/SM', '$12.49 · SKU 004521'],
  ['stepper-inactive', 'Stepper/Inactive', 'Select brands'],
  ['stepper-active', 'Stepper/Active', 'Select brands'],
]

function Tokens() {
  return (
    <div className="tokens">
      <section>
        <h2 className="tokens__title type-heading-sm">Semantic colors</h2>
        <ul className="tokens__swatches">
          {colorTokens.map((token) => (
            <li key={token} className="tokens__swatch">
              <span className="tokens__chip" style={{ background: `var(${token})` }} />
              <code className="type-data-sm">{token}</code>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="tokens__title type-heading-sm">Text styles</h2>
        <dl className="tokens__type">
          {textStyles.map(([key, name, sample]) => (
            <div key={key} className="tokens__type-row">
              <dt className="type-label-sm tokens__subtle">{name}</dt>
              <dd className={`type-${key}`}>{sample}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}

const meta = {
  title: 'Foundations/Tokens',
  component: Tokens,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Checks that tokens and fonts load. Switch Mode in the toolbar to see the semantic colors re-resolve on brand.',
      },
    },
  },
} satisfies Meta<typeof Tokens>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {}
