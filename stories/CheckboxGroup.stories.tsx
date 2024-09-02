import { Checkbox } from '../src/Checkbox';
import { CheckboxGroup } from '../src/CheckboxGroup';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof CheckboxGroup> = {
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Example = {
  render: (args: any) => (
    <CheckboxGroup {...args}>
      <Checkbox value='soccer'>Soccer</Checkbox>
      <Checkbox value='baseball'>Baseball</Checkbox>
      <Checkbox value='basketball'>Basketball</Checkbox>
    </CheckboxGroup>
  ),

  args: {
    label: 'Favorite sports',
  },
};
