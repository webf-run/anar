import { MappedDateValue } from '@react-types/datepicker';
import type { RangeValue } from '@react-types/shared';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useState } from 'react';
import {
  DateRangePickerProps as AriaDateRangePickerProps,
  DateValue,
  Group,
} from 'react-aria-components';

import { Button } from '../../Button/Button';
import { Flex } from '../../Layout/Flex';
import { Popover } from '../../Overlay/Popover/Popover';
import { usePopover } from '../../Overlay/Popover/UsePopover';
import { Label } from '../../Text/Label';
import { Text } from '../../Text/Text';
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
  const {
    label1,
    label2,
    errorMessage,
    isDisabled,
    isInvalid,
    value,
    onChange,
    minValue,
    maxValue,
    ...rest
  } = props;
  const popover = usePopover(false);

  const [selectedDate, setSelectedDate] = useState<
    RangeValue<DateValue> | undefined
  >(value ? value : undefined);

  const onCalendarValue = (value: { start: DateValue; end: DateValue }) => {
    setSelectedDate(value);
    if (onChange) {
      onChange({
        start: value.start as MappedDateValue<T>,
        end: value.end as MappedDateValue<T>,
      });
    }
    popover.close();
  };

  return (
    <Flex direction='column'>
      <Group className={clsx(styles.root)} ref={popover.triggerRef}>
        <Flex className={styles.DateInputField} direction='column'>
          <Label>{label1}</Label>
          <Button
            variant='calm'
            label={
              selectedDate
                ? format(
                    new Date(
                      selectedDate?.start.year,
                      selectedDate.start.month,
                      selectedDate.start.day
                    ),
                    'dd MMM yyy'
                  )
                : ''
            }
            isDisabled={isDisabled}
            className={styles.button}
            onPress={popover.toggle}
            ref={popover.triggerRef}
          />
        </Flex>
        <Flex className={styles.DateInputField} direction='column'>
          <Label>{label2}</Label>
          <Button
            variant='calm'
            label={
              selectedDate
                ? format(
                    new Date(
                      selectedDate?.end.year,
                      selectedDate.end.month,
                      selectedDate.end.day
                    ),
                    'dd MMM yyy'
                  )
                : ''
            }
            isDisabled={isDisabled}
            className={styles.button}
            onPress={popover.toggle}
            ref={popover.triggerRef}
          />
        </Flex>
      </Group>
      <Popover
        className={styles.popover}
        controller={popover}
        placement={'bottom'}
      >
        <CalendarRange
          maxValue={maxValue}
          minValue={minValue}
          isInvalid={isInvalid}
          isDisabled={isDisabled}
          value={selectedDate}
          onChange={onCalendarValue}
        />
      </Popover>
      {errorMessage && isInvalid && (
        <Text
          className={styles.error}
          slot='errorMessage'
          text={errorMessage}
        />
      )}
    </Flex>
  );
}
