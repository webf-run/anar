import type { Meta, StoryObj } from '@storybook/react';
import { ArrowBigRight, Database } from 'lucide-react';

import { CheckBox } from './CheckBox.js';

const meta: Meta<typeof CheckBox> = {
  title: 'Core/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'active',
    size: 'md',
    label: 'Check box',
  },
};

export const Indeterminate: Story = {
  args: {
    variant: 'active',
    size: 'md',
    label: 'Check box',
    isIndeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    variant: 'disabled',
    label: 'Check box',
  },
};
