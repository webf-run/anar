import clsx from 'clsx';
import {
  addDays,
  formatDate,
  getWeeksInMonth,
  isSameMonth,
  subDays,
} from 'date-fns';
import { CalendarGridProps } from 'react-aria-components';

import { DryButton } from '../../../Button/DryButton';
import { Flex } from '../../../Layout/Flex';
import styles from './CalendarGrid.module.css';

export interface DateSelectorProps extends CalendarGridProps {
  className?: string;

  selectedDate?: number;
  setSelectedDate: (newDate?: number) => void;

  displayedDate: Date;
  isDisabled?: boolean;
  isInvalid?: boolean;

  onSelectDate: () => void;
}

export function DateSelector(props: DateSelectorProps) {
  const {
    className,
    displayedDate,
    selectedDate,
    setSelectedDate,
    onSelectDate,
    isInvalid = false,
    isDisabled = false,
  } = props;

  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const numberOfWeeks = getWeeksInMonth(displayedDate, { weekStartsOn: 1 });
  const firstOfMonth = new Date(
    displayedDate.getFullYear(),
    displayedDate.getMonth(),
    1
  );
  const firstDayOfTheMonth = firstOfMonth.getDay();
  const displayStartDate = subDays(
    firstOfMonth,
    firstDayOfTheMonth - 1 > 0 ? firstDayOfTheMonth - 1 : 6
  );

  const visibleDates: Date[] = [];
  for (let i = 0; i < 7 * numberOfWeeks; i++) {
    visibleDates.push(addDays(displayStartDate, i));
  }

  const onSelect = (value: Date) => {
    if (!isDisabled) {
      const valueToSet =
        !selectedDate || value.getDate() !== selectedDate ? value : undefined;
      setSelectedDate(valueToSet?.getDate());

      if (valueToSet) {
        onSelectDate();
      }
    }
  };

  const classes = clsx(
    'MonthGrid',
    styles.root,
    styles.sevenColumnGridLayout,
    className
  );

  return (
    <Flex className={classes}>
      {days.map((val, index) => (
        <div key={index} className={styles.CalendarGridCell}>
          {val}
        </div>
      ))}
      {visibleDates.map((value, index) => (
        <DryButton
          key={index}
          isDisabled={!isSameMonth(displayedDate, value)}
          className={clsx(
            styles.CalendarGridCell,
            selectedDate && value.getDate() === selectedDate && styles.selected,
            (!isSameMonth(displayedDate, value) || isDisabled) &&
              styles.disabled
          )}
          onPress={() => onSelect(value)}
        >
          {formatDate(value, 'dd')}
        </DryButton>
      ))}
    </Flex>
  );
}
