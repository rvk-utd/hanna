import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

export type RowBlockColumnProps = {
  background?: boolean | 'primary';
  narrow?: boolean;
  children: ReactNode;
};

export const RowBlockColumn = (props: RowBlockColumnProps) => {
  const { background, narrow, children } = props;

  return (
    <div
      className={modifiedClass('RowBlockColumn', [
        narrow && 'narrow',
        background && 'background',
        background === 'primary' && 'background--primary',
      ])}
    >
      {children}
    </div>
  );
};

export default RowBlockColumn;
