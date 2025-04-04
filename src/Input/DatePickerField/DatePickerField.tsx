import { getLocalTimeZone, today } from '@internationalized/date';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import {
  DatePickerProps as AriaDatePickerProps,
  DateValue,
  DatePicker as RiaDatePicker,
  TextField,
  ValidationResult,
} from 'react-aria-components';

import { DryButton } from '../../Button/DryButton';
import { Popover } from '../../Popover/Popover';
import { Label } from '../../Text/Label';
import { Calendar } from '../Calendar/Calendar';
import styles from './DatePickerField.module.css';

export interface DatePickerProps<T extends DateValue>
  extends AriaDatePickerProps<T> {
  label?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DatePickerField<T extends DateValue>(
  props: DatePickerProps<T>
) {
  const { label, errorMessage, ...rest } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [value, setValue] = useState<DateValue>();

  return (
    <RiaDatePicker className={clsx(styles.AnarDatePicker)}>
      <Label>{label}</Label>
      <DryButton
        ref={buttonRef}
        className={styles.button}
        lead={
          <TextField className={styles.DateInput}>{`${value ?? ''}`}</TextField>
        }
      />
      <Popover
        className={styles.DatePickerPopover}
        triggerRef={buttonRef}
        placement={'bottom'}
      >
        <Calendar
          className={styles.calendar}
          onChange={setValue}
          value={value}
        />
      </Popover>
    </RiaDatePicker>
  );
}
