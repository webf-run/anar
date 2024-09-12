import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

import { toDataAttrs, type TShirtSize } from '../Util/Style.js';
import { iconSizes } from '../Util/Icon.js';

export type ButtonVariants = {
  variant?: 'primary' | 'secondary' | 'accent' | 'negative';
  emphasis?: 'fill' | 'outline' | 'quiet';

  size?: TShirtSize;
  radius?: 'none' | TShirtSize;
  pending?: boolean;
};

export type ButtonBaseProps = ButtonVariants & {
  className?: string;
  left?: LucideIcon;
  right?: LucideIcon;
  label: string;
};

export function getProps(props: ButtonBaseProps) {
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

  const left = Left && <Left strokeWidth={strokeWidth} size={iconSize} />;

  const right = Right && <Right strokeWidth={strokeWidth} size={iconSize} />;

  return {
    className: classes,
    left,
    right,
    label,
    ...data,
    ...racProps,
  };
}

function toOneDataAttr(attrs: string[]): string {
  return `${attrs.join('-')}`;
}
