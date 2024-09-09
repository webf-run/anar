import type { Meta, StoryObj } from '@storybook/react';
import { ArrowBigRight, Database } from 'lucide-react';

import { Button } from './Button.js';

const meta: Meta<typeof Button> = {
  title: 'Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    emphasis: 'fill',
    size: 'md',
    label: 'Press me',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    emphasis: 'fill',
    label: 'Press me',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    emphasis: 'fill',
    label: 'Press me',
  },
};

export const Nagative: Story = {
  args: {
    variant: 'negative',
    emphasis: 'fill',
    label: 'Press me',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'negative',
    emphasis: 'fill',
    isDisabled: true,
    label: 'Press me',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    emphasis: 'fill',
    size: 'md',
    label: 'Select Database',
    left: Database,
    right: ArrowBigRight,
  },
};
