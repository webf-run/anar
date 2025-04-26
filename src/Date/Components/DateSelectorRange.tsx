import clsx from 'clsx';
import {
  addDays,
  formatDate,
  getWeeksInMonth,
  isSameMonth,
  subDays,
} from 'date-fns';
import { CalendarGridProps } from 'react-aria-components';

import { DryButton } from '../../Button/DryButton';
import { Flex } from '../../Layout/Flex';
import styles from './CalendarGrid.module.css';

export interface RangeDateSelectorProps extends CalendarGridProps {
  className?: string;

  selectedDate: { to?: number; from?: number };
  setSelectedDate: (newDate: { to?: number; from?: number }) => void;

  displayedDate: Date;
  isDisabled?: boolean;
  isInvalid?: boolean;

  onSelectDate: () => void;
}

export function RangeDateSelector(props: RangeDateSelectorProps) {
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

  const onSelect = (value?: number) => {
    if (!isDisabled) {
      const valueToSet =
        (selectedDate.from && selectedDate.to) || !selectedDate.from
          ? { from: value, to: undefined }
          : {
              from: selectedDate.from,
              to: value,
            };
      // !selectedDate || value.getDate() !== selectedDate ? value : undefined;

      setSelectedDate(valueToSet);

      // if (valueToSet) {
      //   onSelectDate();
      // }
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
            styles.button,
            selectedDate.from &&
              selectedDate.to &&
              isSameMonth(displayedDate, value) &&
              value.getDate() >= selectedDate.from &&
              value.getDate() <= selectedDate.to &&
              styles.selected,
            (!isSameMonth(displayedDate, value) || isDisabled) &&
              styles.disabled
          )}
          onPress={() => onSelect(value.getDate())}
        >
          {formatDate(value, 'dd')}
        </DryButton>
      ))}
    </Flex>
  );
}
