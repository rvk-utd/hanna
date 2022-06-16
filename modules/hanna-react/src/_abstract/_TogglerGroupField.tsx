import React, { ReactElement } from 'react';
import { BemPropsModifier } from '@hugsmidjan/react/types';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import FormField, { FormFieldGroupWrappingProps } from '../FormField';

import TogglerGroup, {
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
  value?: string | ReadonlyArray<string>;
  bem: string;
} & BemPropsModifier;

export type TogglerGroupFieldOption = TogglerGroupOption;
export type TogglerGroupFieldOptions = TogglerGroupOptions;

const TogglerGroupField = (props: TogglerGroupFieldProps & _TogglerGroupFieldProps) => {
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
    ...togglerGroupProps
  } = props;

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
            value={Array.isArray(value) ? value : value != null ? [value] : undefined}
            Toggler={Toggler}
          />
        );
      }}
    />
  );
};

export default TogglerGroupField;
