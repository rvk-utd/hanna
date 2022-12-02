import React, { ReactNode } from 'react';

import { Button, ButtonProps, ButtonVariantProps } from './_abstract/_Button';

export type ButtonSecondaryProps = ButtonProps & ButtonVariantProps;

const ButtonSecondary = (props: ButtonSecondaryProps & { children?: ReactNode }) => (
  <Button bem="ButtonSecondary" {...props} />
);

export default ButtonSecondary;
