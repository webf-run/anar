import clsx from 'clsx';
import {
  addDays,
  format,
  getWeeksInMonth,
  isSameMonth,
  subDays,
} from 'date-fns';
import { CalendarGridProps } from 'react-aria-components';

import { Button } from '../../Button/Button';
import { Flex } from '../../Layout/Flex';
import { Text } from '../../Text/Text';
import { SelectedDate } from '../Calendar/Calendar';
import styles from './CalendarGrid.module.css';

export interface RangeDateSelectorProps extends CalendarGridProps {
  className?: string;

  selectedDate: { to: SelectedDate; from: SelectedDate };
  setSelectedDate: (newDate: { to: SelectedDate; from: SelectedDate }) => void;

  displayedDate: Date;
  isDisabled?: boolean;
  isInvalid?: boolean;

  minValue?: Date;
  maxValue?: Date;
}

export function RangeDateSelector(props: RangeDateSelectorProps) {
  const {
    className,
    displayedDate,
    selectedDate,
    setSelectedDate,
    isInvalid = false,
    isDisabled = false,
    maxValue,
    minValue,
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
    const getDateParts = (date: Date) => ({
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    });

    let valueToSet = {
      from: { ...selectedDate.from },
      to: { ...selectedDate.to },
    };

    const hasFrom = !!selectedDate.from.day;
    const hasTo = !!selectedDate.to.day;

    if (!hasFrom || hasTo) {
      valueToSet = {
        from: getDateParts(value),
        to: { year: undefined, month: undefined, day: undefined },
      };
    } else {
      const fromDate = new Date(
        selectedDate.from.year,
        selectedDate.from.month,
        selectedDate.from.day
      );

      const valueParts = getDateParts(value);

      if (value < fromDate) {
        valueToSet = {
          from: valueParts,
          to: selectedDate.from,
        };
      } else if (value >= fromDate) {
        valueToSet = {
          from: selectedDate.from,
          to: valueParts,
        };
      }
    }

    setSelectedDate(valueToSet);
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
          isDisabled={isDateDisabled(value)}
          label={`${format(value, 'dd')}`}
          className={clsx(
            styles.button,

            isSameMonth(displayedDate, value) &&
              selectedDate.from.day &&
              selectedDate.to.day &&
              value.getDate() >= selectedDate.from.day &&
              value.getDate() <= selectedDate.to.day &&
              styles.selected,
            isDateDisabled(value) && styles.disabled
          )}
          onPress={() => onSelect(value)}
        />
      ))}
    </Flex>
  );
}
