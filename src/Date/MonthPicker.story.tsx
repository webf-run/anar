import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useLayoutEffect, useRef } from 'react';

import { MonthPicker, MonthPickerRef } from './MonthPicker.js';

const meta: Meta<typeof MonthPicker> = {
  title: 'Dates/MonthPicker',
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
  render(_args) {
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
  render(_args) {
    return <MonthPicker onChange={fn()} isDisabled />;
  },
};
