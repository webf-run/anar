import { Link } from '../src/Link';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof Link> = {
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Example = {
  render: (args: any) => <Link {...args}>The missing link</Link>,

  args: {
    href: 'https://www.imdb.com/title/tt6348138/',
    target: '_blank',
  },
};
