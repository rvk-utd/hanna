import React from 'react';

import {
  TogglerGroupField,
  TogglerGroupFieldOption,
  TogglerGroupFieldOptions,
  TogglerGroupFieldProps,
} from './_abstract/_TogglerGroupField.js';
import Checkbox from './Checkbox.js';

export type CheckboxGroupProps = TogglerGroupFieldProps & {
  layout?: 'inline';
  value?: Array<string>;
  defaultValue?: Array<string>;
};
export type CheckboxGroupOption = TogglerGroupFieldOption;
export type CheckboxGroupOptions = TogglerGroupFieldOptions;

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  return (
    <TogglerGroupField
      {...props}
      bem="CheckboxGroup"
      modifier={props.layout}
      Toggler={Checkbox}
    />
  );
};

export default CheckboxGroup;
