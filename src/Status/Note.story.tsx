import type { Meta, StoryObj } from '@storybook/react';

import { Note } from './Note.js';

const meta = {
  title: 'Statuses/Note',
  component: Note,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Note>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, quasi.',
  },
};

export const Intent: Story = {
  render: () => {
    const notes = ['info', 'default', 'warning', 'danger', 'success'] as const;

    return (
      <div className='max-w-md space-y-2'>
        {notes.map((it) => (
          <Note key={it} intent={it}>
            We hook you up with top-tier migration services in our startup plan.
            Wanna roll with it? Hit us up here.
          </Note>
        ))}
      </div>
    );
  },
};
