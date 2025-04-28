import { CalendarDate } from '@internationalized/date';
import { MappedDateValue } from '@react-types/datepicker';
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

  const [displayedDate, setDisplayedDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<{
    from: SelectedDate;
    to: SelectedDate;
  }>({
    from: {
      year: value ? value.start.year : undefined,
      month: value ? value.start.month : undefined,
      day: value ? value.start.day : undefined,
    },
    to: {
      year: value ? value.end.year : undefined,
      month: value ? value.end.month : undefined,
      day: value ? value.end.day : undefined,
    },
  });

  const handleSetSelectedDate = (updated: {
    from: SelectedDate;
    to: SelectedDate;
  }) => {
    setSelectedDate(updated);

    if (updated.from.day && updated.to.day) {
      const year = updated.from.year ?? displayedDate.getFullYear();
      const month = updated.from.month ?? displayedDate.getMonth();

      const fromDate = new CalendarDate(year, month, updated.from.day);
      const toDate = new CalendarDate(year, month, updated.to.day);

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

  const onSelectDate = () => {
    if (currentState === 'Date' && selectedDate.from.month) {
      setDisplayedDate(
        new Date(
          displayedDate.getFullYear(),
          selectedDate.from.month,
          displayedDate.getDate()
        )
      );
    } else if (currentState === 'Month' && selectedDate.from.year) {
      setDisplayedDate(
        new Date(
          selectedDate.from.year,
          displayedDate.getMonth(),
          displayedDate.getDate()
        )
      );
    }

    setCurrentState(currentState === 'Year' ? 'Month' : 'Date');
  };

  const onYearChange = (value: SelectedDate) => {
    setSelectedDate({
      from: {
        ...selectedDate.from,
        year: value.year,
      },
      to: {
        ...selectedDate.to,
        year: value.year,
      },
    });
  };

  const onMonthChange = (value: SelectedDate) => {
    setSelectedDate({
      from: {
        ...selectedDate.from,
        month: value.month,
      },
      to: {
        ...selectedDate.to,
        month: value.month,
      },
    });
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
          isInvalid={isInvalid}
          isDisabled={isDisabled}
          displayedDate={displayedDate}
          selectedDate={selectedDate}
          setSelectedDate={handleSetSelectedDate}
        />
      )}
      {currentState === 'Month' && (
        <MonthSelector
          isDisabled={isDisabled}
          onSelectDate={onSelectDate}
          displayedDate={displayedDate}
          selectedDate={selectedDate.from}
          setSelectedDate={onMonthChange}
        />
      )}
      {currentState === 'Year' && (
        <YearSelector
          isDisabled={isDisabled}
          onSelectDate={onSelectDate}
          displayedDate={displayedDate}
          selectedDate={selectedDate.from}
          setSelectedDate={onYearChange}
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
