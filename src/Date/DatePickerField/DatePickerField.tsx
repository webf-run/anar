import { MappedDateValue } from '@react-types/datepicker';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useState } from 'react';
import {
  DatePickerProps as AriaDatePickerProps,
  DateValue,
} from 'react-aria-components';

import { Button } from '../../Button/Button';
import { Flex } from '../../Layout/Flex';
import { Popover } from '../../Overlay/Popover/Popover';
import { usePopover } from '../../Overlay/Popover/UsePopover';
import { Label } from '../../Text/Label';
import { Text } from '../../Text/Text';
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
  const {
    label,
    errorMessage,
    description,
    isDisabled,
    isInvalid,
    value,
    onChange,
    minValue,
    maxValue,
    ...rest
  } = props;

  const [selectedDate, setSelectedDate] = useState<DateValue | undefined>(
    value ?? undefined
  );
  const popover = usePopover(false);

  const onCalendarValue = (newValue: DateValue) => {
    setSelectedDate(newValue);
    if (onChange) onChange(newValue as MappedDateValue<T>);
    popover.close();
  };

  console.log(isInvalid);

  return (
    <Flex className={clsx(styles.root)}>
      <Label isDisabled={isDisabled}>{label}</Label>
      <Button
        variant='calm'
        label={
          selectedDate
            ? format(
                new Date(
                  selectedDate.year,
                  selectedDate.month,
                  selectedDate.day
                ),
                'dd MMM yyy'
              )
            : ''
        }
        isDisabled={isDisabled}
        onPress={popover.toggle}
        ref={popover.triggerRef}
        className={styles.button}
      />
      <Popover
        className={styles.popover}
        controller={popover}
        placement={'bottom'}
      >
        <Calendar
          value={selectedDate}
          onChange={onCalendarValue}
          maxValue={maxValue}
          minValue={minValue}
          isInvalid={isInvalid}
          className={styles.calendar}
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
