import {
  DocsContainer,
  type DocsContainerProps,
} from '@storybook/addon-docs/blocks';
import type { Preview } from '@storybook/react';
import type { Decorator } from '@storybook/react';
import { themes } from 'storybook/theming';

import { Anar } from '../src/Anar.js';
import '../src/Main.css';

function Container(props: DocsContainerProps) {
  return <DocsContainer {...props} theme={themes.dark} />;
}

export const decorators: Decorator[] = [
  function withAnar(Story, context) {
    const { colorScheme } = context.globals;

    return (
      <Anar colorScheme={colorScheme}>
        <Story />
      </Anar>
    );
  },
];

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      name: 'colorScheme',
      description: 'Anar color scheme selector',
      defaultValue: 'light',
      toolbar: {
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
      },
    },
  },
  parameters: {
    backgrounds: { disable: true },
    docs: {
      container: Container,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
