import React from 'react';

import {
  TogglerGroupField,
  TogglerGroupFieldOption,
  TogglerGroupFieldOptions,
  TogglerGroupFieldProps,
} from './_abstract/_TogglerGroupField.js';
import { TogglerInput, TogglerInputProps } from './_abstract/_TogglerInput.js';

type RadioProps = Omit<TogglerInputProps, 'reqText'>;
const Radio = (props: RadioProps) => <TogglerInput {...props} bem="Radio" type="radio" />;

// ---------------------------------------------------------------------------

export type RadioGroupProps = TogglerGroupFieldProps & {
  layout?: 'inline';
  value?: string;
  defaultValue?: string;
};
export type RadioGroupOption = TogglerGroupFieldOption;
export type RadioGroupOptions = TogglerGroupFieldOptions;

export const RadioGroup = (props: RadioGroupProps) => (
  <TogglerGroupField
    {...props}
    bem="RadioGroup"
    modifier={props.layout}
    isRadio
    Toggler={Radio}
  />
);

/** @deprecated Exposed for testing purposes only. This may disappear at any time. */
RadioGroup.__Radio = Radio; // eslint-disable-line deprecation/deprecation

export default RadioGroup;
