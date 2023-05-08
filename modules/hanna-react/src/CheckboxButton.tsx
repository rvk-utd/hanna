import React from 'react';

import { TogglerInput, TogglerInputProps } from './_abstract/_TogglerInput.js';

export type CheckboxProps = TogglerInputProps;

export const CheckboxButton = (props: CheckboxProps) => (
  <TogglerInput bem="CheckboxButton" {...props} type="checkbox" innerWrap />
);

export default CheckboxButton;
