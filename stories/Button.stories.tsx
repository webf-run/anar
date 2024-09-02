import { Button } from '../src/Button';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Example = {
  render: (args: any) => <Button {...args}>Press me</Button>,

  args: {
    onPress: () => alert('Hello world!'),
  },
};
