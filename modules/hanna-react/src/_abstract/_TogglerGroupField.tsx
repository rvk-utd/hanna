import React, { ReactElement, useMemo } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import FormField, { FormFieldGroupWrappingProps } from '../FormField.js';
import { BemModifierProps } from '../utils/types.js';

import {
  TogglerGroup,
  TogglerGroupOption,
  TogglerGroupOptions,
  TogglerGroupProps,
} from './_TogglerGroup.js';
import { TogglerInputProps } from './_TogglerInput.js';

export type TogglerGroupFieldProps<T = 'default'> = {
  className?: string;
} & Omit<FormFieldGroupWrappingProps, 'disabled'> &
  TogglerGroupProps<T>;

type _TogglerGroupFieldProps = {
  Toggler: (props: TogglerInputProps) => ReactElement;
  isRadio?: true;
  value?: string | ReadonlyArray<string>;
  defaultValue?: string | ReadonlyArray<string>;
  bem: string;
} & BemModifierProps;

export type TogglerGroupFieldOption<T = 'default'> = TogglerGroupOption<T>;
export type TogglerGroupFieldOptions<T = 'default'> = TogglerGroupOptions<T>;

export const TogglerGroupField = (
  props: TogglerGroupFieldProps & _TogglerGroupFieldProps
) => {
  const {
    bem,
    Toggler,

    className,
    modifier,
    label,
    LabelTag,
    assistText,
    hideLabel,
    disabled,
    readOnly,
    invalid,
    errorMessage,
    required,
    reqText,
    id,
    value,
    defaultValue,
    ...togglerGroupProps
  } = props;

  const _value = useMemo(
    () => (value == null ? undefined : typeof value === 'string' ? [value] : value),
    [value]
  );
  const _defaultValue = useMemo(
    () =>
      defaultValue == null
        ? undefined
        : typeof defaultValue === 'string'
        ? [defaultValue]
        : defaultValue,
    [defaultValue]
  );

  return (
    <FormField
      className={modifiedClass(bem, modifier, className)}
      group
      label={label}
      LabelTag={LabelTag}
      assistText={assistText}
      hideLabel={hideLabel}
      disabled={!!disabled}
      readOnly={readOnly}
      invalid={invalid}
      errorMessage={errorMessage}
      required={required}
      reqText={reqText}
      id={id}
      renderInput={(className, inputProps) => {
        return (
          <TogglerGroup
            bem={className.options}
            {...inputProps}
            {...togglerGroupProps}
            disabled={disabled}
            value={_value}
            defaultValue={_defaultValue}
            Toggler={Toggler}
          />
        );
      }}
    />
  );
};
