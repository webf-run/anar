import clsx from 'clsx';
import { type ReactNode } from 'react';
import {
  Input,
  TextField as RiaTextField,
  TextFieldProps as RiaTextFieldProps,
  ValidationResult,
} from 'react-aria-components';

import { FieldError } from '../../Text/FieldError.js';
import { Label } from '../../Text/Label.js';
import { Text } from '../../Text/Text.js';
import styles from './TextField.module.css';

export interface TextFieldProps extends RiaTextFieldProps {
  label?: ReactNode;
  description?: string;
  errorMessage?: string;
}

export function TextField(props: TextFieldProps) {
  const { label, description, errorMessage, ...rest } = props;

  const classname = clsx('TextField', styles.root);

  return (
    <RiaTextField className={classname} {...rest}>
      {label && <Label isDisabled={rest.isDisabled}>{label}</Label>}
      <Input className={styles.input} />
      {description && !rest.isInvalid && (
        <Text
          slot='description'
          isDisabled={rest.isDisabled}
          text={description}
        />
      )}
      <FieldError>{errorMessage}</FieldError>
    </RiaTextField>
  );
}
