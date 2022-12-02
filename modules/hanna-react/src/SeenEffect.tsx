import React from 'react';

import { EffectProp, getEffectAttr, SeenProp, useSeenEffect } from './utils/seenEffect';

export type SeenEffectProps = Omit<JSX.IntrinsicElements['div'], 'ref'> &
  SeenProp &
  EffectProp;

export const SeenEffect = (props: SeenEffectProps) => {
  const { effectType, startSeen, ...divProps } = props;
  const [ref] = useSeenEffect(startSeen);

  return <div {...divProps} ref={ref} {...getEffectAttr(effectType)} />;
};

export default SeenEffect;
