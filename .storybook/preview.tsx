import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import type { CSSProperties } from 'react';

// Side effects imports are on the top.
import '../src/Anar.css';
import { Anar } from '../src/Anar.js';
import './Reset.css';

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      title: 'Color Scheme',
      description: 'Global color scheme for components',
      defaultValue: 'darkest',
      toolbar: {
        title: 'Color Scheme',
        icon: 'contrast',

        items: [
          { value: 'light', title: 'Light', right: '🔆' },
          { value: 'dark', title: 'Dark', right: '🔅' },
          { value: 'darkest', title: 'Darkest', right: '🔅' },
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

      const storyWrapper: CSSProperties = {
        padding: '4rem',
        border: '1px solid var(--gray-600)',
        flex: 1,
      };

      if (colorScheme === 'all') {
        const style: CSSProperties = {
          display: 'flex',
          gap: '4rem',
        };

        return (
          <div style={style}>
            <Anar colorScheme='light'>
              <div style={storyWrapper} data-anar-scheme={'light'}>
                <Story />
              </div>
            </Anar>

            <Anar colorScheme='dark'>
              <div style={storyWrapper} data-anar-scheme={'dark'}>
                <Story />
              </div>
            </Anar>
          </div>
        );
      }

      return (
        <Anar colorScheme={colorScheme}>
          <div style={storyWrapper} data-anar-scheme={colorScheme}>
            <Story />
          </div>
        </Anar>
      );
    },
  ],
};

export default preview;
