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
      // Every story's axe check fails its test on a violation (npm run test-storybook).
      // A story with a known exception that needs Will's decision sets test: 'todo' and points
      // to its entry in docs/open-questions.md; the a11y panel still shows the violation.
      test: 'error',
    }
  },

  // Toolbar switches. Mode: where the story is placed ("On brand" is the plum header / stage).
  // Motion: "Reduced" applies the same rules as the system's reduced-motion setting (src/styles/motion.css).
  globalTypes: {
    motion: {
      description: 'Motion',
      toolbar: {
        title: 'Motion',
        icon: 'lightning',
        items: [
          { value: 'full', title: 'Full motion' },
          { value: 'reduced', title: 'Reduced motion' },
        ],
        dynamicTitle: true,
      },
    },
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
    motion: 'full',
  },

  decorators: [
    // Motion toolbar: mark <html> so motion.css can apply the reduced-motion rules.
    (Story, context) => {
      document.documentElement.dataset.motion = context.globals.motion ?? 'full'
      return <Story />
    },
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
