import clsx from 'clsx';
import { Minus, Plus } from 'lucide-react';
import {
  Group,
  Input,
  NumberField as RiaNumberField,
  NumberFieldProps as RiaNumberFieldProps,
} from 'react-aria-components';

import { ActionButton } from '../../Button/ActionButton.js';
import { Flex } from '../../Layout/Flex.js';
import { FieldError } from '../../Text/FieldError.js';
import { Label } from '../../Text/Label.js';
import { Text } from '../../Text/Text.js';
import { InputFieldBaseProps } from '../Field.prop.js';
import styles from './NumberField.module.css';

export interface NumberFieldProps
  extends InputFieldBaseProps<number>,
    RiaNumberFieldProps {}

export function NumberField(props: NumberFieldProps) {
  const { label, description, errorMessage, isDisabled, ...rest } = props;

  const className = clsx('NumberField', styles.field);

  return (
    <RiaNumberField {...rest} isDisabled={isDisabled} className={className}>
      {label && <Label isDisabled={isDisabled}>{label}</Label>}
      <Group className={styles.group}>
        <Flex gap='0'>
          <Flex.Child adjustment='occupy'>
            <Input className={styles.input} />
          </Flex.Child>
          <ActionButton
            slot='decrement'
            isDisabled={isDisabled}
            aria-label='Decrement'
            icon={Minus}
          />
          <ActionButton
            slot='increment'
            isDisabled={isDisabled}
            aria-label='Increment'
            icon={Plus}
          />
        </Flex>
      </Group>
      {description && !rest.isInvalid && (
        <Text slot='description' isDisabled={isDisabled} text={description} />
      )}
      <FieldError>{errorMessage}</FieldError>
    </RiaNumberField>
  );
}
