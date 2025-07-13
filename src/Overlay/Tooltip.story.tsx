import { IconBrandX, IconCircleInfo } from '@intentui/icons';
import type { Meta, StoryObj } from '@storybook/react';

import { Button, buttonStyles } from '../Button/Button.js';
import { Description } from '../Form/Field.js';
import { Tooltip } from './Tooltip.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Tooltip> = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    return (
      <Tooltip>
        <Button intent='outline'>Duplicate</Button>
        <Tooltip.Content>
          <strong className='font-semibold'>Duplicate project</strong>
          <p className='mt-1 max-w-2xs text-pretty text-muted-fg text-sm'>
            This will create a copy of the current project including all files
            and settings.
          </p>
        </Tooltip.Content>
      </Tooltip>
    );
  },
};

export const Intent: Story = {
  render: () => {
    return (
      <Tooltip>
        <Tooltip.Trigger
          aria-label='Follow My Twitter'
          className={buttonStyles({
            intent: 'outline',
            size: 'sq-sm',
          })}
        >
          <IconCircleInfo />
        </Tooltip.Trigger>
        <Tooltip.Content intent='inverse'>
          <div className='relative'>
            <strong className='font-semibold'>Attention</strong>
            <p>This is a warning message.</p>
          </div>
        </Tooltip.Content>
      </Tooltip>
    );
  },
};

export const WithoutArrow: Story = {
  render: () => {
    return (
      <Tooltip>
        <Tooltip.Trigger aria-label='Fresh drop alert'>
          <div className='h-4 w-4 rounded-full bg-blue-300'></div>
        </Tooltip.Trigger>
        <Tooltip.Content showArrow={false}>
          <strong className='font-semibold'>Fresh drop alert</strong> <br />
          <Description>Scope the newest addition to our stash.</Description>
        </Tooltip.Content>
      </Tooltip>
    );
  },
};

export const Delay: Story = {
  render: () => {
    return (
      <div className='flex gap-2'>
        <Tooltip delay={0}>
          <Tooltip.Trigger
            aria-label='Follow me'
            className={buttonStyles({
              intent: 'outline',
              size: 'sq-sm',
            })}
          >
            <IconBrandX />
          </Tooltip.Trigger>
          <Tooltip.Content>Follow me @intentui</Tooltip.Content>
        </Tooltip>
      </div>
    );
  },
};
