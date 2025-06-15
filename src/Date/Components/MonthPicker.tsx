import clsx from 'clsx';
import { format } from 'date-fns';
import {
  KeyboardEvent,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useKeyboard } from 'react-aria';

import { Button } from '../../Button/Button';
import { Flex } from '../../Layout/Flex';
import { useGridKeyboardNavigation } from '../../Util/Keyboard';
import styles from './CalendarGrid.module.css';

export interface MonthPickerProps {
  className?: string;

  value?: number;
  onChange?: (newYear: number | null) => void;

  isDisabled?: boolean;
  disabledYears?: number[];
  minValue?: number;
  maxValue?: number;
  highlightedValue?: number;
}

export interface MonthPickerRef {
  focus: () => void;
}

export const MonthPicker = forwardRef(function MonthPicker(
  props: MonthPickerProps,
  ref: Ref<MonthPickerRef>
) {
  const {
    value,
    onChange,
    highlightedValue,
    isDisabled,
    maxValue,
    minValue,
    className,
    disabledYears,
  } = props;

  const rootElmRef = useRef<HTMLDivElement>(null);

  const classes = clsx(
    'MonthGrid',
    styles.root,
    styles.threeColumnGridLayout,
    className
  );

  const monthsToShow = new Array(12)
    .fill(0)
    .map((start, index) => start + index);

  const onKeyDown = useGridKeyboardNavigation(rootElmRef, '[data-month]', 3);

  const isMonthDisabled = (value: number) => {
    return (
      isDisabled ||
      (minValue !== undefined && value < minValue) ||
      (maxValue !== undefined && value > maxValue)
    );
  };

  const firstEnabledIndex = monthsToShow.findIndex(
    (month) => !isMonthDisabled(month)
  );

  useImperativeHandle(ref, () => ({
    focus: () => {
      const el = rootElmRef.current;
      if (!el) return;

      const buttons = el.querySelectorAll<HTMLButtonElement>('[data-month]');

      for (const btn of buttons) {
        if (
          !btn.hasAttribute('disabled') &&
          btn.getAttribute('aria-disabled') !== 'true'
        ) {
          btn.focus();
          break;
        }
      }
    },
  }));

  return (
    <div ref={rootElmRef} className={classes} role='grid'>
      {monthsToShow.map((month, index) => (
        <Button
          data-month={index}
          excludeFromTabOrder={index !== firstEnabledIndex}
          key={index}
          variant='ghost'
          label={`${format(new Date(2025, month, 1), 'MMM')}`}
          onKeyDown={onKeyDown}
          isDisabled={isMonthDisabled(index)}
          onPress={() => onChange?.(month === value ? null : month)}
          className={clsx(
            styles.button,
            styles.bigCalendarCell,
            highlightedValue &&
              index === highlightedValue &&
              styles.placeHolder,
            value !== undefined && index + 1 === value && styles.selected
          )}
        />
      ))}
    </div>
  );
});
