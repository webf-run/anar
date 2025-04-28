import clsx from 'clsx';
import { addMonths, format } from 'date-fns';

import { Button } from '../../Button/Button';
import { Flex } from '../../Layout/Flex';
import { SelectedDate } from '../Calendar/Calendar';
import styles from './CalendarGrid.module.css';

export interface MonthSelectorProps {
  className?: string;

  selectedDate: SelectedDate;
  setSelectedDate: (newYear: SelectedDate) => void;

  onSelectDate: () => void;

  displayedDate: Date;

  isDisabled?: boolean;
  minValue?: Date;
  maxValue?: Date;

  startMonth?: Date;
}

export function MonthSelector(props: MonthSelectorProps) {
  const {
    selectedDate,
    setSelectedDate,
    displayedDate,
    onSelectDate,
    isDisabled,
    maxValue,
    minValue,
    className,
    startMonth,
  } = props;
  const rangeStartMonth = startMonth
    ? new Date(displayedDate.getFullYear(), startMonth.getMonth(), 0)
    : new Date(displayedDate.getFullYear(), 1, 0);

  const monthsToShow: Date[] = [];
  for (let i = 0; i < 12; i++) {
    monthsToShow.push(addMonths(rangeStartMonth, i));
  }

  const onSelect = (value: Date) => {
    const valueToSet =
      selectedDate.month === value.getMonth() ? undefined : value.getMonth();

    setSelectedDate({
      day: selectedDate.day,
      month: valueToSet,
      year: selectedDate.month,
    });

    if (valueToSet) {
      onSelectDate();
    }
  };

  const classes = clsx(
    'MonthGrid',
    styles.root,
    styles.threeColumnGridLayout,
    className
  );

  function isDateDisabled(value: Date) {
    return (
      isDisabled ||
      (minValue && value < minValue) ||
      (maxValue && value > maxValue)
    );
  }

  return (
    <Flex className={classes}>
      {monthsToShow.map((value, index) => (
        <Button
          key={index}
          variant='ghost'
          label={`${format(value, 'MMM')}`}
          isDisabled={isDateDisabled(value)}
          onPress={() => onSelect(value)}
          className={clsx(
            styles.button,
            styles.bigCalendarCell,
            selectedDate.month &&
              value.getMonth() === selectedDate.month &&
              styles.selected
          )}
        />
      ))}
    </Flex>
  );
}
