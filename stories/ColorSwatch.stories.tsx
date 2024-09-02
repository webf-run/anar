import { ColorSwatch } from '../src/ColorSwatch';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof ColorSwatch> = {
  component: ColorSwatch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Example = {
  args: {
    color: '#f00a',
  },
};
