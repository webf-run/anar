import type { Meta, StoryObj } from '@storybook/react';

import { SearchField } from './SearchField.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Form/Search Field',
  component: SearchField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SearchField>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: 'Search',
  },
};

export const Pending: Story = {
  args: {
    placeholder: 'Search',
    isPending: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Search',
    isInvalid: true,
  },
};

export const ReadOnly: Story = {
  args: {
    placeholder: 'Search',
    isReadOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Checkbox',
    isDisabled: true,
  },
};
