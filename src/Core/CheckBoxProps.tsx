import clsx from 'clsx';
import { TShirtSize } from '../Util/Style';

export type CheckBoxVariants = {
  variant?: 'disabled' | 'active';
  size?: TShirtSize;
  radius?: 'none' | TShirtSize;
};

export type CheckBoxBaseProps = CheckBoxVariants & {
  className?: string;
  label: string;
};

export function getProps(props: CheckBoxBaseProps) {
  const {
    className,
    variant = 'active',
    size = 'md',
    radius,
    label,
    ...racProps
  } = props;

  const classes = clsx('anar-checkbox', className);
  return {
    className: classes,
    variant,
    size,
    radius,
    label,
    ...racProps,
  };
}
