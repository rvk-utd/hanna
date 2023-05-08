import React, { ReactNode } from 'react';
import { BemPropsModifier } from '@hugsmidjan/react/types';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { SeenProp, useSeenEffect } from './utils/seenEffect.js';

export type RowBlockProps = {
  /** Float the first RowBlockColumn to the right on larger screens. */
  right?: boolean;
  /** Custom **additional** class-name */
  className?: string;
  children: ReactNode;
} & BemPropsModifier &
  SeenProp;

export const RowBlock = (props: RowBlockProps) => {
  const { right, modifier, className, children, startSeen } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div
      className={getBemClass('RowBlock', [modifier, right && 'align--right'], className)}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default RowBlock;
