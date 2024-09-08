import clsx from 'clsx';
import { forwardRef, type ReactNode, type Ref } from 'react';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components';

import './Button.css';
import { toDataAttrs } from '../Util/Style';

export type Size = 'sm' | 'md' | 'lg' | 'xl';

export type ButtonVariants = {
  variant?: 'primary' | 'secondary' | 'accent' | 'negative';
  emphasis?: 'fill' | 'outline' | 'quiet';

  size?: Size;
  radius?: 'none' | Size;
  pending?: boolean;
};

export type ButtonProps = RACButtonProps &
  ButtonVariants & {
    left?: ReactNode;
    right?: ReactNode;
    label: string;
  };

export const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const {
    className,
    variant = 'primary',
    size = 'md',
    emphasis = 'fill',
    radius,
    pending,
    label,
    ...racProps
  } = props;

  const classes = clsx('anar-button', className);
  const data = toDataAttrs([variant, toOneDataAttr([variant, emphasis]), size]);

  return (
    <RACButton
      ref={ref}
      className={classes}
      {...data}
      {...racProps}
    >
      {label}
    </RACButton>
  );
});


function toOneDataAttr(attrs: string[]): string {
  return `${attrs.join('-')}`;
}
