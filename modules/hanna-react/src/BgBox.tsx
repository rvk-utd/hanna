import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import {
  EffectProp,
  getEffectAttr,
  SeenProp,
  useSeenEffect,
} from './utils/seenEffect.js';

export type BgBoxProps = {
  className?: string;
  children: ReactNode;
} & SeenProp &
  EffectProp;

export const BgBox = (props: BgBoxProps) => {
  const { className, children, effectType, startSeen } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div
      className={modifiedClass('BgBox', undefined, className)}
      ref={ref}
      {...getEffectAttr(effectType)}
    >
      {children}
    </div>
  );
};

export default BgBox;
