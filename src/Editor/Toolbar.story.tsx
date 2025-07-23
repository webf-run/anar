import type { Meta, StoryObj } from '@storybook/react';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

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
      extensions: [StarterKit, Subscript, Superscript],
      content: '<p>Type here...</p>',
    });

    return (
      <div>
        <style>
          {`
            .editor-container ul {
              list-style-type: disc;
              margin-left: 1.5rem;
              padding-left: 1rem;
            }

            .editor-container ol {
              list-style-type: decimal;
              margin-left: 1.5rem;
              padding-left: 1rem;
            }
          `}
        </style>
        <Toolbar editor={editor} />
        <div
          style={{
            minHeight: 120,
            padding: 16,
            outline: 'none',
          }}
        >
          <div className='editor-container'>
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    );
  },
};
