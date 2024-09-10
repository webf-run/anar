import clsx from 'clsx';
import type { FC } from 'react';

export type PlaygroundConfiguration<T> = {
  defaultValues: T;
  component: FC<T>;
};

export type PlaygroundProps<T> = {
  configuration: PlaygroundConfiguration<T>;
};

export function Playground<T>(props: PlaygroundProps<T>) {

  return (
    <div className={clsx('Playground')}>
      Playground
    </div>
  );
}

export function withPlayground<T>(configuration: PlaygroundConfiguration<T>) {
  return (props: T) => <Playground configuration={configuration} />;
}
