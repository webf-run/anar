import { type ReactNode, createContext, useEffect } from 'react';

export type ColorScheme = 'light' | 'dark';

export interface AnarContext {
  colorScheme: ColorScheme;
}

export interface AnarProviderProps {
  colorScheme: ColorScheme;
  children: ReactNode;
}

const Context = createContext<AnarContext>({
  colorScheme: 'dark',
});

/**
 *  A provider component that for the library.
 */
export function Anar(props: AnarProviderProps) {
  const { children, colorScheme } = props;

  useEffect(() => {
    const rootElement = document.documentElement;

    rootElement.classList.add(colorScheme);

    return () => {
      rootElement.classList.remove(colorScheme);
    };
  }, [colorScheme]);

  const data: AnarContext = {
    colorScheme,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
}
