'use client';

import { IconEye, IconEyeClosed } from '@intentui/icons';
import { useState } from 'react';
import type {
  InputProps,
  TextFieldProps as TextFieldPrimitiveProps,
} from 'react-aria-components';
import { TextField as TextFieldPrimitive } from 'react-aria-components';

import { composeTailwindRenderProps } from '../Base/Primitive.js';
import { Loader } from '../Status/Loader.js';
import {
  Description,
  FieldError,
  FieldGroup,
  type FieldProps,
  Input,
  Label,
} from './Field.js';

export type InputType = Exclude<InputProps['type'], 'password'>;

export interface BaseTextFieldProps
  extends TextFieldPrimitiveProps,
    FieldProps {
  prefix?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
  isPending?: boolean;
}

export interface PasswordTextFieldProps extends BaseTextFieldProps {
  isRevealable: true;
}

export interface NonPasswordTextFieldProps extends BaseTextFieldProps {
  isRevealable?: never;
  type?: InputType;
}

export type TextFieldProps = PasswordTextFieldProps | NonPasswordTextFieldProps;

export function TextField(props: TextFieldProps) {
  const {
    placeholder,
    label,
    description,
    errorMessage,
    prefix,
    suffix,
    isPending,
    className,
    isRevealable,
    type,
    ...rest
  } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = isRevealable
    ? isPasswordVisible
      ? 'text'
      : 'password'
    : type;
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <TextFieldPrimitive
      type={inputType}
      {...rest}
      className={composeTailwindRenderProps(
        className,
        'group flex flex-col gap-y-1 *:data-[slot=label]:font-medium'
      )}
    >
      {!rest.children ? (
        <>
          {label && <Label>{label}</Label>}
          <FieldGroup
            isDisabled={rest.isDisabled}
            isInvalid={!!errorMessage}
            data-loading={isPending ? 'true' : undefined}
          >
            {prefix && typeof prefix === 'string' ? (
              <span className='pl-2 text-muted-fg'>{prefix}</span>
            ) : (
              prefix
            )}
            <Input placeholder={placeholder} />
            {isRevealable ? (
              <button
                type='button'
                tabIndex={-1}
                aria-label='Toggle password visibility'
                onClick={handleTogglePasswordVisibility}
                className='relative mr-0.5 grid shrink-0 place-content-center rounded-sm border-transparent outline-hidden *:data-[slot=icon]:text-muted-fg focus-visible:*:data-[slot=icon]:text-primary'
              >
                {isPasswordVisible ? <IconEyeClosed /> : <IconEye />}
              </button>
            ) : isPending ? (
              <Loader variant='spin' />
            ) : suffix ? (
              typeof suffix === 'string' ? (
                <span className='mr-2 text-muted-fg'>{suffix}</span>
              ) : (
                suffix
              )
            ) : null}
          </FieldGroup>
          {description && <Description>{description}</Description>}
          <FieldError>{errorMessage}</FieldError>
        </>
      ) : (
        rest.children
      )}
    </TextFieldPrimitive>
  );
}
