import clsx from 'clsx';
import { addMonths, format, formatDate } from 'date-fns';
import { useState } from 'react';

import { DryButton } from '../../../Button/DryButton';
import { Flex } from '../../../Layout/Flex';
import styles from './CalendarGrid.module.css';

export interface MonthSelectorProps {
  className?: string;

  selectedMonth?: number;
  setSelectedMonth: (newMonth?: number) => void;

  displayedDate: Date;

  isDisabled?: boolean;

  onSelectDate: () => void;
}

export function MonthSelector(props: MonthSelectorProps) {
  const {
    selectedMonth,
    setSelectedMonth,
    displayedDate,
    onSelectDate,
    isDisabled,
    className,
  } = props;
  const rangeStartMonth = selectedMonth
    ? new Date(selectedMonth, 0, 1)
    : new Date(displayedDate.getFullYear(), 0, 1);

  const monthsToShow: Date[] = [];
  for (let i = 0; i < 12; i++) {
    monthsToShow.push(addMonths(rangeStartMonth, i));
  }

  const onSelect = (value: Date) => {
    // const valueToSet =
    //   !selectedMonth || value.getMonth() !== selectedMonth ? value : undefined;
    // setSelectedMonth(valueToSet?.getMonth());
    setSelectedMonth(value.getMonth());

    // if (valueToSet) {
    //   onSelectDate();
    // }
    onSelectDate();
  };

  const classes = clsx(
    'MonthGrid',
    styles.root,
    styles.threeColumnGridLayout,
    className
  );

  return (
    <Flex className={classes}>
      {monthsToShow.map((value, index) => (
        <DryButton
          isDisabled
          key={index}
          className={clsx(
            styles.CalendarGridCell,
            selectedMonth &&
              value.getMonth() === selectedMonth &&
              styles.selected
          )}
          onPress={() => onSelect(value)}
        >
          {formatDate(value, 'MMM')}
        </DryButton>
      ))}
    </Flex>
  );
}
