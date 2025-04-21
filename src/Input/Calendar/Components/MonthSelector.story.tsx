import type { Meta, StoryObj } from '@storybook/react';

import { MonthSelector } from './MonthSelector';

const meta: Meta<typeof MonthSelector> = {
  title: 'Inputs/YRGRid/Month',
  component: MonthSelector,
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
    setSelectedMonth: () => {},
    onSelectDate: () => {},
  },
};
