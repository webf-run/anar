import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  DatePickerProps as AriaDatePickerProps,
  DateValue,
} from 'react-aria-components';

import { DryButton } from '../../Button/DryButton';
import { TextField } from '../../Input/Text/TextField';
import { Flex } from '../../Layout/Flex';
import { Popover } from '../../Overlay/Popover/Popover';
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

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [value, setValue] = useState<DateValue>();
  const [isOpen, setIsOpen] = useState(false);

  const onCalendarValue = (value: DateValue) => {
    setValue(value);
    setIsOpen(false);
  };

  return (
    <Flex className={clsx(styles.AnarDatePicker)}>
      <Label>{label}</Label>
      <DryButton
        className={styles.button}
        ref={buttonRef}
        onPress={() => setIsOpen(true)}
      >
        {<TextField className={styles.DateInput}>{`${value ?? ''}`}</TextField>}
      </DryButton>
      <Popover
        className={styles.DatePickerPopover}
        isOpen={isOpen}
        triggerRef={buttonRef}
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
