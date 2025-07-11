import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader.js';

const meta = {
  title: 'Statuses/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Loader>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
