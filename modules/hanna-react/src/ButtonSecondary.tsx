import React, { ReactNode } from 'react';

import { Button, ButtonProps, ButtonVariantProps } from './_abstract/_Button.js';

export type ButtonSecondaryProps = ButtonProps & ButtonVariantProps;

// NOTE: As a `_abstract/_Button.tsx`-derived component, all `<button/>` and
// `<a/>` props are allowed directly, so adding `wrapperProps` makes no sense.

export const ButtonSecondary = (
  props: ButtonSecondaryProps & { children?: ReactNode }
) => <Button bem="ButtonSecondary" {...props} />;

export default ButtonSecondary;
