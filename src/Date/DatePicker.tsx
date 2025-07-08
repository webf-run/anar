'use client';

import { IconCalendarDays } from '@intentui/icons';
import type { DateDuration } from '@internationalized/date';
import {
  DatePicker as DatePickerPrimitive,
  type DatePickerProps as DatePickerPrimitiveProps,
  type DateValue,
  type PopoverProps,
  type ValidationResult,
} from 'react-aria-components';
import { twJoin } from 'tailwind-merge';

import { composeTailwindRenderProps } from '../Base/Primitive.js';
import { useMediaQuery } from '../Base/UseQuery.js';
import { Button } from '../Button/Button.js';
import {
  Description,
  FieldError,
  FieldGroup,
  type FieldProps,
  Label,
} from '../Form/Field.js';
import { Modal } from '../Overlay/Modal.js';
import { PopoverContent } from '../Overlay/Popover.js';
import { Calendar } from './Calendar.js';
import { DateInput } from './DateField.js';
import { RangeCalendar } from './RangeCalendar.js';

export interface DatePickerOverlayProps extends Omit<PopoverProps, 'children'> {
  range?: boolean;
  visibleDuration?: DateDuration;
  pageBehavior?: 'visible' | 'single';
}

export function DatePickerOverlay(props: DatePickerOverlayProps) {
  const {
    visibleDuration = { months: 1 },
    pageBehavior = 'visible',
    range,
    ...rest
  } = props;
  const isMobile = useMediaQuery('(max-width: 767px)');
  return isMobile ? (
    <Modal.Content aria-label='Date picker' closeButton={false}>
      <div className='flex justify-center p-6'>
        {range ? (
          <RangeCalendar
            pageBehavior={pageBehavior}
            visibleDuration={visibleDuration}
          />
        ) : (
          <Calendar />
        )}
      </div>
    </Modal.Content>
  ) : (
    <PopoverContent
      showArrow={false}
      className={twJoin(
        'flex min-w-auto max-w-none snap-x justify-center p-4 sm:min-w-[16.5rem] sm:p-2 sm:pt-3',
        visibleDuration?.months === 1 ? 'sm:max-w-2xs' : 'sm:max-w-none'
      )}
      {...rest}
    >
      {range ? (
        <RangeCalendar
          pageBehavior={pageBehavior}
          visibleDuration={visibleDuration}
        />
      ) : (
        <Calendar />
      )}
    </PopoverContent>
  );
}

export function DatePickerIcon() {
  return (
    <Button
      size='sq-sm'
      intent='plain'
      className='size-7 shrink-0 rounded pressed:bg-transparent outline-hidden outline-offset-0 hover:bg-transparent focus-visible:text-fg focus-visible:ring-0 group-open:text-fg **:data-[slot=icon]:text-muted-fg group-open:*:data-[slot=icon]:text-fg'
    >
      <IconCalendarDays />
    </Button>
  );
}

export interface DatePickerProps<T extends DateValue>
  extends DatePickerPrimitiveProps<T>,
    Pick<DatePickerOverlayProps, 'placement'>,
    Omit<FieldProps, 'placeholder'> {}

export function DatePicker<T extends DateValue>(props: DatePickerProps<T>) {
  const { label, className, description, errorMessage, placement, ...rest } =
    props;
  return (
    <DatePickerPrimitive
      {...rest}
      className={composeTailwindRenderProps(
        className,
        'group flex flex-col gap-y-1 *:data-[slot=label]:font-medium'
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup className='min-w-40 *:[button]:last:mr-1.5 sm:*:[button]:last:mr-0.5'>
        <DateInput className='w-full' />
        <DatePickerIcon />
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <DatePickerOverlay placement={placement} />
    </DatePickerPrimitive>
  );
}
