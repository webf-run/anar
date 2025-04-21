import clsx from 'clsx';
import { addYears, format, subYears } from 'date-fns';

import { DryButton } from '../../../Button/DryButton';
import { Flex } from '../../../Layout/Flex';
import styles from './CalendarGrid.module.css';

export interface YearSelectorProps {
  className?: string;

  displayedDate: Date;

  selectedYear?: number;
  setSelectedYear: (newYear?: number) => void;

  onSelectDate: () => void;

  isDisabled?: boolean;

  startYear?: Date;
}

export function YearSelector(props: YearSelectorProps) {
  const {
    className,
    selectedYear,
    setSelectedYear,
    displayedDate,
    onSelectDate,
    isDisabled,
    startYear,
  } = props;

  const rangeStartYear = startYear
    ? startYear
    : subYears(displayedDate, displayedDate.getFullYear() % 10);

  const yearsToShow: Date[] = [];
  for (let i = 0; i < 10; i++) {
    yearsToShow.push(addYears(rangeStartYear, i));
  }

  const classes = clsx(
    'YearGrid',
    styles.root,
    styles.threeColumnGridLayout,
    className
  );

  const onSelect = (value: Date) => {
    // const valueToSet =
    //   !selectedYear || value.getFullYear() !== selectedYear ? value : undefined;
    //   setSelectedYear(valueToSet?.getFullYear());
    setSelectedYear(value.getFullYear());

    // if (valueToSet) {
    //   onSelectDate();
    // }
    onSelectDate();
  };

  return (
    <Flex className={classes}>
      {yearsToShow.map((value, index) => (
        <DryButton
          isDisabled
          key={index}
          className={clsx(
            styles.CalendarGridCell,
            selectedYear &&
              value.getFullYear() === selectedYear &&
              styles.selected
          )}
          onPress={() => onSelect(value)}
        >
          {value.getFullYear()}
        </DryButton>
      ))}
    </Flex>
  );
}
