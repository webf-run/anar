import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import {
  SelectProps as AriaSelectProps,
  FieldError,
  Group,
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  Popover,
  Select as RiaSelect,
  SelectValue,
  ValidationResult,
} from 'react-aria-components';

import { DryButton } from '../../Button/DryButton';
import { Label } from '../../Text/Label';

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, 'children'> {
  className?: string;
  label?: string;
  items?: Iterable<T>;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function Select<T extends object>(props: SelectProps<T>) {
  const { label, className, errorMessage, items, children, ...rest } = props;

  const classes = clsx('AnarSelect', className);

  console.log(rest.isDisabled);

  return (
    <RiaSelect className={classes} {...rest}>
      <Label>{label}</Label>
      <DryButton
        className='AnarSelectButton'
        main={<SelectValue />}
        tail={<ChevronDown size={20} strokeWidth={3} />}
      />
      <FieldError>{errorMessage}</FieldError>
      <Popover className='AnarSelectDropdown'>
        <ListBox className={'AnarSelectDropdownBox'} items={items}>
          {children}
        </ListBox>
      </Popover>
    </RiaSelect>
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return <ListBoxItem {...props} className={clsx('AnarSelectDropdownItem')} />;
}
