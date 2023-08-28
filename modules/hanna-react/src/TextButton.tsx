import React, { ReactNode } from 'react';

import { Button, ButtonProps } from './_abstract/_Button.js';

export type TextButtonProps = ButtonProps & { disabled?: never };

// NOTE: As a `_abstract/_Button.tsx`-derived component, all `<button/>` and
// `<a/>` props are allowed directly, so adding `wrapperProps` makes no sense.

export const TextButton = (props: TextButtonProps & { children?: ReactNode }) => {
  if ('disabled' in props) {
    props = { ...props, disabled: undefined };
  }
  return <Button bem="TextButton" {...props} />;
};

export default TextButton;
