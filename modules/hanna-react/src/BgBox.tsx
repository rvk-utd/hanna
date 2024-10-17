import React, { ReactNode } from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { DeprecatedSeenProp } from './utils/seenEffect.js';
import { WrapperElmProps } from './utils.js';

export type BgBoxProps = {
  className?: string;
  children: ReactNode;
} & WrapperElmProps &
  DeprecatedSeenProp & {
    /** @deprecated  This prop does nothing nowadays (Will be removed in v0.11) */
    effectType?: string;
  };

export const BgBox = (props: BgBoxProps) => {
  const { className, children, wrapperProps } = props;
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
