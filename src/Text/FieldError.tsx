import clsx from 'clsx';
import {
  type FieldErrorProps,
  FieldError as RiaFieldError,
} from 'react-aria-components';

export function FieldError(props: FieldErrorProps) {
  const { className, ...rest } = props;

  return (
    <RiaFieldError className={clsx('AnarFieldError', className)} {...rest} />
  );
}
