import React from 'react';

import TogglerInput, { TogglerInputProps } from './_abstract/_TogglerInput';

export type CheckboxProps = TogglerInputProps;

const Checkbox = (props: CheckboxProps) => (
  <TogglerInput bem="Checkbox" {...props} type="checkbox" />
);

export default Checkbox;
