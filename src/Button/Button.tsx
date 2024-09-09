import { forwardRef, type Ref } from 'react';
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';

import { getProps, type ButtonBaseProps } from './ButtonProps.js';

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
