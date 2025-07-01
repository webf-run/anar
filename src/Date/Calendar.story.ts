import type { Meta, StoryObj } from '@storybook/react';

import { Calendar } from './Calendar.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Dates/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Calendar>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
