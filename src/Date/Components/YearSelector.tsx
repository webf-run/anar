import clsx from 'clsx';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useKeyboard } from 'react-aria';

import { Button } from '../../Button/Button';
import { Flex } from '../../Layout/Flex';
import styles from './CalendarGrid.module.css';

export interface YearSelectorProps {
  className?: string;

  value?: number;
  onChange: (newYear?: number) => void;

  highlightedValue?: number;

  isDisabled?: boolean;
  minValue?: number;
  maxValue?: number;
}

export function YearSelector(props: YearSelectorProps) {
  const {
    className,
    value,
    highlightedValue,
    onChange,
    isDisabled,
    maxValue,
    minValue,
  } = props;

  const classes = clsx(
    'YearGrid',
    styles.root,
    styles.threeColumnGridLayout,
    className
  );

  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const flexRef = useRef<HTMLDivElement | null>(null);

  const initialYear = minValue ?? value ?? new Date().getFullYear();

  const rangeStartYear = initialYear - (initialYear % 10);

  const yearsToShow: number[] = [];
  for (let i = 0; i < 10; i++) {
    yearsToShow.push(rangeStartYear + i);
  }

  const onSelect = (date: number) => {
    const valueToSet = date === value ? undefined : date;

    onChange(valueToSet);
  };

  const moveFocus = (delta: number) => {
    const newIndex = Math.min(Math.max(0, focusedIndex + delta), 11);
    setFocusedIndex(newIndex);

    const button = flexRef.current?.querySelector<HTMLButtonElement>(
      `[data-year="${newIndex}"]`
    );
    button?.focus();
  };

  const { keyboardProps } = useKeyboard({
    onKeyDown(e) {
      const handlers: Partial<Record<string, () => void>> = {
        ArrowLeft: () => moveFocus(-1),
        ArrowRight: () => moveFocus(1),
        ArrowUp: () => moveFocus(-3),
        ArrowDown: () => moveFocus(3),
      };

      if (handlers[e.key]) {
        e.preventDefault();
        handlers[e.key]!();
      }
    },
  });

  function isDateDisabled(value: number) {
    return (
      isDisabled ||
      (minValue !== undefined && value < minValue) ||
      (maxValue !== undefined && value > maxValue)
    );
  }

  return (
    <Flex
      {...keyboardProps}
      className={classes}
      tabIndex={0}
      onFocus={() => {
        if (focusedIndex === -1) {
          setFocusedIndex(0);
        }
      }}
      ref={flexRef}
    >
      {yearsToShow.map((year, index) => (
        <Button
          data-year={index}
          key={index}
          variant='ghost'
          label={`${year}`}
          isDisabled={isDateDisabled(year)}
          onPress={() => onSelect(year)}
          className={clsx(
            styles.button,
            styles.bigCalendarCell,
            highlightedValue && year === highlightedValue && styles.placeHolder,
            year && year === value && styles.selected
          )}
        />
      ))}
    </Flex>
  );
}
