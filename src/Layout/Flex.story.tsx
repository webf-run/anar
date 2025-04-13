import type { Meta, StoryObj } from '@storybook/react';
import { Apple, ChartPie, ChartSpline } from 'lucide-react';
import type { ReactNode } from 'react';

import { Flex } from './Flex.js';
import { FlexStrategy } from './Layout.type.js';

const meta = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Flex>;

export default meta;

export type Story = StoryObj<typeof meta>;

const layoutStyle = {
  width: 400,
  border: '1px solid var(--gray-900)',
};

const iconStyle = {
  background: 'var(--gray-200)',
};

const childStyle = {
  padding: '1rem',
  background: 'var(--gray-200)',
};

export const Equal: Story = {
  render: () => {
    return (
      <div>
        <h3>Equal Layout</h3>
        <Flex
          style={layoutStyle}
          placement='center center'
          strategy='equal'
          gap='1rem'
        >
          <div style={childStyle}>
            <h3>Child 1</h3>
            <p>Some content for the first child.</p>
          </div>
          <div style={childStyle}>
            <h3>Item 2</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
              nulla in magna mollis egestas. Aliquam maximus ac lectus sed
              efficitur.
            </p>
          </div>
          <div style={childStyle}>
            <h3>Item 3</h3>
          </div>
        </Flex>
      </div>
    );
  },
};

export const EqualWithShrink: Story = {
  name: 'Equal Layout + Shrink',
  render: () => {
    return (
      <div>
        <h3>Equal Layout - Shrink</h3>
        <code>flex: 1 1 100%</code>
        <Flex
          style={{ ...layoutStyle }}
          placement='start'
          align='center'
          strategy='equal'
          gap='1rem'
        >
          <Apple style={iconStyle} size={48} />
          <ChartPie style={iconStyle} size={48} />
          <ChartSpline style={iconStyle} size={48} />
          <Flex.AutoChild>
            <div style={childStyle}>
              This is a very long text which fits without shrinking icons
            </div>
          </Flex.AutoChild>
        </Flex>
      </div>
    );
  },
};

export const EqualWithGrow: Story = {
  name: 'Equal Layout + Grow',
  render: () => {
    return (
      <div>
        <h3>Equal Layout - Grow</h3>
        <code></code>
        <Flex
          style={{ ...layoutStyle }}
          placement='start'
          align='center'
          strategy='equal'
          gap='1rem'
        >
          <Apple style={iconStyle} size={48} />
          <Flex.AutoChild>
            <div style={childStyle}>
              This is a very long text which fits without shrinking icons
            </div>
          </Flex.AutoChild>
        </Flex>
      </div>
    );
  },
};

export const Fixed: Story = {
  name: 'Fixed Layout',
  render: () => {
    return (
      <div>
        <h3>Fixed Layout - Overflow</h3>
        <code>flex: 0 0 auto</code>
        <Sample strategy='fixed' />
      </div>
    );
  },
};

export const FixedOverflow: Story = {
  name: 'Fixed Layout + Overflow',
  render: () => {
    return (
      <div>
        <h3>Fixed Layout - Overflow</h3>
        <code>flex: 0 0 auto</code>
        <Sample strategy='fixed'>
          <div style={childStyle}>
            <h3>Item 4</h3>
          </div>
          <div style={childStyle}>
            <h3>Item 5</h3>
          </div>
        </Sample>
      </div>
    );
  },
};

export const FixedWithGrow: Story = {
  name: 'Fixed Layout + Grow',
  render: () => {
    return (
      <div>
        <h3>Fixed Layout - Overflow</h3>
        <Sample strategy='fixed'>
          <Flex.AutoChild>
            <div style={childStyle}>
              <h3>Grow</h3>
            </div>
          </Flex.AutoChild>
        </Sample>
      </div>
    );
  },
};

export const FixedWithShrink: Story = {
  name: 'Fixed Layout + Shrink',
  render: () => {
    return (
      <div>
        <h3>Fixed Layout - Overflow</h3>
        <Sample strategy='fixed'>
          <Flex.AutoChild>
            <div style={childStyle}>
              <h3>Shrinking Child</h3>
            </div>
          </Flex.AutoChild>
        </Sample>
      </div>
    );
  },
};

export const PushedChild: Story = {
  render: () => {
    return (
      <div>
        <h3>Pushed Child</h3>
        <code>flex: 0 0 auto</code>
        <Sample strategy='fixed' style={{ width: 800 }}>
          <Flex.AutoChild auto={false} push='end'>
            <div style={childStyle}>
              <h3>Pushed Child</h3>
            </div>
          </Flex.AutoChild>
        </Sample>
      </div>
    );
  },
};

type SampleProps = {
  style?: React.CSSProperties;
  strategy: FlexStrategy;
  children?: ReactNode;
};

function Sample(props: SampleProps) {
  return (
    <div style={{ ...layoutStyle, ...props.style }}>
      <Flex placement='start' strategy={props.strategy} gap='1rem'>
        <div style={childStyle}>
          <h3>Item 1</h3>
        </div>
        <div style={childStyle}>
          <h3>Bigger Item 2</h3>
        </div>
        {props.children}
      </Flex>
    </div>
  );
}
