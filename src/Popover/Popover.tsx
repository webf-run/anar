import clsx from 'clsx';
import type { ReactNode } from 'react';
import {
  Popover as RiaPopover,
  PopoverProps as RiaPopoverProps,
} from 'react-aria-components';

import styles from './Popover.module.css';

export interface PopoverProps extends RiaPopoverProps {
  className?: string;
  children: ReactNode;
}

export function Popover(props: PopoverProps) {
  const { className, children, ...rest } = props;

  const classes = clsx(styles.root, className);

  return (
    <RiaPopover className={classes} {...rest} >
      {children}
    </RiaPopover>
  );
}
