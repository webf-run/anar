import { IconBell } from '@intentui/icons';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button.js';
import { Popover } from './Popover.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Popover> = {
  title: 'Overlays/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    return (
      <Popover>
        <Button intent='outline'>What’s this?</Button>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Invite link</Popover.Title>
            <Popover.Description>
              Anyone with this link can join your team without approval.
            </Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover>
    );
  },
};

export const OverlayArrow: Story = {
  render: () => {
    return (
      <Popover>
        <Button intent='outline' size='sq-sm'>
          <IconBell />
        </Button>
        <Popover.Content showArrow className='p-4 sm:min-w-72'>
          You have 3 new notifications.
        </Popover.Content>
      </Popover>
    );
  },
};

export const PopoverTrigger: Story = {
  render: () => {
    return (
      <Popover>
        <Popover.Trigger aria-label='Open Popover'>
          <div className='w-3.5 h-3.5 rounded-full bg-blue-500'></div>
        </Popover.Trigger>
        <Popover.Content className='min-w-72'>
          <Popover.Header>
            <Popover.Title>Email</Popover.Title>
            <Popover.Description>
              We'll send you an email to log in.
            </Popover.Description>
          </Popover.Header>
          <Popover.Footer>
            <Button>Send Login Link</Button>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    );
  },
};
