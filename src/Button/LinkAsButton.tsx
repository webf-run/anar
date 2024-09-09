import type {
  HTMLAttributeAnchorTarget,
  HTMLAttributeReferrerPolicy,
} from 'react';
import { Link as AriaLink } from 'react-aria-components';

import { getProps, type ButtonBaseProps } from './ButtonProps.js';

export interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  target?: HTMLAttributeAnchorTarget;
  download?: boolean | string;
  referrerPolicy?: HTMLAttributeReferrerPolicy;
}

export function ButtonAsLink(props: ButtonAsLinkProps) {
  const { href, target, download, referrerPolicy, ...rest } = props;

  const { left, right, label, ...linkProps } = getProps(rest);

  return (
    <AriaLink
      href={href}
      target={target}
      download={download}
      referrerPolicy={referrerPolicy}
      {...linkProps}
    >
      {left}
      <span>{label}</span>
      {right}
    </AriaLink>
  );
}
