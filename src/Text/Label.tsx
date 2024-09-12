import clsx from 'clsx';
import { Label as AriaLabel, LabelProps as AriaLabelProps } from 'react-aria-components';

import { toDataAttrs, type TShirtSize } from '../Util/Style.js';

export interface LabelProps extends AriaLabelProps {
  size?: TShirtSize;
}

export function Label(props: LabelProps) {
  const { className, size = 'md', ...rest } = props;

  const data = toDataAttrs([size]);

  return (
    <AriaLabel
      className={clsx('anar-label', className)}
      {...data}
      {...rest}
    />
  );
};
