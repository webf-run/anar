import type { Meta, StoryObj } from '@storybook/react';

import { DateRangePicker } from './DateRangePicker.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Dates/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DateRangePicker>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};
