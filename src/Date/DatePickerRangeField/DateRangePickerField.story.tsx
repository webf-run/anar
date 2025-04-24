import type { Meta, StoryObj } from '@storybook/react';

import { DatePickerRangeField } from './DateRangePickerField';

const meta: Meta<typeof DatePickerRangeField> = {
  title: 'Inputs/DateRangePickerField',
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
