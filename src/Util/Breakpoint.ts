import { getGlobalContext } from './GlobalContext';

export type Breakpoint = 'BS' | 'XS' | 'SM' | 'MD' | 'LG' | 'XL' | 'XXL';

const breakpoints: Breakpoint[] = ['XXL', 'XL', 'LG', 'MD', 'SM', 'XS', 'BS'];

export type BreakpointMap = {
  // The number in pixels for each breakpoint.
  [key in Breakpoint]: number;
};

export type BreakpointQueryMap = {
  // The number in pixels for each breakpoint.
  [key in Breakpoint]: MediaQueryList;
};

export function isDesktop(matched: Breakpoint) {
  return ['LG', 'XL', 'XXL'].includes(matched);
}

export function getMatchedBreakpoints(breakpoint: Breakpoint): Breakpoint[] {
  return breakpoints.slice(breakpoints.indexOf(breakpoint));
}

export function findBreakpoint(): Breakpoint {
  const { queries } = getGlobalContext();

  if (queries.XXL.matches) {
    return 'XXL';
  } else if (queries.XL.matches) {
    return 'XL';
  } else if (queries.LG.matches) {
    return 'LG';
  } else if (queries.MD.matches) {
    return 'MD';
  } else if (queries.SM.matches) {
    return 'SM';
  } else if (queries.XS.matches) {
    return 'XS';
  } else {
    return 'BS';
  }
}

export function subscribe(callback: () => void) {
  const { queries } = getGlobalContext();

  const controller = new AbortController();
  const opts = { signal: controller.signal };

  queries.XXL.addEventListener('change', callback, opts);
  queries.XL.addEventListener('change', callback, opts);
  queries.LG.addEventListener('change', callback, opts);
  queries.MD.addEventListener('change', callback, opts);
  queries.SM.addEventListener('change', callback, opts);
  queries.XS.addEventListener('change', callback, opts);

  return () => {
    controller.abort();
  };
}
