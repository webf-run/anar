import clsx from 'clsx';
import {
  CSSProperties,
  ForwardRefExoticComponent,
  ReactNode,
  Ref,
  RefAttributes,
  createContext,
  forwardRef,
  useContext,
} from 'react';

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

  tabIndex?: number;

  onFocus?: React.FocusEventHandler<HTMLDivElement> | undefined;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement> | undefined;

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

export type FlexChildProps = {
  adjustment?: 'occupy' | 'push-start' | 'push-end';
  order?: number;

  children?: ReactNode;
};

const FlexContext = createContext({
  direction: 'row' as FlexDirection,
});

export const FlexBase = forwardRef(function Flex(
  props: FlexProps,
  ref: Ref<HTMLDivElement>
) {
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
        ref={ref}
      />
    </FlexContext.Provider>
  );
});

/** Fluid/adjustable child of flex layout */
export function FlexChild(props: FlexChildProps) {
  const { adjustment = 'occupy', children } = props;

  useContext(FlexContext);
  const { direction } = useContext(FlexContext);

  const attributes = {
    'data-strategy': adjustment,
    'data-direction': direction,
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

type FlexComponentType = ForwardRefExoticComponent<
  FlexProps & RefAttributes<HTMLDivElement>
> & {
  Child: typeof FlexChild;
};

export const Flex = Object.assign(FlexBase, {
  Child: FlexChild,
}) as FlexComponentType;
