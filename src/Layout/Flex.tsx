import clsx from 'clsx';
import { CSSProperties, ReactNode, createContext, useContext } from 'react';

import styles from './Flex.module.css';
import type {
  AlignItems,
  FlexDirection,
  FlexStrategy,
  FlexWrap,
  PlaceContent,
} from './Layout.type';

export type FlexProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;

  /**
   * The child placement strategy.
   * @default 'fixed'
   * */
  strategy?: FlexStrategy;
  direction?: FlexDirection;
  wrap?: FlexWrap;

  /** CSS `align-content` and `justify-content`. */
  placement?: PlaceContent;

  /** CSS align-items */
  align?: AlignItems;

  gap?: string;
};

export type AutoChildProps = {
  auto?: boolean;
  order?: number;
  push?: 'start' | 'end';

  children?: ReactNode;
};

Flex.AutoChild = AutoChild;

const FlexContext = createContext({
  direction: 'row' as FlexDirection,
});

export function Flex(props: FlexProps) {
  const { style, rest } = getFlexStyles(props);
  const { className, strategy, ...otherProps } = rest;

  const attributes = {
    'data-strategy': strategy ?? 'fixed',
  };

  const mergedStyles: CSSProperties = {
    ...style,
    ...otherProps.style,
  };

  return (
    <FlexContext.Provider value={{ direction: props.direction ?? 'row' }}>
      <div
        {...otherProps}
        {...attributes}
        className={clsx('Flex', styles.root, className)}
        style={mergedStyles}
      />
    </FlexContext.Provider>
  );
}

/** Fluid/adjustable child of flex layout */
export function AutoChild(props: AutoChildProps) {
  const { auto = true, children, push } = props;

  useContext(FlexContext);
  const { direction } = useContext(FlexContext);

  const attributes = {
    'data-strategy': auto ? 'auto' : undefined,
    'data-push': push ? `${direction}-${push}` : undefined,
  };

  return (
    <div {...attributes} className={clsx(styles.child)}>
      {children}
    </div>
  );
}

function getFlexStyles(props: FlexProps) {
  const { placement, gap, direction, wrap, align, ...rest } = props;

  const style: CSSProperties = {
    flexFlow: `${direction ?? 'row'} ${wrap ?? 'nowrap'}`,
    placeContent: placement,
    alignItems: align,
    gap,
  };

  return { style, rest };
}
