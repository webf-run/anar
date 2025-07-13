import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button.js';
import { Checkbox } from '../Form/Checkbox.js';
import { TextField } from '../Form/TextField.js';
import { Sheet } from './Sheet.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Sheet> = {
  title: 'Overlays/Sheet',
  component: Sheet,
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
      <Sheet>
        <Button intent='outline'>Edit Settings</Button>
        <Sheet.Content>
          {({ close }) => (
            <>
              <Sheet.Header>
                <Sheet.Title>Update User Settings</Sheet.Title>
                <Sheet.Description>
                  Adjust your preferences and configurations here.
                </Sheet.Description>
              </Sheet.Header>
              <Sheet.Body className='space-y-4'>
                <TextField
                  label='Username'
                  type='text'
                  placeholder='Enter your username'
                />
                <TextField
                  label='Email'
                  type='email'
                  placeholder='Enter your email address'
                />
                <Checkbox
                  label='Enable notifications'
                  description='Receive updates and alerts via email.'
                />
              </Sheet.Body>
              <Sheet.Footer>
                <Sheet.Close>Cancel</Sheet.Close>
                <Button onPress={close} intent='primary' type='submit'>
                  Save Changes
                </Button>
              </Sheet.Footer>
            </>
          )}
        </Sheet.Content>
      </Sheet>
    );
  },
};

export const Float: Story = {
  render: () => {
    return (
      <Sheet>
        <Button intent='outline'>Float</Button>
        <Sheet.Content isFloat={false}>
          <Sheet.Header>
            <Sheet.Title>Not Floated</Sheet.Title>
            <Sheet.Description>This sheet is not floated.</Sheet.Description>
          </Sheet.Header>
          <Sheet.Footer>
            <Sheet.Close>Cancel</Sheet.Close>
            <Button intent='primary'>Save Changes</Button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    );
  },
};

export const Sticky: Story = {
  render: () => {
    return (
      <Sheet>
        <Button>Read</Button>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Terms of Use</Sheet.Title>
            <Sheet.Description>
              If you do not agree to these terms, please refrain from using our
              services.
            </Sheet.Description>
          </Sheet.Header>
          <Sheet.Body>
            <div className='prose prose-zinc dark:prose-invert prose-h3:text-sm/6 prose-h4:text-sm/6 prose-p:text-muted-fg'>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                et, quibusdam earum odio voluptatum voluptatibus sunt. Earum
                laboriosam repudiandae ut, dicta odit placeat voluptate modi?
                Dicta voluptatibus quo vel odit quaerat aut hic quasi minima
                rerum, obcaecati reprehenderit iure consequuntur?
              </p>
              <h3>Lorem, ipsum.</h3>
              <h4>Lorem, ipsum dolor.</h4>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                et, quibusdam earum odio voluptatum voluptatibus sunt. Earum
                laboriosam repudiandae ut, dicta odit placeat voluptate modi?
                Dicta voluptatibus quo vel odit quaerat aut hic quasi minima
                rerum, obcaecati reprehenderit iure consequuntur?
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                et, quibusdam earum odio voluptatum voluptatibus sunt. Earum
                laboriosam repudiandae ut, dicta odit placeat voluptate modi?
                Dicta voluptatibus quo vel odit quaerat aut hic quasi minima
                rerum, obcaecati reprehenderit iure consequuntur?
              </p>
              <h4>Lorem, ipsum dolor.</h4>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                et, quibusdam earum odio voluptatum voluptatibus sunt. Earum
                laboriosam repudiandae ut, dicta odit placeat voluptate modi?
                Dicta voluptatibus quo vel odit quaerat aut hic quasi minima
                rerum, obcaecati reprehenderit iure consequuntur?
              </p>
              <div>
                <h3>Lorem, ipsum.</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                  et, quibusdam earum odio voluptatum voluptatibus sunt. Earum
                  laboriosam repudiandae ut, dicta odit placeat voluptate modi?
                  Dicta voluptatibus quo vel odit quaerat aut hic quasi minima
                  rerum, obcaecati reprehenderit iure consequuntur?
                </p>
              </div>
              <div>
                <h4>Lorem, ipsum dolor.</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                  et, quibusdam earum odio voluptatum voluptatibus sunt. Earum
                  laboriosam repudiandae ut, dicta odit placeat voluptate modi?
                  Dicta voluptatibus quo vel odit quaerat aut hic quasi minima
                  rerum, obcaecati reprehenderit iure consequuntur?
                </p>
              </div>
              <div>
                <h4>Lorem, ipsum dolor.</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                  et, quibusdam earum odio voluptatum voluptatibus sunt. Earum
                  laboriosam repudiandae ut, dicta odit placeat voluptate modi?
                  Dicta voluptatibus quo vel odit quaerat aut hic quasi minima
                  rerum, obcaecati reprehenderit iure consequuntur?
                </p>
              </div>
              <div>
                <h4>Lorem, ipsum dolor.</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                  et, quibusdam earum odio voluptatum voluptatibus sunt. Earum
                  laboriosam repudiandae ut, dicta odit placeat voluptate modi?
                  Dicta voluptatibus quo vel odit quaerat aut hic quasi minima
                  rerum, obcaecati reprehenderit iure consequuntur?
                </p>
              </div>
              <div>
                <h4>Lorem, ipsum dolor.</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                  et, quibusdam earum odio voluptatum voluptatibus sunt. Earum
                  laboriosam repudiandae ut, dicta odit placeat voluptate modi?
                  Dicta voluptatibus quo vel odit quaerat aut hic quasi minima
                  rerum, obcaecati reprehenderit iure consequuntur?
                </p>
              </div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                et, quibusdam earum odio voluptatum voluptatibus sunt. Earum
                laboriosam repudiandae ut, dicta odit placeat voluptate modi?
                Dicta voluptatibus quo vel odit quaerat aut hic quasi minima
                rerum, obcaecati reprehenderit iure consequuntur?
              </p>
            </div>
          </Sheet.Body>
          <Sheet.Footer>
            <Sheet.Close>Close</Sheet.Close>
            <Button>Accept</Button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    );
  },
};
