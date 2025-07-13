'use client';

import { type ReactNode } from 'react';
import {
  DateField as DateFieldPrimitive,
  type DateFieldProps as DateFieldPrimitiveProps,
  DateInput as DateInputPrimitive,
  type DateInputProps,
  DateSegment,
  type DateValue,
  type ValidationResult,
} from 'react-aria-components';
import { twJoin } from 'tailwind-merge';

import { composeTailwindRenderProps } from '../Base/Primitive.js';
import { Description, FieldError, FieldGroup, Label } from '../Form/Field.js';

export interface DateFieldProps<T extends DateValue>
  extends DateFieldPrimitiveProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export function DateField<T extends DateValue>(props: DateFieldProps<T>) {
  const { prefix, suffix, label, description, errorMessage, ...rest } = props;
  return (
    <DateFieldPrimitive
      {...rest}
      className={composeTailwindRenderProps(
        rest.className,
        'group flex flex-col gap-y-1'
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        {prefix && typeof prefix === 'string' ? (
          <span className='ml-2 text-muted-fg'>{prefix}</span>
        ) : (
          prefix
        )}
        <DateInput />
        {suffix ? (
          typeof suffix === 'string' ? (
            <span className='mr-2 text-muted-fg'>{suffix}</span>
          ) : (
            suffix
          )
        ) : null}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </DateFieldPrimitive>
  );
}

export function DateInput(props: Omit<DateInputProps, 'children'>) {
  const { className, ...rest } = props;

  return (
    <DateInputPrimitive
      className={composeTailwindRenderProps(
        className,
        'px-3 py-2 text-base text-fg placeholder-muted-fg outline-hidden sm:px-2.5 sm:py-1.5 sm:text-sm/6'
      )}
      {...rest}
    >
      {(segment) => (
        <DateSegment
          segment={segment}
          className={twJoin(
            'inline shrink-0 rounded px-1.5 type-literal:px-0 text-fg tracking-wider caret-transparent outline-0 forced-color-adjust-none data-placeholder:not-data-focused:text-muted-fg sm:p-0.5 sm:py-0.5 sm:text-sm forced-colors:text-[ButtonText]',
            'focus:bg-accent focus:text-accent-fg focus:data-invalid:bg-danger focus:data-invalid:text-danger-fg forced-colors:focus:bg-[Highlight] forced-colors:focus:text-[HighlightText]',
            'disabled:opacity-50 forced-colors:disabled:text-[GrayText]'
          )}
        />
      )}
    </DateInputPrimitive>
  );
}
