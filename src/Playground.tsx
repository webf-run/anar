import clsx from 'clsx';
import { useMemo, useState, type FC, type JSX } from 'react';

import { Anar } from './Anar.js';
import './Anar.css';

export type PlaygroundConfiguration<T> = {
  defaultProps: T & JSX.IntrinsicAttributes;
  component: FC<T>;
};

export type PlaygroundProps<T> = {
  configuration: PlaygroundConfiguration<T>;
};

export function Playground<T>(props: PlaygroundProps<T>) {
  const { configuration } = props;
  const { defaultProps, component: Component } = configuration;
  const [elm, setElm] = useState<HTMLElement | null>(null);

  const getElm = useMemo(() => {
    if (elm) {
      return () => elm;
    }
  }, [elm]);

  return (
    <div className={clsx('Playground')} ref={setElm}>
      <Anar colorScheme='light' getRootElement={getElm}>
        <Component {...defaultProps} />
      </Anar>
    </div>
  );
}

export function withPlayground<T>(configuration: PlaygroundConfiguration<T>) {
  return (props: T) => <Playground configuration={configuration} />;
}
