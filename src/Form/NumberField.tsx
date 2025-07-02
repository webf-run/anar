'use client';

import {
  IconChevronDown,
  IconChevronUp,
  IconMinus,
  IconPlus,
} from '@intentui/icons';
import {
  Button,
  type ButtonProps,
  NumberField as NumberFieldPrimitive,
  type NumberFieldProps as NumberFieldPrimitiveProps,
  type ValidationResult,
} from 'react-aria-components';
import { twJoin } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

import { composeTailwindRenderProps } from '../Base/Primitive.js';
import { useMediaQuery } from '../Base/UseQuery.js';
import { Description, FieldError, FieldGroup, Input, Label } from './Field.js';

const fieldBorderStyles = tv({
  base: 'group-focus:border-primary/70 forced-colors:border-[Highlight]',
  variants: {
    isInvalid: {
      true: 'group-focus:border-danger/70 forced-colors:border-[Mark]',
    },
    isDisabled: {
      true: 'group-focus:border-input/70',
    },
  },
});

export interface NumberFieldProps extends NumberFieldPrimitiveProps {
  label?: string;
  description?: string;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function NumberField(props: NumberFieldProps) {
  const { label, placeholder, description, className, errorMessage, ...rest } =
    props;
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <NumberFieldPrimitive
      {...rest}
      className={composeTailwindRenderProps(
        className,
        'group flex flex-col gap-y-1.5'
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup
        className={twJoin(
          isMobile && [
            '**:[button]:inset-ring **:[button]:inset-ring-fg/5 **:[button]:grid **:[button]:size-8 **:[button]:place-content-center',
            '*:[button]:first:ml-1 *:[button]:last:mr-1',
            '**:[button]:bg-secondary **:[button]:pressed:bg-secondary/80',
          ]
        )}
      >
        {(renderProps) => (
          <>
            {isMobile ? <StepperButton slot='decrement' /> : null}
            <Input
              className='px-[calc(--spacing(12)-1px)] tabular-nums'
              placeholder={placeholder}
            />
            {!isMobile ? (
              <div
                className={fieldBorderStyles({
                  ...renderProps,
                  className: 'grid place-content-center sm:border-s',
                })}
              >
                <div className='flex h-full flex-col'>
                  <StepperButton
                    slot='increment'
                    emblemType='chevron'
                    className='h-4 px-1'
                  />
                  <div
                    className={fieldBorderStyles({
                      ...renderProps,
                      className: 'border-input border-b',
                    })}
                  />
                  <StepperButton
                    slot='decrement'
                    emblemType='chevron'
                    className='h-4 px-1'
                  />
                </div>
              </div>
            ) : (
              <StepperButton slot='increment' />
            )}
          </>
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </NumberFieldPrimitive>
  );
}

interface StepperButtonProps extends ButtonProps {
  slot: 'increment' | 'decrement';
  emblemType?: 'chevron' | 'default';
  className?: string;
}

function StepperButton(props: StepperButtonProps) {
  const { slot, className, emblemType = 'default', ...rest } = props;
  const icon =
    emblemType === 'chevron' ? (
      slot === 'increment' ? (
        <IconChevronUp className='size-5' />
      ) : (
        <IconChevronDown className='size-5' />
      )
    ) : slot === 'increment' ? (
      <IconPlus />
    ) : (
      <IconMinus />
    );
  return (
    <Button
      className={composeTailwindRenderProps(
        className,
        'h-10 cursor-default pressed:text-primary-fg text-muted-fg group-disabled:bg-secondary/70 sm:pressed:bg-primary forced-colors:group-disabled:text-[GrayText]'
      )}
      slot={slot}
      {...rest}
    >
      {icon}
    </Button>
  );
}
