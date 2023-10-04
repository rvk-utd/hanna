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
> & { value?: string };

export type SiteSearchInputProps = Pick<
  FormFieldWrappingProps,
  'id' | 'label' | 'ssr' | 'wrapperProps'
> & {
  inputRef?: RefObject<HTMLInputElement>;
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
   * Defaults to `true`.
   */
  button?: boolean;
  buttonText?: string;
} & InputElmProps;

// ---------------------------------------------------------------------------
export const SiteSearchInput = (props: SiteSearchInputProps) => {
  const {
    onChange,

    inputRef,
    buttonText = 'Leita',
    onSubmit,
    onButtonClick = props.onSubmit,
    button,
    onKeyDown,

    placeholder = typeof props.label === 'string' ? props.label : undefined,

    fieldWrapperProps,
    ...inputElementProps
  } = groupFormFieldWrapperProps(props);

  const { value, defaultValue } = inputElementProps;

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

  const showButton = button !== false;

  return (
    <FormField
      extraClassName="SiteSearchInput"
      empty={empty}
      filled={filled}
      {...fieldWrapperProps}
      renderInput={(className, inputProps, addFocusProps) => (
        <div className={className.input} {...addFocusProps()}>
          <input
            className="SiteSearchInput__input"
            onChange={_onChange}
            {...inputProps}
            placeholder={placeholder}
            onKeyDown={
              onSubmit
                ? (e) => {
                    if (e.key === 'Enter' && onSubmit(e.currentTarget.value) !== true) {
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
              className="SiteSearchInput__button"
              type="submit"
              onClick={
                onButtonClick &&
                ((e) =>
                  onButtonClick(e.currentTarget.value) !== true && e.preventDefault())
              }
              title={buttonText}
            >
              {buttonText}
            </button>
          )}
        </div>
      )}
    />
  );
};

export default SiteSearchInput;
