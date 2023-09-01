import React from 'react';

import { TogglerInput, TogglerInputProps } from './_abstract/_TogglerInput.js';

/** @deprecated Use `CheckboxButtonProps` instead  (Will be removed in v0.11) */
export type CheckboxProps = CheckboxButtonProps;

// ---------------------------------------------------------------------------

export type CheckboxButtonProps = TogglerInputProps;

export const CheckboxButton = (props: CheckboxButtonProps) => (
  <TogglerInput bem="CheckboxButton" {...props} type="checkbox" innerWrap />
);

export default CheckboxButton;
