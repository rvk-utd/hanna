import React, { useState } from 'react';
import { SSRSupport } from '@hugsmidjan/react/hooks';

import FormField, { FormFieldWrappingProps } from './FormField';

type InputElmProps = Omit<
  JSX.IntrinsicElements['input'],
  'className' | 'type' | 'disabled' | 'readOnly' | 'required' | 'onSubmit'
>;
type WrappingProps = Pick<FormFieldWrappingProps, 'id' | 'label'>;

export type SiteSearchInputProps = {
  /** Triggered when user hits ENTER key with the focus inside the input field
   *
   * Return `true` to **allow** the browser's default submit hehavior
   */
  onSubmit?: () => boolean | void;

  /** Custom action to perform when the user clicks the search button
   *
   * Return `true` to **allow** the browser's default submit hehavior
   *
   * Defaults to `onSearch`
   */
  onButtonClick?: () => boolean | void;
  buttonText?: string;
  children?: never;
  ssr?: SSRSupport;
} & WrappingProps &
  InputElmProps;

// ---------------------------------------------------------------------------
const SiteSearchInput = React.forwardRef<HTMLInputElement, SiteSearchInputProps>(
  (props, ref) => {
    const {
      label,
      id,
      onChange,

      placeholder = typeof label === 'string' ? label : undefined,
      buttonText = 'Leita',
      onSubmit,
      onButtonClick = onSubmit,
      onKeyDown,
      ssr,

      ...inputElementProps
    } = props;

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
        className="SiteSearchInput"
        ssr={ssr}
        label={label}
        empty={empty}
        filled={filled}
        id={id}
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
