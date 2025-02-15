import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './TextField.js';

const meta: Meta<typeof TextField> = {
  title: 'Inputs/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Name',
    value: 'John Doe',
    description: 'Enter your full name',
    errorMessage: 'Invalid name',
    // isInvalid: true,
    isDisabled: true,
  },
};
