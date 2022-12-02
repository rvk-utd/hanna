import React, { ReactNode } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { ComponentLayoutProps } from './constants';

export type FormProps = ComponentLayoutProps &
  React.FormHTMLAttributes<HTMLFormElement> & { children: ReactNode };

export const Form = (props: FormProps) => {
  const { children, align, wide } = props;

  return (
    <form
      {...props}
      className={getBemClass('Form', [
        align === 'right' && 'align--' + align,
        !align && wide && 'wide',
      ])}
    >
      {children}
    </form>
  );
};

export default Form;
