import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';

// Side effects imports are on the top.
import '../src/Theme/Static.css';
import '../src/theme.css';

import { Sprinkles } from '../src/Sprinkles';
import type { CSSProperties } from 'react';

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      title: 'Color Scheme',
      description: 'Global color scheme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Color Scheme',
        icon: 'contrast',

        items: [
          { value: 'light', title: 'Light', right: '🔆' },
          { value: 'dark', title: 'Dark', right: '🔅' },
          { value: 'all', title: 'Side-by-side', right: '🪵' },
        ],
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
    docs: {
      theme: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? themes.dark
        : themes.light,
    },
  },
  decorators: [
    function withColorScheme(Story, context) {
      const colorScheme = context.globals.colorScheme || 'dark';

      if (colorScheme === 'all') {
        const style: CSSProperties = {
          display: 'flex',
          gap: '4rem'
        };

        const wrapper: CSSProperties = {
          padding: '4rem',
          border: '1px solid var(--gray-600)',
          flex: 1,
        };

        return (
          <div style={style}>
            <Sprinkles colorScheme='light'>
              <div style={wrapper}>
                <Story />
              </div>
            </Sprinkles>

            <Sprinkles colorScheme='dark'>
              <div style={wrapper}>
                <Story />
              </div>
            </Sprinkles>
          </div>
        );
      }

      return (
        <Sprinkles colorScheme={colorScheme}>
          <Story />
        </Sprinkles>
      );
    },
  ],
};

export default preview;
