import type { Meta, StoryObj } from '@storybook/react';

import { Toggle } from './Toggle.js';

const meta = {
  title: 'Button/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Toggle>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    return (
      <Toggle>{({ isSelected }) => <>{isSelected ? 'Unpin' : 'Pin'}</>}</Toggle>
    );
  },
};

export const Intent: Story = {
  render: () => {
    return (
      <div className='flex gap-2'>
        <Toggle intent='outline'>
          {({ isSelected }) => <>{isSelected ? 'Unpin' : 'Pin'}</>}
        </Toggle>
        <Toggle intent='plain'>
          {({ isSelected }) => <>{isSelected ? 'Unpin' : 'Pin'}</>}
        </Toggle>
      </div>
    );
  },
};

export const Size: Story = {
  render: () => {
    return (
      <div className='flex flex-wrap items-end gap-2'>
        <Toggle intent='outline' size='xs'>
          {({ isSelected }) => <>{isSelected ? 'Unpin' : 'Pin'}</>}
        </Toggle>
        <Toggle intent='outline' size='sm'>
          {({ isSelected }) => <>{isSelected ? 'Unpin' : 'Pin'}</>}
        </Toggle>
        <Toggle intent='outline' size='md'>
          {({ isSelected }) => <>{isSelected ? 'Unpin' : 'Pin'}</>}
        </Toggle>
        <Toggle intent='outline' size='lg'>
          {({ isSelected }) => <>{isSelected ? 'Unpin' : 'Pin'}</>}
        </Toggle>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    children: <>Pin</>,
    isDisabled: true,
  },
};
