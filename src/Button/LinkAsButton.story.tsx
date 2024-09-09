import type { Meta, StoryObj } from '@storybook/react';

import { ButtonAsLink } from './LinkAsButton';

const meta: Meta<typeof ButtonAsLink> = {
  title: 'Buttons/AsLink',
  component: ButtonAsLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'The Missing Link',
    href: 'https://github.com/webf-run/anar',
    target: '_blank',
  },
};
