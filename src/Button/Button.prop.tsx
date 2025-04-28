import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

import { iconSizes } from '../Util/Icon.js';
import { type TShirtSize, toDataAttrs } from '../Util/Style.js';

export type ButtonVariants = {
  variant?: 'accent' | 'main' | 'calm' | 'ghost' | 'negative';

  compact?: boolean;
  size?: TShirtSize;
  radius?: 'none' | TShirtSize;
  isPending?: boolean;
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
    variant = 'main',
    size = 'md',
    compact,
    radius,
    label,
    left: Left,
    right: Right,
    ...racProps
  } = props;

  const classes = clsx('AnarButton', className);
  const data = toDataAttrs([variant, compact ? 'sm' : 'md']);
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
