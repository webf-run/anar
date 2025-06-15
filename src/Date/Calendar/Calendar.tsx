import {
  CalendarDate,
  endOfMonth,
  startOfMonth,
} from '@internationalized/date';
import { MappedDateValue } from '@react-types/datepicker';
import clsx from 'clsx';
import { format } from 'date-fns';
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
import { MonthGrid } from '../Components/MonthPicker';
import { YearPicker } from '../YearPicker';
import styles from './Calendar.module.css';

export interface CalendarProps<T extends DateValue>
  extends RiaCalendarProps<T> {
  highlightedValue?: DateValue;
}

export type SelectedDate = {
  currentView: 'Date' | 'Month' | 'Year';
  selectedDate?: DateValue;
  selectedMonth?: number;
  selectedYear?: number;
  displayedDate: DateValue;
};

export function getCalendarHeaderText(
  currentState: 'Date' | 'Month' | 'Year',
  value: DateValue
): string {
  const date = new Date(value.year, value.month - 1, value.day);

  if (currentState === 'Date') {
    return `${format(date, 'MMMM yyy')}`;
  } else if (currentState === 'Month') {
    return `${format(date, 'yyy')}`;
  } else {
    const startYear = value.subtract({ years: value.year % 10 });
    const endYear = startYear.subtract({ years: 9 });

    const start = new Date(startYear.year, startYear.month, startYear.day);
    const end = new Date(endYear.year, endYear.month, endYear.day);

    return `${format(start, 'yyy')} - ${format(end, 'yyy')}`;
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
    highlightedValue,
    ...restProps
  } = props;

  const classes = clsx(
    'AnarCalendar',
    styles.root,
    isDisabled && styles.disableAll,
    className
  );

  const [calendarState, setCalendarState] = useState<SelectedDate>(() => {
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
      selectedMonth: value ? value.month : undefined,
      selectedYear: value ? value.year : undefined,
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

  function handleSetSelectedDate(date: DateValue) {
    setCalendarState((prev) => ({
      ...prev,
      selectedDate: new CalendarDate(
        calendarState.selectedYear ?? date.year,
        calendarState.selectedMonth ?? date.month,
        date.day
      ),
    }));

    if (date.day !== undefined) {
      const year = date.year ?? value?.year;
      const month = date.month ?? value?.month;
      setCalendarState((prev) => ({
        ...prev,
        selectedDate: new CalendarDate(date.year, date.month, date.day),
      }));

      if (onChange) {
        const calendarDate = new CalendarDate(year, month, date.day);
        onChange(calendarDate as MappedDateValue<T>);
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
            setCalendarState({
              ...calendarState,
              currentView:
                calendarState.currentView === 'Date' ? 'Month' : 'Year',
            })
          }
          className={clsx(styles.CalendarHeaderText, styles.button)}
          children={getCalendarHeaderText(
            calendarState.currentView,
            calendarState.displayedDate
          )}
        />
        <ActionButton
          icon={ChevronRight}
          isDisabled={isDisabled || isNextDisabled(calendarState.displayedDate)}
          className={clsx(styles.arrowButtons, styles.button)}
          slot={'next'}
          onPress={onNext}
          onKeyDown={(e) => e.code === 'Enter' && onNext}
        />
      </Flex>
      <div className={styles.divider}></div>
      {calendarState.currentView === 'Date' && (
        <DateSelector
          displayedDate={calendarState.displayedDate}
          maxValue={maxValue ? maxValue : undefined}
          minValue={minValue ? minValue : undefined}
          isDisabled={isDisabled}
          value={calendarState.selectedDate}
          onChange={handleSetSelectedDate}
          highlightedValue={highlightedValue}
        />
      )}
      {calendarState.currentView === 'Month' && (
        <MonthGrid
          value={
            calendarState.selectedMonth
              ? calendarState.selectedMonth
              : undefined
          }
          onChange={onMonthAndYearChange}
          maxValue={maxValue ? maxValue.month - 1 : undefined}
          minValue={minValue ? minValue.month - 1 : undefined}
          isDisabled={isDisabled}
          highlightedValue={highlightedValue?.month}
        />
      )}
      {calendarState.currentView === 'Year' && (
        <YearPicker
          value={calendarState.selectedYear}
          onChange={onMonthAndYearChange}
          maxValue={maxValue?.year}
          minValue={minValue?.year}
          isDisabled={isDisabled}
          highlightedValue={highlightedValue?.year}
        />
      )}
    </Flex>
  );
}
