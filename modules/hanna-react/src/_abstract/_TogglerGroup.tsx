import React, { useMemo } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { FormFieldInputProps } from '../FormField.js';
import { HTMLProps, useMixedControlState } from '../utils.js';
import { useDomid } from '../utils/useDomid.js';

import { TogglerInputProps } from './_TogglerInput.js';

export type TogglerGroupOption<T = 'default', Extras = {}> = {
  value: string;
  label?: T extends 'default' ? string | JSX.Element : T;
  disabled?: boolean;
  id?: string;
} & Partial<Extras>;

export type TogglerGroupOptions<T = 'default', Extras = {}> = Array<
  TogglerGroupOption<T, Extras>
>;

type RestrictedInputProps = Omit<
  HTMLProps<'input'>,
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

export type TogglerGroupProps<T = 'default', Extras = {}> = {
  options: Array<string> | TogglerGroupOptions<T, Extras>;
  className?: string;
  name?: string;
  disabled?: boolean | ReadonlyArray<number>;
  inputProps?: RestrictedInputProps;
  onSelected?: (payload: {
    /** The value of being selected/updated */
    value: string;
    /** The new checked state of the selected value */
    checked: boolean;
    /** The option object being selected */
    option: TogglerGroupOption<T, Extras>;
    /** The updated value array */
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

    disabled,
    readOnly,
    Toggler,
    onSelected,
    isRadio,
    inputProps = {},
  } = props;
  const [values, setValues] = useMixedControlState(props, 'value', []);

  const name = useDomid(props.name);

  const options: Array<TogglerGroupOption> = useMemo(() => {
    const _options = props.options;
    return typeof _options[0] === 'string'
      ? (_options as Array<string>).map((option) => ({ value: option }))
      : (_options as Array<TogglerGroupOption>);
  }, [props.options]);

  return (
    <ul
      className={modifiedClass(bem, null, className)}
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
            readOnly={readOnly}
            aria-invalid={props['aria-invalid']}
            checked={isChecked}
          />
        );
      })}
    </ul>
  );
};
