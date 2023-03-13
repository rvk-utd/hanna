import React, { ReactNode } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

export type FieldGroupProps = {
  legend: string;
  disabled?: boolean;
  small?: boolean;
  className?: string;
  children: ReactNode;
};

export const FieldGroup = (props: FieldGroupProps) => {
  const { legend, children, className, disabled, small } = props;
  return (
    <fieldset
      className={getBemClass('FieldGroup', small && 'small', className)}
      disabled={disabled}
    >
      <legend className="FieldGroup__legend">{legend}</legend>
      {children}
    </fieldset>
  );
};

export default FieldGroup;
