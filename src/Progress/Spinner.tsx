import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';

import { iconSizes } from '../Util/Icon.js';
import type { TShirtSize } from '../Util/Style.js';

import style from './Spinner.module.css';

export type SpinnerProps = {
  className?: string;
  active: boolean;
  size: TShirtSize;
};

export function Spinner(props: SpinnerProps) {
  const { className, active } = props;

  const [strokeWidth, size] = iconSizes[props.size];

  return (
    <span className={clsx('anar-spinner', style.root, className)}>
      <LoaderCircle
        size={size}
        className={clsx(style.spinner, 'spinner')}
        data-active={active || null}
        strokeWidth={strokeWidth}
      />
    </span>
  );
}
