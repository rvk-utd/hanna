import React, { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import FormField, {
  FormFieldWrappingProps,
  groupFormFieldWrapperProps,
} from './FormField.js';

type InputElmProps = JSX.IntrinsicElements['input'];
type TextareaElmProps = JSX.IntrinsicElements['textarea'];

// ---------------------------------------------------------------------------

export type TextInputProps = FormFieldWrappingProps & { small?: boolean } & (
    | ({
        type?:
          | 'text'
          | 'email'
          | 'tel'
          | 'number'
          | 'date'
          | 'url'
          | 'password'
          | 'search';
        inputRef?: RefObject<HTMLInputElement>;
      } & InputElmProps)
    | ({
        type: 'textarea';
        inputRef?: RefObject<HTMLTextAreaElement>;
      } & TextareaElmProps)
  );

export const TextInput = (props: TextInputProps) => {
  const _inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const {
    onChange,
    type,
    inputRef = _inputRef,
    fieldWrapperProps,
    ...inputElementProps
  } = groupFormFieldWrapperProps(props);

  const { value, defaultValue, placeholder } = inputElementProps;

  const [hasValue, setHasValue] = useState<boolean | undefined>(undefined);
  const filled = !!(value ?? hasValue ?? !!defaultValue);
  const empty = !filled && !placeholder;
  const multiline = type === 'textarea';

  const _onChange =
    value != null
      ? onChange
      : (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          setHasValue(!!e.target.value);
          onChange &&
            onChange(
              // TypeScript is silly sometimes.
              e as ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>
            );
        };
  useEffect(
    () => {
      if (inputRef.current?.value) {
        setHasValue(true);
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <FormField
      extraClassName={modifiedClass('TextInput', [multiline && 'multiline'])}
      empty={empty}
      filled={filled}
      {...fieldWrapperProps}
      renderInput={(className, inputProps, addFocusProps) =>
        multiline ? (
          <textarea
            className={className.input}
            onChange={_onChange as TextareaElmProps['onChange']}
            {...inputProps}
            {...addFocusProps(inputElementProps as TextareaElmProps)}
            ref={inputRef as RefObject<HTMLTextAreaElement>}
          />
        ) : (
          <input
            className={className.input}
            onChange={_onChange as InputElmProps['onChange']}
            type={type}
            {...inputProps}
            {...addFocusProps(inputElementProps as InputElmProps)}
            ref={inputRef as RefObject<HTMLInputElement>}
          />
        )
      }
    />
  );
};

export default TextInput;
