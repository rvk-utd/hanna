import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

export type AttentionProps = {
  small?: boolean;
  children: ReactNode;
};

export const Attention = (props: AttentionProps) => (
  <div className={modifiedClass('Attention', props.small && 'small')}>
    {props.children}
  </div>
);

export default Attention;
