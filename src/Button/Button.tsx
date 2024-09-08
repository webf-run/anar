import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { forwardRef, type Ref } from 'react';
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';


import { toDataAttrs } from '../Util/Style';
import { iconSizes } from '../Util/Icon';

export type Size = 'sm' | 'md' | 'lg' | 'xl';

export type ButtonVariants = {
  variant?: 'primary' | 'secondary' | 'accent' | 'negative';
  emphasis?: 'fill' | 'outline' | 'quiet';

  size?: Size;
  radius?: 'none' | Size;
  pending?: boolean;
};

export type ButtonProps = AriaButtonProps &
  ButtonVariants & {
    left?: LucideIcon;
    right?: LucideIcon;
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
    left: Left,
    right: Right,
    ...racProps
  } = props;

  const classes = clsx('anar-button', className);
  const data = toDataAttrs([variant, toOneDataAttr([variant, emphasis]), size]);
  const [strokeWidth, iconSize] = iconSizes[size];

  return (
    <AriaButton
      ref={ref}
      className={classes}
      {...data}
      {...racProps}
    >
      {Left && <Left strokeWidth={strokeWidth} size={iconSize} />}
      <span>
        {label}
      </span>
      {Right && <Right strokeWidth={strokeWidth} size={iconSize} />}
    </AriaButton>
  );
});


function toOneDataAttr(attrs: string[]): string {
  return `${attrs.join('-')}`;
}
