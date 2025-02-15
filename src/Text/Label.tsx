import clsx from 'clsx';
import {
  Label as RiaLabel,
  LabelProps as RiaLabelProps,
} from 'react-aria-components';

import { disabled, toDataAttrs, type TShirtSize } from '../Util/Style.js';

export interface LabelProps extends RiaLabelProps {
  size?: TShirtSize;
  isDisabled?: boolean;
}

export function Label(props: LabelProps) {
  const { className, isDisabled, size = 'md', ...rest } = props;

  const data = toDataAttrs([size, disabled(isDisabled)]);

  return (
    <RiaLabel className={clsx('anar-label', className)} {...data} {...rest} />
  );
}
