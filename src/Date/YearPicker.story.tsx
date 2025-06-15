import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useLayoutEffect, useRef, useState } from 'react';

import { YearPicker, YearPickerRef } from './YearPicker.js';

const meta = {
  title: 'Dates/YearPicker',
  component: YearPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof YearPicker>;

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onChange: fn(),
    startYear: 2019,
    endYear: 2030,
  },
  render: (args) => {
    const start = 2019;
    const [end, setEnd] = useState(2036);

    const pickerRef = useRef<YearPickerRef>(null);

    useLayoutEffect(() => {
      pickerRef.current?.focus();
    }, []);

    setTimeout(() => {
      setEnd(2030);
    }, 5000);

    return (
      <YearPicker
        ref={pickerRef}
        onChange={fn()}
        startYear={start}
        endYear={end}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    onChange: fn(),
    startYear: 2019,
    endYear: 2030,
  },
  render: (args) => {
    const start = 2019;
    const [end, setEnd] = useState(2030);

    return (
      <YearPicker onChange={fn()} startYear={start} endYear={end} isDisabled />
    );
  },
};

export const DisabledYears: Story = {
  args: {
    onChange: fn(),
    startYear: 2019,
    endYear: 2030,
  },
  render: (args) => {
    const start = 2019;
    const [end, setEnd] = useState(2030);

    const disabledYears = [2021, 2023, 2025];

    return (
      <YearPicker
        onChange={fn()}
        startYear={start}
        endYear={end}
        disabledYears={disabledYears}
      />
    );
  },
};
