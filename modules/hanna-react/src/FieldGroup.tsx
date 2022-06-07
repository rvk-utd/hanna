import React, { ReactNode } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

export type FieldGroupProps = {
  legend: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

const FieldGroup = (props: FieldGroupProps) => {
  const { legend, children, className, disabled } = props;
  return (
    <fieldset
      className={getBemClass('FieldGroup', null, className)}
      role="group"
      disabled={disabled}
    >
      <legend className="FieldGroup__legend">{legend}</legend>
      {children}
    </fieldset>
  );
};

export default FieldGroup;
