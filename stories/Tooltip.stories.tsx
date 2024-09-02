import { Tooltip } from '../src/Tooltip';
import { Button, TooltipTrigger } from 'react-aria-components';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Example = {
  render: (args: any) => (
    <TooltipTrigger>
      <Button>💾</Button>
      <Tooltip {...args}>Save</Tooltip>
    </TooltipTrigger>
  ),
};
