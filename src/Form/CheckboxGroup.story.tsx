import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox, CheckboxGroup } from './Checkbox.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Form/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    return (
      <CheckboxGroup label='Settings'>
        <Checkbox value='notifications'>Enable notifications</Checkbox>
        <Checkbox value='auto_update'>Auto-update applications</Checkbox>
        <Checkbox value='dark_mode'>Enable dark mode</Checkbox>
        <Checkbox value='location_access'>Allow location access</Checkbox>
        <Checkbox value='two_factor_auth'>
          Enable two-factor authentication
        </Checkbox>
      </CheckboxGroup>
    );
  },
};

export const DescriptionProp: Story = {
  render: () => {
    return (
      <CheckboxGroup
        label='User Permissions'
        description='Select the permissions you want to grant to the user.'
        defaultValue={['delete']}
      >
        <Checkbox
          value='read'
          label='Read'
          description='Can view content but cannot make changes.'
        />
        <Checkbox
          value='write'
          label='Write'
          description='Can create and modify existing content'
        />
        <Checkbox
          value='delete'
          label='Delete'
          description='Can permanently remove content.'
        />
        <Checkbox
          value='admin'
          label='Admin'
          description='Full access to all actions and settings.'
        />
      </CheckboxGroup>
    );
  },
};

export const Invalid: Story = {
  render: () => {
    return (
      <CheckboxGroup label='Settings' isInvalid>
        <Checkbox value='notifications' label='Enable notifications' />
        <Checkbox value='auto_update' label='Auto-update applications' />
        <Checkbox value='dark_mode' label='Enable dark mode' />
        <Checkbox value='location_access' label='Allow location access' />
        <Checkbox
          value='two_factor_auth'
          label='Enable two-factor authentication'
        />
      </CheckboxGroup>
    );
  },
};

export const Indeterminate: Story = {
  render: () => {
    return (
      <CheckboxGroup defaultValue={['encryption']} className='ml-6'>
        <Checkbox
          isIndeterminate
          value='encryption'
          description='Enable encryption.'
          isReadOnly
          label='Encryption'
        />
        <Checkbox
          value='firewall'
          description='Enable firewall protection.'
          label='Firewall'
        />
        <Checkbox
          value='backup'
          description='Enable automatic backups.'
          label='Backup'
        />
        <Checkbox
          isIndeterminate
          value='anomalyDetection'
          description='Enable anomaly detection.'
          label='Anomaly Detection'
        />
      </CheckboxGroup>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <CheckboxGroup label='Settings' isDisabled>
        <Checkbox value='notifications'>Enable notifications</Checkbox>
        <Checkbox value='auto_update'>Auto-update applications</Checkbox>
        <Checkbox value='dark_mode'>Enable dark mode</Checkbox>
        <Checkbox value='location_access'>Allow location access</Checkbox>
        <Checkbox value='two_factor_auth'>
          Enable two-factor authentication
        </Checkbox>
      </CheckboxGroup>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <CheckboxGroup label='Settings' isReadOnly>
        <Checkbox value='notifications'>Enable notifications</Checkbox>
        <Checkbox value='auto_update'>Auto-update applications</Checkbox>
        <Checkbox value='dark_mode'>Enable dark mode</Checkbox>
        <Checkbox value='location_access'>Allow location access</Checkbox>
        <Checkbox value='two_factor_auth'>
          Enable two-factor authentication
        </Checkbox>
      </CheckboxGroup>
    );
  },
};
