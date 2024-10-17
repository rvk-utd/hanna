import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { Button, ButtonProps } from './_abstract/_Button.js';
import { DeprecatedSeenProp } from './utils/seenEffect.js';
import { WrapperElmProps } from './utils.js';

export type MiniMetricsProps = {
  text: string;
  moreButton: ButtonProps;
} & WrapperElmProps &
  DeprecatedSeenProp;

export const MiniMetrics = (props: MiniMetricsProps) => {
  const { text, moreButton, wrapperProps } = props;

  return (
    <div
      {...wrapperProps}
      className={modifiedClass('MiniMetrics', null, (wrapperProps || {}).className)}
    >
      <strong className="MiniMetrics__text">{text}</strong> {'\n'}
      <Button bem="MiniMetrics__more" {...moreButton} />
    </div>
  );
};

export default MiniMetrics;
