import React from 'react';

import TogglerGroupField, {
  TogglerGroupFieldOption,
  TogglerGroupFieldOptions,
  TogglerGroupFieldProps,
} from './_abstract/TogglerGroupField';
import Checkbox from './Checkbox';

export type CheckboxGroupProps = TogglerGroupFieldProps & {
  layout?: 'inline';
  value?: Array<string>;
};
export type CheckboxGroupOption = TogglerGroupFieldOption;
export type CheckboxGroupOptions = TogglerGroupFieldOptions;

const CheckboxGroup = (props: CheckboxGroupProps) => {
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
