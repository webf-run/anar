import { createContext, type CSSProperties } from 'react';

export type ColorScheme = 'light' | 'dark';

export type AnarContext = {
  colorScheme: ColorScheme;
};

export type AnarProviderProps = {
  colorScheme: ColorScheme;
  getRootElement?: () => HTMLElement;
  children: React.ReactNode;
};

const context = createContext({
  colorScheme: 'dark',
});

/**
 *  A provider component that for the library.
 */
export function Anar(props: AnarProviderProps) {
  const { children, colorScheme, getRootElement } = props;

  const styles: CSSProperties = {
    background: `var(--background-color)`,
  };

  return (
    <context.Provider value={{ colorScheme }}>
      <div style={styles} data-anar-scheme={colorScheme}>
        {children}
      </div>
    </context.Provider>
  );
}
