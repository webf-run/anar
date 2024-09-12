import clsx from 'clsx';
import {
  RadioGroup as AriaRadioGroup,
  RadioGroupProps as AriaRadioGroupProps,
  Text,
  type ValidationResult,
} from 'react-aria-components';

import { FieldError } from '../Text/FieldError.js';
import { Label } from '../Text/Label.js';

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, 'children'> {
  children?: React.ReactNode;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function RadioGroup(props: RadioGroupProps) {
  const {
    className,
    label,
    description,
    errorMessage,
    children,
    ...rest
  } = props;

  return (
    <AriaRadioGroup className={clsx('anar-radio-group', className)} {...rest}>
      <Label>{label}</Label>
      {children}
      {description && <Text slot='description'>{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </AriaRadioGroup>
  );
}
