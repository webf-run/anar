import { GridList, GridListItem } from '../src/GridList';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof GridList> = {
  component: GridList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Example = {
  render: (args: any) => (
    <GridList aria-label='Ice cream flavors' {...args}>
      <GridListItem>Chocolate</GridListItem>
      <GridListItem>Mint</GridListItem>
      <GridListItem>Strawberry</GridListItem>
      <GridListItem>Vanilla</GridListItem>
    </GridList>
  ),

  args: {
    onAction: null,
    selectionMode: 'multiple',
  },
};
