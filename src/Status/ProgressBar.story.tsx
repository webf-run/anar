import type { Meta, StoryObj } from '@storybook/react';

import { ProgressBar } from './ProgressBar.js';

const meta = {
  title: 'Statuses/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ProgressBar>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Progress',
    value: 32,
  },
};
