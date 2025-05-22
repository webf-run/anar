import clsx from 'clsx';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import { Button } from '../../Button/Button';
import { Flex } from '../../Layout/Flex';
import styles from './CalendarGrid.module.css';

export interface YearSelectorProps {
  className?: string;

  value?: number;
  onChange: (newYear?: number) => void;

  placeHolderValue?: number;

  changeViewState: (newNumber: number) => void;

  isDisabled?: boolean;
  minValue?: number;
  maxValue?: number;
}

export function YearSelector(props: YearSelectorProps) {
  const {
    className,
    value,
    placeHolderValue,
    onChange,
    changeViewState,
    isDisabled,
    maxValue,
    minValue,
  } = props;

  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (focusedIndex >= 0 && buttonsRef.current[focusedIndex]) {
      buttonsRef.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const initialYear = minValue ?? value ?? new Date().getFullYear();

  const rangeStartYear = initialYear - (initialYear % 10);

  const yearsToShow: number[] = [];
  for (let i = 0; i < 10; i++) {
    yearsToShow.push(rangeStartYear + i);
  }

  const classes = clsx(
    'YearGrid',
    styles.root,
    styles.threeColumnGridLayout,
    className
  );

  const onSelect = (date: number) => {
    const valueToSet = date === value ? undefined : date;

    onChange(valueToSet);

    if (valueToSet) {
      changeViewState(valueToSet);
    }
  };

  function isDateDisabled(value: number) {
    return (
      isDisabled ||
      (minValue !== undefined && value < minValue) ||
      (maxValue !== undefined && value > maxValue)
    );
  }

  const columns = 3;

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }

    let delta = 0;
    switch (e.key) {
      case 'ArrowLeft':
        delta = -1;
        break;
      case 'ArrowRight':
        delta = 1;
        break;
      case 'ArrowUp':
        delta = -columns;
        break;
      case 'ArrowDown':
        delta = columns;
        break;
    }

    const newIndex = Math.min(
      Math.max(0, focusedIndex + delta),
      yearsToShow.length - 1
    );

    setFocusedIndex(newIndex);
  }

  return (
    <Flex
      className={classes}
      tabIndex={0}
      onFocus={() => {
        if (focusedIndex === -1) {
          setFocusedIndex(0);
        }
      }}
      onKeyDown={handleKeyDown}
    >
      {yearsToShow.map((year, index) => (
        <Button
          ref={(el) => (buttonsRef.current[index] = el)}
          key={index}
          variant='ghost'
          label={`${year}`}
          isDisabled={isDateDisabled(year)}
          onPress={() => onSelect(year)}
          className={clsx(
            styles.button,
            styles.bigCalendarCell,
            placeHolderValue && year === placeHolderValue && styles.placeHolder,
            year && year === value && styles.selected
          )}
        />
      ))}
    </Flex>
  );
}
