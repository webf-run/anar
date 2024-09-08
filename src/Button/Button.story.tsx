import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button.js';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return <Button {...args} label='Press me' />;
  },

  args: {
    variant: 'primary',
    emphasis: 'fill',
    size: 'md',
    // radius: 'MD',
    // pending: false,
  },
};

export const Secondary: Story = {
  render: (args) => {
    return <Button {...args} label='Press me' />;
  },

  args: {
    variant: 'secondary',
    emphasis: 'fill',
    // size: 'MD',
    // radius: 'MD',
    // pending: false,
  },
};

export const Accent: Story = {
  render: (args) => {
    return <Button {...args} label='Press me' />;
  },

  args: {
    variant: 'accent',
    emphasis: 'fill',
  },
};

export const Nagative: Story = {
  render: (args) => {
    return <Button {...args} label='Press me' />;
  },

  args: {
    variant: 'negative',
    emphasis: 'fill',
  },
};

export const Disabled: Story = {
  render: (args) => {
    return <Button {...args} label='Press me' />;
  },

  args: {
    variant: 'negative',
    emphasis: 'fill',
    isDisabled: true,
  },
};
