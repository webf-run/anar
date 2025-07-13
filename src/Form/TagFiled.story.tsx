import type { Meta, StoryObj } from '@storybook/react';
import { useListData } from 'react-stately';

import { TagField } from './TagField.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export

// The below type is created so that we dont have to have args inside story render.
type TagFieldPropsWithoutList = Omit<
  React.ComponentProps<typeof TagField>,
  'list'
>;

const meta = {
  title: 'Form/Tag Field',
  component: TagField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TagField>;

export default meta;
export type Story = StoryObj<TagFieldPropsWithoutList>;

export const Primary: Story = {
  render: () => {
    const selectedItems = useListData({
      initialItems: [{ id: 1, name: 'Laravel' }],
    });

    return <TagField list={selectedItems} />;
  },
};

export const Appearance: Story = {
  render: () => {
    const selectedItems = useListData({
      initialItems: [],
    });

    return (
      <TagField appearance='plain' placeholder='Tags...' list={selectedItems} />
    );
  },
};

export const MaxEntry: Story = {
  render: () => {
    const selectedItems = useListData({
      initialItems: [],
    });

    return (
      <TagField
        max={3}
        label='Add tag'
        description='You can only add 3 tags'
        list={selectedItems}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const selectedItems = useListData({
      initialItems: [],
    });

    return <TagField label='Add tag' isDisabled list={selectedItems} />;
  },
};
