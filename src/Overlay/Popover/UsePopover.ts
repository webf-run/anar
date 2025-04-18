import { RefObject, useRef, useState } from 'react';

export type PopoverController = {
  triggerRef: RefObject<any>;
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

export function usePopover(initialState: boolean): PopoverController {
  const [isOpen, setIsOpen] = useState(initialState);
  const triggerRef = useRef(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    triggerRef,
    isOpen,
    toggle,
    open,
    close,
  };
}
