import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';
import { type Ref, forwardRef } from 'react';
import { type ButtonProps as RiaButtonProps } from 'react-aria-components';

import { DryButton, type DryButtonProps } from './DryButton.js';
import styles from './ActionButton.module.css';

export interface ActionButtonProps extends RiaButtonProps {
  className?: string;
  icon: LucideIcon;
  children?: undefined;
}

export const ActionButton = forwardRef(function ActionButton(
  props: ActionButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const { className, icon: Icon, ...rest } = props;
  const classes = clsx('ActionButton', styles.button, className);

  const dryButtonProps: DryButtonProps = rest;

  return (
    <DryButton
      ref={ref}
      className={classes}
      {...dryButtonProps}
      children={<Icon size={24} strokeWidth={1.5} />}
    />
  );
});
