import clsx from 'clsx';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import {
  DatePickerProps as AriaDatePickerProps,
  DateValue,
} from 'react-aria-components';

import { DryButton } from '../../Button/DryButton';
import { TextField } from '../../Input/Text/TextField';
import { Flex } from '../../Layout/Flex';
import { Popover } from '../../Overlay/Popover/Popover';
import { usePopover } from '../../Overlay/Popover/UsePopover';
import { FieldError } from '../../Text/FieldError';
import { Label } from '../../Text/Label';
import { Calendar } from '../Calendar/Calendar';
import styles from './DatePickerField.module.css';

export interface DatePickerProps<T extends DateValue>
  extends AriaDatePickerProps<T> {
  label?: string;
  errorMessage?: string;
  description?: string;
}

export function DatePickerField<T extends DateValue>(
  props: DatePickerProps<T>
) {
  const { label, errorMessage, description, ...rest } = props;

  const [value, setValue] = useState<DateValue>();
  const popover = usePopover(false);

  const onCalendarValue = (value: DateValue) => {
    setValue(value);
    popover.toggle();
  };

  return (
    <Flex className={clsx(styles.AnarDatePicker)}>
      <Label>{label}</Label>
      <DryButton
        className={styles.button}
        onPress={popover.toggle}
        ref={popover.triggerRef}
      >
        {
          <TextField
            className={styles.DateInput}
            value={`${value ? format(`${value.year}-${value.month}-${value.day}`, 'dd MMM yyy') : ''}`}
          />
        }
      </DryButton>
      <Popover
        className={styles.DatePickerPopover}
        controller={popover}
        placement={'bottom'}
      >
        <Calendar
          className={styles.calendar}
          value={value}
          onChange={onCalendarValue}
        />
      </Popover>
      <FieldError>{errorMessage}</FieldError>
    </Flex>
  );
}
