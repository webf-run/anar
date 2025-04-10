import type { Meta, StoryObj } from '@storybook/react';
import { DialogTrigger } from 'react-aria-components';

import { Button } from '../Button/Button';
import { Calendar } from '../Calendar';
import { ListBox, ListBoxItem } from '../Collection/export';
import { Checkbox } from '../Input/Checkbox/Checkbox';
import { CheckboxGroup } from '../Input/Checkbox/CheckboxGroup';
import { Heading } from '../Text/Heading';
import { Popover } from './Popover';

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

export const TextPopover: Story = {
  render: () => (
    <DialogTrigger>
      <Button label='Text' />
      <Popover
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
    </DialogTrigger>
  ),
};

export const ListPopover: Story = {
  render: (args: any) => (
    <DialogTrigger>
      <Button label='List' />
      <Popover>
        <ListBox aria-label='Ice cream flavor' {...args}>
          <ListBoxItem>Chocolate</ListBoxItem>
          <ListBoxItem>Mint</ListBoxItem>
          <ListBoxItem>Strawberry</ListBoxItem>
          <ListBoxItem>Vanilla</ListBoxItem>
        </ListBox>
      </Popover>
    </DialogTrigger>
  ),
};

export const CheckboxPopover: Story = {
  render: (args: any) => (
    <DialogTrigger>
      <Button label='Checkbox' />
      <Popover>
        <CheckboxGroup {...args}>
          <Checkbox value='soccer' label='Soccer' />
          <Checkbox value='baseball' label='Baseball' />
          <Checkbox value='basketball' label='Basketball' />
        </CheckboxGroup>
      </Popover>
    </DialogTrigger>
  ),
};

export const CalendarPopover: Story = {
  render: () => (
    <DialogTrigger>
      <Button label='Calendar' />
      <Popover>
        <Calendar style={{ overflow: 'auto' }} />
      </Popover>
    </DialogTrigger>
  ),
};
