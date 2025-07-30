import type { Meta, StoryObj } from '@storybook/react';
import FileHandler from '@tiptap/extension-file-handler';
import Image from '@tiptap/extension-image';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
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
      extensions: [
        StarterKit,
        Subscript,
        Superscript,
        Image,
        FileHandler.configure({
          allowedMimeTypes: [
            'image/png',
            'image/jpeg',
            'image/gif',
            'image/webp',
          ],
          onDrop: (currentEditor, files, pos) => {
            files.forEach((file) => {
              const fileReader = new FileReader();

              fileReader.readAsDataURL(file);
              fileReader.onload = () => {
                currentEditor
                  .chain()
                  .insertContentAt(pos, {
                    type: 'image',
                    attrs: {
                      src: fileReader.result,
                    },
                  })
                  .focus()
                  .run();
              };
            });
          },
          onPaste: (currentEditor, files, htmlContent) => {
            files.forEach((file) => {
              if (htmlContent) {
                // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
                // you could extract the pasted file from this url string and upload it to a server for example
                console.log(htmlContent); // eslint-disable-line no-console
                return false;
              }

              const fileReader = new FileReader();

              fileReader.readAsDataURL(file);
              fileReader.onload = () => {
                currentEditor
                  .chain()
                  .insertContentAt(currentEditor.state.selection.anchor, {
                    type: 'image',
                    attrs: {
                      src: fileReader.result,
                    },
                  })
                  .focus()
                  .run();
              };
            });
          },
        }),
      ],
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
