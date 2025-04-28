import type { Meta, StoryObj } from '@storybook/react';
import { ArrowBigRight, Database } from 'lucide-react';

import { Button } from './Button.js';

const meta = {
  title: 'Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

export type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  args: {
    variant: 'accent',
    label: 'Accent Button',
  },
};

export const Main: Story = {
  args: {
    variant: 'main',
    label: 'Main Button',
  },
};

export const Calm: Story = {
  args: {
    variant: 'calm',
    label: 'Calm Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Button',
  },
};

export const Nagative: Story = {
  args: {
    variant: 'negative',
    label: 'Press me',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'negative',
    isDisabled: true,
    label: 'Press me',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'calm',
    label: 'Select Database',
    left: Database,
    right: ArrowBigRight,
  },
};

export const Compact: Story = {
  args: {
    variant: 'accent',
    compact: true,
    label: 'Compact Accent Button',
  },
};
