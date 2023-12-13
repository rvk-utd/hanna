import React from 'react';

import { TogglerInput, TogglerInputProps } from './_abstract/_TogglerInput.js';

export type RadioProps = Omit<TogglerInputProps, 'reqText'>;

export const Radio = (props: RadioProps) => (
  <TogglerInput bem="Radio" {...props} type="radio" reqText={false} />
);
