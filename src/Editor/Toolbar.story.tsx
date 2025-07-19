import type { Meta, StoryObj } from '@storybook/react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { Toolbar } from './Toolbar.js';

const meta = {
  title: 'Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Toolbar>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    const editor = useEditor({
      extensions: [StarterKit],
      content: '<p>Type here...</p>',
    });

    return (
      <div>
        <Toolbar editor={editor} />
        <div
          style={{
            minHeight: 120,
            padding: 16,
            outline: 'none',
          }}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    );
  },
};
