import React, { ReactNode } from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { WrapperElmProps } from './utils.js';

export type ReykjavikWavesProps = {
  small?: boolean;
  className?: string;
  children?: ReactNode;
} & WrapperElmProps<'div', 'className'>;

export const ReykjavikWaves = (props: ReykjavikWavesProps) => (
  <div
    {...props.wrapperProps}
    className={modifiedClass('ReykjavikWaves', props.small && 'small', props.className)}
  >
    {props.children}
  </div>
);
