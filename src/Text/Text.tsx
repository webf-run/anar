import clsx from 'clsx';
import { Text as RiaText } from 'react-aria-components';

import { disabled, toDataAttrs } from '../Util/Style.js';

import style from './Text.module.css';

export interface TextVariants {
  /** `md` is the default font-size */
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export interface TextProps extends TextVariants {
  className?: string;
  elementType?: 'span' | 'p' | 'label';

  isDisabled?: boolean;
  text: string;
  slot?: string;
}

export function Text(props: TextProps) {
  const {
    className,
    elementType = 'span',
    size = 'md',
    text,
    isDisabled,
    ...rest
  } = props;

  const data = toDataAttrs([size, disabled(isDisabled)]);

  return (
    <RiaText
      elementType={elementType}
      className={clsx('Text', style.text, className)}
      {...data}
      {...rest}
      children={text}
    />
  );
}
