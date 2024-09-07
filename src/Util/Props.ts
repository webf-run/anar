import type { Breakpoint } from './Breakpoint';

export type ResponsiveProps<T> = T &
  Partial<{
    [key in Breakpoint]: T;
  }>;

export function getResponsiveProps<T>(
  prop: ResponsiveProps<T>,
  breakpoints: Breakpoint[]
): T {
  let matched: T | undefined;

  for (let i = 0; i < breakpoints.length; i++) {
    const breakpoint = breakpoints[i];

    if (prop[breakpoint] !== undefined) {
      matched = prop[breakpoint];
    }
  }

  const { BS, XS, SM, MD, LG, XXL, ...rest } = prop;

  return {
    ...rest,
    ...matched,
  } as T;
}
