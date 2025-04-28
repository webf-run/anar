import { getLocalTimeZone, today } from '@internationalized/date';
import { RangeValue } from '@react-types/shared';
import type { Meta, StoryObj } from '@storybook/react';
import { isWeekend } from 'date-fns';
import { useState } from 'react';
import { DateValue } from 'react-aria-components';

import { CalendarRange } from './CalendarRange';

const meta: Meta<typeof CalendarRange> = {
  title: 'Dates/CalendarRange',
  component: CalendarRange,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    const [date, setDate] = useState<RangeValue<DateValue>>();

    return (
      <div>
        <CalendarRange value={date} onChange={setDate} />
      </div>
    );
  },
};

export const Invalid: Story = {
  render: () => {
    let [range, setRange] = useState({
      start: today(getLocalTimeZone()),
      end: today(getLocalTimeZone()).add({ weeks: 1, days: 3 }),
    });
    let isInvalid = range.end.compare(range.start) > 7;

    return (
      <div>
        <CalendarRange
          value={range}
          onChange={setRange}
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
