import { CalendarDate } from '@internationalized/date';
import { MappedDateValue } from '@react-types/datepicker';
import clsx from 'clsx';
import { addMonths, addYears, format, subMonths, subYears } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  DateValue,
  CalendarProps as RiaCalendarProps,
} from 'react-aria-components';

import { ActionButton } from '../../Button/ActionButton';
import { DryButton } from '../../Button/DryButton';
import { Flex } from '../../Layout/Flex';
import { Text } from '../../Text/Text';
import { DateSelector } from '../Components/DateSelector';
import { MonthSelector } from '../Components/MonthSelector';
import { YearSelector } from '../Components/YearSelector';
import styles from './Calendar.module.css';

export interface CalendarProps<T extends DateValue>
  extends RiaCalendarProps<T> {
  errorMessage?: string;
  description?: string;
}

export type SelectedDate = { year?: number; month?: number; day?: number };

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
    errorMessage,
    className,
    value,
    onChange,
    isDisabled = false,
    isInvalid = false,
    description,
    minValue,
    maxValue,
    ...restProps
  } = props;

  const [currentState, setCurrentState] = useState<'Date' | 'Month' | 'Year'>(
    'Date'
  );

  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    year: value ? value.year : undefined,
    month: value ? value.month : undefined,
    day: value ? value.day : undefined,
  });

  const minDate = minValue
    ? new Date(minValue?.year, minValue?.month, minValue?.day)
    : undefined;
  const maxDate = maxValue
    ? new Date(maxValue?.year, maxValue?.month, maxValue?.day)
    : undefined;

  const initialDisplayValue = minDate
    ? minDate
    : maxDate && new Date() > maxDate
      ? maxDate
      : new Date();

  const [displayedDate, setDisplayedDate] = useState<Date>(initialDisplayValue);

  function handleSetSelectedDate(date: SelectedDate) {
    setSelectedDate(date);

    if (date.day !== undefined) {
      const year = date.year ?? displayedDate.getFullYear();
      const month = date.month ?? displayedDate.getMonth();
      setSelectedDate({ day: date.day, month: month, year: year });

      if (onChange) {
        const calendarDate = new CalendarDate(year, month, date.day);
        onChange(calendarDate as MappedDateValue<T>);
      }
    }
  }

  function isPreviousDisabled(currentDate: Date) {
    if (minDate && currentDate <= minDate) {
      return true;
    }
    return false;
  }

  function isNextDisabled(currentDate: Date) {
    if (maxDate && currentDate >= maxDate) {
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

  const onSelectDate = () => {
    setCurrentState(currentState === 'Year' ? 'Month' : 'Date');

    if (currentState === 'Date' && selectedDate.month) {
      setDisplayedDate(
        new Date(
          displayedDate.getFullYear(),
          selectedDate.month,
          displayedDate.getDate()
        )
      );
    } else if (currentState === 'Month' && selectedDate.year) {
      setDisplayedDate(
        new Date(
          selectedDate.year,
          displayedDate.getMonth(),
          displayedDate.getDate()
        )
      );
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
      {description && <Text text={description} />}
      <Flex className={styles.CalendarHeader}>
        <ActionButton
          icon={ChevronLeft}
          isDisabled={isDisabled || isPreviousDisabled(displayedDate)}
          className={clsx(styles.arrowButtons, styles.button)}
          slot={'previous'}
          onPress={onPrevious}
        />
        <DryButton
          isDisabled={isDisabled || currentState === 'Year'}
          onPress={() =>
            setCurrentState(currentState === 'Date' ? 'Month' : 'Year')
          }
          className={clsx(styles.CalendarHeaderText, styles.button)}
          children={getCalendarHeaderText(currentState, displayedDate)}
        />
        <ActionButton
          isDisabled={isDisabled || isNextDisabled(displayedDate)}
          className={clsx(styles.arrowButtons, styles.button)}
          slot={'next'}
          onPress={onNext}
          icon={ChevronRight}
        />
      </Flex>
      <div className={styles.divider}></div>
      {currentState === 'Date' && (
        <DateSelector
          maxValue={maxDate}
          minValue={minDate}
          isInvalid={isInvalid}
          isDisabled={isDisabled}
          displayedDate={displayedDate}
          selectedDate={selectedDate}
          setSelectedDate={handleSetSelectedDate}
          onSelectDate={onSelectDate}
        />
      )}
      {currentState === 'Month' && (
        <MonthSelector
          maxValue={maxDate}
          minValue={minDate}
          isDisabled={isDisabled}
          onSelectDate={onSelectDate}
          displayedDate={displayedDate}
          selectedDate={selectedDate}
          setSelectedDate={handleSetSelectedDate}
        />
      )}
      {currentState === 'Year' && (
        <YearSelector
          maxValue={maxDate}
          minValue={minDate}
          isDisabled={isDisabled}
          onSelectDate={onSelectDate}
          displayedDate={displayedDate}
          selectedDate={selectedDate}
          setSelectedDate={handleSetSelectedDate}
        />
      )}
      {errorMessage && isInvalid && (
        <Text
          className={styles.error}
          slot='errorMessage'
          text={errorMessage}
        />
      )}
    </Flex>
  );
}
