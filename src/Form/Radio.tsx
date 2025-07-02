'use client';

import type {
  RadioGroupProps as RadioGroupPrimitiveProps,
  RadioProps as RadioPrimitiveProps,
} from 'react-aria-components';
import {
  RadioGroup as RadioGroupPrimitive,
  Radio as RadioPrimitive,
  composeRenderProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

import { composeTailwindRenderProps } from '../Base/Primitive.js';
import { Description, FieldError, type FieldProps, Label } from './Field.js';

export interface RadioGroupProps
  extends RadioGroupPrimitiveProps,
    Omit<FieldProps, 'placeholder'> {}

export function RadioGroup(props: RadioGroupProps) {
  const { className, label, description, errorMessage, children, ...rest } =
    props;
  return (
    <RadioGroupPrimitive
      {...rest}
      className={composeTailwindRenderProps(
        className,
        'space-y-3 has-[[slot=description]]:space-y-6 has-[[slot=description]]:**:data-[slot=label]:font-medium **:[[slot=description]]:block'
      )}
    >
      {(values) => (
        <>
          {label && <Label>{label}</Label>}
          {description && <Description>{description}</Description>}
          {typeof children === 'function' ? children(values) : children}
          <FieldError>{errorMessage}</FieldError>
        </>
      )}
    </RadioGroupPrimitive>
  );
}

export interface RadioProps
  extends RadioPrimitiveProps,
    Pick<FieldProps, 'label' | 'description'> {}

export function Radio(props: RadioProps) {
  const { className, children, description, label, ...rest } = props;
  return (
    <RadioPrimitive
      {...rest}
      className={composeTailwindRenderProps(
        className,
        'group block disabled:opacity-50'
      )}
    >
      {composeRenderProps(
        children,
        (children, { isSelected, isFocusVisible, isInvalid }) => {
          const isStringChild = typeof children === 'string';
          const hasCustomChildren = typeof children !== 'undefined';

          const content = hasCustomChildren ? (
            isStringChild ? (
              <Label>{children}</Label>
            ) : (
              children
            )
          ) : (
            <>
              {label && <Label>{label}</Label>}
              {description && <Description>{description}</Description>}
            </>
          );

          return (
            <div
              className={twMerge(
                'grid grid-cols-[1.125rem_1fr] gap-x-3 gap-y-1 sm:grid-cols-[1rem_1fr]',
                '*:data-[slot=indicator]:col-start-1 *:data-[slot=indicator]:row-start-1 *:data-[slot=indicator]:mt-0.75 sm:*:data-[slot=indicator]:mt-1',
                '*:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1',
                '*:[[slot=description]]:col-start-2 *:[[slot=description]]:row-start-2',
                'has-[[slot=description]]:**:data-[slot=label]:font-medium'
              )}
            >
              <span
                data-slot='indicator'
                className={twMerge([
                  "relative inset-ring inset-ring-fg/10 isolate flex size-4.5 shrink-0 items-center justify-center rounded-full bg-secondary text-bg transition before:absolute before:inset-auto before:size-2 before:shrink-0 before:rounded-full before:content-[''] hover:before:bg-fg/10 sm:size-4 sm:before:size-1.7",
                  isSelected && [
                    'bg-primary text-primary-fg before:bg-bg hover:before:bg-muted/90 dark:inset-ring-primary',
                    'group-invalid:inset-ring-danger/70 group-invalid:bg-danger group-invalid:text-danger-fg',
                  ],
                  isFocusVisible && [
                    'inset-ring-primary ring-3 ring-ring/20',
                    'group-invalid:inset-ring-danger/70 group-invalid:text-danger-fg group-invalid:ring-danger/20',
                  ],
                  isInvalid &&
                    'inset-ring-danger/70 bg-danger/20 text-danger-fg ring-danger/20',
                ])}
              />
              {content}
            </div>
          );
        }
      )}
    </RadioPrimitive>
  );
}
