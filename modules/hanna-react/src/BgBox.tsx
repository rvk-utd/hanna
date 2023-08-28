import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { DeprecatedSeenProp, EffectProp } from './utils/seenEffect.js';
import { WrapperElmProps } from './utils.js';

export type BgBoxProps = {
  className?: string;
  children: ReactNode;
} & WrapperElmProps &
  DeprecatedSeenProp &
  EffectProp;

export const BgBox = (props: BgBoxProps) => {
  const { className, children, effectType, wrapperProps } = props;
  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'BgBox',
        undefined,
        // Prefer `className` over `wrapperProps.className`
        className || (wrapperProps || {}).className
      )}
    >
      {children}
    </div>
  );
};

export default BgBox;
