import React from 'react';

import TogglerGroupField, {
  TogglerGroupFieldOptions,
  TogglerGroupFieldProps,
} from './_abstract/_TogglerGroupField';
import TogglerInput, { TogglerInputProps } from './_abstract/_TogglerInput';

export type CheckboxButtonsGroupProps = TogglerGroupFieldProps & {
  value?: Array<string>;

  /** @deprecated (Will be removed in v0.9) */
  columns?: '2col' | '3col';
  /** @deprecated (Will be removed in v0.9) */
  layout?: 'slim';
};

export type CheckboxButtonsGroupOptions = TogglerGroupFieldOptions;

const CheckboxButton = (props: TogglerInputProps) => (
  <TogglerInput bem="CheckboxButton" {...props} type="checkbox" />
);

const CheckboxButtonsGroup = (props: CheckboxButtonsGroupProps) => {
  if (props.layout) {
    console.warn('`CheckboxButtonsGroupProps.layout` is deprecated.');
  }
  if (props.columns) {
    console.warn('`CheckboxButtonsGroupProps.columns` is deprecated.');
  }
  return (
    <TogglerGroupField {...props} bem="CheckboxButtonsGroup" Toggler={CheckboxButton} />
  );
};

export default CheckboxButtonsGroup;
