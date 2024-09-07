import clsx from 'clsx';
import { Text as RACText } from 'react-aria-components';

import style from './Text.module.css';

export type TextVariants = {
  /** MD is the default font-size */
  size?: 'LG' | 'MD' | 'SM' | 'XS';
};

export interface TextProps extends TextVariants {
  className?: string;
  elementType?: 'span' | 'p' | 'label';

  text: string;
}

export function Text(props: TextProps) {
  const { className, elementType = 'span', size, text } = props;

  return (
    <RACText
      elementType={elementType}
      className={clsx('Text', style.text, className)}
      data-size={size}
      children={text}
    />
  );
}
