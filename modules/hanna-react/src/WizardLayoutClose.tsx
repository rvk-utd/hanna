import React from 'react';

import { Button, ButtonProps } from './_abstract/_Button.js';

// NOTE: As a `_abstract/_Button.tsx`-derived component, all `<button/>` and
// `<a/>` props are allowed directly, so adding `wrapperProps` makes no sense.

export const WizardLayoutClose = (props: ButtonProps) => (
  <Button bem="WizardLayoutClose" {...props} />
);
export default WizardLayoutClose;
