import { CalendarDate } from '@internationalized/date';
import { MappedDateValue } from '@react-types/datepicker';
import { RangeValue } from '@react-types/shared';
import clsx from 'clsx';
import { addMonths, addYears, subMonths, subYears } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import {
  DateValue,
  RangeCalendarProps as RiaCalendarRangeProps,
} from 'react-aria-components';

import { ActionButton } from '../../Button/ActionButton';
import { DryButton } from '../../Button/DryButton';
import { Flex } from '../../Layout/Flex';
import { Text } from '../../Text/Text';
import { SelectedDate, getCalendarHeaderText } from '../Calendar/Calendar';
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
    minValue,
    maxValue,
    ...restProps
  } = props;

  const [currentState, setCurrentState] = useState<'Date' | 'Month' | 'Year'>(
    'Date'
  );

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
  const [selectedDate, setSelectedDate] = useState<RangeValue<DateValue>>();

  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(
    value ? value.start.month : undefined
  );
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    value ? value.start.year : undefined
  );

  const handleSetSelectedDate = (updated: RangeValue<DateValue>) => {
    setSelectedDate(updated);

    if (updated.start.day && updated.end.day) {
      const year = updated.start.year ?? displayedDate.getFullYear();
      const month = updated.start.month ?? displayedDate.getMonth();

      const fromDate = new CalendarDate(year, month, updated.start.day);
      const toDate = new CalendarDate(year, month, updated.end.day);

      if (onChange) {
        onChange({
          start: fromDate as MappedDateValue<T>,
          end: toDate as MappedDateValue<T>,
        });
      }
    }
  };

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
        />
        <DryButton
          isDisabled={isDisabled || currentState === 'Year'}
          onPress={() =>
            setCurrentState(currentState === 'Date' ? 'Month' : 'Year')
          }
          className={styles.CalendarHeaderText}
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
        <RangeDateSelector
          displayedDate={
            new CalendarDate(
              displayedDate.getFullYear(),
              displayedDate.getMonth() + 1,
              displayedDate.getDate()
            )
          }
          maxValue={maxValue ? maxValue : undefined}
          minValue={minValue ? minValue : undefined}
          isInvalid={isInvalid}
          isDisabled={isDisabled}
          value={selectedDate}
          onChange={handleSetSelectedDate}
        />
      )}
      {currentState === 'Month' && (
        <MonthSelector
          maxValue={maxValue ? maxValue.month - 1 : undefined}
          minValue={minValue ? minValue.month - 1 : undefined}
          isDisabled={isDisabled}
          changeViewState={changeViewState}
          value={selectedMonth}
          onChange={setSelectedMonth}
        />
      )}
      {currentState === 'Year' && (
        <YearSelector
          maxValue={maxValue?.year}
          minValue={minValue?.year}
          isDisabled={isDisabled}
          changeViewState={changeViewState}
          value={selectedYear}
          onChange={setSelectedYear}
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
