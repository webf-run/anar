import { parseDate } from '@internationalized/date';
import { MappedDateValue } from '@react-types/datepicker';
import clsx from 'clsx';
import { addMonths, addYears, format, subMonths, subYears } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  DateValue,
  CalendarProps as RiaCalendarProps,
} from 'react-aria-components';

import { DryButton } from '../../Button/DryButton';
import { Flex } from '../../Layout/Flex';
import { Heading } from '../../Text/Heading';
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
    ...restProps
  } = props;

  const [currentState, setCurrentState] = useState<'Date' | 'Month' | 'Year'>(
    'Date'
  );

  const [displayedDate, setDisplayedDate] = useState<Date>(new Date());
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<number>();

  useEffect(() => {
    if (currentState === 'Date' && selectedMonth) {
      setDisplayedDate(
        new Date(
          displayedDate.getFullYear(),
          selectedMonth,
          displayedDate.getDate()
        )
      );
    } else if (currentState === 'Month' && selectedYear) {
      setDisplayedDate(
        new Date(
          selectedYear,
          displayedDate.getMonth(),
          displayedDate.getDate()
        )
      );
    }
  }, [currentState]);

  useEffect(() => {
    if (selectedDate) {
      let year: number;
      let month: number;
      if (!selectedYear) {
        year = displayedDate.getFullYear();
      } else {
        year = selectedYear;
      }

      if (!selectedMonth) {
        month = displayedDate.getMonth();
      } else {
        month = selectedMonth;
      }

      const currentSelectedDate = parseDate(
        `${year}-${month && month < 10 ? 0 : ''}${month}-${selectedDate && selectedDate < 10 ? 0 : ''}${selectedDate}`
      );
      if (currentSelectedDate && onChange) {
        onChange(currentSelectedDate as MappedDateValue<T>);
      }
    }
  }, [selectedDate]);

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
        <DryButton
          isDisabled={isDisabled}
          className={styles.arrowButtons}
          slot={'previous'}
          onPress={onPrevious}
          children={<ChevronLeft size={35} />}
        />
        <DryButton
          isDisabled={isDisabled || currentState === 'Year'}
          onPress={() =>
            setCurrentState(currentState === 'Date' ? 'Month' : 'Year')
          }
          className={styles.CalendarHeaderText}
          children={
            <Heading level={2}>
              {getCalendarHeaderText(currentState, displayedDate)}
            </Heading>
          }
        />
        <DryButton
          isDisabled={isDisabled}
          className={styles.arrowButtons}
          slot={'next'}
          onPress={onNext}
          children={<ChevronRight size={35} />}
        />
      </Flex>
      <div className={styles.divider}></div>
      {currentState === 'Date' && (
        <DateSelector
          isInvalid={isInvalid}
          isDisabled={isDisabled}
          displayedDate={displayedDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onSelectDate={onSelectDate}
        />
      )}
      {currentState === 'Month' && (
        <MonthSelector
          isDisabled={isDisabled}
          onSelectDate={onSelectDate}
          displayedDate={displayedDate}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      )}
      {currentState === 'Year' && (
        <YearSelector
          isDisabled={isDisabled}
          onSelectDate={onSelectDate}
          displayedDate={displayedDate}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
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
