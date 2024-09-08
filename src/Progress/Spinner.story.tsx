import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './Spinner.js';


const meta: Meta<typeof Spinner> = {
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    active: true,
    size: 'xl',
  },
};
