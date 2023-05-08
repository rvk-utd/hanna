import React, { ReactNode } from 'react';

import { Button, ButtonProps } from './_abstract/_Button.js';

export type ButtonBackProps = ButtonProps;

export const ButtonBack = (props: ButtonBackProps & { children?: ReactNode }) => (
  <Button bem="ButtonBack" {...props} />
);

export default ButtonBack;
