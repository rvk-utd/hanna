import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { SeenProp, useSeenEffect } from './utils/seenEffect.js';
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
  SeenProp;

export const RowBlock = (props: RowBlockProps) => {
  const { right, modifier, className, children, startSeen, wrapperProps } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'RowBlock',
        [modifier, right && 'align--right'],
        className || (wrapperProps || {}).className
      )}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default RowBlock;
