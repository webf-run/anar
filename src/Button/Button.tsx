import { type Ref, forwardRef } from 'react';
import { type ButtonProps as RiaButtonProps } from 'react-aria-components';

import { type ButtonBaseProps, getProps } from './Button.prop.js';
import { DryButton, type DryButtonProps } from './DryButton.js';

export type ButtonProps = ButtonBaseProps & RiaButtonProps;

export const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const { left, right, label, ...buttonProps } = getProps(props);

  const dryButtonProps: DryButtonProps = buttonProps;

  return (
    <DryButton ref={ref} {...dryButtonProps}>
      {left} {label} {right}
    </DryButton>
  );
});
