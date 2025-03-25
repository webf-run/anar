import type { Meta, StoryObj } from '@storybook/react';

import { Select, SelectItem } from './Select.js';

const meta: Meta<typeof Select> = {
  title: 'Inputs/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <Select label='Select'>
      <SelectItem>Item- 1</SelectItem>
      <SelectItem>Item- 2</SelectItem>
      <SelectItem>Item- 3</SelectItem>
      <SelectItem>Item- 4</SelectItem>
    </Select>
  ),
};

export const Diabled: Story = {
  render: () => (
    <Select label='Select' isDisabled>
      <SelectItem>Item- 1</SelectItem>
      <SelectItem>Item- 2</SelectItem>
      <SelectItem>Item- 3</SelectItem>
      <SelectItem>Item- 4</SelectItem>
    </Select>
  ),
};
