import type { Meta, StoryObj } from '@storybook/react';

import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Inputs/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
