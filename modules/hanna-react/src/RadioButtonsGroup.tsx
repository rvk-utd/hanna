import React from 'react';

import TogglerGroupField, {
  TogglerGroupFieldOptions,
  TogglerGroupFieldProps,
} from './_abstract/TogglerGroupField';
import TogglerInput, { TogglerInputProps } from './_abstract/TogglerInput';

export type RadioButtonsGroupProps = TogglerGroupFieldProps & {
  value?: string;

  /** @deprecated (Will be removed in v0.9) */
  columns?: '2col' | '3col';
  /** @deprecated (Will be removed in v0.9) */
  layout?: 'slim';
};

export type RadioButtonsGroupOptions = TogglerGroupFieldOptions;

const RadioButton = (props: TogglerInputProps) => (
  <TogglerInput {...props} bem="RadioButton" type="radio" />
);

const RadioButtonsGroup = (props: RadioButtonsGroupProps) => {
  if (props.layout) {
    console.warn('`RadioButtonsGroupProps.layout` is deprecated.');
  }
  if (props.columns) {
    console.warn('`RadioButtonsGroupProps.columns` is deprecated.');
  }
  return <TogglerGroupField {...props} bem="RadioButtonsGroup" Toggler={RadioButton} />;
};

export default RadioButtonsGroup;
