import React, { ReactNode } from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { WrapperElmProps } from './utils.js';

export type AttentionProps = {
  small?: boolean;
  children: ReactNode;
} & WrapperElmProps;

export const Attention = (props: AttentionProps) => {
  const { small, children, wrapperProps } = props;
  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'Attention',
        small && 'small',
        (wrapperProps || {}).className
      )}
    >
      {children}
    </div>
  );
};

export default Attention;
