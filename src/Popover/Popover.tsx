import clsx from 'clsx';
import type { ReactNode } from 'react';
import {
  Popover as RiaPopover,
  PopoverProps as RiaPopoverProps,
} from 'react-aria-components';

import styles from './Popover.module.css';
import type { PopoverController } from './UsePopover';

export interface PopoverProps extends RiaPopoverProps {
  className?: string;
  controller?: PopoverController;
  children: ReactNode;
}

export function Popover(props: PopoverProps) {
  const { className, controller, ...rest } = props;

  const classes = clsx(styles.root, className);

  const isOpen = controller?.isOpen ?? rest.isOpen;
  const triggerRef = controller?.triggerRef ?? rest.triggerRef;

  return (
    <RiaPopover
      {...rest}
      triggerRef={triggerRef}
      className={classes}
      isOpen={isOpen}
      onOpenChange={controller?.close}
    />
  );
}
