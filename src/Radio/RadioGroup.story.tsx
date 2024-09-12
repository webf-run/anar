import type { Meta, StoryObj } from '@storybook/react';

import { Radio } from './Radio.js';
import { RadioGroup } from './RadioGroup.js';

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args: any) => (
    <RadioGroup {...args}>
      <Radio value='soccer' label='Soccer' />
      <Radio value='baseball' label='Baseball' />
      <Radio value='basketball' label='Basketball' />
    </RadioGroup>
  ),

  args: {
    label: 'Favorite sport',
    description: 'Pick whatever you need',
    errorMessage: 'Please select a sport',
    isInvalid: true,
  },
};

export default meta;
