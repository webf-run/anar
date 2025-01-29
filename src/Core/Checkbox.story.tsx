import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox.js';

const meta: Meta<typeof Checkbox> = {
  title: 'Core/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: 'md',
    label: 'Check box',
  },
};

export const Indeterminate: Story = {
  args: {
    size: 'md',
    label: 'Check box',
    isIndeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    label: 'Check box',
  },
};
