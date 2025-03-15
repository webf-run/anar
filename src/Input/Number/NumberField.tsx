import {
  Button,
  FieldError,
  Group,
  Input,
  Label,
  NumberField as RiaNumberField,
  NumberFieldProps as RiaNumberFieldProps,
  Text,
  ValidationResult,
} from 'react-aria-components';

export interface NumberFieldProps extends RiaNumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function NumberField({
  label,
  description,
  errorMessage,
  ...props
}: NumberFieldProps) {
  return (
    <RiaNumberField {...props}>
      <Label>{label}</Label>
      <Group>
        <Button slot='decrement'>-</Button>
        <Input />
        <Button slot='increment'>+</Button>
      </Group>
      {description && <Text slot='description'>{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RiaNumberField>
  );
}
