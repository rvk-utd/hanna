import React, { ReactNode } from 'react';

import Button, { ButtonProps } from './_abstract/_Button';

export type ButtonBackProps = ButtonProps;

const ButtonBack = (props: ButtonBackProps & { children?: ReactNode }) => (
  <Button bem="ButtonBack" {...props} />
);

export default ButtonBack;
