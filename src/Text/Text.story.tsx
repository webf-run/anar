import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text.js';

const meta: Meta<typeof Text> = {
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Medium: Story = {
  args: {
    size: 'md',
    text: 'Press me',
  },
};
