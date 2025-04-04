import { getLocalTimeZone, today } from '@internationalized/date';
import type { RangeValue } from '@react-types/shared';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import {
  DateRangePickerProps as AriaDateRangePickerProps,
  DateValue,
  Group,
  Popover,
  DateRangePicker as RiaDateRangePicker,
  TextField,
  ValidationResult,
} from 'react-aria-components';

import { DryButton } from '../../Button/DryButton';
import { Label } from '../../Text/Label';
import { CalendarRange } from '../CalendarRange/CalendarRange';
// import { Calendar } from '../Calendar/Calendar';

import styles from './DateRangePickerField.module.css';

export interface DatePickerProps<T extends DateValue>
  extends AriaDateRangePickerProps<T> {
  label1?: string;
  label2?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DatePickerRangeField<T extends DateValue>(
  props: DatePickerProps<T>
) {
  const { label1, label2, errorMessage, ...rest } = props;
  const buttonRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState<RangeValue<DateValue>>();

  return (
    <RiaDateRangePicker
      ref={buttonRef}
      className={clsx(styles.AnarDateRangePicker)}
    >
      <Group className={styles.DateInputField}>
        <Label>{label1}</Label>
        <DryButton
          className={styles.button}
          lead={
            <TextField className={styles.DateInput}>
              {value
                ? `${value?.start.year}-${value.start.month < 10 ? '0' : ''}${value.start.month}-${value.start.day < 10 ? '0' : ''}${value.start.day}`
                : ''}
            </TextField>
          }
        />
      </Group>
      <Group className={styles.DateInputField}>
        <Label>{label2}</Label>
        <DryButton
          className={styles.button}
          lead={
            <TextField className={styles.DateInput}>
              {value
                ? `${value?.end.year}-${value.end.month < 10 ? '0' : ''}${value.end.month}-${value.end.day < 10 ? '0' : ''}${value.end.day}`
                : ''}
            </TextField>
          }
        />
      </Group>
      <Popover
        className={styles.DateRangePickerPopover}
        triggerRef={buttonRef}
        placement={'bottom'}
      >
        <CalendarRange onChange={setValue} />
      </Popover>
    </RiaDateRangePicker>
  );
}
