import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { YearPicker } from './YearPicker.js';

const meta = {
  title: 'Dates/YearPicker',
  component: YearPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof YearPicker>;

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onChange: fn(),
    startYear: 2019,
    endYear: 2030,
  },
  render: (args) => {
    return (
      <YearPicker {...args} />
    );
  },
};
