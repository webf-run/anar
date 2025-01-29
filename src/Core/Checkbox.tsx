import clsx from 'clsx';
import { Square, SquareCheck, SquareMinus } from 'lucide-react';
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
} from 'react-aria-components';


import { TShirtSize } from '../Util/Style.js';

export type CheckboxVariants = {
  size?: TShirtSize;
  radius?: 'none' | TShirtSize;
};

export type CheckboxBaseProps = CheckboxVariants & {
  className?: string;
  label: string;
};

export type CheckboxProps = CheckboxBaseProps & AriaCheckboxProps;

export function Checkbox(props: CheckboxProps) {
  const {
    className,
    size = 'md',
    radius,
    label,
    ...racProps
  } = props;

  const classes = clsx('anar-checkbox', className);

  return (
    <AriaCheckbox
      className={classes}
      {...racProps}
    >
      {({ isIndeterminate, isSelected }) => (
        <>
          <div className='checkbox-icon'>
            {isSelected ? (
              <SquareCheck />
            ) : isIndeterminate ? (
              <SquareMinus />
            ) : (
              <Square />
            )}
          </div>
          <div className='checkbox-text'>{label}</div>
        </>
      )}
    </AriaCheckbox>
  );
}
