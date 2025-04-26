import type { Meta, StoryObj } from '@storybook/react';

import { RangeDateSelector } from './DateSelectorRange';

const meta: Meta<typeof RangeDateSelector> = {
  title: 'Dates/RangeDateGrid',
  component: RangeDateSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    displayedDate: new Date(),
    setSelectedDate: () => {},
  },
};
