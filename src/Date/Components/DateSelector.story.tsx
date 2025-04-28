import type { Meta, StoryObj } from '@storybook/react';

import { DateSelector } from './DateSelector';

const meta: Meta<typeof DateSelector> = {
  title: 'Dates/DateGrid',
  component: DateSelector,
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
        <DateSelector
          displayedDate={displayedDate}
          selectedDate={{}}
          setSelectedDate={() => {}}
          onSelectDate={() => {}}
        />
      </div>
    );
  },
};
