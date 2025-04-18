import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  Popover,
  Select as RiaSelect,
  SelectProps as RiaSelectProps,
  SelectValue,
} from 'react-aria-components';

import { DryButton } from '../../Button/DryButton.js';
import { FieldError } from '../../Text/FieldError.js';
import { Label } from '../../Text/Label.js';
import style from './Select.module.css';

export interface SelectProps<T extends object>
  extends Omit<RiaSelectProps<T>, 'children'> {
  className?: string;
  label?: ReactNode;
  items?: Iterable<T>;
  errorMessage?: ReactNode;
  children: ReactNode | ((item: T) => ReactNode);
}

export function Select<T extends object>(props: SelectProps<T>) {
  const { label, className, errorMessage, items, children, ...rest } = props;

  const classes = clsx('AnarSelect', style.root, className);

  return (
    <RiaSelect className={classes} {...rest}>
      {label && <Label>{label}</Label>}
      <DryButton className={style.trigger}>
        <SelectValue />
        <ChevronDown size={20} strokeWidth={2} />
      </DryButton>
      <FieldError>{errorMessage}</FieldError>
      <Popover className={style.popover}>
        <ListBox className={style.list} items={items}>
          {children}
        </ListBox>
      </Popover>
    </RiaSelect>
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return <ListBoxItem {...props} className={clsx('AnarSelectDropdownItem')} />;
}
