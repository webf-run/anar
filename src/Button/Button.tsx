import clsx from 'clsx';
import { forwardRef, type ReactNode, type Ref } from 'react';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components';

import './Button.css';
import type { Size } from '../Util/Style';

export type ButtonVariants = {
  variant?: 'primary' | 'secondary' | 'accent' | 'negative';
  style?: 'fill' | 'outline' | 'quiet';

  size?: Size;
  radius?: 'none' | Size;
  pending?: boolean;
};

export type ButtonProps = RACButtonProps &
  ButtonVariants & {
    left?: ReactNode;
    right?: ReactNode;
    text: string;
  };

export const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const { className, variant, size, radius, pending, text, ...racProps } =
    props;

  const classes = clsx('anar-button', className);

  return (
    <RACButton ref={ref} className={classes} {...racProps}>
      {text}
    </RACButton>
  );
});
