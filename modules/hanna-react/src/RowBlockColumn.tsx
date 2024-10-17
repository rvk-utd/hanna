import React, { ReactNode } from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { WrapperElmProps } from './utils.js';

export type RowBlockColumnProps = {
  background?: boolean | 'primary';
  narrow?: boolean;
  children: ReactNode;
} & WrapperElmProps;

export const RowBlockColumn = (props: RowBlockColumnProps) => {
  const { background, narrow, children, wrapperProps } = props;

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'RowBlockColumn',
        [
          narrow && 'narrow',
          background && 'background',
          background === 'primary' && 'background--primary',
        ],
        (wrapperProps || {}).className
      )}
    >
      {children}
    </div>
  );
};

export default RowBlockColumn;
