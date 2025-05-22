import type { Meta, StoryObj } from '@storybook/react';

import { YearSelector } from './YearSelector';

const meta: Meta<typeof YearSelector> = {
  title: 'Dates/YearSelector',
  component: YearSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    const displayedDate = new Date();

    return (
      <div>
        <YearSelector onChange={() => {}} changeViewState={() => {}} />
      </div>
    );
  },
};

export const MinMax: Story = {
  render: () => {
    const displayedDate = new Date();

    return (
      <div>
        <YearSelector
          minValue={2022}
          maxValue={2026}
          onChange={() => {}}
          changeViewState={() => {}}
        />
      </div>
    );
  },
};
