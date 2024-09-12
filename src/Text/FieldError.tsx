import clsx from 'clsx';
import { FieldError as AriaFieldError, type FieldErrorProps } from 'react-aria-components';


export function FieldError(props: FieldErrorProps) {
  const { className, ...rest } = props;

  return <AriaFieldError className={clsx('anar-field-error', className)} {...rest} />;
}
