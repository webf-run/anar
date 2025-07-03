import type { Meta, StoryObj } from '@storybook/react';

import { NumberField } from './NumberField.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Form/NumberField',
  component: NumberField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NumberField>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Number Field',
    placeholder: 'Enter number here',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Number Field',
    isInvalid: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Number Field',
    isDisabled: true,
  },
};
