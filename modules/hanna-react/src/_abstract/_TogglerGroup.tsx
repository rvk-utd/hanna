import React from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { FormFieldInputProps } from '../FormField';
import { useMixedControlState } from '../utils';

import { TogglerInputProps } from './_TogglerInput';

export type TogglerGroupOption = {
  value: string;
  label?: string | JSX.Element;
  disabled?: boolean;
  id?: string;
};
export type TogglerGroupOptions = Array<TogglerGroupOption>;

type RestrictedInputProps = Omit<
  JSX.IntrinsicElements['input'],
  | 'type'
  | 'value'
  | 'defaultValue'
  | 'checked'
  | 'defaultChecked'
  | 'className'
  | 'id'
  | 'name'
  | 'children'
>;

export type TogglerGroupProps = {
  options: TogglerGroupOptions;
  className?: string;
  name: string;
  disabled?: boolean | ReadonlyArray<number>;
  inputProps?: RestrictedInputProps;
  onSelected?: (payload: {
    value: string;
    checked: boolean;
    option: TogglerGroupOption;
    selectedValues: Array<string>;
  }) => void;
} & Omit<FormFieldInputProps, 'disabled'>;

type _TogglerGroupProps = {
  bem: string;
  Toggler: (props: TogglerInputProps) => JSX.Element;
  value?: ReadonlyArray<string>;
  defaultValue?: ReadonlyArray<string>;
  isRadio?: true;
};

export const TogglerGroup = (props: TogglerGroupProps & _TogglerGroupProps) => {
  const {
    // id,
    className,
    bem,
    name,
    disabled,
    Toggler,
    onSelected,
    options,
    isRadio,
    inputProps = {},
  } = props;
  const [values, setValues] = useMixedControlState(props, 'value', []);

  return (
    <ul
      className={getBemClass(bem, null, className)}
      role="group"
      aria-labelledby={props['aria-labelledby']}
      aria-describedby={props['aria-describedby']}
      aria-required={props.required}
    >
      {options.map((option, i) => {
        const isDisabled =
          option.disabled != null
            ? option.disabled
            : disabled && typeof disabled !== 'boolean'
            ? disabled.includes(i)
            : disabled;
        const isChecked = values.includes(option.value);

        return (
          <Toggler
            key={i}
            {...inputProps}
            className={bem + '__item'}
            name={name}
            Wrapper="li"
            {...option}
            label={option.label || option.value}
            onChange={(e) => {
              inputProps.onChange && inputProps.onChange(e);
              const { value } = option;
              const checked = e.currentTarget.checked;
              const selectedValues = isRadio ? [] : values.filter((val) => val !== value);
              if (checked) {
                selectedValues.push(value);
              }
              setValues(selectedValues);
              onSelected && onSelected({ value, checked, option, selectedValues });
            }}
            disabled={isDisabled}
            aria-invalid={props['aria-invalid']}
            checked={isChecked}
          />
        );
      })}
    </ul>
  );
};
