import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useLayoutEffect, useRef } from 'react';

import { MonthPicker, MonthPickerRef } from './MonthPicker';

const meta: Meta<typeof MonthPicker> = {
  title: 'Dates/MonthSelector',
  component: MonthPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onChange: fn(),
  },
  render: (args) => {
    const start = 2019;

    const pickerRef = useRef<MonthPickerRef>(null);

    useLayoutEffect(() => {
      pickerRef.current?.focus();
    }, []);

    return <MonthPicker ref={pickerRef} onChange={fn()} />;
  },
};

export const Disabled: Story = {
  args: {
    onChange: fn(),
  },
  render: (args) => {
    return <MonthPicker onChange={fn()} isDisabled />;
  },
};

// export const DisabledYears: Story = {
//   args: {
//     onChange: fn(),
//   },
//   render: (args) => {
//     return <YearPicker onChange={fn()} />;
//   },
// };
