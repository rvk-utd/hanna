import React, { ReactNode } from 'react';

import { Button, ButtonProps, ButtonVariantProps } from './_abstract/_Button.js';

export type ButtonPrimaryProps = ButtonProps & ButtonVariantProps;

export const ButtonPrimary = (props: ButtonPrimaryProps & { children?: ReactNode }) => (
  <Button bem="ButtonPrimary" {...props} />
);

export default ButtonPrimary;
