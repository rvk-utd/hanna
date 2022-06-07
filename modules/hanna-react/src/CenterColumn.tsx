import React, { ReactNode } from 'react';

import { EffectProp, SeenProp } from './utils/seenEffect';
import SeenEffect from './SeenEffect';

export type CenterColumnProps = {
  children: ReactNode;
} & SeenProp &
  EffectProp;

const CenterColumn = (props: CenterColumnProps) => {
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
