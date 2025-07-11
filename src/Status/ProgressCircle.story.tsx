import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { ProgressCircle } from './ProgressCircle.js';

const meta = {
  title: 'Statuses/ProgressCircle',
  component: ProgressCircle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ProgressCircle>;

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

    return <ProgressCircle aria-label='Loading…' value={value} />;
  },
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
  },
};

export const Size: Story = {
  args: {
    className: 'size-10',
    isIndeterminate: true,
  },
};

export const Colour: Story = {
  args: {
    className: 'text-blue-500',
    isIndeterminate: true,
  },
};
