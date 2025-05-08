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

  onSelectDate: (newDate: Date) => void;

  displayedDate: Date;

  isDisabled?: boolean;
  minValue?: Date;
  maxValue?: Date;
  placeHolderValue?: Date;
}

export function MonthSelector(props: MonthSelectorProps) {
  const {
    selectedDate,
    setSelectedDate,
    displayedDate,
    placeHolderValue,
    onSelectDate,
    isDisabled,
    maxValue,
    minValue,
    className,
  } = props;
  const rangeStartMonth = new Date(displayedDate.getFullYear(), 1, 0);

  const monthsToShow: Date[] = [];
  for (let i = 0; i < 12; i++) {
    monthsToShow.push(addMonths(rangeStartMonth, i));
  }

  function isDateDisabled(value: Date) {
    return (
      isDisabled ||
      (minValue &&
        value.getMonth() < minValue.getMonth() &&
        value.getFullYear() === minValue.getFullYear()) ||
      (maxValue &&
        value.getMonth() > maxValue.getMonth() &&
        value.getFullYear() === maxValue.getFullYear())
    );
  }

  const onSelect = (value: Date) => {
    const valueToSet =
      selectedDate.month === value.getMonth() ? undefined : value;

    setSelectedDate({
      day: undefined,
      month: valueToSet?.getMonth(),
      year: selectedDate.year,
    });

    if (valueToSet) {
      onSelectDate(value);
    }
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
        <Button
          key={index}
          variant='ghost'
          label={`${format(value, 'MMM')}`}
          isDisabled={isDateDisabled(value)}
          onPress={() => onSelect(value)}
          className={clsx(
            styles.button,
            styles.bigCalendarCell,
            placeHolderValue &&
              value.getFullYear() === placeHolderValue.getFullYear() &&
              value.getMonth() === placeHolderValue.getMonth() &&
              styles.placeHolder,
            selectedDate.month &&
              value.getMonth() === selectedDate.month &&
              styles.selected
          )}
        />
      ))}
    </Flex>
  );
}
