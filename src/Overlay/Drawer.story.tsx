import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button, buttonStyles } from '../Button/Button.js';
import { Form } from '../Form/Form.js';
import { Radio, RadioGroup } from '../Form/Radio.js';
import { TextField } from '../Form/TextField.js';
import { Textarea } from '../Form/Textarea.js';
import { Drawer, type DrawerContentProps } from './Drawer.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Drawer> = {
  title: 'Overlays/Drawer',
  component: Drawer,
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
      <Drawer>
        <Drawer.Trigger className={buttonStyles({ intent: 'outline' })}>
          Login
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Login</Drawer.Title>
            <Drawer.Description>
              Please enter your credentials to access your account.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body className='space-y-4'>
            <TextField
              label='Email'
              type='email'
              placeholder='john.doe@example.com'
            />
            <TextField
              label='Password'
              type='password'
              placeholder='••••••••••••'
              isRevealable
            />
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.Close className='w-full'>Login</Drawer.Close>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    );
  },
};

export const Side: Story = {
  render: () => {
    const [side, setSide] = useState('bottom');
    return (
      <>
        <RadioGroup
          orientation='horizontal'
          aria-label='Side'
          value={side}
          onChange={setSide}
        >
          {['top', 'bottom', 'left', 'right'].map((side) => (
            <Radio key={side} className='capitalize' value={side}>
              {side}
            </Radio>
          ))}
        </RadioGroup>
        <Drawer>
          <Button intent='outline' className='capitalize'>
            {side}
          </Button>
          <Drawer.Content side={side as DrawerContentProps['side']}>
            <Drawer.Header>
              <Drawer.Title className='capitalize'>{side}</Drawer.Title>
              <Drawer.Description>
                The drawer will be positioned on the {side} side of the screen.
              </Drawer.Description>
            </Drawer.Header>
          </Drawer.Content>
        </Drawer>
      </>
    );
  },
};

export const Float: Story = {
  render: () => {
    const [side, setSide] = useState('bottom');
    return (
      <>
        <RadioGroup
          orientation='horizontal'
          aria-label='Side'
          value={side}
          onChange={setSide}
        >
          {['top', 'bottom', 'left', 'right'].map((side) => (
            <Radio key={side} className='capitalize' value={side}>
              {side}
            </Radio>
          ))}
        </RadioGroup>
        <Drawer>
          <Button intent='outline' className='capitalize'>
            {side}
          </Button>
          <Drawer.Content isFloat side={side as DrawerContentProps['side']}>
            <Drawer.Header>
              <Drawer.Title className='capitalize'>{side}</Drawer.Title>
              <Drawer.Description>
                The drawer will be positioned on the {side} side of the screen.
              </Drawer.Description>
            </Drawer.Header>
          </Drawer.Content>
        </Drawer>
      </>
    );
  },
};

export const WithoutNotch: Story = {
  render: () => {
    return (
      <Drawer>
        <Button intent='outline'>Open</Button>
        <Drawer.Content notch={false}>
          <Drawer.Header>
            <Drawer.Title>The Beatles</Drawer.Title>
            <Drawer.Description>
              The Beatles were an English rock band formed in Liverpool in 1960,
              comprising John Lennon, Paul McCartney, George Harrison and Ringo
              Starr.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Footer className='justify-center'>
            <Drawer.Close isCircle className='w-full'>
              Close
            </Drawer.Close>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    );
  },
};

