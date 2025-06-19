import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react';
import { isWeekend } from 'date-fns';
import { useState } from 'react';

import { DatePickerRangeField } from './DateRangePickerField';

const meta: Meta<typeof DatePickerRangeField> = {
  title: 'Dates/DateRangePickerField',
  component: DatePickerRangeField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label1: 'From',
    label2: 'To',
  },
};

export const Disabled: Story = {
  args: {
    label1: 'From',
    label2: 'To',
    isDisabled: true,
  },
};

export const Invalid: Story = {
  render: () => {
    const [range, setRange] = useState({
      start: today(getLocalTimeZone()),
      end: today(getLocalTimeZone()).add({ weeks: 1, days: 3 }),
    });
    let isInvalid = range.end.compare(range.start) > 7;

    return (
      <div>
        <DatePickerRangeField
          label1='From'
          label2='To'
          value={range}
          onChange={setRange}
          isInvalid={isInvalid}
          errorMessage='Error here'
        />
      </div>
    );
  },
};
