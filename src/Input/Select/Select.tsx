import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  SelectValue,
  SelectProps as AriaSelectProps,
  Select as RiaSelect,
  ListBoxItemProps,
} from 'react-aria-components';
import { Label } from '../../Text/Label';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, 'children'> {
  className?: string;
  label?: string;
  items?: Iterable<T>;

  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function Select<T extends object>(props: SelectProps<T>) {
  const { label, className, items, children } = props;

  const classes = clsx('anar-select', className);

  return (
    <RiaSelect className={classes}>
      <Label>{label}</Label>
      <Button className='select-button'>
        <SelectValue />
        <ChevronDown size={20} strokeWidth={3} />
      </Button>
      <Popover className='items-popover'>
        <ListBox className={'list'} items={items}>
          {children}
        </ListBox>
      </Popover>
    </RiaSelect>
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={
        // clsx(
        ({ isFocused, isSelected }) =>
          `my-item ${isFocused ? 'focused' : ''} ${isSelected ? 'selected' : ''}`
        // 'listItem'
        // )
      }
    />
  );
}
