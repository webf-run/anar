import clsx from 'clsx';
import { Check, Minus } from 'lucide-react';
import {
  Checkbox as RiaCheckbox,
  type CheckboxProps as RiaCheckboxProps,
} from 'react-aria-components';

import { TShirtSize } from '../../Util/Style.js';

export type CheckboxVariants = {
  size?: TShirtSize;
};

export interface CheckboxProps extends CheckboxVariants, RiaCheckboxProps {
  className?: string;
  label: string;
}

export function Checkbox(props: CheckboxProps) {
  const { className, size = 'md', label, ...riaProps } = props;

  const classes = clsx('anar-checkbox', className);

  return (
    <RiaCheckbox
      className={classes}
      {...riaProps}
      children={({ isIndeterminate, isSelected }) => (
        <>
          <div className='icon'>
            {isSelected ? (
              <Check size={20} strokeWidth={3} />
            ) : isIndeterminate ? (
              <Minus size={20} strokeWidth={3} />
            ) : null}
          </div>
          <div className='text'>{label}</div>
        </>
      )}
    />
  );
}
