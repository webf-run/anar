import type { Meta, StoryObj } from '@storybook/react';

import { MonthSelector } from './MonthSelector';

const meta: Meta<typeof MonthSelector> = {
  title: 'Dates/MonthSelector',
  component: MonthSelector,
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
        <MonthSelector
          displayedDate={displayedDate}
          selectedDate={{}}
          setSelectedDate={() => {}}
          onSelectDate={() => {}}
        />
      </div>
    );
  },
};
