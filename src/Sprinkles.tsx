import { createContext, type CSSProperties } from 'react';

export type ColorScheme = 'light' | 'dark';

export type SprinkleContext = {
  colorScheme: ColorScheme;
};

export type SprinkleProviderProps = {
  colorScheme: ColorScheme;
  children: React.ReactNode;
};

const context = createContext({
  colorScheme: 'dark',
});

/**
 *  A provider component that for the library.
 */
export function Sprinkles(props: SprinkleProviderProps) {
  const { children, colorScheme } = props;

  const styles: CSSProperties = {
    background: `var(--background-color)`,
  };

  return (
    <context.Provider value={{ colorScheme }}>
      <div style={styles} data-sprinkles-scheme={colorScheme}>
        {children}
      </div>
    </context.Provider>
  );
}