export const Sticky: Story = {
  render: () => {
    return (
      <Drawer>
        <Drawer.Trigger className={buttonStyles({ intent: 'outline' })}>
          Open
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>The Beatles</Drawer.Header>
          <Drawer.Body>
            <div className='prose prose-zinc dark:prose-invert'>
              <p>
                Welcome to our Terms of Use. By accessing or using our services,
                you agree to be bound by these terms. If you do not agree to
                these terms, please refrain from using our services.
              </p>
              <h3>Lorem, ipsum dolor.</h3>
              <h4>Account Responsibility</h4>
              <p>
                When you create an account with us, you are responsible for
                maintaining the confidentiality of your account and password.
              </p>{' '}
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro
                accusamus distinctio adipisci laudantium autem eos! Sed mollitia
                temporibus quis architecto repellat deleniti soluta adipisci!
                Fugiat!
              </p>
              <h4>Lorem, ipsum dolor.</h4>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Veritatis ipsum repellat vero at incidunt mollitia! Quis
                corporis saepe commodi minus a excepturi molestias obcaecati
                aut? Repudiandae quia eaque sapiente ducimus!
              </p>
              <h3>Lorem, ipsum dolor.</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
                quas, delectus inventore, vero doloremque quasi placeat numquam
                nam adipisci pariatur, qui molestiae quisquam alias ullam illo
                possimus animi cum reiciendis.
              </p>
              <h4>Lorem, ipsum dolor.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
                quas, delectus inventore, vero doloremque quasi placeat numquam
                nam adipisci pariatur, qui molestiae quisquam alias ullam illo
                possimus animi cum reiciendis.
              </p>
              <h4>Lorem, ipsum dolor.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
                quas, delectus inventore, vero doloremque quasi placeat numquam
                nam adipisci pariatur, qui molestiae quisquam alias ullam illo
                possimus animi cum reiciendis.
              </p>
              <h4>Lorem, ipsum dolor.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
                quas, delectus inventore, vero doloremque quasi placeat numquam
                nam adipisci pariatur, qui molestiae quisquam alias ullam illo
                possimus animi cum reiciendis.
              </p>
              <h4>Lorem, ipsum dolor.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
                quas, delectus inventore, vero doloremque quasi placeat numquam
                nam adipisci pariatur, qui molestiae quisquam alias ullam illo
                possimus animi cum reiciendis.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
                quas, delectus inventore, vero doloremque quasi placeat numquam
                nam adipisci pariatur, qui molestiae quisquam alias ullam illo
                possimus animi cum reiciendis.
              </p>
              <h3>Lorem, ipsum dolor.</h3>
              <h4>Lorem, ipsum dolor.</h4>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              quas, delectus inventore, vero doloremque quasi placeat numquam
              nam adipisci pariatur, qui molestiae quisquam alias ullam illo
              possimus animi cum reiciendis.
              <h4>Lorem, ipsum dolor.</h4>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              quas, delectus inventore, vero doloremque quasi placeat numquam
              nam adipisci pariatur, qui molestiae quisquam alias ullam illo
              possimus animi cum reiciendis.
              <h3>Lorem, ipsum dolor.</h3>
              <h4>Lorem, ipsum dolor.</h4>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              quas, delectus inventore, vero doloremque quasi placeat numquam
              nam adipisci pariatur, qui molestiae quisquam alias ullam illo
              possimus animi cum reiciendis.
              <h4>Lorem, ipsum dolor.</h4>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              quas, delectus inventore, vero doloremque quasi placeat numquam
              nam adipisci pariatur, qui molestiae quisquam alias ullam illo
              possimus animi cum reiciendis.
              <h4>Lorem, ipsum dolor.</h4>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              quas, delectus inventore, vero doloremque quasi placeat numquam
              nam adipisci pariatur, qui molestiae quisquam alias ullam illo
              possimus animi cum reiciendis.
              <h3>Lorem, ipsum dolor.</h3>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              quas, delectus inventore, vero doloremque quasi placeat numquam
              nam adipisci pariatur, qui molestiae quisquam alias ullam illo
              possimus animi cum reiciendis.
              <h3>Lorem, ipsum dolor.</h3>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              quas, delectus inventore, vero doloremque quasi placeat numquam
              nam adipisci pariatur, qui molestiae quisquam alias ullam illo
              possimus animi cum reiciendis.
              <h3>Lorem, ipsum dolor.</h3>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
              quas, delectus inventore, vero doloremque quasi placeat numquam
              nam adipisci pariatur, qui molestiae quisquam alias ullam illo
              possimus animi cum reiciendis.
            </div>
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.Close isCircle>Close</Drawer.Close>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    );
  },
};

export const Nested: Story = {
  render: () => {
    const [isRegistrationDrawerOpen, setIsRegistrationDrawerOpen] =
      useState(false);
    const [isProfileSetupDrawerOpen, setIsProfileSetupDrawerOpen] =
      useState(false);
    const [isTyping, setIsTyping] = useState(false);

    return (
      <>
        <Button
          intent='outline'
          onPress={() => setIsRegistrationDrawerOpen(true)}
        >
          Register
        </Button>

        <Drawer
          isOpen={isRegistrationDrawerOpen}
          onOpenChange={() => setIsRegistrationDrawerOpen(false)}
        >
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Confirm Registration</Drawer.Title>
              <Drawer.Description>
                Please confirm your registration details.
              </Drawer.Description>
            </Drawer.Header>
            <Drawer.Footer>
              <Drawer.Close>Cancel</Drawer.Close>
              <Button
                onPress={() => {
                  setIsProfileSetupDrawerOpen(true);
                }}
              >
                Confirm
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>

        <Drawer
          isOpen={isProfileSetupDrawerOpen}
          onOpenChange={(isOpen) => {
            if (!isOpen && isTyping) setIsProfileSetupDrawerOpen(isOpen);
          }}
        >
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Set Up Your Profile</Drawer.Title>
              <Drawer.Description>
                We need a bit more information before you can get started.
              </Drawer.Description>
            </Drawer.Header>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setIsProfileSetupDrawerOpen(false);
                setIsRegistrationDrawerOpen(false);
              }}
            >
              <Drawer.Body className='space-y-4'>
                <Textarea
                  isRequired
                  label='Bio'
                  placeholder='Tell us something about yourself'
                  onInput={() => setIsTyping(true)}
                />
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.Close>Skip for now</Drawer.Close>
                <Button type='submit'>Complete Setup</Button>
              </Drawer.Footer>
            </Form>
          </Drawer.Content>
        </Drawer>
      </>
    );
  },
};
