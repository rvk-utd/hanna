import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import {
  EffectProp,
  getEffectAttr,
  SeenProp,
  useSeenEffect,
} from './utils/seenEffect.js';
import { WrapperElmProps } from './utils.js';

export type BgBoxProps = {
  className?: string;
  children: ReactNode;
} & WrapperElmProps &
  SeenProp &
  EffectProp;

export const BgBox = (props: BgBoxProps) => {
  const { className, children, effectType, startSeen, wrapperProps } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'BgBox',
        undefined,
        // Prefer `className` over `wrapperProps.className`
        className || (wrapperProps || {}).className
      )}
      ref={ref}
      {...getEffectAttr(effectType)}
    >
      {children}
    </div>
  );
};

export default BgBox;
