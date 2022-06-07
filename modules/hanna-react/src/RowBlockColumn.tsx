import React, { ReactNode } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

export type RowBlockColumnProps = {
  background?: boolean | 'primary';
  narrow?: boolean;
  children: ReactNode;
};

const RowBlockColumn = (props: RowBlockColumnProps) => {
  const { background, narrow, children } = props;

  return (
    <div
      className={getBemClass('RowBlockColumn', [
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
