import type { Meta, StoryObj } from '@storybook/react';

import { MonthGrid } from './MonthSelector';

const meta: Meta<typeof MonthGrid> = {
  title: 'Dates/MonthSelector',
  component: MonthGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    const displayedDate = new Date();

    return (
      <div>
        <MonthGrid onChange={() => {}} changeViewState={() => {}} />
      </div>
    );
  },
};

export const MinMax: Story = {
  render: () => {
    const displayedDate = new Date();

    return (
      <div>
        <MonthGrid
          minValue={4}
          maxValue={6}
          onChange={() => {}}
          changeViewState={() => {}}
        />
      </div>
    );
  },
};
