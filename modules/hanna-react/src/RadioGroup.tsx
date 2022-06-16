import React from 'react';

import TogglerGroupField, {
  TogglerGroupFieldOption,
  TogglerGroupFieldOptions,
  TogglerGroupFieldProps,
} from './_abstract/_TogglerGroupField';
import TogglerInput, { TogglerInputProps } from './_abstract/_TogglerInput';

export type RadioGroupProps = TogglerGroupFieldProps & {
  layout?: 'inline';
  value?: string;
};
export type RadioGroupOption = TogglerGroupFieldOption;
export type RadioGroupOptions = TogglerGroupFieldOptions;

const Radio = (props: TogglerInputProps) => (
  <TogglerInput {...props} bem="Radio" type="radio" />
);

const RadioGroup = (props: RadioGroupProps) => (
  <TogglerGroupField
    {...props}
    bem="RadioGroup"
    modifier={props.layout}
    Toggler={Radio}
  />
);
RadioGroup.__Radio = Radio;

export default RadioGroup;
