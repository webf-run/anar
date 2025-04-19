import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Flex } from '../../Layout/Flex.js';
import { Text } from '../../Text/Text.js';
import { NumberField, NumberFieldProps } from './NumberField.js';

const meta = {
  title: 'Inputs/Number/NumberField',
  component: NumberField,
  args: {
    label: 'Cookies',
    description: 'How many cookies do you want?',
    value: 0,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NumberField>;

export default meta;

export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    const [args, setArgs] = useArgs<NumberFieldProps>();

    return (
      <Flex direction='column' gap='1rem'>
        <NumberField {...args} onChange={(value) => setArgs({ value })} />
        <Text text={`onChange: ${args.value}`} />
      </Flex>
    );
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
    errorMessage: 'This field is required',
  },
};
