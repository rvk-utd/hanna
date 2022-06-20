import React, { ReactNode } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { EffectProp, getEffectAttr, SeenProp, useSeenEffect } from './utils/seenEffect';

export type BgBoxProps = {
  className?: string;
  children: ReactNode;
} & SeenProp &
  EffectProp;

const BgBox = (props: BgBoxProps) => {
  const { className, children, effectType, startSeen } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div
      className={getBemClass('BgBox', undefined, className)}
      ref={ref}
      {...getEffectAttr(effectType)}
    >
      {children}
    </div>
  );
};

export default BgBox;
