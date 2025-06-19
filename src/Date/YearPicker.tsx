import clsx from 'clsx';
import {
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

import { Button } from '../Button/Button.js';
import { useGridKeyboardNavigation } from '../Util/Keyboard.js';

import styles from './Grid.module.css';

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
    endYear,
    startYear,
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

  const disabledList = yearsToShow.map((year) =>
    isYearDisabled(year, props)
  );

  const firstEnabledIndex = disabledList.findIndex((disabled) => !disabled);

  useImperativeHandle(ref, () => ({
    focus: () => {
      const el = rootElmRef.current;
      if (!el) return;

      const buttons = el.querySelectorAll<HTMLButtonElement>('[data-year]');

      buttons[firstEnabledIndex]?.focus();
    },
  }), [firstEnabledIndex]);

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
          isDisabled={disabledList[index]}
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

function isYearDisabled(value: number, props: YearPickerProps) {
  return (
    props.isDisabled ||
    value < props.startYear ||
    value > props.endYear ||
    (props.disabledYears && props.disabledYears.includes(value))
  );
};
