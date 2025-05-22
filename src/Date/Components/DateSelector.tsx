import clsx from 'clsx';
import { isSameDay, isSameMonth } from 'date-fns';
import {
  DateValue,
  Calendar as RiaCalendar,
  CalendarCell as RiaCalendarCell,
  CalendarGrid as RiaCalendarGrid,
  CalendarGridBody as RiaCalendarGridBody,
  CalendarGridHeader as RiaCalendarGridHeader,
  CalendarGridProps as RiaCalendarGridProps,
  CalendarHeaderCell as RiaCalendarHeaderCell,
} from 'react-aria-components';

import styles from './DateSelector.module.css';

export interface DateSelectorProps extends RiaCalendarGridProps {
  className?: string;

  value?: DateValue;
  onChange: (newYear: DateValue) => void;

  displayedDate: DateValue;

  isDisabled?: boolean;

  minValue?: DateValue;
  maxValue?: DateValue;

  placeHolderValue?: DateValue;
}

export function DateSelector(props: DateSelectorProps) {
  const {
    className,
    value,
    placeHolderValue,
    displayedDate,
    onChange,
    isDisabled = false,
    minValue,
    maxValue,
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
    if (value && value.year && value.month && value.day) {
      const selected = new Date(value.year, value.month - 1, value.day);

      return isSameDay(new Date(date.year, date.month - 1, date.day), selected);
    }
    return false;
  };

  const classes = clsx('MonthGrid', styles.root, className);

  return (
    <RiaCalendar
      value={value}
      onChange={onChange}
      defaultFocusedValue={displayedDate}
      minValue={minValue}
      maxValue={maxValue}
      defaultValue={placeHolderValue}
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
                placeHolderValue &&
                  isSameDay(
                    new Date(date.year, date.month - 1, date.day),
                    new Date(
                      placeHolderValue.year,
                      placeHolderValue.month - 1,
                      placeHolderValue.day
                    )
                  ) &&
                  styles.placeHolder,
                isSelected(date) && styles.selected,
                isDateDisabled(date) && styles.disabled
              )}
              date={date}
            />
          )}
        </RiaCalendarGridBody>
      </RiaCalendarGrid>
    </RiaCalendar>
  );
}
