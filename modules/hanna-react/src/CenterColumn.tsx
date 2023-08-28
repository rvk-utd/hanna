import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { DeprecatedSeenProp, EffectProp } from './utils/seenEffect.js';
import SeenEffect from './SeenEffect.js';
import { WrapperElmProps } from './utils.js';

export type CenterColumnProps = {
  children: ReactNode;
} & EffectProp &
  WrapperElmProps &
  DeprecatedSeenProp;

export const CenterColumn = (props: CenterColumnProps) => (
  <SeenEffect
    {...props.wrapperProps}
    {...props}
    // @ts-expect-error  (overriding `props.wrapperProps` exactly bcause it should NOT be forwarded)
    wrapperProps={undefined}
    className={modifiedClass('CenterColumn', null, (props.wrapperProps || {}).className)}
    effectType={props.effectType || 'none'}
  />
);

export default CenterColumn;
