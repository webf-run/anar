import clsx from 'clsx';
import { forwardRef, type Ref } from 'react';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components';

import './Button.css';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonVariants = {
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'none' | Size;
  isPending?: boolean;
};

export type ButtonProps = RACButtonProps &
  ButtonVariants & {
    text: string;
  };

export const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const { className, variant, size, radius, isPending, text, ...racProps } =
    props;

  const classes = clsx('sprinkles-button', className);

  return (
    <RACButton ref={ref} className={classes} {...racProps}>
      {text}
    </RACButton>
  );
});
