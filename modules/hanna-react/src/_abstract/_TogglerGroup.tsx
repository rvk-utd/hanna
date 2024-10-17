import React, { ReactNode, useMemo } from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { FormFieldInputProps } from '../FormField.js';
import { HTMLProps, useMixedControlState } from '../utils.js';
import { useDomid } from '../utils/useDomid.js';

import { TogglerInputProps } from './_TogglerInput.js';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TogglerGroupOption<T = 'default', Extras = {}> = {
  value: string;
  label?: T extends 'default' ? string | JSX.Element : T;
  disabled?: boolean;
  id?: string;
} & Partial<Extras>;

// eslint-disable-next-line @typescript-eslint/ban-types
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

// eslint-disable-next-line @typescript-eslint/ban-types
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
  /**
   * Render function that allows inserting content below each toggler
   * (checkbox/radio) element, depending on the item's checked status
   * (or other external state)
   */
  renderItemSubContent?: (
    option: TogglerGroupOption<T, Extras>,
    checked: boolean
  ) => ReactNode;
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
    renderItemSubContent,
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

        const togglerProps: TogglerInputProps = {
          ...inputProps,
          name: name,
          ...option,
          label: option.label || option.value,
          onChange: (e) => {
            inputProps.onChange && inputProps.onChange(e);
            const { value } = option;
            const checked = e.currentTarget.checked;
            const selectedValues = isRadio ? [] : values.filter((val) => val !== value);
            if (checked) {
              selectedValues.push(value);
            }
            setValues(selectedValues);
            onSelected && onSelected({ value, checked, option, selectedValues });
          },
          disabled: isDisabled,
          readOnly: readOnly,
          'aria-invalid': props['aria-invalid'],
          checked: isChecked,
        };

        if (renderItemSubContent) {
          return (
            <li key={i} className={`${bem}__item`}>
              <Toggler {...togglerProps} />
              {renderItemSubContent(option, isChecked)}
            </li>
          );
        }
        return (
          <Toggler key={i} className={`${bem}__item`} Wrapper="li" {...togglerProps} />
        );
      })}
    </ul>
  );
};
