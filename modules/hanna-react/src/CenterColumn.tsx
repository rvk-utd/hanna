import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { EffectProp, SeenProp } from './utils/seenEffect.js';
import SeenEffect from './SeenEffect.js';
import { WrapperElmProps } from './utils.js';

export type CenterColumnProps = {
  children: ReactNode;
} & SeenProp &
  WrapperElmProps &
  EffectProp;

export const CenterColumn = (props: CenterColumnProps) => {
  const { children, startSeen, effectType, wrapperProps } = props;
  const className = modifiedClass('CenterColumn', null, (wrapperProps || {}).className);

  return startSeen == null ? (
    <div {...wrapperProps} className={className}>
      {children}
    </div>
  ) : (
    <SeenEffect
      {...wrapperProps}
      className={className}
      startSeen={startSeen}
      effectType={effectType}
    >
      {children}
    </SeenEffect>
  );
};

export default CenterColumn;
