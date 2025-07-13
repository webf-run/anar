import type { Meta, StoryObj } from '@storybook/react';

import { Radio, RadioGroup, type RadioGroupProps } from './Radio.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof RadioGroup> = {
  title: 'Form/Radio',
  component: RadioGroup,
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
      <RadioGroup label='Payment Method'>
        <Radio value='credit-card'>Credit Card</Radio>
        <Radio value='paypal'>PayPal</Radio>
        <Radio value='apple-pay'>Apple Pay</Radio>
        <Radio value='google-pay'>Google Pay</Radio>
        <Radio value='bank-transfer'>Bank Transfer</Radio>
      </RadioGroup>
    );
  },
};

export const Description: Story = {
  render: () => {
    return (
      <RadioGroup
        label='Notification Preference'
        description={`Choose how you'd like to receive notifications.`}
        defaultValue='sms'
      >
        <Radio
          label='Email'
          description='Get updates via email instantly.'
          value='email'
        />
        <Radio
          label='SMS'
          description='Receive alerts through text messages.'
          value='sms'
        />
        <Radio
          label='Push Notification'
          description='Get notified on your device.'
          value='push'
        />
        <Radio
          label='Do not disturb'
          description='Turn off all notifications.'
          value='none'
        />
      </RadioGroup>
    );
  },
};

export const Invalid: Story = {
  render: () => {
    return (
      <RadioGroup
        isInvalid
        label='Notification Preference'
        description={`Choose how you'd like to receive notifications.`}
      >
        <Radio
          label='Email'
          description='Get updates via email instantly.'
          value='email'
        />
        <Radio
          label='SMS'
          description='Receive alerts through text messages.'
          value='sms'
        />
        <Radio
          label='Push Notification'
          description='Get notified on your device.'
          value='push'
        />
        <Radio
          label='Do not disturb'
          description='Turn off all notifications.'
          value='none'
        />
      </RadioGroup>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <RadioGroup
        isDisabled
        label='Notification Preference'
        description={`Choose how you'd like to receive notifications.`}
      >
        <Radio
          label='Email'
          description='Get updates via email instantly.'
          value='email'
        />
        <Radio
          label='SMS'
          description='Receive alerts through text messages.'
          value='sms'
        />
        <Radio
          label='Push Notification'
          description='Get notified on your device.'
          value='push'
        />
        <Radio
          label='Do not disturb'
          description='Turn off all notifications.'
          value='none'
        />
      </RadioGroup>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <RadioGroup
        isReadOnly
        label='Notification Preference'
        description={`Choose how you'd like to receive notifications.`}
        defaultValue={'sms'}
      >
        <Radio
          label='Email'
          description='Get updates via email instantly.'
          value='email'
        />
        <Radio
          label='SMS'
          description='Receive alerts through text messages.'
          value='sms'
        />
        <Radio
          label='Push Notification'
          description='Get notified on your device.'
          value='push'
        />
        <Radio
          label='Do not disturb'
          description='Turn off all notifications.'
          value='none'
        />
      </RadioGroup>
    );
  },
};
