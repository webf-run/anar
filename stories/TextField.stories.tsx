import { TextField } from '../src/TextField';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof TextField> = {
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Example = {
  args: {
    label: 'Name',
  },
};
