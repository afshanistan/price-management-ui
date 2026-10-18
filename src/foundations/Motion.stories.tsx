import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup } from 'react-aria-components'
import { Checkbox } from '../components/atoms/Checkbox'
import { Button } from '../components/molecules/Button'
import { CountBadge } from '../components/molecules/CountBadge'
import { IconButton } from '../components/molecules/IconButton'
import { OptionTile } from '../components/molecules/OptionTile'
import './Motion.stories.css'

/* Every motion in the library, in one place to try. */
function MotionPage() {
  const [count, setCount] = useState(13)
  const [checked, setChecked] = useState<boolean | 'mixed'>(false)

  return (
    <div className="motion-story">
      <section>
        <h2 className="type-label-lg">Press: Button and Icon button scale to 0.97</h2>
        <div className="motion-story__row">
          <Button size="xlarge" hierarchy="primary" trailingIcon="arrow-right">Select brands</Button>
          <Button size="medium" hierarchy="secondary">Save and exit</Button>
          <IconButton icon="settings" aria-label="Settings" />
          <IconButton icon="trash" tone="destructive" aria-label="Remove Cargill" />
        </div>
      </section>

      <section>
        <h2 className="type-label-lg">Checkbox: scales up to 1.08 on press; the check (or dash) draws in after the box fills</h2>
        <div className="motion-story__row">
          <Checkbox
            aria-label="Select all Cargill brands"
            isSelected={checked === true}
            isIndeterminate={checked === 'mixed'}
            onChange={() => setChecked(checked === true ? false : true)}
          />
          <Button size="xsmall" hierarchy="tertiary" onPress={() => setChecked('mixed')}>Set to mixed</Button>
        </div>
      </section>

      <section>
        <h2 className="type-label-lg">CountBadge: pops (1 → 1.1 → 1) when the number changes</h2>
        <div className="motion-story__row">
          <CountBadge status="todo" aria-label={`${count} brands selected`}>{count}</CountBadge>
          <Button size="xsmall" hierarchy="secondary" onPress={() => setCount((n) => n + 1)}>Add one</Button>
        </div>
      </section>

      <section>
        <h2 className="type-label-lg">Color: every fill, border, text, shadow and outline change eases over 150ms</h2>
        <RadioGroup aria-label="Currency" defaultValue="none" className="motion-story__tiles">
          <OptionTile value="none" label="No default" />
          <OptionTile value="usd" label="USD" description="US dollar" layout="inline" />
        </RadioGroup>
      </section>
    </div>
  )
}

const meta = {
  title: 'Foundations/Motion',
  component: MotionPage,
  parameters: {
    docs: {
      description: {
        component:
          'One rule for all interactive motion: **150ms ease-out** (the Figma motion tokens), defined once in `src/styles/motion.css`. ' +
          'Color changes ease; Button and Icon button press scale to 0.97; Checkbox scales up to 1.08 and draws its check; CountBadge pops on change. No springs on color.\n\n' +
          '**Reduced motion:** switch the toolbar\'s **Motion** to "Reduced motion" (it applies the same rules as the system setting): no scale, draw or pop, and colors change instantly. ' +
          'Not here yet: the stepper charge-up and card transitions (they come with the React app).',
      },
    },
  },
} satisfies Meta<typeof MotionPage>

export default meta
type Story = StoryObj<typeof meta>

export const TryItAll: Story = { name: 'Try it all' }
