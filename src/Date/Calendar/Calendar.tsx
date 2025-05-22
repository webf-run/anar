import { CalendarDate } from '@internationalized/date';
import { MappedDateValue } from '@react-types/datepicker';
import clsx from 'clsx';
import {
  addMonths,
  addYears,
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
  subYears,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import {
  DateValue,
  CalendarProps as RiaCalendarProps,
} from 'react-aria-components';

import { ActionButton } from '../../Button/ActionButton';
import { DryButton } from '../../Button/DryButton';
import { Flex } from '../../Layout/Flex';
import { DateSelector } from '../Components/DateSelector';
import { MonthSelector } from '../Components/MonthSelector';
import { YearSelector } from '../Components/YearSelector';
import styles from './Calendar.module.css';

export interface CalendarProps<T extends DateValue>
  extends RiaCalendarProps<T> {
  placeHolderValue?: DateValue;
}

export type SelectedDate = { year?: number; month?: number; day?: number };

export function useCalendar() {}

export function getCalendarHeaderText(
  currentState: 'Date' | 'Month' | 'Year',
  value: Date
): string {
  if (currentState === 'Date') {
    return `${format(value, 'MMMM yyy')}`;
  } else if (currentState === 'Month') {
    return `${format(value, 'yyy')}`;
  } else {
    const startYear = subYears(value, value.getFullYear() % 10);
    const endYear = addYears(startYear, 9);

    return `${format(startYear, 'yyy')} - ${format(endYear, 'yyy')}`;
  }
}

export function Calendar<T extends DateValue>(props: CalendarProps<T>) {
  const {
    className,
    value,
    onChange,
    isDisabled = false,
    minValue,
    maxValue,
    placeHolderValue,
    ...restProps
  } = props;

  const [currentState, setCurrentState] = useState<'Date' | 'Month' | 'Year'>(
    'Date'
  );

  const [selectedDate, setSelectedDate] = useState<DateValue | undefined>(
    value ? value : undefined
  );
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(
    value ? value.month : undefined
  );
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    value ? value.year : undefined
  );

  // Indexing for type DateValue starts with 1 where as for type Date it starts with 0
  const minDate = minValue
    ? new Date(minValue?.year, minValue?.month - 1, minValue?.day)
    : undefined;
  const maxDate = maxValue
    ? new Date(maxValue?.year, maxValue?.month - 1, maxValue?.day)
    : undefined;

  const initialDisplayValue = minDate
    ? minDate
    : maxDate && new Date() > maxDate
      ? maxDate
      : new Date();

  const [displayedDate, setDisplayedDate] = useState<Date>(initialDisplayValue);

  function handleSetSelectedDate(date: DateValue) {
    setSelectedDate(
      new CalendarDate(
        selectedYear ?? date.year,
        selectedMonth ?? date.month,
        date.day
      )
    );

    if (date.day !== undefined) {
      const year = date.year ?? value?.year;
      const month = date.month ?? value?.month;
      setSelectedDate(date);

      if (onChange) {
        const calendarDate = new CalendarDate(year, month, date.day);
        onChange(calendarDate as MappedDateValue<T>);
      }
    }
  }

  function isPreviousDisabled(currentDate: Date) {
    const startMonth = startOfMonth(currentDate);
    if (minDate && startMonth <= minDate) {
      return true;
    }
    return false;
  }

  function isNextDisabled(currentDate: Date) {
    const endMonth = endOfMonth(currentDate);
    if (maxDate && endMonth >= maxDate) {
      return true;
    }
    return false;
  }

  const onPrevious = () => {
    if (currentState === 'Date') {
      setDisplayedDate(subMonths(displayedDate, 1));
    } else if (currentState === 'Month') {
      setDisplayedDate(subYears(displayedDate, 1));
    } else {
      setDisplayedDate(subYears(displayedDate, 10));
    }
  };

  const onNext = () => {
    if (currentState === 'Date') {
      setDisplayedDate(addMonths(displayedDate, 1));
    } else if (currentState === 'Month') {
      setDisplayedDate(addYears(displayedDate, 1));
    } else {
      setDisplayedDate(addYears(displayedDate, 10));
    }
  };

  const changeViewState = (toDisplay?: number) => {
    setCurrentState(currentState === 'Year' ? 'Month' : 'Date');

    if (toDisplay) {
      if (currentState === 'Month') {
        setDisplayedDate(
          new Date(
            displayedDate.getFullYear(),
            toDisplay,
            displayedDate.getDate()
          )
        );
      } else if (currentState === 'Year') {
        setDisplayedDate(
          new Date(toDisplay, displayedDate.getMonth(), displayedDate.getDate())
        );
      }
    }
  };

  const classes = clsx(
    'AnarCalendar',
    styles.root,
    isDisabled && styles.disableAll,
    className
  );

  return (
    <Flex className={classes}>
      <Flex className={styles.CalendarHeader}>
        <ActionButton
          icon={ChevronLeft}
          isDisabled={isDisabled || isPreviousDisabled(displayedDate)}
          className={clsx(styles.arrowButtons, styles.button)}
          slot={'previous'}
          onPress={onPrevious}
          onKeyDown={(e) => e.code === 'Enter' && onPrevious}
        />
        <DryButton
          isDisabled={isDisabled || currentState === 'Year'}
          onKeyDown={(e) =>
            e.code === 'Enter' &&
            setCurrentState(currentState === 'Date' ? 'Month' : 'Year')
          }
          onPress={() =>
            setCurrentState(currentState === 'Date' ? 'Month' : 'Year')
          }
          className={clsx(styles.CalendarHeaderText, styles.button)}
          children={getCalendarHeaderText(currentState, displayedDate)}
        />
        <ActionButton
          icon={ChevronRight}
          isDisabled={isDisabled || isNextDisabled(displayedDate)}
          className={clsx(styles.arrowButtons, styles.button)}
          slot={'next'}
          onPress={onNext}
          onKeyDown={(e) => e.code === 'Enter' && onNext}
        />
      </Flex>
      <div className={styles.divider}></div>
      {currentState === 'Date' && (
        <DateSelector
          displayedDate={
            new CalendarDate(
              displayedDate.getFullYear(),
              displayedDate.getMonth() + 1,
              displayedDate.getDate()
            )
          }
          maxValue={maxValue ? maxValue : undefined}
          minValue={minValue ? minValue : undefined}
          isDisabled={isDisabled}
          value={selectedDate}
          onChange={handleSetSelectedDate}
          placeHolderValue={placeHolderValue}
        />
      )}
      {currentState === 'Month' && (
        <MonthSelector
          maxValue={maxValue ? maxValue.month - 1 : undefined}
          minValue={minValue ? minValue.month - 1 : undefined}
          isDisabled={isDisabled}
          changeViewState={changeViewState}
          value={selectedMonth ? selectedMonth - 1 : undefined}
          onChange={setSelectedMonth}
          placeHolderValue={placeHolderValue?.month}
        />
      )}
      {currentState === 'Year' && (
        <YearSelector
          placeHolderValue={placeHolderValue?.year}
          maxValue={maxValue?.year}
          minValue={minValue?.year}
          isDisabled={isDisabled}
          changeViewState={changeViewState}
          value={selectedYear}
          onChange={setSelectedYear}
        />
      )}
    </Flex>
  );
}
