import { Editor } from '@tiptap/react';
import {
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';

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
        <Tooltip.Trigger>
          <Toggle
            size='sm'
            onClick={() => editor.chain().focus().toggleBold().run()}
            intent='outline'
          >
            <BoldIcon />
          </Toggle>
        </Tooltip.Trigger>
        <Tooltip.Content className={'flex flex-col items-center text-'}>
          <h3>Bold</h3>
          <p>ctrl/cmd + b</p>
        </Tooltip.Content>
      </Tooltip>

      {/* Italic */}
      <Tooltip delay={0}>
        <Tooltip.Trigger>
          <Toggle
            size='sm'
            intent='outline'
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <ItalicIcon />
          </Toggle>
        </Tooltip.Trigger>
        <Tooltip.Content className={'flex flex-col items-center text-'}>
          <h3>Italic</h3>
          <p>ctrl/cmd + i</p>
        </Tooltip.Content>
      </Tooltip>

      {/* Underline */}
      <Tooltip delay={0}>
        <Tooltip.Trigger>
          <Toggle
            size='sm'
            intent='outline'
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon />
          </Toggle>
        </Tooltip.Trigger>
        <Tooltip.Content className={'flex flex-col items-center text-'}>
          <h3>Underline</h3>
          <p>ctrl/cmd + u</p>
        </Tooltip.Content>
      </Tooltip>

      {/* Strike Through */}
      <Tooltip delay={0}>
        <Tooltip.Trigger>
          <Toggle
            size='sm'
            intent='outline'
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <StrikethroughIcon />
          </Toggle>
        </Tooltip.Trigger>
        <Tooltip.Content className={'flex flex-col items-center text-'}>
          <h3>\Strike</h3>
          <p>ctrl/cmd + shift + s</p>
        </Tooltip.Content>
      </Tooltip>

      {/* Code */}
      <Tooltip delay={0}>
        <Tooltip.Trigger>
          <Toggle
            size='sm'
            intent='outline'
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <Code2Icon />
          </Toggle>
        </Tooltip.Trigger>
        <Tooltip.Content className={'flex flex-col items-center text-'}>
          <h3>Code</h3>
          <p>ctrl/cmd + e</p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
