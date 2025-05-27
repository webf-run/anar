import { RangeValue } from '@react-types/shared';
import clsx from 'clsx';
import {
  addDays,
  format,
  getWeeksInMonth,
  isSameMonth,
  subDays,
} from 'date-fns';
import {
  DateValue,
  CalendarCell as RiaCalendarCell,
  CalendarGrid as RiaCalendarGrid,
  CalendarGridBody as RiaCalendarGridBody,
  CalendarGridHeader as RiaCalendarGridHeader,
  CalendarGridProps as RiaCalendarGridProps,
  CalendarHeaderCell as RiaCalendarHeaderCell,
  RangeCalendar as RiaRangeCalendar,
} from 'react-aria-components';

import { Button } from '../../Button/Button';
import { Flex } from '../../Layout/Flex';
import { Text } from '../../Text/Text';
import { SelectedDate } from '../Calendar/Calendar';
import styles from './DateSelector.module.css';

export interface RangeDateSelectorProps extends RiaCalendarGridProps {
  className?: string;

  value?: RangeValue<DateValue>;
  onChange: (value: RangeValue<DateValue>) => void;

  displayedDate: DateValue;
  isDisabled?: boolean;
  isInvalid?: boolean;

  minValue?: DateValue;
  maxValue?: DateValue;
}

export function RangeDateSelector(props: RangeDateSelectorProps) {
  const {
    className,
    displayedDate,
    value,
    onChange,
    isInvalid = false,
    isDisabled = false,
    maxValue,
    minValue,
  } = props;

  function isDateDisabled(date: DateValue) {
    return (
      isDisabled ||
      (minValue && date < minValue) ||
      (maxValue && date > maxValue) ||
      !isSameMonth(
        new Date(
          displayedDate.year,
          displayedDate.month - 1,
          displayedDate.day
        ),
        new Date(date.year, date.month - 1, date.day)
      )
    );
  }

  const isSelected = (date: DateValue) => {
    return (
      value &&
      value.start.day &&
      value.end.day &&
      date.compare(value.start) >= 0 &&
      date.compare(value.end) <= 0
    );
  };

  const classes = clsx('MonthGrid', styles.root, className);

  return (
    <RiaRangeCalendar
      value={value}
      onChange={onChange}
      focusedValue={displayedDate}
      minValue={minValue}
      maxValue={maxValue}
      isDisabled={isDisabled}
    >
      <RiaCalendarGrid className={classes}>
        <RiaCalendarGridHeader className={styles.header}>
          {(day) => <RiaCalendarHeaderCell>{day}</RiaCalendarHeaderCell>}
        </RiaCalendarGridHeader>
        <RiaCalendarGridBody>
          {(date) => (
            <RiaCalendarCell
              className={clsx(
                styles.calendarCell,
                isSelected(date) && styles.selected,
                isDateDisabled(date) && styles.disabled
              )}
              date={date}
            />
          )}
        </RiaCalendarGridBody>
      </RiaCalendarGrid>
    </RiaRangeCalendar>
  );

  // return (
  //   <Flex className={classes}>
  //     {days.map((val, index) => (
  //       <Text text={val} key={index} className={styles.header} />
  //     ))}
  //     {visibleDates.map((value, index) => (
  //       <Button
  //         key={index}
  //         variant='ghost'
  //         isDisabled={isDateDisabled(value)}
  //         label={`${format(value, 'dd')}`}
  //         className={clsx(
  //           styles.button,

  //           isSameMonth(displayedDate, value) &&
  //             selectedDate.from.day &&
  //             selectedDate.to.day &&
  //             value.getDate() >= selectedDate.from.day &&
  //             value.getDate() <= selectedDate.to.day &&
  //             styles.selected,
  //           isDateDisabled(value) && styles.disabled
  //         )}
  //         onPress={() => onSelect(value)}
  //       />
  //     ))}
  //   </Flex>
  // );
}
