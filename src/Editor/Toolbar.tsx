import { Editor } from '@tiptap/react';
import {
  BoldIcon,
  Code2Icon,
  CodeIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { Toggle } from '../Button/Toggle.js';
import { Tooltip } from '../Overlay/Tooltip.js';

export interface ToolbarProps {
  editor?: Editor;
}

export function Toolbar(props: ToolbarProps) {
  const { editor } = props;

  if (!editor) return null;

  return (
    <div style={{ borderBottom: '1px solid', padding: 12 }}>
      {/* Bold */}
      <Tooltip delay={0}>
        <Toggle
          size='sm'
          onClick={() => editor.chain().focus().toggleBold().run()}
          intent='outline'
        >
          <BoldIcon />
        </Toggle>
        <Tooltip.Content className={'flex flex-col items-center text-'}>
          <h3>Bold</h3>
          <p>ctrl/cmd + B</p>
        </Tooltip.Content>
      </Tooltip>

      {/* Italic */}
      <Tooltip delay={0}>
        <Toggle
          size='sm'
          intent='outline'
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon />
        </Toggle>
        <Tooltip.Content className={'flex flex-col items-center text-'}>
          <h3>Italic</h3>
          <p>ctrl/cmd + I</p>
        </Tooltip.Content>
      </Tooltip>

      {/* Underline */}
      <Tooltip delay={0}>
        <Toggle
          size='sm'
          intent='outline'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon />
        </Toggle>
        <Tooltip.Content className={'flex flex-col items-center text-'}>
          <h3>Underline</h3>
          <p>ctrl/cmd + U</p>
        </Tooltip.Content>
      </Tooltip>

      {/* Strike Through */}
      <Tooltip delay={0}>
        <Toggle
          size='sm'
          intent='outline'
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon />
        </Toggle>
        <Tooltip.Content className={'flex flex-col items-center text-'}>
          <h3>\Strike</h3>
          <p>ctrl/cmd + shift + S</p>
        </Tooltip.Content>
      </Tooltip>

      {/* Code */}
      <Tooltip delay={0}>
        <Toggle
          size='sm'
          intent='outline'
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code2Icon />
        </Toggle>
        <Tooltip.Content className={'flex flex-col items-center text-'}>
          <h3>Code</h3>
          <p>ctrl/cmd + E</p>
        </Tooltip.Content>
      </Tooltip>

      {/* Subscript */}
      <Tooltip delay={0}>
        <Toggle
          size='sm'
          intent='outline'
          onClick={() => editor.chain().focus().toggleSubscript().run()}
        >
          <SubscriptIcon />
        </Toggle>
        <Tooltip.Content className={'flex flex-col items-center text-'}>
          <h3>Subscript</h3>
          <p>ctrl/cmd + ,</p>
        </Tooltip.Content>
      </Tooltip>

      {/* Superscript */}
      <Tooltip delay={0}>
        <Toggle
          size='sm'
          intent='outline'
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
        >
          <SuperscriptIcon />
        </Toggle>
        <Tooltip.Content className={'flex flex-col items-center text-'}>
          <h3>Superscript</h3>
          <p>ctrl/cmd + .</p>
        </Tooltip.Content>
      </Tooltip>

      {/* BulletList */}
      <Tooltip delay={0}>
        <Toggle
          size='sm'
          intent='outline'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListIcon />
        </Toggle>
        <Tooltip.Content className={'flex flex-col items-center text-'}>
          <h3>Bullet List</h3>
          <p>ctrl/cmd + shift + 8</p>
        </Tooltip.Content>
      </Tooltip>

      {/* Numbered List */}
      <Tooltip delay={0}>
        <Toggle
          size='sm'
          intent='outline'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrderedIcon />
        </Toggle>
        <Tooltip.Content className={'flex flex-col items-center text-'}>
          <h3>Numbered List</h3>
          <p>ctrl/cmd + shift + 7</p>
        </Tooltip.Content>
      </Tooltip>

      {/* Code Block */}
      <Tooltip delay={0}>
        <Toggle
          size='sm'
          intent='outline'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <CodeIcon />
        </Toggle>
        <Tooltip.Content className={'flex flex-col items-center text-'}>
          <h3>Code Block</h3>
          <p>ctrl/cmd + alt + C</p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
