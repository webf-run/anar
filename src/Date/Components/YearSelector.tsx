import clsx from 'clsx';
import { addYears, subYears } from 'date-fns';

import { Button } from '../../Button/Button';
import { Flex } from '../../Layout/Flex';
import { SelectedDate } from '../Calendar/Calendar';
import styles from './CalendarGrid.module.css';

export interface YearSelectorProps {
  className?: string;

  displayedDate: Date;

  selectedDate: SelectedDate;
  setSelectedDate: (newYear: SelectedDate) => void;

  onSelectDate: () => void;

  isDisabled?: boolean;
  minValue?: Date;
  maxValue?: Date;

  startYear?: Date;
}

export function YearSelector(props: YearSelectorProps) {
  const {
    className,
    selectedDate,
    setSelectedDate,
    displayedDate,
    onSelectDate,
    isDisabled,
    maxValue,
    minValue,
    startYear,
  } = props;

  const rangeStartYear = startYear
    ? startYear
    : subYears(displayedDate, displayedDate.getFullYear() % 10);

  const yearsToShow: Date[] = [];
  for (let i = 0; i < 10; i++) {
    yearsToShow.push(addYears(rangeStartYear, i));
  }

  const classes = clsx(
    'YearGrid',
    styles.root,
    styles.threeColumnGridLayout,
    className
  );

  const onSelect = (value: Date) => {
    const valueToSet =
      selectedDate.year === value.getFullYear()
        ? undefined
        : value.getFullYear();

    setSelectedDate({
      day: selectedDate.day,
      month: selectedDate.month,
      year: valueToSet,
    });

    if (valueToSet) {
      onSelectDate();
    }
  };

  function isDateDisabled(value: Date) {
    return (
      isDisabled ||
      (minValue && value < minValue) ||
      (maxValue && value > maxValue)
    );
  }

  return (
    <Flex className={classes}>
      {yearsToShow.map((value, index) => (
        <Button
          key={index}
          variant='ghost'
          label={`${value.getFullYear()}`}
          isDisabled={isDateDisabled(value)}
          onPress={() => onSelect(value)}
          className={clsx(
            styles.button,
            styles.bigCalendarCell,
            selectedDate.year &&
              value.getFullYear() === selectedDate.year &&
              styles.selected
          )}
        />
      ))}
    </Flex>
  );
}
