import type { Meta } from '@storybook/react';

import { Button } from './Button.js';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Primary = {
  render: (args: any) => {
    return <Button {...args} text='Press me' />;
  },

  args: {
    onPress: () => alert('Hello world!'),
  },
};
