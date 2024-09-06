import clsx from 'clsx';
import type { ReactNode } from 'react';

export type GridProps = {
  className?: string;
  children: ReactNode;
};

export function Grid(props: GridProps) {
  const { className, children } = props;

  return <div className={clsx('Grid', className)}>{children}</div>;
}
