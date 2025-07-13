import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './TextField.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Form/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TextField>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'TextField',
    placeholder: 'Enter text here',
  },
};

export const Invalid: Story = {
  args: {
    label: 'TextField',
    placeholder: 'Enter text here',
    isInvalid: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'TextField',
    placeholder: 'Enter text here',
    isDisabled: true,
  },
};
