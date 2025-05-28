import clsx from 'clsx';
import { useRef } from 'react';

import { Button } from '../Button/Button.js';
import { useGridKeyboardNavigation } from '../Util/Keyboard.js';

import styles from './Components/CalendarGrid.module.css';

export interface YearPickerProps {
  className?: string;

  startYear: number;
  endYear: number;
  value?: number;
  onChange?: (newYear: number | null) => void;

  highlightedValue?: number;

  isDisabled?: boolean;
}

export function YearPicker(props: YearPickerProps) {
  const {
    className,
    value,
    highlightedValue,
    onChange,
    isDisabled,
    endYear,
    startYear,
  } = props;

  const rootElmRef = useRef<HTMLDivElement>(null);

  const classes = clsx(
    'YearPicker',
    styles.root,
    styles.threeColumnGridLayout,
    className
  );

  const yearsToShow = new Array(endYear - startYear + 1)
    .fill(startYear)
    .map((start, index) => start + index);

  const onKeyDown = useGridKeyboardNavigation(
    rootElmRef,
    '[data-year]',
    3
  );

  const isDateDisabled = (value: number) => {
    return (
      isDisabled ||
      (value < startYear) ||
      (value > endYear)
    );
  }

  return (
    <div
      className={classes}
      ref={rootElmRef}
      role='grid'
    >
      {yearsToShow.map((year, index) => (
        <Button
          data-year={index}
          key={index}
          variant='ghost'
          label={`${year}`}
          onKeyDown={onKeyDown}
          isDisabled={isDateDisabled(year) || index === 2}
          onPress={() => onChange?.(year === value ? null : year)}
          className={clsx(
            styles.button,
            styles.bigCalendarCell,
            highlightedValue && year === highlightedValue && styles.placeHolder,
            year && year === value && styles.selected
          )}
        />
      ))}
    </div>
  );
}


// interface YearPickerGridProps {
//   years: number[];
//   value?: number;
//   onChange?: (year: number | null) => void;
// };

// function YearPickerGrid(props: YearPickerGridProps) {
//   const { years, value, onChange } = props;
//   const manager = useFocusManager();

//   const onKeyDown = useKeyHandler({
//     ArrowLeft: () => manager?.focusPrevious(-1),
//     ArrowRight: () => moveFocus(1),
//     ArrowUp: () => moveFocus(-3),
//     ArrowDown: () => moveFocus(3),
//   });

//   return years.map((year, index) => (
//     <Button
//       data-year={index}
//       key={year}
//       variant='ghost'
//       onKeyDown={manager.}
//       label={`${year}`}
//       // isDisabled={isDateDisabled(year)}
//       onPress={() => onChange?.(year === value ? null : year)}
//       className={clsx(
//         styles.button,
//         styles.bigCalendarCell,
//         // highlightedValue && year === highlightedValue && styles.placeHolder,
//         year === value && styles.selected
//       )}
//     />
//   ));
// }
