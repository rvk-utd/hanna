import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { SeenProp, useSeenEffect } from './utils/seenEffect.js';
import { BemModifierProps } from './utils/types.js';

export type RowBlockProps = {
  /** Float the first RowBlockColumn to the right on larger screens. */
  right?: boolean;
  /** Custom **additional** class-name */
  className?: string;
  children: ReactNode;
} & BemModifierProps &
  SeenProp;

export const RowBlock = (props: RowBlockProps) => {
  const { right, modifier, className, children, startSeen } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div
      className={modifiedClass(
        'RowBlock',
        [modifier, right && 'align--right'],
        className
      )}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default RowBlock;
