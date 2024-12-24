import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from 'react';

import {
  getBreakpoint,
  getMatchedBreakpoints,
  isDesktop,
  subscribe,
  type Breakpoint,
} from './Util/Breakpoint';

import './Anar.css';

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
  const breakpoint = useSyncExternalStore(subscribe, getBreakpoint, getBreakpoint);

  useEffect(() => {
    if (getRootElement) {
      const rootElement = getRootElement();
      rootElement.dataset.anarScheme = colorScheme;

      return () => {
        delete rootElement.dataset.anarScheme;
      };
    }
  }, [getRootElement]);


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
