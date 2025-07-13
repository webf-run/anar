import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button/Button.js';
import { Form } from '../Form/Form.js';
import { TextField } from '../Form/TextField.js';
import { Textarea } from '../Form/Textarea.js';
import { DialogClose } from './Dialog.js';
import { Modal } from './Modal.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Modal> = {
  title: 'Overlays/Modal',
  component: Modal,
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
      <Modal>
        <Button intent='outline'>Rename</Button>
        <Modal.Content>
          {({ close }) => (
            <>
              <Modal.Header>
                <Modal.Title>Rename project</Modal.Title>
                <Modal.Description>
                  Change how this project will appear across the dashboard.
                </Modal.Description>
              </Modal.Header>
              <Modal.Body>
                <TextField
                  autoFocus
                  aria-label='Name'
                  placeholder='Enter a name'
                />
              </Modal.Body>
              <Modal.Footer>
                <Modal.Close>Cancel</Modal.Close>
                <Button onPress={close} intent='primary'>
                  Save changes
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal.Content>
      </Modal>
    );
  },
};

export const AlertDialog: Story = {
  render: () => {
    return (
      <Modal>
        <Button intent='danger'>Revoke Access</Button>
        <Modal.Content role='alertdialog'>
          <Modal.Header>
            <Modal.Title>Revoke User Access?</Modal.Title>
            <Modal.Description>
              This will immediately remove all access for the selected user.
              This action is permanent and cannot be undone.
            </Modal.Description>
          </Modal.Header>
          <Modal.Footer>
            <Modal.Close>Cancel</Modal.Close>
            <Button intent='danger'>Revoke Access</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    type Size = Pick<
      React.ComponentProps<typeof Modal.Content>,
      'size'
    >['size'];
    const [isOpen, setIsOpen] = useState(false);
    const [modalSize, setModalSize] = useState<Size>('md');

    const sizes: Size[] = [
      'xs',
      'sm',
      'md',
      'lg',
      'xl',
      '2xl',
      '3xl',
      '4xl',
      '5xl',
    ];

    const handlePress = (size: Size, open: boolean) => {
      setModalSize(size);
      setIsOpen(open);
    };
    return (
      <>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
          {sizes.map((size, idx) => (
            <div key={idx}>
              <Button intent='outline' onPress={() => handlePress(size, true)}>
                Open {size}
              </Button>
            </div>
          ))}
        </div>

        <Modal.Content
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          size={modalSize}
        >
          <Modal.Header>
            <Modal.Title>Project Update</Modal.Title>
            <Modal.Description>
              Dive deep into our project’s latest updates where we've
              streamlined workflow and improved user interfaces.
            </Modal.Description>
          </Modal.Header>
          <Modal.Footer>
            <DialogClose>Close</DialogClose>
            <Button onPress={() => setIsOpen(false)}>Confirm</Button>
          </Modal.Footer>
        </Modal.Content>
      </>
    );
  },
};

export const Blur: Story = {
  render: () => {
    return (
      <Modal>
        <Button>Turn on 2FA</Button>
        <Modal.Content isBlurred>
          <Modal.Header>
            <Modal.Title>Nice! Let's beef up your account.</Modal.Title>
            <Modal.Description>
              2FA beefs up your account's defense. Pop in your password to keep
              going.
            </Modal.Description>
          </Modal.Header>
          <Form onSubmit={() => {}}>
            <Modal.Body className='pb-1'>
              <TextField
                isRequired
                autoFocus
                label='Password'
                type='password'
                placeholder='Enter your password'
              />
            </Modal.Body>
            <Modal.Footer>
              <Modal.Close>Cancel</Modal.Close>
              <Button type='submit'>Turn on 2FA</Button>
            </Modal.Footer>
          </Form>
        </Modal.Content>
      </Modal>
    );
  },
};

export const Sticky: Story = {
  render: () => {
    return (
      <Modal>
        <Button>Read</Button>
        <Modal.Content size='2xl'>
          <Modal.Header>
            <Modal.Title>Terms of Use</Modal.Title>
            <Modal.Description>
              If you do not agree to these terms, please refrain from using our
              services.
            </Modal.Description>
          </Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close>Close</Modal.Close>
            <Button>Accept</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  },
};

export const Nested: Story = {
  render: () => {
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] =
      useState(false);
    const [isProfileSetupModalOpen, setIsProfileSetupModalOpen] =
      useState(false);
    const [isTyping, setIsTyping] = useState(false);

    return (
      <>
        <Button onPress={() => setIsRegistrationModalOpen(true)}>
          Register
        </Button>

        <Modal.Content
          isOpen={isRegistrationModalOpen}
          onOpenChange={() => setIsRegistrationModalOpen(false)}
          aria-label='Confirm Registration'
        >
          <Modal.Header>
            <Modal.Title>Confirm Registration</Modal.Title>
            <Modal.Description>
              Please confirm your registration details.
            </Modal.Description>
          </Modal.Header>
          <Modal.Footer>
            <Modal.Close>Cancel</Modal.Close>
            <Button
              onPress={() => {
                setIsProfileSetupModalOpen(true);
              }}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Content>

        <Modal.Content
          isOpen={isProfileSetupModalOpen}
          onOpenChange={(isOpen) => {
            if (!isOpen && isTyping) {
            }
            setIsProfileSetupModalOpen(isOpen);
          }}
          aria-label='Profile Setup'
        >
          <Modal.Header>
            <Modal.Title>Set Up Your Profile</Modal.Title>
            <Modal.Description>
              We need a bit more information before you can get started.
            </Modal.Description>
          </Modal.Header>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setIsProfileSetupModalOpen(false);
              setIsRegistrationModalOpen(false);
            }}
          >
            <Modal.Body className='space-y-4'>
              <Textarea
                isRequired
                label='Bio'
                placeholder='Tell us something about yourself'
                onInput={() => setIsTyping(true)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Modal.Close>Skip for now</Modal.Close>
              <Button type='submit'>Complete Setup</Button>
            </Modal.Footer>
          </Form>
        </Modal.Content>
      </>
    );
  },
};
