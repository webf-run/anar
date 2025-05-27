import clsx from 'clsx';
import { format } from 'date-fns';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useKeyboard } from 'react-aria';

import { Button } from '../../Button/Button';
import { Flex } from '../../Layout/Flex';
import styles from './CalendarGrid.module.css';

export interface MonthSelectorProps {
  className?: string;

  value?: number;
  onChange: (value?: number) => void;

  isDisabled?: boolean;
  minValue?: number;
  maxValue?: number;
  highlightedValue?: number;
}

export function MonthGrid(props: MonthSelectorProps) {
  const {
    value,
    onChange,
    highlightedValue,
    isDisabled,
    maxValue,
    minValue,
    className,
  } = props;

  const classes = clsx(
    'MonthGrid',
    styles.root,
    styles.threeColumnGridLayout,
    className
  );

  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const flexRef = useRef<HTMLDivElement | null>(null);

  const monthsToShow: string[] = [];
  for (let i = 0; i < 12; i++) {
    monthsToShow.push(format(new Date(new Date().getFullYear(), i, 1), 'MMM'));
  }

  const isDateDisabled = (value: number) => {
    return (
      isDisabled ||
      (minValue !== undefined && value < minValue) ||
      (maxValue !== undefined && value > maxValue)
    );
  };

  const onSelect = (month: number) => {
    const valueToSet = value === month + 1 ? undefined : month + 1;

    onChange(valueToSet);
  };

  const moveFocus = (delta: number) => {
    const newIndex = Math.min(Math.max(0, focusedIndex + delta), 11);
    setFocusedIndex(newIndex);

    const button = flexRef.current?.querySelector<HTMLButtonElement>(
      `[data-month="${newIndex}"]`
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
      {monthsToShow.map((date, index) => (
        <Button
          data-month={index}
          key={index}
          variant='ghost'
          label={date}
          isDisabled={isDateDisabled(index)}
          onPress={() => onSelect(index)}
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
    </Flex>
  );
}
