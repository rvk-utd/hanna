import React, { ChangeEvent, RefObject, useState } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import FormField, { FormFieldWrappingProps } from './FormField';

type InputElmProps = JSX.IntrinsicElements['input'];
type TextareaElmProps = JSX.IntrinsicElements['textarea'];

// ---------------------------------------------------------------------------

export type TextInputProps = {
  small?: boolean;
  children?: undefined;
} & FormFieldWrappingProps &
  (
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

const TextInput = (props: TextInputProps) => {
  const {
    className,

    label,
    assistText,
    hideLabel,
    disabled,
    readOnly,
    invalid,
    errorMessage,
    required,
    reqText,
    id,
    onChange,

    small,
    type,
    ssr,
    inputRef,
    ...inputElementProps
  } = props;

  const { value, defaultValue, placeholder } = inputElementProps;

  const [hasValue, setHasValue] = useState<boolean | undefined>(undefined);
  const filled = !!(value ?? hasValue ?? !!defaultValue);
  const empty = !filled && !placeholder;
  const multiline = type === 'textarea';
  const modifiers = [multiline && 'multiline'];

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

  return (
    <FormField
      className={getBemClass('TextInput', modifiers, className)}
      ssr={ssr}
      small={small}
      label={label}
      empty={empty}
      filled={filled}
      assistText={assistText}
      hideLabel={hideLabel}
      disabled={disabled}
      readOnly={readOnly}
      invalid={invalid}
      errorMessage={errorMessage}
      required={required}
      reqText={reqText}
      id={id}
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
