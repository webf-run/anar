import {
  CalendarDate,
  endOfMonth,
  startOfMonth,
} from '@internationalized/date';
import { MappedDateValue } from '@react-types/datepicker';
import { RangeValue } from '@react-types/shared';
import clsx from 'clsx';
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
import { getCalendarHeaderText } from '../Calendar/Calendar';
import { RangeDateSelector } from '../Components/DateSelectorRange';
import { MonthGrid } from '../Components/MonthSelector';
import { YearSelector } from '../Components/YearSelector';
import styles from './CalendarRange.module.css';

export interface CalendarProps<T extends DateValue>
  extends RiaCalendarRangeProps<T> {
  errorMessage?: string;
}

export type SelectedRangeDate = {
  currentView: 'Date' | 'Month' | 'Year';
  selectedDate?: RangeValue<DateValue>;
  selectedMonth?: number;
  selectedYear?: number;
  displayedDate: DateValue;
};

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

  const [calendarState, setCalendarState] = useState<SelectedRangeDate>(() => {
    const minDate = minValue ? minValue : undefined;
    const maxDate = maxValue ? maxValue : undefined;

    const initialDisplayValue = minDate
      ? minDate
      : maxDate &&
          new CalendarDate(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate()
          ) > maxDate
        ? maxDate
        : new CalendarDate(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate()
          );
    return {
      currentView: 'Date',
      selectedDate: value ? value : undefined,
      selectedStartMonth: value ? value.start.month : undefined,
      selectedEndMonth: value ? value.start.month : undefined,
      selectedYear: value ? value.end.year : undefined,
      displayedDate: initialDisplayValue,
    };
  });

  const onMonthAndYearChange = (val?: number) => {
    if (calendarState.currentView === 'Year') {
      setCalendarState((prev) => ({
        ...prev,
        selectedYear: val,
      }));
    } else {
      setCalendarState((prev) => ({
        ...prev,
        selectedMonth: val,
      }));
    }
    if (val !== undefined) {
      setCalendarState((prev) => ({
        ...prev,
        currentView: calendarState.currentView === 'Year' ? 'Month' : 'Date',
      }));
      if (calendarState.currentView === 'Month') {
        setCalendarState((prev) => ({
          ...prev,
          displayedDate: calendarState.displayedDate.set({ month: val }),
        }));
      } else if (calendarState.currentView === 'Year') {
        setCalendarState((prev) => ({
          ...prev,
          displayedDate: calendarState.displayedDate.set({ year: val }),
        }));
      }
    }
  };

  function handleSetSelectedDate(date: RangeValue<DateValue>) {
    setCalendarState((prev) => ({
      ...prev,
      selectedDate: date,
    }));

    if (date.start.day && date.end.day) {
      const year = date.start.year ?? calendarState.displayedDate.year;
      const month = date.start.month ?? calendarState.displayedDate.month;

      const fromDate = new CalendarDate(year, month, date.start.day);
      const toDate = new CalendarDate(year, month, date.end.day);

      if (onChange) {
        onChange({
          start: fromDate as MappedDateValue<T>,
          end: toDate as MappedDateValue<T>,
        });
      }
    }
  }

  function isPreviousDisabled(date: DateValue) {
    const startMonth = startOfMonth(date);

    if (minValue && startMonth <= minValue) {
      return true;
    }
    return false;
  }

  function isNextDisabled(date: DateValue) {
    const currentDate = endOfMonth(date);

    const endMonth = endOfMonth(currentDate);
    if (maxValue && endMonth >= maxValue) {
      return true;
    }
    return false;
  }

  const onPrevious = () => {
    if (calendarState.currentView === 'Date') {
      setCalendarState((prev) => ({
        ...prev,
        displayedDate: calendarState.displayedDate.subtract({ months: 1 }),
      }));
    } else if (calendarState.currentView === 'Month') {
      setCalendarState((prev) => ({
        ...prev,
        displayedDate: calendarState.displayedDate.subtract({ years: 1 }),
      }));
    } else {
      setCalendarState((prev) => ({
        ...prev,
        displayedDate: calendarState.displayedDate.subtract({ years: 10 }),
      }));
    }
  };

  const onNext = () => {
    if (calendarState.currentView === 'Date') {
      setCalendarState((prev) => ({
        ...prev,
        displayedDate: calendarState.displayedDate.add({ months: 1 }),
      }));
    } else if (calendarState.currentView === 'Month') {
      setCalendarState((prev) => ({
        ...prev,
        displayedDate: calendarState.displayedDate.add({ years: 1 }),
      }));
    } else {
      setCalendarState((prev) => ({
        ...prev,
        displayedDate: calendarState.displayedDate.add({ years: 10 }),
      }));
    }
  };

  const classes = clsx(
    'AnarCalendar',
    styles.root,
    isDisabled && styles.disableAll,
    className
  );

  console.log(value);

  return (
    <Flex className={classes}>
      <Flex className={styles.CalendarHeader}>
        <ActionButton
          icon={ChevronLeft}
          isDisabled={
            isDisabled || isPreviousDisabled(calendarState.displayedDate)
          }
          className={clsx(styles.arrowButtons, styles.button)}
          slot={'previous'}
          onPress={onPrevious}
          onKeyDown={(e) => e.code === 'Enter' && onPrevious}
        />
        <DryButton
          isDisabled={isDisabled || calendarState.currentView === 'Year'}
          onKeyDown={(e) =>
            e.code === 'Enter' &&
            setCalendarState({
              ...calendarState,
              currentView:
                calendarState.currentView === 'Date' ? 'Month' : 'Year',
            })
          }
          onPress={() =>
            setCalendarState((prev) => ({
              ...prev,
              currentView:
                calendarState.currentView === 'Date' ? 'Month' : 'Year',
            }))
          }
          className={styles.CalendarHeaderText}
          children={getCalendarHeaderText(
            calendarState.currentView,
            calendarState.displayedDate
          )}
        />
        <ActionButton
          isDisabled={isDisabled || isNextDisabled(calendarState.displayedDate)}
          className={clsx(styles.arrowButtons, styles.button)}
          slot={'next'}
          onPress={onNext}
          onKeyDown={(e) => e.code === 'Enter' && onNext}
          icon={ChevronRight}
        />
      </Flex>
      <div className={styles.divider}></div>
      {calendarState.currentView === 'Date' && (
        <RangeDateSelector
          displayedDate={calendarState.displayedDate}
          maxValue={maxValue ? maxValue : undefined}
          minValue={minValue ? minValue : undefined}
          isInvalid={isInvalid}
          isDisabled={isDisabled}
          value={calendarState.selectedDate}
          onChange={handleSetSelectedDate}
        />
      )}
      {calendarState.currentView === 'Month' && (
        <MonthGrid
          maxValue={maxValue ? maxValue.month - 1 : undefined}
          minValue={minValue ? minValue.month - 1 : undefined}
          isDisabled={isDisabled}
          value={calendarState.selectedMonth}
          onChange={onMonthAndYearChange}
        />
      )}
      {calendarState.currentView === 'Year' && (
        <YearSelector
          maxValue={maxValue?.year}
          minValue={minValue?.year}
          isDisabled={isDisabled}
          value={calendarState.selectedYear}
          onChange={onMonthAndYearChange}
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
