import React, { useEffect, useRef, useState } from 'react';
import type {
  SelectboxOption,
  SelectboxProps as _SelectboxProps,
} from '@hugsmidjan/react/Selectbox';
import _Selectbox from '@hugsmidjan/react/Selectbox';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import FormField, { FormFieldWrappingProps } from './FormField';

export {
  type SelectboxOption,
  type SelectboxOptions as SelectboxOptionList,
  /** @deprecated Use `SelectboxOptionList` instead  (Will be removed in v0.11) */
  type SelectboxOptions,
} from '@hugsmidjan/react/Selectbox';

const getValue = (opt: SelectboxOption | string | number | undefined) => {
  const val = typeof opt === 'object' ? opt.value : opt;
  return typeof val === 'number' ? String(val) : val;
};

type OptionOrValue = _SelectboxProps['options'][0];

export type SelectboxProps<O extends OptionOrValue = OptionOrValue> =
  FormFieldWrappingProps &
    Omit<_SelectboxProps<O>, 'bem'> & {
      small?: boolean;
    };

const Selectbox = <O extends OptionOrValue>(props: SelectboxProps<O>) => {
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
    const selectElm = selectRef.current;
    if (selectElm) {
      setIsFilled(!!selectElm.value);
      setIsEmpty(!selectElm.selectedOptions[0]?.text);
    }
  }, [selectRef.current?.value]);

  const _onChange: typeof onChange = (e) => {
    const selectElm = e.currentTarget;
    setIsFilled(!!selectElm.value);
    setIsEmpty(!selectElm.selectedOptions[0]?.text);
    onChange && onChange(e);
  };

  return (
    <FormField
      className={getBemClass('Selectbox', null, className)}
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

export default Selectbox;
