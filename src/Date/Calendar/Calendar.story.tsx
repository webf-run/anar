import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react';
import { isWeekend } from 'date-fns';
import { useState } from 'react';
import { DateValue } from 'react-aria-components';

import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Dates/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    const [date, setDate] = useState<DateValue | null>();
    return (
      <div>
        <Calendar value={date} onChange={setDate} />
      </div>
    );
  },
};

export const MinMaxValue: Story = {
  render: () => {
    const [date, setDate] = useState<DateValue | null>();

    const min = new CalendarDate(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay() + 20
    );

    const max = new CalendarDate(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay() + 25
    );

    return (
      <div>
        <Calendar
          value={date}
          maxValue={max}
          minValue={min}
          onChange={setDate}
        />
      </div>
    );
  },
};

export const Invalid: Story = {
  render: () => {
    const [date, setDate] = useState<DateValue>(today(getLocalTimeZone()));

    const isInvalid = isWeekend(new Date(date.year, date.month, date.day));

    return (
      <div>
        <Calendar
          value={date}
          onChange={setDate}
          isInvalid={isInvalid}
          errorMessage='Error here'
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};
