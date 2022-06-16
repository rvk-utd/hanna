import React, { ReactNode } from 'react';

import Button, { ButtonProps } from './_abstract/_Button';

export type TextButtonProps = ButtonProps & { disabled?: never };

const TextButton = (props: TextButtonProps & { children?: ReactNode }) => {
  if ('disabled' in props) {
    props = { ...props, disabled: undefined };
  }
  return <Button bem="TextButton" {...props} />;
};

export default TextButton;
