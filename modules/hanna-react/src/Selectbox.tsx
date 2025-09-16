import React, { useEffect, useRef, useState } from 'react';
import type {
  OptionOrValue,
  SelectboxOption,
  SelectboxOptions as _SelectboxOptions,
  SelectboxProps as _SelectboxProps,
} from '@hugsmidjan/react/Selectbox';
import _Selectbox from '@hugsmidjan/react/Selectbox';

import FormField, {
  FormFieldWrappingProps,
  groupFormFieldWrapperProps,
} from './FormField.js';

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
    Omit<_SelectboxProps<O>, 'bem' | 'modifier'> & {
      small?: boolean;
    };

export const Selectbox = <O extends OptionOrValue>(props: SelectboxProps<O>) => {
  const { onChange, fieldWrapperProps, ...selectProps } =
    groupFormFieldWrapperProps(props);

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
      extraClassName="Selectbox"
      empty={isEmpty}
      filled={isFilled}
      {...fieldWrapperProps}
      renderInput={(className, inputProps, addFocusProps) => (
        <_Selectbox
          bem={className.input}
          ssr={props.ssr}
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
