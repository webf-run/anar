import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from './Textarea.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Form/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Textarea>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Textarea',
    placeholder: 'Enter text here',
  },
};

export const Description: Story = {
  args: {
    label: 'Address',
    description: 'Please enter your address',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Textarea',
    placeholder: 'Enter text here',
    isInvalid: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Textarea',
    placeholder: 'Enter text here',
    isReadOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Textarea',
    placeholder: 'Enter text here',
    isDisabled: true,
  },
};
