import clsx from 'clsx';
import {
  FieldError as RiaFieldError,
  type FieldErrorProps,
} from 'react-aria-components';

export function FieldError(props: FieldErrorProps) {
  const { className, ...rest } = props;

  return (
    <RiaFieldError className={clsx('anar-field-error', className)} {...rest} />
  );
}
