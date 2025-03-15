import type { Meta, StoryObj } from '@storybook/react';

import { DryButton } from './DryButton.js';

const meta: Meta<typeof DryButton> = {
  title: 'Buttons/DryButton',
  component: DryButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    lead: 'lead',
    main: 'main',
    tail: 'tail',
  },
};
