import type { Meta } from '@storybook/react';

import { Checkbox } from './Checkbox.js';
import { CheckboxGroup } from './CheckboxGroup.js';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Inputs/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Primary = {
  args: {
    label: 'Favorite sports',
  },

  render: (args: any) => (
    <CheckboxGroup {...args}>
      <Checkbox value='soccer' label='Soccer' />
      <Checkbox value='baseball' label='Baseball' />
      <Checkbox value='basketball' label='Basketball' />
    </CheckboxGroup>
  ),
};
