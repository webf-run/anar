import { parseDate } from '@internationalized/date';
import { MappedDateValue } from '@react-types/datepicker';
import clsx from 'clsx';
import { addMonths, addYears, format, subMonths, subYears } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  DateValue,
  RangeCalendarProps as RiaCalendarRangeProps,
} from 'react-aria-components';

import { DryButton } from '../../Button/DryButton';
import { Flex } from '../../Layout/Flex';
import { Heading } from '../../Text/Heading';
import { Text } from '../../Text/Text';
import { getCalendarHeaderText } from '../Calendar/Calendar';
import { RangeDateSelector } from '../Components/DateSelectorRange';
import { MonthSelector } from '../Components/MonthSelector';
import { YearSelector } from '../Components/YearSelector';
import styles from './CalendarRange.module.css';

export interface CalendarProps<T extends DateValue>
  extends RiaCalendarRangeProps<T> {
  errorMessage?: string;
}

export function CalendarRange<T extends DateValue>(props: CalendarProps<T>) {
  const {
    errorMessage,
    className,
    value,
    onChange,
    isDisabled = false,
    isInvalid = false,
    ...restProps
  } = props;

  const [currentState, setCurrentState] = useState<'Date' | 'Month' | 'Year'>(
    'Date'
  );

  const [displayedDate, setDisplayedDate] = useState<Date>(new Date());
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<{
    from?: number;
    to?: number;
  }>({ from: undefined, to: undefined });

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
    if (selectedDate.from && selectedDate.to) {
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

      const currentFromSelectedDate = parseDate(
        `${year}-${month && month < 10 ? 0 : ''}${month}-${selectedDate.from && selectedDate.from < 10 ? 0 : ''}${selectedDate.from}`
      );
      const currentToSelectedDate = parseDate(
        `${year}-${month && month < 10 ? 0 : ''}${month}-${selectedDate.to && selectedDate.to < 10 ? 0 : ''}${selectedDate.to}`
      );

      if (currentFromSelectedDate && currentToSelectedDate && onChange) {
        onChange({
          start: currentFromSelectedDate as MappedDateValue<T>,
          end: currentToSelectedDate as MappedDateValue<T>,
        });
      }
    }
  }, [selectedDate.from, selectedDate.to]);

  function setSelectedToUndefined() {
    setSelectedDate({ to: undefined, from: undefined });
    setSelectedMonth(undefined);
    setSelectedYear(undefined);
  }

  const onPrevious = () => {
    setSelectedToUndefined();
    if (currentState === 'Date') {
      setDisplayedDate(subMonths(displayedDate, 1));
    } else if (currentState === 'Month') {
      setDisplayedDate(subYears(displayedDate, 1));
    } else {
      setDisplayedDate(subYears(displayedDate, 10));
    }
  };

  const onNext = () => {
    setSelectedToUndefined();
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
        <RangeDateSelector
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
