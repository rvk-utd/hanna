import React, { RefObject, useState } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import FormField, { FormFieldWrappingProps } from './FormField';

type InputElmProps = JSX.IntrinsicElements['input'];

type BaseProps<Type extends { type?: string }, InputProps extends object> = {
  small?: boolean;
  children?: undefined;
  onButtonClick?: () => void;
  buttonText?: string;
  inputRef?: RefObject<HTMLInputElement>;
  buttonRef?: RefObject<HTMLButtonElement>;
} & Type &
  FormFieldWrappingProps &
  InputProps;

// ---------------------------------------------------------------------------

export type SearchInputProps = BaseProps<{ type?: 'text' }, InputElmProps>;

const SearchInput = (props: SearchInputProps) => {
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

    onButtonClick,
    buttonText = 'Leita',
    ssr,
    ...inputElementProps
  } = props;

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
      className={getBemClass('SearchInput', [], className)}
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
              disabled={disabled || readOnly}
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
