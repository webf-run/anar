import clsx from 'clsx';
import { addYears, subYears } from 'date-fns';

import { Button } from '../../Button/Button';
import { Flex } from '../../Layout/Flex';
import { SelectedDate } from '../Calendar/Calendar';
import styles from './CalendarGrid.module.css';

export interface YearSelectorProps {
  className?: string;

  displayedDate: Date;
  placeHolderValue?: Date;

  selectedDate: SelectedDate;
  setSelectedDate: (newYear: SelectedDate) => void;

  onSelectDate: (newDate: Date) => void;

  isDisabled?: boolean;
  minValue?: Date;
  maxValue?: Date;
}

export function YearSelector(props: YearSelectorProps) {
  const {
    className,
    selectedDate,
    placeHolderValue,
    setSelectedDate,
    displayedDate,
    onSelectDate,
    isDisabled,
    maxValue,
    minValue,
  } = props;

  const rangeStartYear = minValue
    ? new Date(minValue.getFullYear(), minValue.getMonth(), minValue.getDate())
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
      selectedDate.year === value.getFullYear() ? undefined : value;

    setSelectedDate({
      day: undefined,
      month: undefined,
      year: valueToSet?.getFullYear(),
    });

    if (valueToSet) {
      onSelectDate(value);
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
            placeHolderValue &&
              value.getFullYear() === placeHolderValue.getFullYear() &&
              styles.placeHolder,
            selectedDate.year &&
              value.getFullYear() === selectedDate.year &&
              styles.selected
          )}
        />
      ))}
    </Flex>
  );
}
