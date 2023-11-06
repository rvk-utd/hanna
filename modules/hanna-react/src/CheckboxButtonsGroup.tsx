import React from 'react';

import {
  TogglerGroupField,
  TogglerGroupFieldOptions,
  TogglerGroupFieldProps,
} from './_abstract/_TogglerGroupField.js';
import CheckboxButton from './CheckboxButton.js';

export type CheckboxButtonsGroupProps = TogglerGroupFieldProps & {
  value?: Array<string>;
  defaultValue?: Array<string>;

  /** Display the buttons in a single column */
  stacked?: boolean;

  /** @deprecated (Will be removed in v0.11) */
  columns?: '2col' | '3col';
  /** @deprecated (Will be removed in v0.11) */
  layout?: 'slim';
};

export type CheckboxButtonsGroupOptions = TogglerGroupFieldOptions;

export const CheckboxButtonsGroup = (props: CheckboxButtonsGroupProps) => {
  if (props.layout /* eslint-disable-line deprecation/deprecation */) {
    console.warn('`CheckboxButtonsGroupProps.layout` is deprecated.');
  }
  if (props.columns /* eslint-disable-line deprecation/deprecation */) {
    console.warn('`CheckboxButtonsGroupProps.columns` is deprecated.');
  }
  return (
    <TogglerGroupField
      {...props}
      bem="CheckboxButtonsGroup"
      modifier={props.stacked && 'stacked'}
      Toggler={CheckboxButton}
    />
  );
};

export default CheckboxButtonsGroup;
