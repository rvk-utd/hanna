import React, { ReactElement, useMemo } from 'react';
import { BemPropsModifier } from '@hugsmidjan/react/types';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import FormField, { FormFieldGroupWrappingProps } from '../FormField';

import {
  TogglerGroup,
  TogglerGroupOption,
  TogglerGroupOptions,
  TogglerGroupProps,
} from './_TogglerGroup';
import { TogglerInputProps } from './_TogglerInput';

export type TogglerGroupFieldProps = {
  className?: string;
} & FormFieldGroupWrappingProps &
  TogglerGroupProps;

type _TogglerGroupFieldProps = {
  Toggler: (props: TogglerInputProps) => ReactElement;
  isRadio?: true;
  value?: string | ReadonlyArray<string>;
  defaultValue?: string | ReadonlyArray<string>;
  bem: string;
} & BemPropsModifier;

export type TogglerGroupFieldOption = TogglerGroupOption;
export type TogglerGroupFieldOptions = TogglerGroupOptions;

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
      className={getBemClass(bem, modifier, className)}
      group
      label={label}
      LabelTag={LabelTag}
      assistText={assistText}
      hideLabel={hideLabel}
      disabled={disabled}
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
            value={_value}
            defaultValue={_defaultValue}
            Toggler={Toggler}
          />
        );
      }}
    />
  );
};
