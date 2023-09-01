import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { WrapperElmProps } from './utils.js';

export type FootnoteProps = {
  children: ReactNode;
} & WrapperElmProps;

export const Footnote = (props: FootnoteProps) => (
  <div
    {...props.wrapperProps}
    className={modifiedClass('Footnote', null, (props.wrapperProps || {}).className)}
  >
    {props.children}
  </div>
);

export default Footnote;
