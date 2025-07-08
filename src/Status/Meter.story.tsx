import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Meter } from './Meter.js';

const meta = {
  title: 'Statuses/Meter',
  component: Meter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Meter>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState(1);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => (prev < 100 ? prev + 1 : 100));
      }, 50);

      return () => clearInterval(interval);
    }, []);
    return <Meter label='Storage space' value={value} />;
  },
};

export const DecimalFormat: Story = {
  args: {
    label: 'Progress',
    value: 75.25,
    formatOptions: {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
};
