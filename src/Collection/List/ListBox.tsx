import clsx from 'clsx';
import { type ReactNode } from 'react';
import {
  ListBox as RiaListBox,
  ListBoxItem as RiaListBoxItem,
  type ListBoxItemProps as RiaListBoxItemProps,
  type ListBoxProps as RiaListBoxProps,
} from 'react-aria-components';

import list from './ListBox.module.css';
import item from './ListItem.module.css';

export interface ListBoxItemProps<T> extends RiaListBoxItemProps<T> {
  className?: string;
  children?: ReactNode;
}

export interface ListBoxStaticProps<T> extends RiaListBoxProps<T> {
  items: undefined;
  children: ReactNode;
}

export interface ListBoxDynamicProps<T> extends RiaListBoxProps<T> {
  items: Iterable<T>;
  children: (item: T) => ReactNode;
}

export type ListBoxProps<T> = ListBoxStaticProps<T> | ListBoxDynamicProps<T>;

/** A selectable list. */
export function ListBox<T extends object>(props: ListBoxProps<T>) {
  const { className, ...rest } = props;
  const classes = clsx('ListBox', list.root, className);

  return <RiaListBox className={classes} {...rest} />;
}

export function ListBoxItem<T>(props: ListBoxItemProps<T>) {
  const { className, value, ...rest } = props;
  const classes = clsx('ListBoxItem', item.root, className);

  return <RiaListBoxItem className={classes} value={value as any} {...rest} />;
}
