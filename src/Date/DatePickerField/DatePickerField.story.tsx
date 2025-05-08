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

export const ActiveAndDisabled: Story = {
  render: () => {
    const date: DateValue = today(getLocalTimeZone());

    return <DatePickerField label='Select Date' value={date} isReadOnly />;
  },
};

export const Today: Story = {
  render: () => {
    const date: DateValue = today(getLocalTimeZone());

    return <DatePickerField label='Select Date' placeholderValue={date} />;
  },
};

export const Error: Story = {
  render: () => {
    const date: DateValue = today(getLocalTimeZone());

    return (
      <DatePickerField
        value={date}
        label='Select Date'
        errorMessage='Invalid'
        placeholderValue={date}
      />
    );
  },
};
