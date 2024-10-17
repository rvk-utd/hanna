import React, { ReactNode } from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { DeprecatedSeenProp } from './utils/seenEffect.js';
import { BemModifierProps } from './utils/types.js';
import { WrapperElmProps } from './utils.js';

export type RowBlockProps = {
  /** Float the first RowBlockColumn to the right on larger screens. */
  right?: boolean;
  /** Custom __additional__ class-name */
  className?: string;
  children: ReactNode;
} & BemModifierProps &
  WrapperElmProps &
  DeprecatedSeenProp;

export const RowBlock = (props: RowBlockProps) => {
  const { right, modifier, className, children, wrapperProps } = props;

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'RowBlock',
        [modifier, right && 'align--right'],
        className || (wrapperProps || {}).className
      )}
    >
      {children}
    </div>
  );
};

export default RowBlock;
