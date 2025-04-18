import clsx from 'clsx';
import { ReactNode, type Ref, forwardRef } from 'react';
import {
  Button as RiaButton,
  type ButtonProps as RiaButtonProps,
} from 'react-aria-components';

export interface DryButtonProps extends RiaButtonProps {
  children?: ReactNode;
}

/**
 * An unstyled-button component.
 */
export const DryButton = forwardRef(function Button(
  props: DryButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const {
    className,
    ...buttonProps
  } = props;
  const classes = clsx('AnarDryButton', className);

  return (
    <RiaButton ref={ref} className={classes} {...buttonProps} />
  );
});
