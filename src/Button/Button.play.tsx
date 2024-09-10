import { Button, type ButtonProps } from './Button.js';
import { withPlayground } from '../Playground.js';

export const ButtonPlayground = withPlayground<ButtonProps>({
  defaultProps: {
    label: 'Button',
    isDisabled: false,
    variant: 'primary',

  },
  component: Button,
});
