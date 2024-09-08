import clsx from 'clsx';
import { Text as RACText } from 'react-aria-components';

import style from './Text.module.css';
import { toDataAttrs } from '../Util/Style';

export interface TextVariants {
  /** `md` is the default font-size */
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

export interface TextProps extends TextVariants {
  className?: string;
  elementType?: 'span' | 'p' | 'label';

  text: string;
}

export function Text(props: TextProps) {
  const { className, elementType = 'span', size = 'md', text } = props;

  const data = toDataAttrs([size]);

  return (
    <RACText
      elementType={elementType}
      className={clsx('Text', style.text, className)}
      {...data}
      children={text}
    />
  );
}
