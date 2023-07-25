import React, { useEffect, useRef, useState } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import type {
  OptionOrValue,
  SelectboxOption,
  SelectboxOptions as _SelectboxOptions,
  SelectboxProps as _SelectboxProps,
} from '@hugsmidjan/react/Selectbox';
import _Selectbox from '@hugsmidjan/react/Selectbox';

import FormField, { FormFieldWrappingProps } from './FormField.js';

export {
  type SelectboxOption,
  type SelectboxOptions as SelectboxOptionList,
} from '@hugsmidjan/react/Selectbox';

/** @deprecated Use `SelectboxOptionList` instead  (Will be removed in v0.11) */
export type SelectboxOptions = _SelectboxOptions;

const getValue = (opt: SelectboxOption | string | number | undefined) => {
  const val = typeof opt === 'object' ? opt.value : opt;
  return typeof val === 'number' ? String(val) : val;
};

export type SelectboxProps<O extends OptionOrValue = OptionOrValue> =
  FormFieldWrappingProps &
    Omit<_SelectboxProps<O>, 'bem'> & {
      small?: boolean;
    };

export const Selectbox = <O extends OptionOrValue>(props: SelectboxProps<O>) => {
  const {
    className,

    label,
    assistText,
    hideLabel,
    disabled,
    readOnly,
    reqText,
    invalid,
    errorMessage,
    required,
    id,
    ssr,
    onChange,

    small,
    ...selectProps
  } = props;

  const { value, defaultValue, placeholder, options } = selectProps;

  const _selectRef = useRef<HTMLSelectElement>(null);
  const selectRef = selectProps.selectRef || _selectRef;

  const getInitialValue = () => value ?? defaultValue ?? getValue(options[0]);
  const [isFilled, setIsFilled] = useState(() => !!getInitialValue());
  const [isEmpty, setIsEmpty] = useState(() => !getInitialValue() && !placeholder);

  useEffect(() => {
    setTimeout(() => {
      const selectElm = selectRef.current;
      if (selectElm) {
        setIsFilled(!!selectElm.value);
        setIsEmpty(!selectElm.selectedOptions[0]?.text);
      }
    }, 0);
  }, [selectRef, value, defaultValue, options]);

  const _onChange: typeof onChange = (e) => {
    const selectElm = e.currentTarget;
    setIsFilled(!!selectElm.value);
    setIsEmpty(!selectElm.selectedOptions[0]?.text);
    onChange && onChange(e);
  };

  return (
    <FormField
      className={modifiedClass('Selectbox', null, className)}
      ssr={ssr}
      small={small}
      label={label}
      empty={isEmpty}
      filled={isFilled}
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
        <_Selectbox
          bem={className.input}
          ssr={ssr}
          onChange={_onChange}
          {...inputProps}
          {...addFocusProps(selectProps)}
          selectRef={selectRef}
        />
      )}
    />
  );
};

// /** @deprecated Use named export instead (The default export will be removed in v0.11+) */
// const SelectboxDefault = Selectbox;
// export default SelectboxDefault;
export default Selectbox;
