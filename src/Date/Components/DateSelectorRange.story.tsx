import { CalendarDate } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react';

import { RangeDateSelector } from './DateSelectorRange';

const meta: Meta<typeof RangeDateSelector> = {
  title: 'Dates/DateRangeGrid',
  component: RangeDateSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    const today = new Date();
    const displayDate = new CalendarDate(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );

    return (
      <div>
        <RangeDateSelector displayedDate={displayDate} onChange={() => {}} />
      </div>
    );
  },
};

export const MinMax: Story = {
  render: () => {
    const today = new Date();
    const displayDate = new CalendarDate(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );

    return (
      <div>
        <RangeDateSelector
          maxValue={
            new CalendarDate(
              today.getFullYear(),
              today.getMonth() + 1,
              today.getDate() + 5
            )
          }
          minValue={
            new CalendarDate(
              today.getFullYear(),
              today.getMonth() + 1,
              today.getDate() - 3
            )
          }
          displayedDate={displayDate}
          onChange={() => {}}
        />
      </div>
    );
  },
};
