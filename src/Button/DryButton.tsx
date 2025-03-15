import clsx from 'clsx';
import { ReactNode, type Ref, forwardRef } from 'react';
import {
  Button as RiaButton,
  type ButtonProps as RiaButtonProps,
} from 'react-aria-components';

export interface DryButtonProps extends RiaButtonProps {
  lead?: ReactNode;
  main?: ReactNode;
  tail?: ReactNode;
  children?: undefined;
}

/**
 * An unstyled-button component.
 */
export const DryButton = forwardRef(function Button(
  props: DryButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const { lead, main, tail, className, children, ...buttonProps } = props;
  const classes = clsx('AnarDryButton', className);
  const contentClasses = clsx('AnarDryButtonContent');

  return (
    <RiaButton ref={ref} className={classes} {...buttonProps}>
      <span className={contentClasses}>
        {lead}
        <span>{main}</span>
        {tail}
      </span>
    </RiaButton>
  );
});
