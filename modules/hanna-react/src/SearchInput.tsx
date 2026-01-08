import React, { RefObject, useState } from 'react';

import FormField, {
  FormFieldWrappingProps,
  groupFormFieldWrapperProps,
} from './FormField.js';

type InputElmProps = Omit<
  JSX.IntrinsicElements['input'],
  | 'className'
  | 'type'
  | 'disabled'
  | 'readOnly'
  | 'required'
  | 'onSubmit'
  | 'ref'
  | 'value'
  | 'defaultValue'
> & { value?: string; defaultValue?: string };

export type SearchInputProps = FormFieldWrappingProps & {
  small?: boolean;
  type?: string;
  /**
   * Triggered when user hits ENTER key with the focus inside the input field.
   *
   * Return `true` to __allow__ the browser's default submit hehavior.
   */
  onSubmit?: (value: string) => boolean | void;
  /**
   * Custom action to perform when the user clicks the search button.
   *
   * Return `true` to __allow__ the browser's default submit hehavior.
   *
   * Defaults to `onSubmit`.
   */
  onButtonClick?: (value: string) => boolean | void;
  /**
   * Toggle the search `<button/>`.
   *
   * Defaults to `true` if onButtonClick is passed, otherwise false.
   */
  button?: boolean;
  buttonText?: string;
  inputRef?: RefObject<HTMLInputElement>;
  buttonRef?: RefObject<HTMLButtonElement>;
} & InputElmProps;

export const SearchInput = (props: SearchInputProps) => {
  const {
    onChange,
    onKeyDown,
    onSubmit,
    onButtonClick,
    button,
    buttonText = 'Leita',
    inputRef,
    buttonRef,
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

  const showButton = !!onButtonClick || button;
  const handleButtonClick = onButtonClick || onSubmit;

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
            onKeyDown={
              onSubmit
                ? (e) => {
                    if (e.key === 'Enter' && !onSubmit(e.currentTarget.value)) {
                      e.preventDefault();
                    }
                    onKeyDown && onKeyDown(e);
                  }
                : onKeyDown
            }
            {...inputElementProps}
            ref={inputRef}
          />{' '}
          {showButton && (
            <button
              className="SearchInput__button"
              type="submit"
              onClick={
                handleButtonClick &&
                ((e) =>
                  !handleButtonClick(
                    e.currentTarget.parentElement!.querySelector<HTMLInputElement>(
                      'input.SearchInput__input'
                    )!.value
                  ) && e.preventDefault())
              }
              title={buttonText}
              ref={buttonRef}
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
