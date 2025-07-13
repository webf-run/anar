'use client';

import { IconX } from '@intentui/icons';
import type {
  TagGroupProps as TagGroupPrimitiveProps,
  TagListProps,
  TagProps as TagPrimitiveProps,
} from 'react-aria-components';
import {
  Button,
  TagGroup as TagGroupPrimitive,
  TagList as TagListPrimitive,
  Tag as TagPrimitive,
  composeRenderProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

import { composeTailwindRenderProps } from '../Base/Primitive.js';
import { Description, Label } from './Field.js';

export interface TagGroupProps extends TagGroupPrimitiveProps {
  errorMessage?: string;
  label?: string;
  description?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

export function TagGroup(props: TagGroupProps) {
  const { children, ref, className, ...rest } = props;
  return (
    <TagGroupPrimitive
      ref={ref}
      className={twMerge('flex flex-col flex-wrap', className)}
      {...rest}
    >
      {rest.label && <Label className='mb-1'>{rest.label}</Label>}
      {children}
      {rest.description && <Description>{rest.description}</Description>}
    </TagGroupPrimitive>
  );
}

export function TagList<T extends object>(props: TagListProps<T>) {
  const { className, ...rest } = props;
  return (
    <TagListPrimitive
      {...rest}
      className={composeTailwindRenderProps(className, 'flex flex-wrap gap-1')}
    />
  );
}

export interface TagProps extends TagPrimitiveProps {}

export function Tag(props: TagProps) {
  const { className, children, ...rest } = props;
  const textValue = typeof children === 'string' ? children : undefined;
  return (
    <TagPrimitive
      textValue={textValue}
      {...rest}
      className={composeRenderProps(
        className,
        (
          className,
          { isFocusVisible, isSelected, isDisabled, allowsRemoving }
        ) =>
          twMerge(
            'inset-ring inset-ring-border inline-flex cursor-default items-center gap-x-1.5 rounded-full px-2 py-0.5 font-medium text-sm/5 outline-hidden sm:text-xs/5 forced-colors:outline',
            isSelected &&
              'inset-ring-primary bg-primary text-primary-fg focus-visible:bg-primary/90',
            isFocusVisible &&
              'inset-ring inset-ring-current/10 bg-secondary text-secondary-fg',
            isDisabled && 'opacity-50',
            allowsRemoving && 'pr-2',
            className
          )
      )}
    >
      {({ allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <Button
              slot='remove'
              className='-mx-0.5 grid size-3.5 shrink-0 place-content-center rounded-full text-muted-fg outline-hidden hover:text-fg'
            >
              <IconX data-slot='close' className='size-3' />
            </Button>
          )}
        </>
      )}
    </TagPrimitive>
  );
}
