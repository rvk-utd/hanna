import React from 'react';

import {
  TogglerGroupField,
  TogglerGroupFieldOption,
  TogglerGroupFieldOptions,
  TogglerGroupFieldProps,
} from './_abstract/_TogglerGroupField';
import { TogglerInput, TogglerInputProps } from './_abstract/_TogglerInput';

type RadioProps = Omit<TogglerInputProps, 'reqText'>;
const Radio = (props: RadioProps) => <TogglerInput {...props} bem="Radio" type="radio" />;

// ---------------------------------------------------------------------------

export type RadioGroupProps = TogglerGroupFieldProps & {
  layout?: 'inline';
  value?: string;
};
export type RadioGroupOption = TogglerGroupFieldOption;
export type RadioGroupOptions = TogglerGroupFieldOptions;

export const RadioGroup = (props: RadioGroupProps) => (
  <TogglerGroupField
    {...props}
    bem="RadioGroup"
    modifier={props.layout}
    Toggler={Radio}
  />
);

/** @deprecated Exposed for testing purposes only. This may disappear at any time. */
RadioGroup.__Radio = Radio;

export default RadioGroup;
