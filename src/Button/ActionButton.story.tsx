import type { Meta, StoryObj } from '@storybook/react';
import { Database } from 'lucide-react';

import { ActionButton } from './ActionButton.js';

const meta = {
  title: 'Buttons/ActionButton',
  component: ActionButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ActionButton>;

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: Database,
    'aria-label': 'Database',
  },
};
