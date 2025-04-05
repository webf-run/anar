import type { Meta } from '@storybook/react';

import { ListBox, ListBoxItem } from './ListBox.js';

const meta: Meta<typeof ListBox> = {
  title: 'Collection/ListBox',
  component: ListBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Example = {
  render(args: any) {
    return (
      <ListBox aria-label='Ice cream flavor' {...args}>
        <ListBoxItem>Chocolate</ListBoxItem>
        <ListBoxItem>Mint</ListBoxItem>
        <ListBoxItem>Strawberry</ListBoxItem>
        <ListBoxItem>Vanilla</ListBoxItem>
      </ListBox>
    );
  },

  args: {
    onAction: null,
    selectionMode: 'single',
  },
};
