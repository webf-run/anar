import clsx from 'clsx';
import {
  CalendarCell,
  CalendarGrid,
  DateValue,
  Group,
  Heading,
  Calendar as RiaCalendar,
  CalendarProps as RiaCalendarProps,
  Text,
} from 'react-aria-components';

import { DryButton } from '../../Button/DryButton';
import styles from './Calendar.module.css';

export interface CalendarProps<T extends DateValue>
  extends RiaCalendarProps<T> {
  errorMessage?: string;
}

export function Calendar<T extends DateValue>(props: CalendarProps<T>) {
  const { errorMessage, className, ...restProps } = props;

  const classes = clsx(styles.AnarCalendar, className);

  return (
    <RiaCalendar className={classes} {...restProps}>
      <Group className={styles.CalendarMonthLabel}>
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
    </RiaCalendar>
  );
}
