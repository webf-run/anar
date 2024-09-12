import clsx from 'clsx';
import { Radio as AriaRadio, RadioProps as AriaRadioProps } from 'react-aria-components';

import type { TShirtSize } from '../Util/Style.js';

export type AriaFilteredProps = Omit<AriaRadioProps, 'children'>;

export interface RadioProps extends AriaFilteredProps {
  label: string;
  size?: TShirtSize;
}

export function Radio(props: RadioProps) {
  const { className, id, value, label, isDisabled } = props;

  return (
    <AriaRadio
      className={clsx('anar-radio', className)}
      id={id}
      value={value}
      isDisabled={isDisabled}
      aria-label={label}
    >
      <span>{label}</span>
    </AriaRadio>
  );
}
