import type { Meta } from '@storybook/react';

import { NumberField } from './NumberField.js';


const meta: Meta<typeof NumberField> = {
  component: NumberField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Example = {
  args: {
    label: 'Cookies',
  },
};
