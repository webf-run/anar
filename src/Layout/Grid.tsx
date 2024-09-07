import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';

import { useMatchedBreakpoints } from '../Anar';
import { getResponsiveProps, type ResponsiveProps } from '../Util/Props';

import style from './Grid.module.css';
import type { AnarStyleProps } from '../Util/Style';

export type GridDefinition = {
  areas?: string;
  columns?: string[];
  rows?: string[];
  gap?: string;
};

export interface GridResponsiveProps
  extends ResponsiveProps<GridDefinition & AnarStyleProps> {}

export interface GridProps extends GridResponsiveProps {
  className?: string;
  children?: ReactNode;

  // Move to generic style solution
  height?: string;
}

export function Grid(props: GridProps) {
  const { className, children, height, ...responsive } = props;

  const breakpoints = useMatchedBreakpoints();
  const rest = getResponsiveProps(responsive, breakpoints);

  const styles: CSSProperties = {
    gridTemplateAreas: rest.areas,
    gridTemplateColumns: rest.columns?.join(' '),
    gridTemplateRows: rest.rows?.join(' '),
    gap: rest.gap,

    height,
  };

  return (
    <div className={clsx('Grid', style.root, className)} style={styles}>
      {children}
    </div>
  );
}
