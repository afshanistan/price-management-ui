import type { Preview } from '@storybook/react-vite'
import '../src/styles/global.css'
import { DocsPage } from './DocsPage'

const preview: Preview = {
  // A Docs page for every component, built from its stories, props and description.
  tags: ['autodocs'],

  parameters: {
    // Every Docs page shows the component's spec below its stories (see DocsPage.tsx).
    docs: { page: DocsPage },

    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },

  // Toolbar switch: where the story is placed. "On brand" is the plum header / stage.
  globalTypes: {
    mode: {
      description: 'Mode',
      toolbar: {
        title: 'Mode',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'on-brand', title: 'On brand' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    mode: 'light',
  },

  decorators: [
    (Story, context) =>
      context.globals.mode === 'on-brand' ? (
        <div
          data-mode="on-brand"
          style={{ background: 'var(--surface-brand)', padding: 'var(--space-24)' }}
        >
          <Story />
        </div>
      ) : (
        <Story />
      ),
  ],
};

export default preview;
