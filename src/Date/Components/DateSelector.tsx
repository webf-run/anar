import clsx from 'clsx';
import {
  addDays,
  format,
  getWeeksInMonth,
  isSameDay,
  isSameMonth,
  subDays,
} from 'date-fns';
import { CalendarGridProps } from 'react-aria-components';

import { Button } from '../../Button/Button';
import { Flex } from '../../Layout/Flex';
import { Text } from '../../Text/Text';
import { SelectedDate } from '../Calendar/Calendar';
import styles from './CalendarGrid.module.css';

export interface DateSelectorProps extends CalendarGridProps {
  className?: string;

  displayedDate: Date;

  selectedDate: SelectedDate;
  setSelectedDate: (newYear: SelectedDate) => void;

  onSelectDate: (newDate: Date) => void;

  isDisabled?: boolean;

  minValue?: Date;
  maxValue?: Date;
  placeHolderValue?: Date;
}

export function DateSelector(props: DateSelectorProps) {
  const {
    className,
    displayedDate,
    selectedDate,
    placeHolderValue,
    setSelectedDate,
    onSelectDate,
    isDisabled = false,
    minValue,
    maxValue,
  } = props;

  const numberOfWeeks = getWeeksInMonth(displayedDate, { weekStartsOn: 1 });
  const firstOfMonth = new Date(
    displayedDate.getFullYear(),
    displayedDate.getMonth(),
    1
  );
  const firstDayOfTheMonth = firstOfMonth.getDay();
  const displayStartDate = subDays(
    firstOfMonth,
    firstDayOfTheMonth - 1 > 0 ? firstDayOfTheMonth - 1 : 6
  );

  const visibleDates: Date[] = [];
  for (let i = 0; i < 7 * numberOfWeeks; i++) {
    visibleDates.push(addDays(displayStartDate, i));
  }

  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(format(visibleDates[i], 'eeeeee'));
  }

  function isDateDisabled(value: Date) {
    return (
      isDisabled ||
      (minValue && value < minValue) ||
      (maxValue && value > maxValue) ||
      !isSameMonth(displayedDate, value)
    );
  }

  const onSelect = (value: Date) => {
    if (!isDisabled) {
      const valueToSet =
        selectedDate.day === value.getDate() ? undefined : value;

      setSelectedDate({
        day: valueToSet?.getDate(),
        month: selectedDate.month,
        year: selectedDate.year,
      });

      if (valueToSet) {
        onSelectDate(value);
      }
    }
  };

  const isSelected = (value: Date) => {
    if (selectedDate.year && selectedDate.month && selectedDate.day) {
      const selected = new Date(
        selectedDate.year,
        selectedDate.month,
        selectedDate.day
      );

      return isSameDay(value, selected);
    }
    return false;
  };

  const classes = clsx(
    'MonthGrid',
    styles.root,
    styles.sevenColumnGridLayout,
    className
  );

  return (
    <Flex className={classes}>
      {days.map((val, index) => (
        <Text text={val} key={index} className={styles.header} />
      ))}
      {visibleDates.map((value, index) => (
        <Button
          key={index}
          variant='ghost'
          label={`${format(value, 'dd')}`}
          isDisabled={isDateDisabled(value)}
          onPress={() => onSelect(value)}
          className={clsx(
            styles.button,
            placeHolderValue &&
              isSameDay(value, placeHolderValue) &&
              styles.placeHolder,
            isSelected(value) && styles.selected,
            isDateDisabled(value) && styles.disabled
          )}
        />
      ))}
    </Flex>
  );
}
