import React, { RefObject, useState } from 'react';

import FormField, {
  FormFieldWrappingProps,
  groupFormFieldWrapperProps,
} from './FormField.js';

export type SearchInputProps = FormFieldWrappingProps & {
  small?: boolean;
  type?: string;
  onButtonClick?: () => void;
  buttonText?: string;
  inputRef?: RefObject<HTMLInputElement>;
  buttonRef?: RefObject<HTMLButtonElement>;
} & JSX.IntrinsicElements['input'];

export const SearchInput = (props: SearchInputProps) => {
  const {
    onChange,
    onButtonClick,
    buttonText = 'Leita',
    fieldWrapperProps,
    ...inputElementProps
  } = groupFormFieldWrapperProps(props);

  const { value, defaultValue, placeholder } = inputElementProps;

  const [hasValue, setHasValue] = useState<boolean | undefined>(undefined);
  const filled = !!(value ?? hasValue ?? !!defaultValue);
  const empty = !filled && !placeholder;

  const _onChange: typeof onChange =
    value != null
      ? onChange
      : (e) => {
          setHasValue(!!e.target.value);
          onChange && onChange(e);
        };

  return (
    <FormField
      extraClassName="SearchInput"
      empty={empty}
      filled={filled}
      {...fieldWrapperProps}
      renderInput={(className, inputProps, addFocusProps) => (
        <div className={className.input} {...addFocusProps()}>
          <input
            className="SearchInput__input"
            onChange={_onChange}
            {...inputProps}
            {...inputElementProps}
            ref={props.inputRef}
          />{' '}
          {onButtonClick && (
            <button
              className="SearchInput__button"
              type="button"
              onClick={onButtonClick}
              title={buttonText}
              ref={props.buttonRef}
              disabled={props.disabled || props.readOnly}
            >
              {buttonText}
            </button>
          )}
        </div>
      )}
    />
  );
};

export default SearchInput;
