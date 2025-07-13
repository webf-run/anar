'use client';

import {
  TimeField as TimeFieldPrimitive,
  type TimeFieldProps as TimeFieldPrimitiveProps,
  type TimeValue,
  type ValidationResult,
} from 'react-aria-components';

import { composeTailwindRenderProps } from '../Base/Primitive.js';
import { Description, FieldError, FieldGroup, Label } from '../Form/Field.js';
import { DateInput } from './DateField.js';

export interface TimeFieldProps<T extends TimeValue>
  extends TimeFieldPrimitiveProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  prefix?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
}

export function TimeField<T extends TimeValue>(props: TimeFieldProps<T>) {
  const {
    prefix,
    suffix,
    label,
    className,
    description,
    errorMessage,
    ...rest
  } = props;
  return (
    <TimeFieldPrimitive
      {...rest}
      className={composeTailwindRenderProps(
        className,
        'group/time-field flex flex-col gap-y-1 *:data-[slot=label]:font-medium'
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        {prefix && typeof prefix === 'string' ? (
          <span className='ml-2 text-muted-fg'>{prefix}</span>
        ) : (
          prefix
        )}
        <DateInput className='flex w-fit min-w-28 justify-around whitespace-nowrap' />
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
    </TimeFieldPrimitive>
  );
}
