import { CalendarDate } from '@internationalized/date';
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
    const today = new Date();
    const displayDate = new CalendarDate(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );

    return (
      <div>
        <DateSelector
          displayedDate={displayDate}
          onChange={() => {}}
          changeViewState={() => {}}
        />
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

    console.log(displayDate);

    return (
      <div>
        <DateSelector
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
          changeViewState={() => {}}
        />
      </div>
    );
  },
};
