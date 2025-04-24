import type { Meta, StoryObj } from '@storybook/react';

import { YearSelector } from './YearSelector';

const meta: Meta<typeof YearSelector> = {
  title: 'Inputs/YRGRid/Year',
  component: YearSelector,
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
    setSelectedYear: () => {},
  },
};
