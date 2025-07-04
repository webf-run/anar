import type { Preview } from '@storybook/react';
import type { Decorator } from '@storybook/react';
import { createElement } from 'react';

import '../src/Main.css';

export const decorators: Decorator[] = [
  (Story, context) => {
    const theme = context.globals.theme || 'light';

    // Set class on <body>
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);

    // Set class on all Docs containers
    const docsStories = document.querySelectorAll('.docsstory');
    docsStories.forEach((el) => {
      el.classList.remove('light', 'dark');
      el.classList.add(theme);
    });

    return createElement(Story);
  },
];

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
