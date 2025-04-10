import clsx from 'clsx';
import {
  Dialog,
  Popover as RiaPopover,
  PopoverProps as RiaPopoverProps,
} from 'react-aria-components';

import styles from './Popover.module.css';

export interface PopoverProps extends Omit<RiaPopoverProps, 'children'> {
  children: React.ReactNode;
}

export function Popover(props: PopoverProps) {
  const { className, children, ...rest } = props;

  const classes = clsx(styles.AnarPopover, className);

  return (
    <RiaPopover className={classes} {...props}>
      {children}
    </RiaPopover>
  );
}
