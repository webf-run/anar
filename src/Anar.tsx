import { createContext, useContext, useSyncExternalStore } from 'react';

import {
  findBreakpoint,
  getMatchedBreakpoints,
  isDesktop,
  subscribe,
  type Breakpoint,
  type BreakpointMap,
  type BreakpointQueryMap,
} from './Util/Breakpoint';
import { setGlobalContext, type GlobalContext } from './Util/GlobalContext';

export type ColorScheme = 'light' | 'dark';

export type AnarContext = {
  colorScheme: ColorScheme;
  breakpoint: Breakpoint;
  isDesktop: boolean;
};

export type AnarProviderProps = {
  colorScheme: ColorScheme;
  getRootElement?: () => HTMLElement;
  children: React.ReactNode;
};

const Context = createContext<AnarContext>({
  colorScheme: 'dark',
  breakpoint: 'BS',
  isDesktop: false,
});

/**
 *  A provider component that for the library.
 */
export function Anar(props: AnarProviderProps) {
  const { children, colorScheme, getRootElement } = props;
  const breakpoint = useSyncExternalStore(subscribe, findBreakpoint);

  const data: AnarContext = {
    colorScheme,
    breakpoint,
    isDesktop: isDesktop(breakpoint),
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
}

export function useBreakpoint(): Breakpoint {
  return useContext(Context).breakpoint;
}

export function useMatchedBreakpoints(): Breakpoint[] {
  const { breakpoint } = useContext(Context);

  return getMatchedBreakpoints(breakpoint);
}

export function useDesktop(): boolean {
  const { breakpoint } = useContext(Context);

  return isDesktop(breakpoint);
}

/**
 * Initializes the library. The provider cannot be used
 * without calling this function first.
 *
 */
export function initAnar() {
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
    BS: window.matchMedia(`(min-width: ${breakpoints.BS}px)`),
    XS: window.matchMedia(`(min-width: ${breakpoints.XS}px)`),
    SM: window.matchMedia(`(min-width: ${breakpoints.SM}px)`),
    MD: window.matchMedia(`(min-width: ${breakpoints.MD}px)`),
    LG: window.matchMedia(`(min-width: ${breakpoints.LG}px)`),
    XL: window.matchMedia(`(min-width: ${breakpoints.XL}px)`),
    XXL: window.matchMedia(`(min-width: ${breakpoints.XXL}px)`),
  };

  const globalContext: GlobalContext = {
    breakpoints,
    queries,
  };

  setGlobalContext(globalContext);
}
