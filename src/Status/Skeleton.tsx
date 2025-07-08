import type React from 'react';
import { twMerge } from 'tailwind-merge';

export interface SkeletonProps extends React.ComponentProps<'div'> {
  soft?: boolean;
}

export function Skeleton({
  ref,
  soft = false,
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot='skeleton'
      ref={ref}
      className={twMerge(
        'shrink-0 animate-pulse rounded-lg',
        soft ? 'bg-muted' : 'bg-secondary',
        className
      )}
      {...props}
    />
  );
}
