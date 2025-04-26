import type { RangeValue } from '@react-types/shared';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useState } from 'react';
import {
  DateRangePickerProps as AriaDateRangePickerProps,
  DateValue,
  Group,
} from 'react-aria-components';

import { DryButton } from '../../Button/DryButton';
import { TextField } from '../../Input/Text/TextField';
import { Flex } from '../../Layout/Flex';
import { Popover } from '../../Overlay/Popover/Popover';
import { usePopover } from '../../Overlay/Popover/UsePopover';
import { Label } from '../../Text/Label';
import { CalendarRange } from '../CalendarRange/CalendarRange';
import styles from './DateRangePickerField.module.css';

export interface DatePickerProps<T extends DateValue>
  extends AriaDateRangePickerProps<T> {
  label1?: string;
  label2?: string;
  errorMessage?: string;
}

export function DatePickerRangeField<T extends DateValue>(
  props: DatePickerProps<T>
) {
  const { label1, label2, errorMessage, ...rest } = props;
  const popover = usePopover(false);

  const [value, setValue] = useState<RangeValue<DateValue>>();

  const onCalendarValue = (value: { start: DateValue; end: DateValue }) => {
    setValue(value);
    popover.toggle();
  };

  return (
    <Group
      className={clsx(styles.AnarDateRangePicker)}
      ref={popover.triggerRef}
    >
      <Flex className={styles.DateInputField} direction='column'>
        <Label>{label1}</Label>
        <DryButton className={styles.button} onPress={popover.open}>
          <TextField
            className={styles.DateInput}
            value={
              value
                ? format(
                    `${value?.start.year}-${value.start.month < 10 ? '0' : ''}${value.start.month}-${value.start.day < 10 ? '0' : ''}${value.start.day}`,
                    'dd MMM yyy'
                  )
                : ''
            }
          />
        </DryButton>
      </Flex>
      <Flex className={styles.DateInputField} direction='column'>
        <Label>{label2}</Label>
        <DryButton className={styles.button} onPress={popover.open}>
          <TextField
            className={styles.DateInput}
            value={
              value
                ? format(
                    `${value?.end.year}-${value.end.month < 10 ? '0' : ''}${value.end.month}-${value.end.day < 10 ? '0' : ''}${value.end.day}`,
                    'dd MMM yyy'
                  )
                : ''
            }
          />
        </DryButton>
      </Flex>
      <Popover
        className={styles.DateRangePickerPopover}
        controller={popover}
        placement={'bottom'}
      >
        <CalendarRange value={value} onChange={onCalendarValue} />
      </Popover>
    </Group>
  );
}
