import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../molecules/Button'
import { CountTick } from './CountTick'

const meta = {
  title: 'Atoms/CountTick',
  component: CountTick,
  args: { value: 3 },
  parameters: {
    docs: {
      description: {
        component:
          'CountTick — a number that ticks when it changes: up as it grows, down as it shrinks (fast, ease-out). Visual only: the caller keeps the real ' +
          'text for screen readers. Used in "Selected vendors (N)" and the Selected brands groups\' "N of M". Under reduced motion only the fade remains. No Figma component (motion only).',
      },
    },
  },
} satisfies Meta<typeof CountTick>

export default meta
type Story = StoryObj<typeof meta>

export const Static: Story = {}

export const Live: Story = {
  render: function Render() {
    const [value, setValue] = useState(3)
    return (
      <div style={{ display: 'flex', gap: 'var(--space-12)', alignItems: 'center' }}>
        <Button size="xsmall" hierarchy="secondary" onPress={() => setValue((v) => Math.max(0, v - 1))}>
          Minus
        </Button>
        <span className="type-label-lg" aria-hidden="true">
          Selected vendors (<CountTick value={value} />)
        </span>
        <span className="visually-hidden">Selected vendors ({value})</span>
        <Button size="xsmall" hierarchy="secondary" onPress={() => setValue((v) => v + 1)}>
          Plus
        </Button>
      </div>
    )
  },
}
