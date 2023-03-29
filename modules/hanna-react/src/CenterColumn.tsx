import React, { ReactNode } from 'react';

import { EffectProp, SeenProp } from './utils/seenEffect.js';
import SeenEffect from './SeenEffect.js';

export type CenterColumnProps = {
  children: ReactNode;
} & SeenProp &
  EffectProp;

export const CenterColumn = (props: CenterColumnProps) => {
  const { children, startSeen, effectType } = props;

  return startSeen == null ? (
    <div className="CenterColumn">{children}</div>
  ) : (
    <SeenEffect className="CenterColumn" startSeen={startSeen} effectType={effectType}>
      {children}
    </SeenEffect>
  );
};

export default CenterColumn;
