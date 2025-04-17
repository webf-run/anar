import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';
import { Flex } from '../Layout/Flex';
import { Heading } from '../Text/Heading';
import { Popover } from './Popover';
import { usePopover } from './UsePopover';

const meta: Meta<typeof Popover> = {
  title: 'Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    const popover = usePopover(false);

    return (
      <Flex>
        <Button ref={popover.triggerRef} label='Text' onPress={popover.open} />
        <Popover
          controller={popover}
          style={{
            maxWidth: '250px',
            display: 'flex',
            flexDirection: 'column',
            padding: '0px 20px',
          }}
        >
          <Heading>Help</Heading>
          <p>For help accessing your account, please contact support.</p>
        </Popover>
      </Flex>
    );
  },
};

export const WithDifferentPosition: Story = {
  render: () => {
    const popover = usePopover(false);

    return (
      <Flex direction='column' gap='1rem' align='center'>
        <Button label='Text' onPress={popover.open} />
        <Heading level={3} ref={popover.triggerRef}>
          This is anchor point.
        </Heading>
        <Popover
          controller={popover}
          style={{
            maxWidth: '250px',
            display: 'flex',
            flexDirection: 'column',
            padding: '0px 20px',
          }}
        >
          <Heading>Help</Heading>
          <p>For help accessing your account, please contact support.</p>
        </Popover>
      </Flex>
    );
  },
};
