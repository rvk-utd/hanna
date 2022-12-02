import React, { ReactNode } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

export type AttentionProps = {
  small?: boolean;
  children: ReactNode;
};

export const Attention = (props: AttentionProps) => (
  <div className={getBemClass('Attention', props.small && 'small')}>{props.children}</div>
);

export default Attention;
