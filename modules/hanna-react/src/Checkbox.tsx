import React from 'react';

import { TogglerInput, TogglerInputProps } from './_abstract/_TogglerInput.js';

export type CheckboxProps = TogglerInputProps;

export const Checkbox = (props: CheckboxProps) => (
  <TogglerInput bem="Checkbox" {...props} type="checkbox" />
);

export default Checkbox;
