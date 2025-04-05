import clsx from 'clsx';
import type { ReactElement, ReactNode } from 'react';
import {
  ListBoxSection as RiaListBoxSection,
  type ListBoxSectionProps as RiaListBoxSectionProps,
} from 'react-aria-components';

export interface ListBoxSectionStaticProps<T>
  extends RiaListBoxSectionProps<T> {
  items: undefined;
  children: ReactNode;
}

export interface ListBoxSectionDynamicProps<T>
  extends RiaListBoxSectionProps<T> {
  items: Iterable<T>;
  children: (item: T) => ReactElement;
}

export type ListBoxSectionProps<T> =
  | ListBoxSectionStaticProps<T>
  | ListBoxSectionDynamicProps<T>;

export function ListBoxSection<T>(props: ListBoxSectionProps<T>) {
  const { className, value, ...rest } = props;

  const classes = clsx('ListBoxSection', className);

  return (
    <RiaListBoxSection className={classes} value={value as any} {...rest} />
  );
}
