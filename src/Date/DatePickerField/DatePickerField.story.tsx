import {
  CalendarDate,
  DateValue,
  getLocalTimeZone,
  today,
} from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react';
import { isWeekend } from 'date-fns';
import { useState } from 'react';

import { DatePickerField } from './DatePickerField';

const meta: Meta<typeof DatePickerField> = {
  title: 'Dates/DatePickerField',
  component: DatePickerField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Select Date',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Select Date',
    isDisabled: true,
  },
};

export const Invalid: Story = {
  render: () => {
    const [date, setDate] = useState<CalendarDate | null>(
      today(getLocalTimeZone())
    );

    const isInvalid = isWeekend(new Date(date.year, date.month - 1, date.day));

    return (
      <div>
        <DatePickerField
          label='Select Date'
          value={date}
          onChange={setDate}
          isInvalid={isInvalid}
          errorMessage='Error here'
        />
      </div>
    );
  },
};
