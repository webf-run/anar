import clsx from 'clsx';
import {
  CalendarCell,
  CalendarGrid,
  DateValue,
  Group,
  Heading,
  RangeCalendar as RiaCalendarRange,
  RangeCalendarProps as RiaCalendarRangeProps,
  Text,
} from 'react-aria-components';

import { DryButton } from '../../Button/DryButton';
import styles from './CalendarRange.module.css';

export interface CalendarProps<T extends DateValue>
  extends RiaCalendarRangeProps<T> {
  errorMessage?: string;
}

export function CalendarRange<T extends DateValue>(props: CalendarProps<T>) {
  const { errorMessage, className, ...restProps } = props;

  const classes = clsx(styles.AnarCalendarRange, className);
  console.log(props.value);

  return (
    <RiaCalendarRange className={classes} {...restProps}>
      <Group className={styles.CalendarMonthChanger}>
        <DryButton
          className={styles.arrowButtons}
          slot={'previous'}
          main='◀'
        />
        <Heading />
        <DryButton className={styles.arrowButtons} slot={'next'} main='▶' />
      </Group>
      <div className={styles.divider}></div>

      <CalendarGrid className={styles.CalendarGrid}>
        {(date) => <CalendarCell date={date} />}
      </CalendarGrid>
      {errorMessage && <Text slot='errorMessage'>{errorMessage}</Text>}
    </RiaCalendarRange>
  );
}
