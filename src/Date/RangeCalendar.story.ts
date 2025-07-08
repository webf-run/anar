import type { Meta, StoryObj } from '@storybook/react';

import { RangeCalendar } from './RangeCalendar.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Dates/RangeCalendar',
  component: RangeCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof RangeCalendar>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
