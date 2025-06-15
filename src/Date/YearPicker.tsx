import clsx from 'clsx';
import {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { Button } from '../Button/Button.js';
import { useGridKeyboardNavigation } from '../Util/Keyboard.js';
import styles from './Components/CalendarGrid.module.css';

export interface YearPickerRef {
  focus: () => void;
}

export interface YearPickerProps {
  className?: string;

  startYear: number;
  endYear: number;
  value?: number;
  onChange?: (newYear: number | null) => void;

  highlightedValue?: number;

  isDisabled?: boolean;
  disabledYears?: number[];
}

export const YearPicker = forwardRef(function YearPicker(
  props: YearPickerProps,
  ref: Ref<YearPickerRef>
) {
  const {
    className,
    value,
    highlightedValue,
    onChange,
    isDisabled,
    endYear,
    startYear,
    disabledYears,
  } = props;

  const rootElmRef = useRef<HTMLDivElement>(null);

  const classes = clsx(
    'YearPicker',
    styles.root,
    styles.threeColumnGridLayout,
    className
  );

  const yearsToShow = new Array(endYear - startYear + 1)
    .fill(startYear)
    .map((start, index) => start + index);

  const onKeyDown = useGridKeyboardNavigation(rootElmRef, '[data-year]', 3);

  const isYearDisabled = (value: number) => {
    return (
      isDisabled ||
      value < startYear ||
      value > endYear ||
      (disabledYears && disabledYears.includes(value))
    );
  };

  const firstEnabledIndex = yearsToShow.findIndex(
    (year) => !isYearDisabled(year)
  );

  useImperativeHandle(ref, () => ({
    focus: () => {
      const el = rootElmRef.current;
      if (!el) return;

      const buttons = el.querySelectorAll<HTMLButtonElement>('[data-year]');

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
    <div className={classes} ref={rootElmRef} role='grid'>
      {yearsToShow.map((year, index) => (
        <Button
          data-year={index}
          excludeFromTabOrder={index !== firstEnabledIndex}
          key={index}
          variant='ghost'
          label={`${year}`}
          onKeyDown={onKeyDown}
          isDisabled={isYearDisabled(year)}
          onPress={() => onChange?.(year === value ? null : year)}
          className={clsx(
            styles.button,
            styles.bigCalendarCell,
            highlightedValue && year === highlightedValue && styles.placeHolder,
            year && year === value && styles.selected
          )}
        />
      ))}
    </div>
  );
});
