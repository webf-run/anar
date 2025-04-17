import clsx from 'clsx';
import { type ReactNode, forwardRef } from 'react';
import { Text as RACText } from 'react-aria-components';

import style from './Text.module.css';

export type HeadingVariants = {
  /** Level 2 is the default level. */
  level?: 1 | 2 | 3 | 4 | 5;
};

export interface HeadingProps extends HeadingVariants {
  className?: string;

  children: ReactNode;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(props, ref) {
    const { className, level = 2, children } = props;

    return (
      <RACText
        ref={ref}
        elementType={`h${level}`}
        className={clsx('Heading', style.heading, className)}
        children={children}
      />
    );
  }
);
