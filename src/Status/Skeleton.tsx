import type React from 'react';
import { twMerge } from 'tailwind-merge';

export interface SkeletonProps extends React.ComponentProps<'div'> {
  soft?: boolean;
}

export function Skeleton(props: SkeletonProps) {
  const { ref, soft = false, className, ...rest } = props;

  return (
    <div
      data-slot='skeleton'
      ref={ref}
      className={twMerge(
        'shrink-0 animate-pulse rounded-lg',
        soft ? 'bg-muted' : 'bg-secondary',
        className
      )}
      {...rest}
    />
  );
}
