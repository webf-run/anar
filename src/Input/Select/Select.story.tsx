import type { Meta, StoryObj } from '@storybook/react';

import { Select, SelectItem } from './Select.js';
import { Text } from 'react-aria-components';

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
  render: (args: any) => (
    <Select label='Select'>
      <SelectItem>Item- 1</SelectItem>
      <SelectItem>Item- 2</SelectItem>
      <SelectItem>Item- 3</SelectItem>
      <SelectItem>Item- 4</SelectItem>
    </Select>
  ),
};
