import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { ComponentLayoutProps } from './constants.js';

export type FormProps = ComponentLayoutProps &
  React.FormHTMLAttributes<HTMLFormElement> & { children: ReactNode };

export const Form = (props: FormProps) => {
  const { children, align, wide } = props;

  return (
    <form
      {...props}
      className={modifiedClass('Form', [
        align === 'right' && 'align--' + align,
        !align && wide && 'wide',
      ])}
    >
      {children}
    </form>
  );
};

export default Form;
