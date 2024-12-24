export type Breakpoint = 'BS' | 'XS' | 'SM' | 'MD' | 'LG' | 'XL' | 'XXL';

export type BreakpointMap = {
  // The number in pixels for each breakpoint.
  [key in Breakpoint]: number;
};

export type BreakpointQueryMap = {
  // The number in pixels for each breakpoint.
  [key in Breakpoint]: MediaQueryList;
};

const breakpoints: Breakpoint[] = ['XXL', 'XL', 'LG', 'MD', 'SM', 'XS', 'BS'];

export function isDesktop(matched: Breakpoint) {
  return ['LG', 'XL', 'XXL'].includes(matched);
}

export function getMatchedBreakpoints(breakpoint: Breakpoint): Breakpoint[] {
  return breakpoints.slice(breakpoints.indexOf(breakpoint));
}

export function initQueries(): BreakpointQueryMap | null {
  // If we are running in a server-side context, we cannot
  // create media queries.
  if (!globalThis.matchMedia) {
    return null;
  }

  const breakpoints: BreakpointMap = {
    BS: 0,
    XS: 480,
    SM: 600,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
  };

  const queries: BreakpointQueryMap = {
    BS: globalThis.matchMedia(`(min-width: ${breakpoints.BS}px)`),
    XS: globalThis.matchMedia(`(min-width: ${breakpoints.XS}px)`),
    SM: globalThis.matchMedia(`(min-width: ${breakpoints.SM}px)`),
    MD: globalThis.matchMedia(`(min-width: ${breakpoints.MD}px)`),
    LG: globalThis.matchMedia(`(min-width: ${breakpoints.LG}px)`),
    XL: globalThis.matchMedia(`(min-width: ${breakpoints.XL}px)`),
    XXL: globalThis.matchMedia(`(min-width: ${breakpoints.XXL}px)`),
  };

  return queries;
}

export function getQueries(): BreakpointQueryMap | null {
  const KEY = Symbol.for('@webf/anar/breakpoint');

  // Avoid creating the queries more than once.
  const queries: BreakpointQueryMap = (globalThis as any)[KEY] ?? initQueries();

  // Store the queries in the global object.
  (globalThis as any)[KEY] = queries;

  return queries ?? null;
}

export function getBreakpoint(): Breakpoint {
  const queries = getQueries();

  if (!queries) {
    return 'BS';
  }

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
  const queries = getQueries();

  if (queries === null) {
    return () => {};
  }

  const controller = new AbortController();
  const opts = {
    signal: controller.signal,
  };

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
