import React, { ReactNode } from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { WrapperElmProps } from './utils.js';

export type FieldGroupProps = {
  legend: string;
  disabled?: boolean;
  small?: boolean;
  className?: string;
  children: ReactNode;
} & WrapperElmProps<'fieldset'>;

export const FieldGroup = (props: FieldGroupProps) => {
  const { legend, children, className, disabled, small, wrapperProps } = props;
  return (
    <fieldset
      {...wrapperProps}
      className={modifiedClass(
        'FieldGroup',
        small && 'small',
        // Prefer `className` over `wrapperProps.className`
        className || (wrapperProps || {}).className
      )}
      disabled={disabled}
    >
      <legend className="FieldGroup__legend">{legend}</legend>
      {children}
    </fieldset>
  );
};

export default FieldGroup;
