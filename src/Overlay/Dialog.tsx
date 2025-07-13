'use client';

import { IconX } from '@intentui/icons';
import { useEffect, useRef } from 'react';
import type { HeadingProps } from 'react-aria-components';
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPropsPrimitive,
  Dialog as DialogPrimitive,
  type DialogProps as DialogPropsPrimitive,
  Heading,
  Text,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

import { composeTailwindRenderProps } from '../Base/Primitive.js';
import { useMediaQuery } from '../Base/UseQuery.js';
import { Button, type ButtonProps } from '../Button/Button.js';

export function Dialog(props: DialogPropsPrimitive) {
  const { role = 'dialog', className, ...rest } = props;
  return (
    <DialogPrimitive
      role={role}
      className={twMerge(
        'peer/dialog group/dialog relative flex max-h-[inherit] flex-col overflow-hidden outline-hidden [--gutter:--spacing(6)] [scrollbar-width:thin] sm:[--gutter:--spacing(8)] [&::-webkit-scrollbar]:size-0.5',
        className
      )}
      {...rest}
    />
  );
}

export function DialogTrigger(props: ButtonPropsPrimitive) {
  return <ButtonPrimitive {...props} />;
}

export interface DialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function DialogHeader(props: DialogHeaderProps) {
  const { className, ...rest } = props;
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        header.parentElement?.style.setProperty(
          '--dialog-header-height',
          `${entry.target.clientHeight}px`
        );
      }
    });

    observer.observe(header);
    return () => observer.unobserve(header);
  }, []);

  return (
    <div
      data-slot='dialog-header'
      ref={headerRef}
      className={twMerge(
        'relative space-y-1 p-(--gutter) pb-[calc(var(--gutter)---spacing(3))]',
        className
      )}
    >
      {rest.title && <DialogTitle>{rest.title}</DialogTitle>}
      {rest.description && (
        <DialogDescription>{rest.description}</DialogDescription>
      )}
      {!rest.title && typeof rest.children === 'string' ? (
        <DialogTitle {...rest} />
      ) : (
        rest.children
      )}
    </div>
  );
}

export interface DialogTitleProps extends Omit<HeadingProps, 'level'> {
  level?: 1 | 2 | 3 | 4;
  ref?: React.Ref<HTMLHeadingElement>;
}

export function DialogTitle(props: DialogTitleProps) {
  const { level = 2, className, ref, ...rest } = props;

  return (
    <Heading
      slot='title'
      level={level}
      ref={ref}
      className={twMerge(
        'text-balance font-semibold text-fg text-lg/6 sm:text-base/6',
        className
      )}
      {...rest}
    />
  );
}

export type DialogDescriptionProps = React.ComponentProps<'div'>;

export function DialogDescription(props: DialogDescriptionProps) {
  const { className, ref, ...rest } = props;
  return (
    <Text
      slot='description'
      className={twMerge(
        'text-pretty text-base/6 text-muted-fg group-disabled:opacity-50 sm:text-sm/6',
        className
      )}
      ref={ref}
      {...rest}
    />
  );
}

export type DialogBodyProps = React.ComponentProps<'div'>;

export function DialogBody(props: DialogBodyProps) {
  const { className, ref, ...rest } = props;

  return (
    <div
      data-slot='dialog-body'
      ref={ref}
      className={twMerge(
        'isolate flex max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)-var(--dialog-header-height,0px)-var(--dialog-footer-height,0px))] flex-1 flex-col overflow-auto px-(--gutter) py-1',
        className
      )}
      {...rest}
    />
  );
}

export type DialogFooterProps = React.ComponentProps<'div'>;

export function DialogFooter(props: DialogFooterProps) {
  const { className, ...rest } = props;
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        footer.parentElement?.style.setProperty(
          '--dialog-footer-height',
          `${entry.target.clientHeight}px`
        );
      }
    });

    observer.observe(footer);
    return () => {
      observer.unobserve(footer);
    };
  }, []);

  return (
    <div
      ref={footerRef}
      data-slot='dialog-footer'
      className={twMerge(
        'isolate mt-auto flex flex-col-reverse justify-between gap-3 p-(--gutter) pt-[calc(var(--gutter)---spacing(2))] group-not-has-data-[slot=dialog-body]/dialog:pt-0 group-not-has-data-[slot=dialog-body]/popover:pt-0 sm:flex-row',
        className
      )}
      {...rest}
    />
  );
}

export function DialogClose(props: ButtonProps) {
  const { className, intent = 'outline', ref, ...rest } = props;
  return (
    <Button
      slot='close'
      className={className}
      ref={ref}
      intent={intent}
      {...rest}
    />
  );
}

export interface CloseButtonIndicatorProps
  extends Omit<ButtonProps, 'children'> {
  className?: string;
  isDismissable?: boolean | undefined;
}

export function DialogCloseIcon(props: CloseButtonIndicatorProps) {
  const { className, ...rest } = props;
  const isMobile = useMediaQuery('(max-width: 600px)');

  return rest.isDismissable ? (
    <ButtonPrimitive
      {...(isMobile ? { autoFocus: true } : {})}
      aria-label='Close'
      slot='close'
      className={composeTailwindRenderProps(
        className,
        'close absolute top-1 right-1 z-50 grid size-8 place-content-center rounded-xl hover:bg-secondary focus:bg-secondary focus:outline-hidden focus-visible:ring-1 focus-visible:ring-primary sm:top-2 sm:right-2 sm:size-7 sm:rounded-md'
      )}
    >
      <IconX className='size-4' />
    </ButtonPrimitive>
  ) : null;
}
