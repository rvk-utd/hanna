import React, { useEffect, useRef, useState } from 'react';
import _Selectbox, {
  SelectboxProps as _SelectboxProps,
} from '@hugsmidjan/react/Selectbox';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import FormField, { FormFieldWrappingProps } from './FormField';

const getValue = (opt: _SelectboxProps['options'][0] | undefined) => {
  const val = typeof opt === 'object' ? opt.value : opt;
  return typeof val === 'number' ? String(val) : val;
};

export type SelectboxProps = FormFieldWrappingProps &
  Omit<_SelectboxProps, 'bem'> & {
    small?: boolean;
  };

export type { SelectboxOptions } from '@hugsmidjan/react/Selectbox';

const Selectbox = (props: SelectboxProps) => {
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
