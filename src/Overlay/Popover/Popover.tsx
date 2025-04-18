import clsx from 'clsx';
import { ChevronUp } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  OverlayArrow,
  Popover as RiaPopover,
  PopoverProps as RiaPopoverProps,
} from 'react-aria-components';

import styles from './Popover.module.css';
import type { PopoverController } from './UsePopover';

export type { Placement } from '@react-types/overlays';

export interface PopoverProps extends RiaPopoverProps {
  className?: string;
  controller?: PopoverController;
  hasArrow?: boolean;
  children: ReactNode;
}

export function Popover(props: PopoverProps) {
  const { className, controller, hasArrow, children, ...rest } = props;

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
    >
      {hasArrow && (
        <OverlayArrow className={styles.overlayArrow}>
          <ChevronUp className={styles.arrow} size={24} strokeWidth={2} />
        </OverlayArrow>
      )}
      {children}
    </RiaPopover>
  );
}
