import { getGlobalContext } from './GlobalContext';

export type Breakpoint = 'BS' | 'XS' | 'SM' | 'MD' | 'LG' | 'XL' | 'XXL';

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


export function findBreakpoint(set: (breakpoint: Breakpoint) => void) {
  const { queries } = getGlobalContext();

  if (queries.XXL.matches) {
    set('XXL');
  } else if (queries.XL.matches) {
    set('XL');
  } else if (queries.LG.matches) {
    set('LG');
  } else if (queries.MD.matches) {
    set('MD');
  } else if (queries.SM.matches) {
    set('SM');
  } else if (queries.XS.matches) {
    set('XS');
  } else {
    set('BS');
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
