import { ReactNode } from 'react';

/** An interface that must be honored by all the input fields  */
export interface InputFieldBaseProps<T = any> {
  isDisabled?: boolean;
  isPending?: boolean;

  label?: ReactNode;
  description?: string;
  errorMessage?: string;

  value?: T;
  onChange?: (value: T) => void;
}
