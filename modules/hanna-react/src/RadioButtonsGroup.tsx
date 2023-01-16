import React from 'react';

import {
  TogglerGroupField,
  TogglerGroupFieldOptions,
  TogglerGroupFieldProps,
} from './_abstract/_TogglerGroupField';
import { TogglerInput, TogglerInputProps } from './_abstract/_TogglerInput';

export type RadioButtonsGroupProps = TogglerGroupFieldProps & {
  value?: string;
  defaultValue?: string;

  /** @deprecated (Will be removed in v0.11) */
  columns?: '2col' | '3col';
  /** @deprecated (Will be removed in v0.11) */
  layout?: 'slim';
};

export type RadioButtonsGroupOptions = TogglerGroupFieldOptions;

const RadioButton = (props: TogglerInputProps) => (
  <TogglerInput {...props} bem="RadioButton" type="radio" innerWrap />
);

export const RadioButtonsGroup = (props: RadioButtonsGroupProps) => {
  if (props.layout) {
    console.warn('`RadioButtonsGroupProps.layout` is deprecated.');
  }
  if (props.columns) {
    console.warn('`RadioButtonsGroupProps.columns` is deprecated.');
  }
  return (
    <TogglerGroupField {...props} bem="RadioButtonsGroup" Toggler={RadioButton} isRadio />
  );
};

export default RadioButtonsGroup;
