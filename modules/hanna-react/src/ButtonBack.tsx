import React, { ReactNode } from 'react';

import { Button, ButtonProps } from './_abstract/_Button.js';

export type ButtonBackProps = ButtonProps;

// NOTE: As a `_abstract/_Button.tsx`-derived component, all `<button/>` and
// `<a/>` props are allowed directly, so adding `wrapperProps` makes no sense.

export const ButtonBack = (props: ButtonBackProps & { children?: ReactNode }) => (
  <Button bem="ButtonBack" {...props} />
);

export default ButtonBack;
