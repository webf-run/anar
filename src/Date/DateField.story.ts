import { CalendarDate } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react';

import { DateField } from './DateField.js';

const meta = {
  title: 'Dates/DateField',
  component: DateField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the date field',
    },
    description: {
      control: 'text',
      description: 'Helper text displayed below the field',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed when validation fails',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Whether the field is read-only',
    },
    prefix: {
      control: 'text',
      description: 'Content to display before the input',
    },
    suffix: {
      control: 'text',
      description: 'Content to display after the input',
    },
  },
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Date',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Birth Date',
    description: 'Enter your date of birth',
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Event Date',
    defaultValue: new CalendarDate(2024, 6, 15),
    description: 'Select the event date',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Date',
    isRequired: true,
    description: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Date',
    isDisabled: true,
    defaultValue: new CalendarDate(2024, 6, 15),
    description: 'This field is disabled',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read-only Date',
    isReadOnly: true,
    defaultValue: new CalendarDate(2024, 6, 15),
    description: 'This field is read-only',
  },
};

export const WithError: Story = {
  args: {
    label: 'Date with Error',
    isInvalid: true,
    errorMessage: 'Please enter a valid date',
    description: 'This field has an error',
  },
};

export const WithPrefix: Story = {
  args: {
    label: 'Departure Date',
    prefix: '📅',
    description: 'Select your departure date',
  },
};

export const WithSuffix: Story = {
  args: {
    label: 'Expiry Date',
    suffix: '(MM/DD/YYYY)',
    description: 'Enter the expiry date',
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    label: 'Special Date',
    prefix: '📅',
    suffix: '✨',
    description: 'A special date with prefix and suffix',
  },
};

export const MinMaxDate: Story = {
  args: {
    label: 'Appointment Date',
    minValue: new CalendarDate(2024, 1, 1),
    maxValue: new CalendarDate(2024, 12, 31),
    description: 'Select a date in 2024',
  },
};

export const CompactSize: Story = {
  args: {
    label: 'Compact Date',
    description: 'A more compact date field',
    className: 'text-sm',
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Meeting Date',
    placeholderValue: new CalendarDate(2024, 6, 1),
    description: 'Select your preferred meeting date',
  },
};

export const WithValidation: Story = {
  args: {
    label: 'Future Date Only',
    minValue: new CalendarDate(2024, 6, 1),
    errorMessage: 'Date must be in the future',
    description: 'Only future dates are allowed',
  },
};
