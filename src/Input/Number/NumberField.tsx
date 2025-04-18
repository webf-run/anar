import clsx from 'clsx';
import { Minus, Plus } from 'lucide-react';
import {
  Group,
  Input,
  NumberField as RiaNumberField,
  NumberFieldProps as RiaNumberFieldProps,
} from 'react-aria-components';

import { ActionButton } from '../../Button/ActionButton';
import { Flex } from '../../Layout/Flex';
import { FieldError } from '../../Text/FieldError';
import { Label } from '../../Text/Label';
import { Text } from '../../Text/Text';
import { InputFieldBaseProps } from '../Field.prop';
import styles from './NumberField.module.css';

export interface NumberFieldProps
  extends InputFieldBaseProps<number>,
    RiaNumberFieldProps {}

export function NumberField(props: NumberFieldProps) {
  const { label, description, errorMessage, ...rest } = props;

  const className = clsx('NumberField', styles.field);

  return (
    <RiaNumberField {...rest} className={className}>
      {label && <Label isDisabled={rest.isDisabled}>{label}</Label>}
      <Group className={styles.group}>
        <Flex gap='0'>
          <Flex.Child adjustment='occupy'>
            <Input className={styles.input} />
          </Flex.Child>
          <ActionButton slot='decrement' aria-label='Decrement' icon={Minus} />
          <ActionButton slot='increment' aria-label='Increment' icon={Plus} />
        </Flex>
      </Group>
      {description && !rest.isInvalid && (
        <Text
          slot='description'
          isDisabled={rest.isDisabled}
          text={description}
        />
      )}
      <FieldError>{errorMessage}</FieldError>
    </RiaNumberField>
  );
}
