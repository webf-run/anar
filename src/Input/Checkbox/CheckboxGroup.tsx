import clsx from 'clsx';
import { type ReactNode } from 'react';
import {
  CheckboxGroup as RiaCheckboxGroup,
  type CheckboxGroupProps as RiaCheckboxGroupProps,
} from 'react-aria-components';

import { FieldError } from '../../Text/FieldError.js';
import { Label } from '../../Text/Label.js';
import { Text } from '../../Text/Text.js';

export interface CheckboxGroupProps extends RiaCheckboxGroupProps {
  className?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  children: ReactNode;
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const { label, description, errorMessage, children, className, ...rest } =
    props;

  const classes = clsx('anar-checkbox-group', className);

  return (
    <RiaCheckboxGroup className={classes} {...rest}>
      {label && <Label>{label}</Label>}
      {children}
      {description && <Text slot='description' text={description} />}
      <FieldError>{errorMessage}</FieldError>
    </RiaCheckboxGroup>
  );
}
