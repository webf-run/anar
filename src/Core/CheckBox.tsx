import clsx from 'clsx';
import { Square, SquareCheck, SquareMinus } from 'lucide-react';
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
} from 'react-aria-components';

import { CheckBoxBaseProps, getProps } from './CheckBoxProps';

export type CheckboxProps = CheckBoxBaseProps & AriaCheckboxProps;

export const CheckBox = function CheckBox(props: CheckboxProps) {
  const { label, className, ...checkboxProps } = getProps(props);

  console.log(props);

  return (
    <AriaCheckbox
      className={clsx('anar-checkbox', className)}
      {...checkboxProps}
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
};
