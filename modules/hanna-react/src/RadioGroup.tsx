import React from 'react';

import {
  TogglerGroupField,
  TogglerGroupFieldOption,
  TogglerGroupFieldOptions,
  TogglerGroupFieldProps,
} from './_abstract/_TogglerGroupField.js';
import { Radio } from './Radio.js';

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

export default RadioGroup;
