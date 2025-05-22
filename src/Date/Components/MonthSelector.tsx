import clsx from 'clsx';
import { format } from 'date-fns';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import { Button } from '../../Button/Button';
import { Flex } from '../../Layout/Flex';
import styles from './CalendarGrid.module.css';

export interface MonthSelectorProps {
  className?: string;

  value?: number;
  onChange: (newYear?: number) => void;

  changeViewState: (newNumber: number) => void;

  isDisabled?: boolean;
  minValue?: number;
  maxValue?: number;
  placeHolderValue?: number;
}

export function MonthSelector(props: MonthSelectorProps) {
  const {
    value,
    onChange,
    placeHolderValue,
    changeViewState,
    isDisabled,
    maxValue,
    minValue,
    className,
  } = props;

  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (focusedIndex >= 0 && buttonsRef.current[focusedIndex]) {
      buttonsRef.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const monthsToShow: string[] = [];
  for (let i = 0; i < 12; i++) {
    monthsToShow.push(format(new Date(new Date().getFullYear(), i, 1), 'MMM'));
  }

  function isDateDisabled(value: number) {
    return (
      isDisabled ||
      (minValue !== undefined && value < minValue) ||
      (maxValue !== undefined && value > maxValue)
    );
  }

  const onSelect = (month: number) => {
    const valueToSet = value === month ? undefined : month;

    onChange(valueToSet);

    if (valueToSet) {
      changeViewState(valueToSet);
    }
  };

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
      monthsToShow.length - 1
    );

    setFocusedIndex(newIndex);
  }

  const classes = clsx(
    'MonthGrid',
    styles.root,
    styles.threeColumnGridLayout,
    className
  );

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
      {monthsToShow.map((date, index) => (
        <Button
          ref={(el) => (buttonsRef.current[index] = el)}
          key={index}
          variant='ghost'
          label={date}
          isDisabled={isDateDisabled(index)}
          onPress={() => onSelect(index)}
          className={clsx(
            styles.button,
            styles.bigCalendarCell,
            placeHolderValue &&
              index === placeHolderValue &&
              styles.placeHolder,
            value && index === value && styles.selected
          )}
        />
      ))}
    </Flex>
  );
}
