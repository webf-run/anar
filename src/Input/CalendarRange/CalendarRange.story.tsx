import type { Meta, StoryObj } from '@storybook/react';

import { CalendarRange } from './CalendarRange';

const meta: Meta<typeof CalendarRange> = {
  title: 'Inputs/CalendarRange',
  component: CalendarRange,
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
