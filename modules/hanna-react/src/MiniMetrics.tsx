import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { Button, ButtonProps } from './_abstract/_Button.js';
import { SeenProp } from './utils/seenEffect.js';
import SeenEffect from './SeenEffect.js';
import { WrapperElmProps } from './utils.js';

export type MiniMetricsProps = {
  text: string;
  moreButton: ButtonProps;
} & WrapperElmProps &
  SeenProp;

export const MiniMetrics = (props: MiniMetricsProps) => {
  const { text, moreButton, startSeen, wrapperProps } = props;

  return (
    <SeenEffect
      {...wrapperProps}
      className={modifiedClass('MiniMetrics', null, (wrapperProps || {}).className)}
      startSeen={startSeen}
    >
      <strong className="MiniMetrics__text">{text}</strong> {'\n'}
      <Button bem="MiniMetrics__more" {...moreButton} />
    </SeenEffect>
  );
};

export default MiniMetrics;
