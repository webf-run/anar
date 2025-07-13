import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Checkbox',
  },
};

export const DescriptionProp: Story = {
  args: {
    label: 'Checkbox',
    description: 'Description here',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Checkbox',
    isInvalid: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Checkbox',
    isIndeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Checkbox',
    isDisabled: true,
  },
};
