import React, { ReactNode } from 'react';

import { Button, ButtonProps, ButtonVariantProps } from './_abstract/_Button.js';

export type ButtonPrimaryProps = ButtonProps & ButtonVariantProps;

// NOTE: As a `_abstract/_Button.tsx`-derived component, all `<button/>` and
// `<a/>` props are allowed directly, so adding `wrapperProps` makes no sense.

export const ButtonPrimary = (props: ButtonPrimaryProps & { children?: ReactNode }) => (
  <Button bem="ButtonPrimary" {...props} />
);

export default ButtonPrimary;
