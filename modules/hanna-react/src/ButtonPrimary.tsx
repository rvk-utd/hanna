import React, { ReactNode } from 'react';

import Button, { ButtonProps, ButtonVariantProps } from './_abstract/Button';

export type ButtonPrimaryProps = ButtonProps & ButtonVariantProps;

const ButtonPrimary = (props: ButtonPrimaryProps & { children?: ReactNode }) => (
  <Button bem="ButtonPrimary" {...props} />
);

export default ButtonPrimary;
