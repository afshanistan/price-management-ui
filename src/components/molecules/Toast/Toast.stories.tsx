import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from '../Button'
import { ToastRegion, type ToastMessage } from './Toast'

const meta = {
  title: 'Molecules/Toast',
  component: ToastRegion,
  args: {
    toast: { id: 1, message: 'Cargill removed', actionLabel: 'Undo', onAction: fn() },
    onDismiss: fn(),
    // Long enough to look at; the product uses 5s.
    timeout: 600000,
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Toast — a short message with an optional action, e.g. "Cargill removed · Undo". The header\'s plum surface (it sets On brand mode itself), white text, ' +
          'and a teal countdown line: the Undo button\'s own color, since it shows how long Undo is still there (Will, Oct 19; Figma queued).\n\n' +
          'One at a time: a new toast replaces the current one. It enters by sliding up 8px and fading (base, ease-out) and exits by fading. ' +
          'It dismisses itself after 5 seconds; the timer pauses while it is hovered or has focus. No close button. ' +
          'The region is always mounted and polite (`role="status"`), so each message is announced once.',
      },
    },
  },
} satisfies Meta<typeof ToastRegion>

export default meta
type Story = StoryObj<typeof meta>

export const WithAction: Story = { name: 'With action (Undo)' }

export const MessageOnly: Story = {
  name: 'Message only',
  args: { toast: { id: 1, message: 'Template saved' } },
}

export const Replace: Story = {
  name: 'Live: replace and auto-dismiss',
  render: function Render() {
    const [toast, setToast] = useState<ToastMessage | null>(null)
    const [count, setCount] = useState(0)
    const names = ['Cargill', 'General Mills', 'Kraft Heinz', 'PepsiCo']
    function show() {
      const next = count + 1
      setCount(next)
      setToast({ id: next, message: `${names[next % names.length]} removed`, actionLabel: 'Undo', onAction: () => setToast(null) })
    }
    return (
      <div style={{ display: 'grid', gap: 'var(--space-24)', justifyItems: 'start' }}>
        <Button size="medium" hierarchy="secondary" onPress={show}>
          Remove a vendor
        </Button>
        <ToastRegion toast={toast} onDismiss={() => setToast(null)} />
      </div>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'Press "Remove a vendor": the toast enters; press again to replace it. It fades out after 5 seconds; hover or focus it to pause.' } },
  },
}
