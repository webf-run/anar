import { type Ref, forwardRef } from 'react';
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';

import { type ButtonBaseProps, getProps } from './ButtonProps.js';

export type ButtonProps = ButtonBaseProps & AriaButtonProps;

export const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const { left, right, label, ...buttonProps } = getProps(props);

  return (
    <AriaButton ref={ref} {...buttonProps}>
      {left}
      <span>{label}</span>
      {right}
    </AriaButton>
  );
});
