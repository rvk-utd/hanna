import React, { useState } from 'react';

import FormField, {
  FormFieldWrappingProps,
  groupFormFieldWrapperProps,
} from './FormField.js';

type InputElmProps = Omit<
  JSX.IntrinsicElements['input'],
  'className' | 'type' | 'disabled' | 'readOnly' | 'required' | 'onSubmit'
>;

export type SiteSearchInputProps = Pick<
  FormFieldWrappingProps,
  'id' | 'label' | 'ssr' | 'wrapperProps'
> & {
  /** Triggered when user hits ENTER key with the focus inside the input field
   *
   * Return `true` to __allow__ the browser's default submit hehavior
   */
  onSubmit?: () => boolean | void;

  /** Custom action to perform when the user clicks the search button
   *
   * Return `true` to __allow__ the browser's default submit hehavior
   *
   * Defaults to `onSearch`
   */
  onButtonClick?: () => boolean | void;
  buttonText?: string;
} & InputElmProps;

// ---------------------------------------------------------------------------
export const SiteSearchInput = React.forwardRef<HTMLInputElement, SiteSearchInputProps>(
  (props, ref) => {
    const {
      onChange,

      buttonText = 'Leita',
      onSubmit,
      onButtonClick = props.onSubmit,
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
                      if (e.key === 'Enter' && onSubmit() !== true) {
                        e.preventDefault();
                      }
                      onKeyDown && onKeyDown(e);
                    }
                  : onKeyDown
              }
              {...inputElementProps}
              ref={ref}
            />{' '}
            <button
              className="SiteSearchInput__button"
              type="submit"
              onClick={onButtonClick && ((e) => !onButtonClick() && e.preventDefault())}
              title={buttonText}
            >
              {buttonText}
            </button>
          </div>
        )}
      />
    );
  }
);

export default SiteSearchInput;
