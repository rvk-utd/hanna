import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { ComponentLayoutProps } from './constants.js';

export type FormProps = ComponentLayoutProps &
  React.FormHTMLAttributes<HTMLFormElement> & { children: ReactNode };

// NOTE: As this component already accepts all `<form/>` props directly,
// it makes little sense to add support for `wrapperProps` on top.

export const Form = (props: FormProps) => {
  const { children, align, wide, className, ...formProps } = props;

  return (
    <form
      {...formProps}
      className={modifiedClass(
        'Form',
        [align === 'right' && `align--${align}`, !align && wide && 'wide'],
        className
      )}
    >
      {children}
    </form>
  );
};

export default Form;
