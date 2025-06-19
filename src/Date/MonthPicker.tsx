import clsx from 'clsx';
import { format } from 'date-fns';
import {
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

import { Button } from '../Button/Button.js';
import { useGridKeyboardNavigation } from '../Util/Keyboard.js';

import styles from './Grid.module.css';

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
    className,
  } = props;

  const rootElmRef = useRef<HTMLDivElement>(null);

  const classes = clsx(
    'MonthPicker',
    styles.root,
    styles.threeColumnGridLayout,
    className
  );

  const monthsToShow = new Array(12)
    .fill(0)
    .map((start, index) => start + index);

  const onKeyDown = useGridKeyboardNavigation(rootElmRef, '[data-month]', 3);

  const disabledList = monthsToShow.map((year) => isMonthDisabled(year, props));
  const firstEnabledIndex = disabledList.findIndex((disabled) => !disabled);

  useImperativeHandle(ref, () => ({
    focus: () => {
      const el = rootElmRef.current;
      if (!el) return;

      const buttons = el.querySelectorAll<HTMLButtonElement>('[data-month]');

      buttons[firstEnabledIndex]?.focus();
    },
  }), [firstEnabledIndex]);

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
          isDisabled={disabledList[index]}
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

export function isMonthDisabled(month: number, props: MonthPickerProps) {
  return (
    props.isDisabled ||
    (props.minValue !== undefined && month < props.minValue) ||
    (props.maxValue !== undefined && month > props.maxValue)
  );
};
