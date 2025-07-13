'use client';

import { IconSearch, IconX } from '@intentui/icons';
import type { SearchFieldProps as SearchFieldPrimitiveProps } from 'react-aria-components';
import {
  Button,
  SearchField as SearchFieldPrimitive,
} from 'react-aria-components';

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

export interface SearchFieldProps
  extends SearchFieldPrimitiveProps,
    FieldProps {
  isPending?: boolean;
}

export function SearchField(props: SearchFieldProps) {
  const {
    children,
    className,
    placeholder,
    label,
    description,
    errorMessage,
    isPending,
    ...rest
  } = props;
  return (
    <SearchFieldPrimitive
      aria-label={placeholder ?? rest['aria-label'] ?? 'Search...'}
      {...rest}
      className={composeTailwindRenderProps(
        className,
        'group/search-field relative flex flex-col gap-y-1 *:data-[slot=label]:font-medium'
      )}
    >
      {(values) => (
        <>
          {label && <Label>{label}</Label>}
          {typeof children === 'function' ? (
            children(values)
          ) : children ? (
            children
          ) : (
            <FieldGroup>
              {isPending ? <Loader variant='spin' /> : <IconSearch />}
              <Input placeholder={placeholder ?? 'Search...'} />

              <Button className='grid place-content-center pressed:text-fg text-muted-fg hover:text-fg group-empty/search-field:invisible'>
                <IconX />
              </Button>
            </FieldGroup>
          )}

          {description && <Description>{description}</Description>}
          <FieldError>{errorMessage}</FieldError>
        </>
      )}
    </SearchFieldPrimitive>
  );
}
